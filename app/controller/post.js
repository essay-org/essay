'use strict';

const BaseController = require('../core/base');
class UserController extends BaseController {
  async save() {
    const { post } = this.ctx.service;
    const body = this.ctx.request.body;
    const result = await post.save(body);

  }
  async list() {
    const query = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find(query);
    
  }

  async one() {
    // const { post } = this.ctx.service;
    // this.ctx.app.locals.menus = menus;
    // await this.ctx.redirect('/admin/dashboard');
  }

  async remove() {
    const { post } = this.ctx.service;
    const params = this.ctx.params;
    const result = await post.remove(params.id);
  }

  async not() {
   
  }
}

module.exports = UserController;
