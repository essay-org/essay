const mongoose = require('mongoose')

const Option = mongoose.model('Option')

exports.patchOption = async (req, res, next) => {
  try {
    const { name, value } = req.body
    const option = await Option.findOneAndUpdate({
      name,
    }, { value }).exec()
    res.handleSuccess(option)
  } catch (error) {
    res.handleError('修改失败', error)
  }
}

exports.getOptionEmail = async (req, res, next) => {
  try {
    const option = await Option.findOne({ name: 'email' }).exec()
    res.handleSuccess(option)
  } catch (error) {
    res.handleError('获取失败', error)
  }
}

exports.getOptionSeo = async (req, res, next) => {
  try {
    const option = await Option.findOne({ name: 'seo' }).exec()
    res.handleSuccess(option)
  } catch (error) {
    res.handleError('获取失败', error)
  }
}
