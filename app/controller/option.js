'use strict';

const BaseController = require('../core/base');
const pkg = require('../../package.json');
class OptionController extends BaseController {
  async setting() {
    const { option, user, post } = this.ctx.service;
    const { menus, seo, site } = await option.siteInfo();
    const userInfo = await user.find();
    await this.ctx.render('/theme/layout.ejs', {
      router: 'setting',
      userInfo,
      menus,
      seo,
      site,
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
  async version() {
    this.success(pkg.version);
  }
}

module.exports = OptionController;
