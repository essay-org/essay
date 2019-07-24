const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const globalConfig = require('../../config/global.config')

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

        // 获取文件后缀名
        const extname = Date.now() + path.extname(filename)
        const oldUrl = lastItem.path
        const newUrl = path.join(path.resolve(__dirname, '../../../public/picture/'), extname)

        // 文件重命名，上传到服务器
        const readStream = fs.createReadStream(oldUrl)
        const writeStream = fs.createWriteStream(newUrl)
        readStream.pipe(writeStream)
        const url = `${globalConfig.app.domain}/public/picture/${extname}`
        resolve(url)
      })
    })
  }

  await getFileUrl(req, res).then((ret) => {
    res.send(ret)
  })
}
