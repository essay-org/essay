const mongoose = require('mongoose')
const md5 = require('md5')
const { Schema } = mongoose

const CommentSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
  nickname: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    require: true,
  },
  url: {
    type: String,
    trim: true,
    default: '',
  },
  content: {
    type: String,
    trim: true,
    default: '',
  },
  agent: {
    type: String,
    default: '',
  },
  ip: {
    type: String,
    default: '',
  },
  status: { // 1: 有效 2: 无效 3: 审核中
    type: Number,
    default: 1,
  },
  reply: {
    type: String,
    default: '',
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
        ret.id = ret._id;
        delete ret._id;
      },
    },
    minimize: false,
  })

// avatar 使用虚拟字段构建
CommentSchema.virtual('avatar').get(function () {
  return `https://gravatar.com/avatar/${md5(this.email)}?size=48`
})
mongoose.model('Comment', CommentSchema)
