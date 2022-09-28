const { model, Schema } = require("mongoose")

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
        required: true
    },
    paymentMethod: { type: String, required: true },
    amount: {
        type: Number,
        required: true,
    },
    dailyReturn: {
        type: Number,
    },
    profit: {
        type: Number,
    },
    totalReturn: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    state: {
        type: String,
        enum: ['waiting deposit', 'open','cancelled', 'closed'],
        default: 'waiting deposit',
    }
}, { timestamps: true })

module.exports = model("Order", orderSchema)