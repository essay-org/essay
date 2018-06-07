import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  article:[{
    type: Schema.Types.ObjectId,
    ref: 'Article',
  }],
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

CommentSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}

mongoose.model('Comment', CommentSchema)
