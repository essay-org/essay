'use strict';

const BaseController = require('../core/base');
class UserController extends BaseController {
  async save() {
    const { post } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await post.save(body);

  }

  async login() {
    // const { post } = this.ctx.service;
    // this.ctx.app.locals.menus = menus;
    // await this.ctx.redirect('/admin/dashboard');
  }

  async loginTmp() {
    const { post } = this.ctx.service;
    const params = this.ctx.params;
    const result = await post.remove(params.id);
  }
}

module.exports = UserController;
