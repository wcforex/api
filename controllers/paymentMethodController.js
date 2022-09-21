const PaymentMethod = require('../models/PaymentMethod')

const getPaymentMethods = async (req, res) => {
    const paymentMethods = await PaymentMethod.find();
    res.status(200).json({ paymentMethods })
}

const getPaymentMethod = async (req, res) => {
    const id = req.params.id;
    const paymentMethod = await PaymentMethod.findById(id)
    res.status(200).json({ paymentMethod })
}

const createPaymentMethod = async (req, res) => {
    const { name, account, host, minimum, description, status } = req.body;
    try {
        const paymentMethod = await PaymentMethod.create({
            name,
            account,
            host,
            minimum,
            description,
            status
        });
        res.status(201).json({ paymentMethod })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const updatePaymentMethod = async (req, res) => {
    try {
        const id = req.params.id;
        const paymentMethod = await PaymentMethod.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ paymentMethod })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const deletePaymentMethod = async (req, res) => {
    try {
        const id = req.params.id;
        await PaymentMethod.findByIdAndDelete(id)
        res.status(200).json({ message: 'PaymentMethod deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { getPaymentMethods, getPaymentMethod, createPaymentMethod, updatePaymentMethod, deletePaymentMethod }