'use strict';

const BaseController = require('../core/base');
const pkg = require('../../package.json');
class OptionController extends BaseController {
  async setting() {
    const { option, user, post } = this.ctx.service;
    const { menus, seo, site } = await option.siteInfo();
    const token = this.ctx.cookies.get('Token');
    const loginStatus = user.verify(token);
    const userInfo = await user.find();
    await this.ctx.render('/theme/layout.ejs', {
      router: 'setting',
      userInfo,
      menus,
      seo,
      loginStatus,
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
  async boardTmp() {
    const { option, user, post } = this.ctx.service;
    const { menus, seo, site } = await option.siteInfo();
    const token = this.ctx.cookies.get('Token');
    const loginStatus = user.verify(token);
    const data = await option.findBoard();
    await this.ctx.render('/theme/layout.ejs', {
      router: 'board',
      menus,
      seo,
      loginStatus,
      site,
      data,
    });
  }

  async boardSave() {
    const { nickname = '', content = '' } = this.ctx.request.body;
    const { option, user, post } = this.ctx.service;
    if (!nickname || !content) { return this.fail(); }
    const result = await option.boardSave({
      nickname,
      content,
    });
    if (!result) { return this.fail('留言失败'); }
    this.success(result);
  }

  async boardDel() {
    const { id } = this.ctx.params;
    const { option } = this.ctx.service;
    const result = await option.boardDel(id);
    if (!result) { return this.fail('留言删除失败'); }
    this.success(result);
  }
}

module.exports = OptionController;
