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
    invested: {
        type: Number,
        required: true,
    },
    dailyReturn: {
        type: Number,
    },
    earned: {
        type: Number,
    },
    profit: {
        type: Number,
    },
    totalReturn: {
        type: Number,
    },
    state: {
        type: String,
        enum: ['pending', 'open', 'closed'],
        default: 'pending',
    }
}, { timestamps: true })

module.exports = model("Order", orderSchema)