const mongoose = require('mongoose')
const md5 = require('md5');

const { Schema } = mongoose

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ['superAdmin', 'admin', 'user'], // 预留三个角色
    default: 'user',
  },
  username: {
    type: String,
    trim: true,
    unique: true, // 用户名不能重复
  },
  nickname: {
    type: String,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    set: md5,
  },
  description: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    unique: true, // 邮箱不能重复
    trim: true,
    lowercase: true,
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
        // 隐藏管理员ID和密码
        delete ret._id
        delete ret.id
        delete ret.username
        delete ret.password
        delete ret.updatedAt
      },
    },
    minimize: false,
  })
mongoose.model('User', UserSchema)
