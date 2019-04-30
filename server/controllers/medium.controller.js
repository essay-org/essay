const mongoose = require('mongoose')

const Medium = mongoose.model('Medium')
const Category = mongoose.model('Category')
const path = require('path')
const fs = require('fs')

exports.getMediums = async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await Medium.find({ category: id })
            .populate({
                path: 'category',
                select: 'id name isShow',
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
            message: '媒体库获取失败',
            error,
        })
    }
}


exports.patchMedium = async (req, res, next) => {
    const {
        id,
    } = req.params
    const { body } = req
    try {
        let data = null
        data = await Medium.findOne({ filename: body.filename }).exec()
        if (data) {
            res.json({
                success: false,
                message: '文件名已存在',
            })
            return
        }
        data = await Medium.findByIdAndUpdate(id, body).exec()
        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '文件更新失败',
            error,
        })
    }
}

exports.deleteMedium = async (req, res, next) => {
    const {
        filename,
    } = req.params

    try {
        const body = await Medium.findOneAndRemove({ filename }).exec()
        fs.unlinkSync(path.join(path.resolve(__dirname, '../../public/medium/', filename)))
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '文件删除失败',
            error,
        })
    }
}


exports.getMediumCategories = async (req, res, next) => {
    try {
        let data = await Category.find({ flag: 2 }).exec()

        const arr = await Medium
            .aggregate([
                { $group: { _id: '$category', total: { $sum: 1 } } },
            ])
            .exec()

        data = JSON.parse(JSON.stringify(data))

        data = data.map((category) => {
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
            message: '媒体库获取失败',
            error,
        })
    }
}

exports.getMediumCategory = async (req, res, next) => {
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
            message: '分类详情获取失败',
            error,
        })
    }
}

exports.postMediumCategory = async (req, res, next) => {
    const { body } = req
    body.flag = 2 // 媒体库的categoy flag为2

    try {
        const data = await new Category(body).save()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '媒体库分类创建失败',
            error,
        })
    }
}


exports.patchMediumCategory = async (req, res, next) => {
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
            message: '媒体库分类更新失败',
            error,
        })
    }
}

exports.deleteMediumCategory = async (req, res, next) => {
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
            message: '媒体库删除失败',
            error,
        })
    }
}
