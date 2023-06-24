'use strict';

// const isInstall = require('./middleware/isInstall');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { auth, isInstall } = middleware;
  // 首页
  router.get('/', controller.post.list);
  router.get('/search', controller.post.list);
  router.get('/draft', auth(true), controller.post.draft);
  // 编辑器
  router.get('/editor', auth(true), controller.post.editor);
  // 文章详情页
  router.get('/post', controller.post.view);
  // 获取文章
  router.get('/api/post', auth(), controller.post.find);
  // 添加文章
  router.post('/api/post', auth(), controller.post.save);
  // 修改文章
  // router.put('/api/post', controller.post.save);
  // 删除文章
  router.delete('/api/post/:id', auth(), controller.post.remove);
  // 系统安装
  router.get('/install', controller.user.install);
  // 登录模板
  router.get('/login', controller.user.loginTmp);
  // 登录验证码
  router.get('/api/captcha', controller.user.captcha);
  // 获取管理员信息
  router.get('/api/user', auth(), controller.user.find);
  // 修改管理员信息
  router.put('/api/user', auth(), controller.user.save);
  // 管理员登录
  router.post('/api/login', controller.user.login);
  // 初始化管理员
  router.post('/api/user', controller.user.init);
  // 设置
  router.get('/setting', auth(true), controller.option.setting);
  // 修改或新增seo
  router.post('/api/seo', auth(), controller.option.saveSeo);
  router.get('/api/seo', auth(), controller.option.findSeo);

  // 资源上传
  router.post('/api/upload', auth(), controller.post.upload);
  // version
  router.get('/api/version', controller.option.version);
  // 数据同步
  router.get('/api/cnblogs', controller.post.cnblogsSync);
  // 其他
  router.get('*', controller.post.not);
};
