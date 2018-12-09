const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const config = require('../../config')
const logger = require('../log')

exports.img = async (req, res, next) => {
  const form = new formidable.IncomingForm()
  function getImgUrl(req) {
    return new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) {
          logger.error(err)
          reject(err)
        }
        const lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

        // 获取文件后缀名
        const extname = Date.now() + path.extname(lastItem.name)
        const oldUrl = lastItem.path
        const newUrl = path.join(path.resolve(__dirname, '../../public/'), extname)

        // 文件重命名，上传到服务器
        const readStream = fs.createReadStream(oldUrl)
        const writeStream = fs.createWriteStream(newUrl)
        readStream.pipe(writeStream)
        const imgUrl = `${res.locals.app.domain}/public/${extname}`
        resolve(imgUrl)
      })
    })
  }

  await getImgUrl(req,res).then((url) => {
    res.send(url)
  })
}
