/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const os = require('os')
const mongoose = require('mongoose')
const pkg = require('../../../package.json')

module.exports = async (req, res, next) => {
    const mongodbAdmin = new mongoose.mongo.Admin(mongoose.connection.db)
    const db = await mongodbAdmin.buildInfo()

    try {
        res.json({
            success: true,
            data: {
                version: pkg.version,
                osType: os.type(),
                osRelease: os.release(),
                nodeVersion: process.versions.node,
                databaseVersion: db.version,
            },
        })
    } catch (error) {
        res.json({
            success: false,
            message: '系统信息获取失败',
            error,
        })
    }
}
