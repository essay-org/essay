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
    // 软删除
    const result = await this.ctx.model.Post.remove({ id });
    return result;
  }
  async one(id) {
    const result = await this.ctx.model.Post.findOne({ id })
      .select('id', 'type', 'username', 'email')
      .with('user');

    return result;
  }

  async list(query) {
    const result = await this.ctx.model.Post.find(query)
      .select('id', 'type', 'username', 'email')
      .with('user');

    return result;
  }
}

module.exports = PostService;
