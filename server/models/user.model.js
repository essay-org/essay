const mongoose = require('mongoose')
const md5 = require('md5')

const { Schema } = mongoose
const UserSchema = new Schema({
    role: {
        type: String,
        enum: ['superAdmin', 'admin', 'user'],
        default: 'user',
    },
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        set: md5,
    },
    description: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    isVerifyEmail: {
        type: Boolean,
        default: false,
    },
    loginMode: {
        type: String,
        default: 'github',
        enum: ['github', 'register'],
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
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
            delete ret.password
            delete ret.createdAt
            delete ret.updatedAt
        },
    },
    minimize: false,
})

mongoose.model('User', UserSchema)
