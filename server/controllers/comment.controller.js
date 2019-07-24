const mongoose = require('mongoose')
const _ = require('lodash')

const Comment = mongoose.model('Comment')

exports.postComment = async (req, res, next) => {

  const msg = req.checkBody({
    id: {
      required: '文章ID不能为空',
    },
    content: {
      required: '评论内容不能为空',
      range: { min: 1, max: 300, message: '评论内容介于1-300个字符之间' },
    },
    nickname: {
      required: '昵称不能为空',
      range: { min: 2, max: 15, message: '昵称介于2-15个字符之间' },
    },
    email: {
      required: '邮箱不能为空',
      isEmail: '邮箱格式错误',
    },
    // url: {
    //   isURL: '个人主页链接错误',
    // },
  })
  if (msg) return res.handleError(msg)

  const ip = (
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.ip ||
    req.ips[0]
  ).replace('::ffff:', '')

  const agent = req.get('User-Agent') || ''
  // 上次留言时间
  try {
    const { body } = req
    const data = await Comment.find({ ip }).sort({ createdAt: -1 }).exec()

    // 时间间隔
    const isLessTime = data[0] && Date.now() - data[0].createdAt < 10 * 60 * 1000
    if (isLessTime) return res.handleError('留言太频繁啦')

    const comment = await new Comment({
      article: body.id,
      ip,
      agent,
      ...body,
    }).save()
    res.handleSuccess(comment)
  } catch (error) {
    res.handleError('评论失败', error)
  }
}

exports.postCommentReply = async (req, res, next) => {
  const msg = req.checkBody({
    id: {
      required: '文章ID不能为空',
    },
    reply: {
      required: '评论内容不能为空',
      range: { min: 1, max: 300, message: '评论内容介于1-300个字符之间' },
    },
  })
  if (msg) return res.handleError(msg)

  try {
    const { body } = req

    const comment = await Comment.findByIdAndUpdate(body.id, {
      reply: body.reply,
    }).exec()
    res.handleSuccess(comment)
  } catch (error) {
    res.handleError('评论失败', error)
  }
}


// 获取文章下的评论，或者全部评论
exports.getComments = async (req, res, next) => {
  const opt = req.params.id
    ? { article: req.params.id }
    : {}

  const sort = req.params.id ? 1 : -1 // 文章评论时间正序排列，评论列表时间倒序排列
  try {

    const data = await Comment.find(opt)
      .populate({
        path: 'article',
        select: 'id title',
      })
      .sort({
        createdAt: sort,
      })
      .exec()
    res.handleSuccess(data)
  } catch (error) {
    res.handleError('评论列表获取失败', error)
  }
}

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = await Comment.findByIdAndRemove(id).exec()
    res.handleSuccess(body)
  } catch (error) {
    res.handleError('评论删除失败', error)
  }
}
