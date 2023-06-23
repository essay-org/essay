'use strict';
const {
  default: CherryEngine,
} = require('cherry-markdown/dist/cherry-markdown.engine.core.common');
const cherryEngineInstance = new CherryEngine();

const BaseController = require('../core/base');
class UserController extends BaseController {
  async list() {
    const query = this.ctx.query;
    const { post, option } = this.ctx.service;
    let data = [];
    let total = 0;
    if (query.keywords) {
      query.keywords = decodeURIComponent(query.keywords);
      data = await post.find({
        content: { $like: `%${query.keywords}%` },
        status: 'pushed',
      });
    } else {
      total = await post.totalCount();
      data = await post.findByPage({
        ...query,
        status: 'pushed',
      });
    }
    const { menus, seo, site } = await option.siteInfo();
    // console.log(menus, seo, site);
    await this.ctx.render('/theme/layout.ejs', {
      data,
      menus,
      seo,
      site,
      total,
      router: 'list',
    });
  }
  async draft() {
    const { post, option } = this.ctx.service;
    const { menus, seo, site } = await option.siteInfo();
    const data = await post.find({
      status: 'draft',
    });
    await this.ctx.render('/theme/layout.ejs', {
      data,
      menus,
      seo,
      site,
      router: 'list',
    });
  }

  async save() {
    const { post } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await post.save(body);
    if (result) {
      this.success(result);
    } else {
      this.fail(result);
    }
  }

  // 详情
  async view() {
    const { id = '' } = this.ctx.query;
    const { post, option } = this.ctx.service;
    const data = await post.find({ id });
    const { menus, seo, site } = await option.siteInfo();
    if (id && data) {
      // 上一篇 下一篇
      const pre = await post.pre({ createdAt: data.createdAt });
      const next = await post.next({ createdAt: data.createdAt });
      data.content = cherryEngineInstance.makeHtml(data.content);
      await post.save({ id, view: data.view + 1, ...data });
      await this.ctx.render('/theme/layout.ejs', {
        data,
        router: 'post',
        menus,
        seo,
        site,
        pre,
        next,
      });
    } else {
      await this.not();
    }
  }
  async find() {
    const { id = '' } = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find({ id });
    this.success(data);
  }
  async editor() {
    await this.ctx.render('/theme/editor.ejs');
  }
  async remove() {
    const { post } = this.ctx.service;
    const params = this.ctx.params;
    const result = await post.remove(params.id);
    this.success(result);
  }

  async not() {
    await this.ctx.render('/theme/404.ejs');
  }
  async upload() {
    const data = await this.ctx.service.post.upload(true);
    this.success(data);
  }
}

module.exports = UserController;
