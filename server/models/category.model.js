const mongoose = require('mongoose')

const { Schema } = mongoose
const CategorySchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    keywords: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    flag: {
        type: Number,
        default: 1,
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
            require: true,
        },
        value: {
            type: Schema.Types.Mixed,
            default: '',
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
