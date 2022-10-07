const Withdrawal = require('../models/Withdrawal')
const User = require('../models/User')

const getWithdrawals = async (req, res) => {
    const withdrawals = await Withdrawal.find();
    res.status(200).json({ withdrawals })
}

const getWithdrawalByUser = async (req, res) => {
    const userId = req.params.userId;
    const withdrawals = await Withdrawal.find({ userId })
    res.status(200).json({ withdrawals })
}

const createWithdrawal = async (req, res) => {
    const { userId, userName, amount, paymentMethod, account, status } = req.body;
    try {
        const id = userId
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        }
        const withdrawal = await Withdrawal.create({
            userId,
            userName,
            amount,
            paymentMethod,
            account,
            status
        });
        if (withdrawal) {
            let deduction = user.wallet - amount;
            const updateUser = await User.findByIdAndUpdate(userId, { wallet: deduction }, { new: true })
            res.status(201).json({ withdrawal, balance: updateUser.wallet })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const updateWithdrawal = async (req, res) => {
    try {
        const id = req.params.id;
        const withdrawal = await Withdrawal.findByIdAndUpdate(id, req.body, { new: true })
        if (withdrawal.status === 'paid') {
            const user = await User.findById(withdrawal.userId)
            let update = user.withdrawal + withdrawal.amount;
            const updateUser = await User.findByIdAndUpdate(user._id, { withdrawal: update }, { new: true })
            res.status(200).json({ withdrawal, totalWithdrawal: updateUser.withdrawal })
        } else {
            res.status(200).json({ withdrawal })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// const deleteWithdrawal = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Withdrawal.findByIdAndDelete(id)
//         res.status(200).json({ message: 'Withdrawal deleted successfully' })
//     } catch (error) {
//         res.status(400).json({ message: error })
//     }
// }

module.exports = { getWithdrawals, getWithdrawalByUser, createWithdrawal, updateWithdrawal }