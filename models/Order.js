const {model, Schema} = require("mongoose")

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    packageId: {
        type: Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    deposit: {
        type: Number,
        required: true,
    },
    incomePerDay: {
        type: Number,
    },
    incomePerWeek: {
        type: Number, 
    },
    incomePerMonth: {
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
}, {timestamps: true})

module.exports = model("Order", orderSchema)