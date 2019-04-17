const captcha = require('trek-captcha')

exports.code = async (req, res) => {
    const { token, buffer } = await captcha({ size: 4, style: -1 })
    // req.session.imageCode = token
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.write(buffer)
    res.end()
}
