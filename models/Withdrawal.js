const { model, Schema } = require("mongoose")

const withdrawalSchema = new Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    account: { type: String, required: true },
    status: {
        type: String,
        enum: ['paid', 'failed', 'pending'],
        default: 'pending'
    },
}, { timestamps: true })

module.exports = model("Withdrawal", withdrawalSchema)