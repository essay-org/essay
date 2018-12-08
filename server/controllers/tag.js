const mongoose = require('mongoose')
const Tag = mongoose.model('Tag')

exports.getTags = async (req, res) => {
  try {
    let data = await Tag.find({}).sort({
      'updated_at': -1
    }).exec()
    res.json({
      success: true,
      data: data
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.postTag = async (req, res) => {
  let body = req.body
  try {
    let tag = await Tag.findOne(body)
    if(tag) {
      return (res.json({
        success: false,
        err: 'tag already exists'
      }))
    }
    body = new Tag(body)
    await body.save()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.patchTag = async (req, res) => {
  let body = req.body
  body.updated_at = Date.now()

  try {
    body = await Tag.findByIdAndUpdate(body.id, body).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.deleteTag = async (req, res) => {
  let id = req.params.id
  try {
    body = await Tag.findByIdAndRemove(id).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}
