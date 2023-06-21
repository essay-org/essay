'use strict';
const { default: CherryEngine } = require('cherry-markdown/dist/cherry-markdown.engine.core.common');
const cherryEngineInstance = new CherryEngine();

const BaseController = require('../core/base');
class UserController extends BaseController {

  async home() {
    const query = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find(query);
    await this.ctx.render('/theme/layout.ejs', {
      data,
      router: 'home',
    });
  }
  async save() {
    const { post } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await post.save(body);
    this.success(result);
  }

  async view() {
    const { id = '' } = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find({ id });

    if (id) {
      data.content = cherryEngineInstance.makeHtml(data.content);
      await this.ctx.render('/theme/layout.ejs', { data, router: 'post' });
    }
    // this.success(data);
    // await this.ctx.redirect('/admin/dashboard');
  }
  async find() {
    const { id = '' } = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find({ id });
    this.success(data);
  }
  async editor() {
    // const data = await
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
