const Deposit = require('../models/Deposit')
const User = require('../models/User')

const getDeposits = async (req, res) => {
    const deposits = await Deposit.find();
    res.status(200).json({ deposits })
}

const getDepositByUser = async (req, res) => {
    const userId = req.params.userId;
    const deposits = await Deposit.find({ userId })
    res.status(200).json({ deposits })
}

const createDeposit = async (req, res) => {
    const { userId, userName, amount, paymentMethod, account, token, status } = req.body;
    try {
        const id = userId
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        }
        const deposit = await Deposit.create({
            userId,
            userName,
            amount,
            paymentMethod,
            account,
            token,
            status
        });
        res.status(201).json({ deposit })
    } catch (error) {
        // res.status(400).json({ message: error })
        console.log(error)
    }
}

const updateDeposit = async (req, res) => {
    try {
        const id = req.params.id;
        const deposit = await Deposit.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ deposit })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// const deleteDeposit = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Deposit.findByIdAndDelete(id)
//         res.status(200).json({ message: 'Deposit deleted successfully' })
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }

module.exports = { getDeposits, getDepositByUser, createDeposit, updateDeposit }