const jwt = require('jsonwebtoken')
const config = require('../config')

const { secret, expiresIn } = config.jwt

// {username: 'q', _id: 'asdf'} => token
exports.sign = (user) => {
    const token = jwt.sign({
        username: user.username,
        role: user.role,
        userId: user._id,
        createdAt: user.createdAt,
    }, secret, {
        expiresIn,
    })
    return token
}

// token => {username: 'q', userId: 'asdf'}
exports.verify = (token) => {
    const decoded = jwt.verify(token, secret)
    return decoded
}
