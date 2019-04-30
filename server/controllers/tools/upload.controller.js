/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const mongoose = require('mongoose')
const globalConfig = require('../../config/global.config')

const Medium = mongoose.model('Medium')

exports.img = async (req, res, next) => {
    const form = new formidable.IncomingForm()

    function getImgUrl(request) {
        return new Promise((resolve, reject) => {
            form.parse(request, (err, fields, files) => {
                if (err) {
                    reject(err)
                }
                const filename = Object.keys(files)[0]
                const lastItem = files[filename]

                // 获取文件后缀名
                const extname = Date.now() + path.extname(filename)
                const oldUrl = lastItem.path
                const newUrl = path.join(path.resolve(__dirname, '../../../public/picture/'), extname)

                // 文件重命名，上传到服务器
                const readStream = fs.createReadStream(oldUrl)
                const writeStream = fs.createWriteStream(newUrl)
                readStream.pipe(writeStream)
                const imgUrl = `${globalConfig.app.domain}/public/picture/${extname}`
                resolve(imgUrl)
            })
        })
    }

    await getImgUrl(req, res).then((url) => {
        res.send(url)
    })
}

exports.file = async (req, res, next) => {
    const form = new formidable.IncomingForm()

    function getFileUrl(request) {
        return new Promise((resolve, reject) => {
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    reject(err)
                }
                const filename = Object.keys(files)[0]
                const lastItem = files[filename]

                // console.log(fields)
                let extname = lastItem.name
                const data = await Medium.find({ filename: lastItem.name }).exec()
                if (data && data.length) {
                // 文件重名
                    extname = `${lastItem.name.split('.')[0]}_${Date.now()}${path.extname(extname)}`
                }
                const oldUrl = lastItem.path
                const newUrl = path.join(path.resolve(__dirname, '../../../public/medium/'), extname)

                // 文件重命名，上传到服务器
                const readStream = fs.createReadStream(oldUrl)
                const writeStream = fs.createWriteStream(newUrl)
                readStream.pipe(writeStream)

                resolve({
                    category: fields.category,
                    type: lastItem.type.split('/')[1],
                    filename: extname,
                    size: Math.ceil(lastItem.size / 1024),
                })
            })
        })
    }

    await getFileUrl(req, res).then(async (ret) => {
        try {
            const data = await new Medium(ret).save()

            res.json({
                success: true,
                data,
            })
        } catch (error) {
            res.json({
                success: false,
                message: '上传失败',
                error,
            })
        }
    })
}
