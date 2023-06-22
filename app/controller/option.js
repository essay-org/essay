'use strict';

const BaseController = require('../core/base');

class OptionController extends BaseController {
  async setting() {
    const { option, user, post } = this.ctx.service;
    const seo = await option.findSeo();
    const menus = await post.find({ isShow: true });
    const userInfo = await user.find();
    await this.ctx.render('/theme/layout.ejs', {
      router: 'setting',
      userInfo,
      menus,
      seo: seo.value || {},
    });
  }

  async saveSeo() {
    const { option } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await option.saveSeo(body);
    this.success(result);
  }

  async findSeo() {
    const { option } = this.ctx.service;
    const result = await option.findSeo();
    this.success(result);
  }
}

module.exports = OptionController;
