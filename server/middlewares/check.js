// array
exports.params = (param) => {
  return function (req, res, next) {
    let hasParam = param.every((item) => {
      return !!req.params[item]
    })
    if (!hasParam) {
      return(res.json({
        success: false,
        err: `${param.join(' and ')} is required`
      }))
    }
    next()
  }
}

exports.bodyParams = (body) => {
  return function (req, res, next) {
    let hasParam = body.every((item) => {
      return !!req.body[item]
    })
    if (!hasParam) {
      return(res.json({
        success: false,
        err: `${body.join(' and ')} is required`
      }))
    }
    next()
  }
}
