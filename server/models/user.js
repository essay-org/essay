import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  role: {
    type: String,
    default: 'user',
  },
  username: String,
  password: String,
  email: String,
  nickname: String,
  motto: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// hidden some field
UserSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.id
    delete ret.password
    delete ret.username
  }
}
mongoose.model('User', UserSchema)
