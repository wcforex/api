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
    phoneNumber: {
        type: String,
        unique: true
    },
    country: {
        type: String,
    },
    usdtAddress: {
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
    refwallet: {
        type: Number,
        default: 0,
    },
    withdrawal: {
        type: Number,
        default: 0,
    },
    profit: {
        type: Number,
        default: 0,
    },
    invested: {
        type: Number,
        default: 0,
    },
    withdrawals: {
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
    },
    referralCode: {
        type: String,
    },
    myCode: {
        type: String,
    },
    referrals: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = model('User', userSchema)