const {model, Schema} = require("mongoose")

const packageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    maxDeposite: {
        type: Number,
        required: true,
    },
    minDeposite: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    interestRatePerDay: {
        type: Number,
        required: true,
    },
    interestRatePerWeek: {
        type: Number,
    },
    interestRatePerMonth: {
        type: Number,
        default:"",
    },
    interestRate: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inActive'],
        default: 'inActive'
    }
}, {timestamps: true})

module.exports = model('Package', packageSchema)