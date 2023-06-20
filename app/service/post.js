'use strict';
const { uid } = require('uid');

const Service = require('egg').Service;

class PostService extends Service {
  async save({ id = '', ...rest }) {
    const result = await this.ctx.model.Post.upsert({
      id: id ? id : uid(),
      ...rest,
    });
    return result;
  }
  async remove(id) {
    const result = await this.ctx.model.Post.remove({ id }, true);
    return result;
  }
  async find(query) {
    const result = query.id
      ? await this.ctx.model.Post.findOne(query)
      : await this.ctx.model.Post.find(query);

    return result;
  }
}

module.exports = PostService;
