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

  async siteInfo() {
    const { post, user } = this.ctx.service;
    const menus = await post.find({ isShow: true });
    const seo = await this.findSeo();
    const site = await user.find();
    return {
      menus,
      seo: seo.value || {},
      site: site || {},
    };
  }
}

module.exports = OptionService;
