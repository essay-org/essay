const mongoose = require('mongoose')

const { Schema } = mongoose

const TagSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    sort: {
        type: Number,
        default: 0,
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

mongoose.model('Tag', TagSchema)
