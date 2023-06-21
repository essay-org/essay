'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.post.home);
  // 编辑页
  router.get('/editor', controller.post.editor);
  // 详情页
  router.get('/post', controller.post.view);
  router.get('/api/post', controller.post.find);
  router.post('/api/post', controller.post.save);
  router.put('/api/post', controller.post.save);
  router.delete('/api/post/:id', controller.post.remove);
  // user
  router.post('/user', controller.user.save);
  router.get('/user', controller.user.find);
  router.put('/api/user', controller.user.save);
  router.get('/login', controller.user.loginTmp);
  router.post('/api/login', controller.user.login);
  // upload
  router.post('/api/upload', controller.post.upload);
  router.get('*', controller.post.not);
};
