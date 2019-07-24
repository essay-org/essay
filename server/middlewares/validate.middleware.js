/**
 * 暂不支持非必填字段的验证=
 */
const validator = require('validator')
const _ = require('lodash')

// 自定义验证
const validators = {
  isString(val) { return _.isString(val) },
  isNumber(val) { return _.isNumber(val) },
  isObject(val) { return _.isObject(val) },
  isArray(val) { return _.isArray(val) },
  required(val) { return !_.isEmpty(val) },
  range({ min, max, val }) { return !!(min <= val.length && val.length <= max) },
}

// 添加validator中的所有is方法
for (const [key, val] of Object.entries(validator)) {
  if (key.match(/^is/)) {
    validators[key] = val
  }
}

module.exports = (req, res, next) => {
  req.checkBody = rule => check(rule, 'body')
  req.checkQuery = rule => check(rule, 'query')
  req.checkParams = rule => check(rule, 'params')

  const check = (rules, type) => {
    // ['name', 'email']
    for (const [fieldName, fieldValidator] of Object.entries(rules)) {
      // 执行验证，validator 默认不处理 undefined值
      const val = req[type][fieldName] || ''
      let pass = false

      for (const [fn, valid] of Object.entries(fieldValidator)) {
        const msg = typeof valid === 'string' ? valid : valid.message
        let param = val
        // 自定义方法特殊处理
        if (fn === 'range') {
          param = {
            min: valid.min,
            max: valid.max,
            val,
          }
        }

        pass = validators[fn](param)
        if (!pass) {
          return msg
        }
      }
    }
  }
  next()
}
