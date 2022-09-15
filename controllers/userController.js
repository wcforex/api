const User = require('../models/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).json({ count: users.length, users })
            // console.log(users.length)
        }
    } catch (error) {
        res.status(400).json({ error: error, count: error, data: null })
        // console.log({error})
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if (user) {
            res.status(200).json({ user })
        }
    } catch (error) {
        res.status(400).json({ error: error, data: null })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
            res.status(200).json({ user })
        }
    } catch (error) {
        res.status(400).json({ error: error, data: null })
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = { getUser, getUsers, updateUser, deleteUser }