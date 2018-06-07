import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: String,
  content: String,
  publish: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  flag: {
    type: Number,
    default: 1
  },
  like: {
    type: Array,
    default: []
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

ArticleSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}
// db.users.update({}, {$set: {github: 'https://github.com/wmui'}}, {multi: 1})
mongoose.model('Article', ArticleSchema)
