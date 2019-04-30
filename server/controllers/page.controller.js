const mongoose = require('mongoose')
const validate = require('express-validator')

const Page = mongoose.model('Page')
exports.getPages = async (req, res, next) => {
    try {
        const data = await Page.find({}).exec()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '单页获取失败',
            error,
        })
    }
}

exports.getPage = async (req, res, next) => {
    const {
        id,
    } = req.params
    try {
        const data = await Page.findOne({
            _id: id,
        }).exec()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '单页详情获取失败',
            error,
        })
    }
}

exports.postPage = async (req, res, next) => {
    // validate.body('name', '名字不能为空')
    const { body } = req

    try {
        const data = await new Page(body).save()

        res.json({
            success: true,
            data,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '单页创建失败',
            error,
        })
    }
}

exports.patchPage = async (req, res, next) => {
    const {
        id,
    } = req.params
    let { body } = req
    try {
        body = await Page.findByIdAndUpdate(id, body).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '单页更新失败',
            error,
        })
    }
}

exports.deletePage = async (req, res, next) => {
    const {
        id,
    } = req.params

    try {
        const body = await Page.findByIdAndRemove(id).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '单页删除失败',
            error,
        })
    }
}
