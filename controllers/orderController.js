const Order = require('../models/Order');
const User = require('../models/User')
const Package = require('../models/Package')

const getOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({ orders })
}

const getOrder = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id).populate('userId', 'firstName', 'lastName').populate('packageId', 'name')
    res.status(200).json({ order })
}

const createOrder = async (req, res, next) => {
    const { userId, packageId, deposit, incomePerDay, incomePerWeek, incomePerMonth, totalReturn, state } = req.body;
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
            deposit,
            incomePerDay,
            incomePerWeek,
            incomePerMonth,
            totalReturn,
            state
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
        res.status(200).json({ order })
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

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder }