const mongoose = require('mongoose')

const { Schema } = mongoose
const MediumSchema = new Schema({
    type: {
        type: String,
        default: '',
    },
    filename: {
        type: String,
        default: '',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
        default: '',
    },
    size: {
        type: Number,
        default: 0,
    },
    quotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Article',
    }],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        },
    },
})

mongoose.model('Medium', MediumSchema)
