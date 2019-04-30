const mongoose = require('mongoose')

const Tag = mongoose.model('Tag')
const Article = mongoose.model('Article')
exports.getTags = async (req, res) => {
    try {
        let tags = await Tag.find({}).sort({
            sort: -1,
        })
            .exec()

        // 查询标签下文章数量
        const arr = await Article
            .aggregate([
                { $unwind: '$tags' },
                { $match: { isPublish: true } },
                { $group: { _id: '$tags', total: { $sum: 1 } } },
            ])
            .exec()

        // 聚合数据
        tags = JSON.parse(JSON.stringify(tags))
        const data = tags.map((tag) => {
            const t = arr.find(item => String(item._id) === String(tag.id))
            return {
                ...tag,
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
            message: '标签获取失败',
            error,
        })
    }
}

exports.postTag = async (req, res) => {
    const { body } = req
    try {
        let data = await Tag.findOne({ name: body.name })
        if (data) {
            res.json({
                success: false,
                message: '标签已存在',
            })
            return
        }
        data = await new Tag(body).save()
        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '标签创建失败',
            error,
        })
    }
}

exports.patchTag = async (req, res) => {
    const { body } = req

    try {
        const data = await Tag.findByIdAndUpdate(body.id, body).exec()
        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '标签更新失败',
            error,
        })
    }
}

exports.deleteTag = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Tag.findByIdAndRemove(id).exec()
        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '标签删除失败',
            error,
        })
    }
}
