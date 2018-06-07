import mongoose from 'mongoose'
import axios from 'axios'
const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')

export const postComment = async(ctx, next) => {
  let body = ctx.request.body
  let { id, token, content } = body
  if (!id || !token || !content) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
  }
  // 根据token获取用户名
  const { data } = await axios.get('https://api.github.com/user?access_token=' + token)
  if (data.login) {
    let user = await User.findOne({ username: data.login })
    try {
      let comment = await new Comment({
        content: content,
        user: user._id,
        article: id
      })
      // 保存用户评论
      await comment.save()
      // 更新文章评论
      await Article.findByIdAndUpdate(id, { $push: { comments: comment } }, { safe: true, upsert: true })
      ctx.body = {
        success: true,
        data: comment
      }
    } catch (e) {
      // console.log(e)
      ctx.body = {
        success: false,
        err: e
      }
    }
  } else {
    ctx.body = {
      success: false,
      err: 'Token is invalid'
    }
  }
}

export const getComment = async(ctx, next) => {
  let comments = await Comment.find({})
    .populate({
      path: 'user'
    })
    .populate({
      path: 'article',
      select: 'id title'
    })
    .sort({ 'createdAt': -1 })
    .exec()
  try {
    ctx.body = {
      success: true,
      data: comments
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}
