'use strict';
const { uid } = require('uid');

const Service = require('egg').Service;

class UserService extends Service {
  async save({ type = '', ...rest }) {
    let result = await this.ctx.model.User.findOne({
      type: 'admin',
    });
    if (result) {
      await this.ctx.model.User.update({ type: 'admin' }, { ...rest });
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
    }).select('id', 'email', 'nickname');

    return result;
  }
}

module.exports = UserService;
