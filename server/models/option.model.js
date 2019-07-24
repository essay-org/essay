const mongoose = require('mongoose')

const { Schema } = mongoose

const OptionSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  value: {
    type: Schema.Types.Mixed,
    default: '',
  },
}, {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        // delete ret._id;
      },
    },
  })
mongoose.model('Option', OptionSchema)
