const { model, Schema } = require("mongoose")

const paymentMethodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    account: {
        type: String,
        required: true,
    },
    host: {
        type: String,
    },
    minimum: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: 'active'
    },
}, { timestamps: true })

module.exports = model("PaymentMethod", paymentMethodSchema)