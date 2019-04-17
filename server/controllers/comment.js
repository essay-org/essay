const mongoose = require('mongoose')
const _ = require('lodash')

const Article = mongoose.model('Article')
const Comment = mongoose.model('Comment')

exports.postComment = async (req, res, next) => {
    // reply = null, 是为了默认返回 {}
    const {
        reply = null,
        id,
        content,
    } = req.body

    const { userId } = res.locals.user
    try {
        const comment = await new Comment({
            user: userId,
            article: id,
            content,
            reply,
        }).save()
        res.json({
            success: true,
            data: comment,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '评论失败',
            error,
        })
    }
}

// 获取文章下的评论或者全部评论
exports.getComments = async (req, res, next) => {
    const opt = req.params.id
        ? { article: req.params.id }
        : {}

    const sort = req.params.id ? 1 : -1
    try {
        await Comment.find(opt)
            .populate({
                path: 'user',
            })
            .populate({
                path: 'article',
                select: 'id title',
            })
            .sort({
                createdAt: sort,
            })
            .exec((error, doc) => {
                if (error) {
                    res.json({
                        success: false,
                        message: '评论列表获取失败',
                        error,
                    })
                    return
                }
                const comments = []
                doc.forEach((i) => {
                    if (i.reply) {
                        // 聚合评论数据
                        i.reply = _.find(doc, { id: i.reply })
                    } else {
                        i.reply = {}
                    }
                    comments.push(i)
                })
                res.json({
                    success: true,
                    data: comments,
                })
            })
    } catch (error) {
        res.json({
            success: false,
            message: '评论列表获取失败',
            error,
        })
    }
}

exports.deleteComment = async (req, res, next) => {
    const {
        id,
    } = req.params

    try {
        // 软删除，防止聚合出错
        const body = await Comment.findByIdAndUpdate(id, {
            content: '该评论已删除',
            isInvalid: true,
        }).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '评论删除失败',
            error,
        })
    }
}
