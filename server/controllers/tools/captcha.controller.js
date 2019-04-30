const captcha = require('trek-captcha')
const md5 = require('md5')
const globalConfig = require('../../config/global.config')

exports.code = async (req, res) => {
    const { token, buffer } = await captcha({ size: 4, style: -1 })
    res.cookie('code', md5(token), {
        maxAge: globalConfig.jwt.expiresIn * 1000,
        httpOnly: true,
    })
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.write(buffer)
    res.end()
}
