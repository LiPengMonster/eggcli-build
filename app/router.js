'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;

  router.get('/', controller.index.index);
  router.get('/login', controller.login.find);
  router.resources('users', '/users', controller.users);
  router.resources('posts', '/posts', controller.posts);
};
