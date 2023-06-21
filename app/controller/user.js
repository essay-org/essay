'use strict';

const BaseController = require('../core/base');
class UserController extends BaseController {
  async save() {
    const { user } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await user.save(body);
    this.success(result);
  }

  async login() {
    // const { user } = this.ctx.service;
    // this.ctx.app.locals.menus = menus;
    // await this.ctx.redirect('/admin/dashboard');
  }

  async find() {
    const { user } = this.ctx.service;
    const data = await user.find();
    this.success(data);
  }
  async loginTmp() {
    await this.ctx.render('/theme/login.ejs');
  }
}

module.exports = UserController;
