const { model, Schema } = require("mongoose")

const depositSchema = new Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    account: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['credited', 'failed', 'pending', 'cancelled'],
        default: 'pending'
    },
}, { timestamps: true })

module.exports = model("Deposit", depositSchema)