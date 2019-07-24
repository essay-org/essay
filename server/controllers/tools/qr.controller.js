const qr = require('qr-image')

// <img src="/qr" alt="qrcode">
// 根据链接生成二维码
exports.qrcode = (req, res, next) => {
  const code = qr.image('http://www.google.com', { type: 'png' })
  res.setHeader('Content-type', 'image/png') // sent qr image to client side
  code.pipe(res)
}
