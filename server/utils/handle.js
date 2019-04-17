exports.error = (res, error, message) => {
    res.json({
        success: false,
        message: message || '操作失败',
        error,
    })
}

exports.success = (res, data) => {
    res.json({
        success: true,
        data,
    })
}
