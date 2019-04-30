const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
    },
    content: {
        type: String,
        default: '',
    },
    isInvalid: {
        type: Boolean,
        default: false,
    },
    reply: {
        type: Object,
        default: {},
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
    minimize: false,
})


mongoose.model('Comment', CommentSchema)
