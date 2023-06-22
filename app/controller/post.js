'use strict';
const { default: CherryEngine } = require('cherry-markdown/dist/cherry-markdown.engine.core.common');
const cherryEngineInstance = new CherryEngine();

const BaseController = require('../core/base');
class UserController extends BaseController {

  async list() {
    const query = this.ctx.query;
    const { post } = this.ctx.service;
    let data = [];
    if (query.keywords) {
      query.keywords = decodeURIComponent(query.keywords);
      data = await post.find({ content: { $like: `%${query.keywords}%` } });
    } else {
      data = await post.find(query);
    }
    const menus = await post.find({ isShow: true });
    await this.ctx.render('/theme/layout.ejs', {
      data,
      menus,
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
    const { post } = this.ctx.service;
    const data = await post.find({ id });
    const menus = await post.find({ isShow: true });
    if (id && data) {
      data.content = cherryEngineInstance.makeHtml(data.content);
      await post.save({ id, view: data.view + 1, ...data });
      await this.ctx.render('/theme/layout.ejs', { data, router: 'post', menus });
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
