'use strict';
const { uid } = require('uid');

const Service = require('egg').Service;

class UserService extends Service {
  async save({ id = '', ...rest }) {
    const result = await this.ctx.model.User.upsert({
      id: id ? id : uid(),
      ...rest,
    });
    return result;
  }

  async one(id) {
    const result = await this.ctx.model.User.findOne({id})

    return result;
  }
}

module.exports = UserService;
