const Order = require('../models/Order');
const User = require('../models/User')
const Package = require('../models/Package')
// const cron = require('node-cron');

const getOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({ orders })
}

const getOrderByUser = async (req, res) => {
    const userId = req.params.userId;
    const orders = await Order.find({ userId })
    res.status(200).json({ orders })
}

const createOrder = async (req, res, next) => {
    const { userId, packageId, paymentMethod, amount, dailyReturn, profit, totalReturn, duration } = req.body;
    try {
        //get user
        const user = await User.findById(userId)
        if (!user) next(new Error("Invalid user ID"));

        //get package
        const package = await Package.findById(packageId)
        if (!package) next(new Error("Invalid Package ID"))

        const order = await Order.create({
            userId,
            packageId,
            paymentMethod,
            amount,
            dailyReturn,
            duration,
            totalReturn,
            profit,
        });

        if (order) {
            await User.findByIdAndUpdate(userId, { $addToSet: { orders: order._id.toString() } }, { new: true })
            res.status(201).json({ order })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true })
        if (order.state === 'open') {
            //update user invested
            const user = await User.findById(order.userId)
            let total = user.invested + order.amount
            const invested = await User.findByIdAndUpdate(order.userId, { invested: total }, { new: true })

            // let date = new Date();
            // let hours = date.getHours();
            // let minutes = date.getMinutes();

            //schedule to update user wallet every 24hrs
            // const scheduler = cron.schedule(`0 ${minutes} ${hours} * * *`, async function () {
            //     let dailyCredit = user.wallet + order.dailyReturn; //calculate daily wallet balance
            //     //credit user wallet
            //     await User.findByIdAndUpdate(order.userId, { wallet: dailyCredit }, { new: true });
            // }, { scheduled: false });

            // let getHrs = order.duration * 24;
            // let addHours = date.setMinutes(date.getMinutes() + 1)

            // while (new Date() < new Date(addHours)) {
            //     scheduler.start(); //start scheduler timer
            // }
            res.status(200).json({ order, invested: invested.invested })
        } else if (order.state === 'closed') {
            const user = await User.findById(order.userId)
            let profit = user.profit + order.profit;
            const update = await User.findByIdAndUpdate(order.userId, { profit: profit }, { new: true })

            const filt = await Order.find({ userId: order.userId, state: 'closed' })
            if (filt && filt.length === 1 && user.referralCode !== '') {
                const finduser = await User.find({ myCode: user.referralCode })
                if (finduser) {
                    let bonus = order.profit * 0.10
                    let amt = finduser.wallet + bonus
                    await User.findByIdAndUpdate(finduser._id, { wallet: amt }, { new: true })
                }
            }

            res.status(200).json({ order, totalProfits: update })
        } else {
            res.status(200).json({ order })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        await Order.findByIdAndDelete(id)
        res.status(200).json({ messsage: 'Order deleted successfully' })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getOrders, getOrderByUser, createOrder, updateOrder, deleteOrder }