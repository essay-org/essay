'use strict';
const { uid } = require('uid');
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const Service = require('egg').Service;

class UserService extends Service {
  async save({ type = '', password, ...rest }) {
    let result = await this.ctx.model.User.findOne({
      type: 'admin',
    });
    if (password) {
      password = md5(password);
    }
    if (result) {
      await this.ctx.model.User.update(
        { type: 'admin' },
        {
          ...rest,
        }
      );
    } else {
      result = await this.ctx.model.User.create({
        id: uid(),
        ...rest,
        type: 'admin',
      });
    }
    return result;
  }

  async find() {
    const result = await this.ctx.model.User.findOne({
      type: 'admin',
    }).select('id', 'email', 'nickname', 'sign', 'icp');

    return result;
  }

  async login({ password, email }) {
    const result = await this.ctx.model.User.findOne({
      type: 'admin',
      password: md5(password),
      email,
    }).select('id', 'email', 'nickname', 'sign', 'icp');

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
        await fs.writeFileSync('install.lock', uid());
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  // 过期时间单位是秒，这里默认7天有效期
  sign({ email, id }) {
    const key = fs.readFileSync(this.ctx.app.baseDir + '/install.lock', 'utf8');
    const token = jwt.sign({
      email, id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, key);
    return token;
  }

  verify(token) {
    const key = fs.readFileSync(this.ctx.app.baseDir + '/install.lock', 'utf8');
    return jwt.verify(token, key, (err, decoded) => {
      if (err) {
        // JWT验证失败，可能是过期或无效
        return {
          status: -1,
          data: 'token解析失败',
        };
      }
      // JWT验证成功 当前时间的UNIX时间戳
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        // JWT已过期
        return {
          status: 0,
          data: 'token已过期',
        };
      }
      // JWT仍然有效
      return {
        status: 1,
        data: decoded,
      };
    });
  }
}

module.exports = UserService;
