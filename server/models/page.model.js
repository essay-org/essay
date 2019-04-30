const mongoose = require('mongoose')

const { Schema } = mongoose
const PageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    sort: {
        type: Number,
        default: 0,
    },
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


mongoose.model('Page', PageSchema)
