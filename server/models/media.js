const mongoose = require('mongoose')

const { Schema } = mongoose
const MediaSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    size: {
        type: Number,
        required: true,
    },
    quotes: [Schema.Types.ObjectId],
})

module.exports = mongoose.model('Media', MediaSchema)
