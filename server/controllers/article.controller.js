/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const mongoose = require('mongoose')
const _ = require('lodash')

const Article = mongoose.model('Article')
// articles?limit=15&page=1
// articles?categoryId=asdf&limit=15&page=1
// articles?keywords=js&limit=15&page=1

exports.getArticles = async (req, res, next) => {
    const {
        page = 1,
        limit = 15,
        keywords = '',
        categoryId = '',
        tagId = '',
        userId = '',
        likeId = '',
    } = req.query

    const skipCount = Number((page - 1) * limit)
    const limitCount = Number(limit)
    const reg = new RegExp(decodeURIComponent(keywords), 'i')

    let findOption = {
        isRecommend: true,
    }

    if (keywords) {
        findOption = {
            $or: [{
                title: {
                    $regex: reg,
                },
            }, {
                content: {
                    $regex: reg,
                },
            }],
        }
    }
    if (categoryId) {
        findOption = {
            category: categoryId,
        }
    }
    if (tagId) {
        findOption = {
            tags: tagId,
        }
    }
    if (userId) {
        findOption = {
            user: userId,
        }
    }
    if (likeId) {
        findOption = {
            likes: likeId,
        }
    }
    try {
        const total = (await Article.find({
            ...findOption,
            isPublish: true,
        }).exec()).length

        const data = await Article.find({
            ...findOption,
            isPublish: true,
        })
            .populate({
                path: 'category',
                select: 'id name isShow',
            })
            .populate({
                path: 'tags',
                select: 'id name',
            })
            .populate({
                path: 'user',
                select: 'id username avatar email',
            })
            .skip(skipCount)
            .limit(limitCount)
            .sort({
                createdAt: -1,
            })
            .exec()


        let arts = JSON.parse(JSON.stringify(data))

        // 私有分类下的文章不能被检索
        if (keywords) {
            arts = arts.filter(i => i.category.isShow !== false)
        }
        res.json({
            success: true,
            data: arts,
            total,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: '文章获取失败',
            error,
        })
    }
}

exports.getArticlesTop = async (req, res, next) => {
    const { id } = req.params
    const opt = id
        ? { isTop: true, isPublish: true, category: id }
        : { isTop: true, isPublish: true }

    try {
        const data = await Article.find(opt)
            .populate({
                path: 'category',
                select: 'id name',
            })
            .populate({
                path: 'tags',
                select: 'id name',
            })
            .populate({
                path: 'user',
                select: 'id username avatar email',
            })
            .sort({
                createdAt: -1,
            })
            .exec()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '置顶文章获取失败',
            error,
        })
    }
}

exports.getDrafts = async (req, res, next) => {
    const {
        limit = 15,
        page = 1,
        userId = '',
    } = req.query
    const skipCount = Number((page - 1) * limit)
    const limitCount = Number(limit)

    try {
        const total = (await Article.find({
            isPublish: false,
            user: userId,
        }).exec()).length

        const data = await Article.find({
            isPublish: false,
            user: userId,
        })
            .populate({
                path: 'category',
                select: 'id name',
            })
            .populate({
                path: 'tags',
                select: 'id name',
            })
            .populate({
                path: 'user',
                select: 'id username avatar email',
            })
            .skip(skipCount)
            .limit(limitCount)
            .sort({
                createdAt: -1,
            })
            .exec()

        res.json({
            success: true,
            data,
            total,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '草稿获取失败',
            error,
        })
    }
}

exports.getArticle = async (req, res, next) => {
    const { role = '' } = res.locals.user
    const {
        id,
    } = req.params
    // 草稿和私有分类文章拦截处理
    try {
        const article = await Article.findOne({
            _id: id,
        })
            .populate({
                path: 'category',
                select: 'id name isShow',
            })
            .populate({
                path: 'tags',
                select: 'id name',
            })
            .populate({
                path: 'user',
                select: 'id username avatar email',
            })
            .exec()

        const stateMap = {
            1: role === 'superAdmin',
            2: article.isPublish && article.category && article.category.isShow, // 有分类
            3: article.isPublish && !article.category,
        }
        if (stateMap[1] || stateMap[2] || stateMap[3]) {
            await Article.findByIdAndUpdate(id, {
                views: article.views + 1,
            }).exec()

            res.json({
                success: true,
                data: article,
            })
            return
        }
        // 无权限
        res.status(403).json({
            success: false,
            message: '无权限',
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: '文章内容获取失败',
            error,
        })
    }
}

exports.postArticle = async (req, res, next) => {
    let { body } = req
    try {
        if (!body.category) body.category = null // 未添加分类的文章
        body = await new Article(body).save()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '文章添加失败',
            error,
        })
    }
}


exports.patchArticle = async (req, res, next) => {
    let { body } = req
    const {
        id,
    } = req.params
    try {
        if (!body.category) body.category = null // 未添加分类的文章
        body = await Article.findByIdAndUpdate(id, body).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '文章更新失败',
            error,
        })
    }
}

exports.deleteArticle = async (req, res, next) => {
    const {
        id,
    } = req.params

    try {
        const body = await Article.findByIdAndRemove(id).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '文章删除失败',
            error,
        })
    }
}

exports.patchArticleLikes = async (req, res, next) => {
    const { id } = req.params
    const { userId } = res.locals.user
    const article = await Article.findOne({ _id: id }).exec()
    const likes = article.likes.map(i => i.toString()) // 获取 likes 数组

    if (likes.includes(userId)) {
        await Article.findByIdAndUpdate(id, {
            $pull: {
                likes: userId,
            },
        }, {
            safe: true,
            upsert: true,
        })
        res.json({
            success: true,
            data: {
                message: '已取消喜欢',
            },
        })
    } else {
        await Article.findByIdAndUpdate(id, {
            $push: {
                likes: userId,
            },
        }, {
            safe: true,
            upsert: true,
        })
        res.json({
            success: true,
            data: {
                message: '已加入喜欢',
            },
        })
    }
}
