'use strict';

// const isInstall = require('./middleware/isInstall');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const isInstall = middleware.isInstall();
  // 首页
  router.get('/', controller.post.home);
  // 编辑器
  router.get('/editor', controller.post.editor);
  // 文章详情页
  router.get('/post', controller.post.view);
  // 获取文章
  router.get('/api/post', controller.post.find);
  // 添加文章
  router.post('/api/post', controller.post.save);
  // 修改文章
  // router.put('/api/post', controller.post.save);
  // 删除文章
  router.delete('/api/post/:id', controller.post.remove);
  // 系统安装
  router.get('/install', controller.user.install);
  // 登录模板
  router.get('/login', controller.user.loginTmp);
  // 登录验证码
  router.get('/api/captcha', controller.user.captcha);
  // 获取管理员信息
  router.get('/api/user', controller.user.find);
  // 修改管理员信息
  router.put('/api/user', controller.user.save);
  // 管理员登录
  router.post('/api/login', controller.user.login);
  // 初始化管理员
  router.post('/api/user', controller.user.init);
  // 设置
  router.get('/setting', controller.option.setting);
  // 修改或新增seo
  router.post('/api/seo', controller.option.saveSeo);
  router.get('/api/seo', controller.option.findSeo);

  // 资源上传
  router.post('/api/upload', controller.post.upload);
  // 其他
  router.get('*', controller.post.not);
};
