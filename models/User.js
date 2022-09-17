const { model, Schema } = require("mongoose")

const userSchema = Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bitcoinAddress: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        default: 0,
    },
    history: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
        required: true
    }
}, { timestamps: true })

module.exports = model('User', userSchema)