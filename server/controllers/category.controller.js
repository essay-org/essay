const mongoose = require('mongoose')

const Category = mongoose.model('Category')
const Article = mongoose.model('Article')

exports.getCategories = async (req, res, next) => {
    const { role = '' } = res.locals.user
    const match = role === 'superAdmin' ? { flag: 1 } : { flag: 1, isShow: true }
    try {
        let categories = await Category.find(match)
            .sort({
                sort: -1,
            })
            .exec()

        // 查询分类下文章数量
        const arr = await Article
            .aggregate([
                { $match: { isPublish: true } },
                { $group: { _id: '$category', total: { $sum: 1 } } },
            ])
            .exec()

        categories = JSON.parse(JSON.stringify(categories))

        const data = categories.map((category) => {
            const t = arr.find(item => String(item._id) === String(category.id))
            return {
                ...category,
                total: t ? t.total : 0,
            }
        })
        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '分类获取失败',
            error,
        })
    }
}


exports.getCategory = async (req, res, next) => {
    const {
        id,
    } = req.params
    try {
        const data = await Category.findOne({
            _id: id,
        }).exec()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '分类获取失败',
            error,
        })
    }
}

exports.postCategory = async (req, res, next) => {
    const { body } = req
    try {
        let data = await Category.findOne({ name: body.name })
        if (data) {
            res.json({
                success: false,
                message: '分类已存在',
            })
            return
        }
        data = await new Category(body).save()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '分类创建失败',
            error,
        })
    }
}

exports.patchCategory = async (req, res, next) => {
    const {
        id,
    } = req.params
    let { body } = req
    try {
        body = await Category.findByIdAndUpdate(id, body).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '分类更新失败',
            error,
        })
    }
}

exports.deleteCategory = async (req, res, next) => {
    const {
        id,
    } = req.params

    try {
        const body = await Category.findByIdAndRemove(id).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '分类删除失败',
            error,
        })
    }
}
