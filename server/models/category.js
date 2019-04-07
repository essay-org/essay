const mongoose = require('mongoose')

const { Schema } = mongoose
const CategorySchema = new Schema({
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
    sort: {
        type: Number,
        default: 0,
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    extends: [{
        name: {
            type: String,
            validate: /\S+/,
        },
        value: {
            type: String,
            validate: /\S+/,
        },
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


mongoose.model('Category', CategorySchema)
