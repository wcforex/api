const Order = require('../models/Order');
const User = require('../models/User')
const Package = require('../models/Package')

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
            const user = await User.findById(order.userId)
            let total = user.invested + order.amount
            const invested = await User.findByIdAndUpdate({ id: order.userId }, { invested: total }, { new: true })
            res.status(200).json({ order, invested: invested.invested })
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