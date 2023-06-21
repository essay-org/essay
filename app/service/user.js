'use strict';
const { uid } = require('uid');
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const md5 = require('md5');
const Service = require('egg').Service;

class UserService extends Service {
  async save({ type = '', password, ...rest }) {
    let result = await this.ctx.model.User.findOne({
      type: 'admin',
    });
    if (result) {
      await this.ctx.model.User.update({ type: 'admin' }, {
        ...rest,
        password: md5(password),
      });
    } else {
      result = await this.ctx.model.User.create({
        id: uid(),
        ...rest,
        password: md5(password),
        type: 'admin',
      });
    }
    return result;
  }

  async find() {
    const result = await this.ctx.model.User.findOne({
      type: 'admin',
    }).select('id', 'email', 'nickname');

    return result;
  }

  async login({ password, email }) {
    const result = await this.ctx.model.User.findOne({
      type: 'admin',
      password: md5(password),
      email,
    }).select('id', 'email', 'nickname');

    return result;
  }
  async initCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i', // 排除不易识别的字符
      fontSize: 50,
      width: 100,
      height: 32,
      background: '#cc9966',
    });
    return captcha;
  }

  async checkInstall() {
    const lock = await fs.statSync(this.ctx.app.baseDir + '/install.lock', {
      throwIfNoEntry: false,
    });
    return !!lock;
  }

  async install() {
    try {
      const lock = await fs.statSync(this.ctx.app.baseDir + '/install.lock', {
        throwIfNoEntry: false,
      });
      if (!lock) {
        await fs.writeFileSync('install.lock', 'true');
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = UserService;
