const jwt = require('jsonwebtoken')
const md5 = require('md5')
const globalConfig = require('../config/global.config')

const { secret, expiresIn } = globalConfig.jwt

// {username: 'q', _id: 'asdf'} => token
exports.sign = (user) => {
  const token = jwt.sign({
    username: user.username,
    role: user.role,
    userId: user._id,
  }, md5(secret), {
      expiresIn,
    })
  return token
}

// token => {username: 'q', userId: 'asdf'}
exports.verify = (token) => {
  const decoded = jwt.verify(token, md5(secret))
  return decoded
}
