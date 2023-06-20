'use strict';
const { default: CherryEngine } = require('cherry-markdown/dist/cherry-markdown.engine.core.common');
const cherryEngineInstance = new CherryEngine();
const htmlContent = cherryEngineInstance.makeHtml('# welcome to cherry editor!');

const BaseController = require('../core/base');
class UserController extends BaseController {

  async home() {
    const query = this.ctx.query;
    const { post } = this.ctx.service;
    // const data = await post.find(query);
    await this.ctx.render('/theme/layout.ejs', { data: htmlContent });
  }
  async save() {
    const { post } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await post.save(body);
    this.success(result);
  }

  async find() {
    const query = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find(query);
    this.success(data);
    // await this.ctx.redirect('/admin/dashboard');
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

  }
}

module.exports = UserController;
