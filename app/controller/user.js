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
      const initUser = await user.save(body);
      const initPost = await post.save({
        title: '欢迎使用Essay博客系统',
        content: '欢迎使用Essay博客系统，开启你的创作之旅吧~',
        status: 'pushed',
      });
      if (initUser && initPost) {
        await this.ctx.service.user.install();
        this.success('安装完成');
      } else {
        this.fail('安装失败');
      }
    }
  }
  async login() {
    const { user } = this.ctx.service;
    const body = this.ctx.request.body;
    const admin = await user.login(body);

    if (admin) {
      const token = this.ctx.service.user.sign({
        id: admin.id,
        email: admin.email,
      });
      // 用于get请求验证
      this.ctx.cookies.set('Token', token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      // 用于api请求验证
      this.success(token);
    } else {
      this.fail();
    }
  }

  async find() {
    const { user } = this.ctx.service;
    const data = await user.find();
    this.success(data);
  }
  async loginTmp() {
    const { option, user } = this.ctx.service;
    const { menus, seo, site } = await option.siteInfo();
    const loginStatus = user.loginStatus();
    await this.ctx.render('/theme/layout.ejs', {
      router: 'login',
      menus,
      seo,
      site,
      loginStatus,
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
