'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.post.list);
  router.get('/post/:id', controller.post.one);
  router.post('/post/:id?', controller.post.save);
  router.post('/post-del', controller.post.remove);
  router.get('/login', controller.user.loginTmp);
  router.post('/login', controller.user.login);
  router.get('*', controller.post.not)
};
