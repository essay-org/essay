const mongoose = require('mongoose')
const axios = require('axios')
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

exports.postComment = async (req, res, next) => {
  const {
    replyId = '',
    id,
    content,
  } = req.body
  const username = res.locals.username
  const user = await User.findOne({
    username
  })

  try {
    const comment = await new Comment({
      user: user._id,
      article: id,
      content: content,
      reply_id: replyId
    })
    // 保存用户评论
    await comment.save()
    // 更新文章评论
    await Article.findByIdAndUpdate(id, {
      $push: {
        comments: comment
      }
    }, {
      safe: true,
      upsert: true
    })
    res.json({
      success: true,
      data: comment
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.getComments = async(req, res, next) => {
  let comments = await Comment.find({})
    .populate({
      path: 'user'
    })
    .populate({
      path: 'article',
      select: 'id title'
    })
    .sort({ 'created_at': -1 })
    .exec()
  try {
    res.json({
      success: true,
      data: comments
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.deleteComment = async(req, res, next) => {
  const id = req.params.id

  try {
    let body = await Comment.findByIdAndRemove(id).exec()
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
