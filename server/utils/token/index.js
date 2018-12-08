const config = require('../../config')
const jwt = require('jsonwebtoken')

// {username: 'q', _id: 'asdf'} => token
exports.sign = function token(user) {
  const {
    secret,
    expiresIn
  } = config.jwt
  const token = jwt.sign({
    username: user.username,
    userID: user._id
  }, secret, {
    expiresIn: expiresIn
  })
  return token
}

// token => {username: 'q', userID: 'asdf'}
exports.verify = function (token) {
  const decoded = jwt.verify(token, config.jwt.secret)
  return decoded
}

