/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const os = require('os')
const mongoose = require('mongoose')
const pkg = require('../../../package.json')
const globalConfig = require('../../config/global.config')

exports.system = async (req, res, next) => {
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

exports.globalConfig = async (req, res, next) => {
    res.json({
        success: true,
        data: {
            siteName: globalConfig.app.siteName,
            domain: globalConfig.app.domain,
            seo: globalConfig.seo,
            copyRight: '2014-2019 ©️ Essay',
            isConfigEmail: !!(globalConfig.email.user && globalConfig.email.pass),
            isConfigGithub: !!(globalConfig.github.id && globalConfig.github.secret),
        },
    })
}
