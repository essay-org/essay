'use strict';
const { uid } = require('uid');
const Service = require('egg').Service;

class OptionService extends Service {
  async saveSeo(value) {
    let result = await this.ctx.model.Option.findOne({
      name: 'seo',
    });
    if (result) {
      await this.ctx.model.Option.update({ name: 'seo' }, {
        value,
      });
    } else {
      result = await this.ctx.model.Option.create({
        id: uid(),
        name: 'seo',
        value,
      });
    }
    return result;
  }

  async findSeo() {
    const result = await this.ctx.model.Option.findOne({
      name: 'seo',
    });
    return result;
  }
}

module.exports = OptionService;
