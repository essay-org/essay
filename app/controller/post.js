'use strict';
const {
  default: CherryEngine,
} = require('cherry-markdown/dist/cherry-markdown.engine.core.common');
const cherryEngineInstance = new CherryEngine();
const fs = require('fs');
const BaseController = require('../core/base');
class UserController extends BaseController {
  async list() {
    const query = this.ctx.query;
    const { post, option, user } = this.ctx.service;
    const loginStatus = user.loginStatus();
    let data = [];
    let total = 0;
    if (query.keywords) {
      query.keywords = decodeURIComponent(query.keywords);
      data = await post.find({
        content: { $like: `%${query.keywords}%` },
        status: 'pushed',
      });
    } else {
      total = await post.totalCount({
        status: 'pushed',
      });
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
      loginStatus,
      router: 'list',
    });
  }
  async draft() {
    const { post, option, user } = this.ctx.service;
    const query = this.ctx.query;
    const { menus, seo, site } = await option.siteInfo();
    const loginStatus = user.loginStatus();
    const data = await post.findByPage({
      ...query,
      status: 'draft',
    });
    const total = await post.totalCount({
      status: 'draft',
    });
    await this.ctx.render('/theme/layout.ejs', {
      data,
      menus,
      seo,
      site,
      total,
      loginStatus,
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
    const { post, option, user } = this.ctx.service;
    const data = await post.find({ id });
    const { menus, seo, site } = await option.siteInfo();
    const loginStatus = user.loginStatus();
    if (id && data) {
      if (data.status === 'draft' && loginStatus.status !== 1) {
        return this.not();
      }
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
        loginStatus,
      });
    } else {
      await this.not();
    }
  }
  async find() {
    const { id = '' } = this.ctx.query;
    const { post } = this.ctx.service;
    const data = await post.find({ id });
    if (!data) { return this.fail('获取失败'); }
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
  async cnblogsSync() {
    const hasFile = await fs.statSync(this.ctx.app.baseDir + '/posts.json', {
      throwIfNoEntry: false,
    });
    if (hasFile) {
      let posts = fs.readFileSync(this.ctx.app.baseDir + '/posts.json', 'utf8');
      posts = JSON.parse(posts);
      for (let index = 0; index <= posts.length; index++) {
        const element = posts[index];
        const newArt = {};
        newArt.title = element.Title;
        newArt.createdAt = element.DateAdded;
        newArt.updatedAt = element.DateUpdated;
        if (element.PostType === 'BlogPost') {
          newArt.status = 'pushed';
        } else {
          newArt.status = 'draft';
        }

        if (element.IsMarkdown) {
          newArt.content = `#${element.Title}\n\n${element.Body}`;
        } else {
          newArt.content = `#${element.Title}\n\n${cherryEngineInstance.makeMarkdown(element.Body)}`;
        }
        const { post } = this.ctx.service;
        try {
          await post.save(newArt);
          console.log('ok');

        } catch (error) {
          console.log('err', element.id);
          continue;
        }

      }
      this.success('数据同步完成');
    } else {
      this.fail('文件不存在');
    }
  }
}

module.exports = UserController;
