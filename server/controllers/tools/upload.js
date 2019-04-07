/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

exports.img = async (req, res, next) => {
    const form = new formidable.IncomingForm()

    function getImgUrl(request) {
        return new Promise((resolve, reject) => {
            form.parse(request, (err, fields, files) => {
                if (err) {
                    reject(err)
                }
                const lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

                // 获取文件后缀名
                const extname = Date.now() + path.extname(lastItem.name)
                const oldUrl = lastItem.path
                const newUrl = path.join(path.resolve(__dirname, '../../public/picture/'), extname)

                // 文件重命名，上传到服务器
                const readStream = fs.createReadStream(oldUrl)
                const writeStream = fs.createWriteStream(newUrl)
                readStream.pipe(writeStream)
                const imgUrl = `${res.locals.domain}/public/picture/${extname}`
                resolve(imgUrl)
            })
        })
    }

    await getImgUrl(req, res).then((url) => {
        res.send(url)
    })
}
