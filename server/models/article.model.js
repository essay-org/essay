const mongoose = require('mongoose')
const md5 = require('md5')
const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  thumbnail: {
    type: String,
    default: '',
  },
  status: { // 1: 分类页显示 2: 首页显示 3: 置顶
    type: Number,
    default: 1,
  },
  isPublish: {
    type: Boolean,
    default: true,
  },
  enableComment: {
    type: Boolean,
    default: true,
  },
  password: { // 重要文章可以加密
    type: String,
    set: md5,
  },
  views: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
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

mongoose.model('Article', ArticleSchema)
