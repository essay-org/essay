'use strict';

const BaseController = require('../core/base');
class UserController extends BaseController {
  async save() {
    const { user } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await user.save(body);
    this.success(result);
  }
  async init() {
    const isInstall = await this.ctx.service.user.checkInstall();
    if (isInstall) {
      this.fail('非法操作');
    } else {
      // 初始化管理员和文章
      const { user, post } = this.ctx.service;
      const body = this.ctx.request.body;
      await this.ctx.service.user.install();
      await user.save(body);
      await post.save({
        title: '欢迎使用Essay博客系统',
        content: '欢迎使用Essay博客系统，开启你的创作之旅吧~',
        status: 'pushed',
      });
      this.success('ok');
    }
  }
  async login() {
    const { user } = this.ctx.service;
    const body = this.ctx.request.body;
    const admin = user.login(body);
    if (admin) {
      this.success();
    } else {
      this.fail();
    }
    // this.ctx.app.locals.menus = menus;
    // await this.ctx.redirect('/admin/dashboard');
  }

  async find() {
    const { user } = this.ctx.service;
    const data = await user.find();
    this.success(data);
  }
  async loginTmp() {
    const { post } = this.ctx.service;
    const menus = await post.find({ isShow: true });
    await this.ctx.render('/theme/layout.ejs', {
      router: 'login',
      menus,
    });
  }
  async captcha() {
    const { user } = this.ctx.service;
    const { data, text } = await user.initCaptcha();
    this.ctx.session.captcha = text;
    // svg data
    this.success(data);
  }
  async install() {
    const isInstall = await this.ctx.service.user.checkInstall();
    if (isInstall) {
      await this.ctx.redirect('/');
    } else {
      await this.ctx.render('/install.ejs');
    }
  }
}

module.exports = UserController;
