// exports.error = (res, error, message) => {
//     res.json({
//         success: false,
//         message: message || '操作失败',
//         error,
//     })
// }

// exports.success = (res, data) => {
//     res.json({
//         success: true,
//         data,
//     })
// }

/**
 * state: true => [true, data]
 * state: false => [false, message, error]
 */
module.exports = (res, [state, val, error]) => {
    if (state) {
        res.json({ success: true, data: val })
        return
    }
    res.json({ success: false, message: val || '操作失败', error: error || {} })
}
