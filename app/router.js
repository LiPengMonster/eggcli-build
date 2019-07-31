'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
console.log(1);
module.exports = app => {
  const {
    router,
    controller,
  } = app;

  router.get('/', controller.index.index);
  router.post('/login', controller.login.login); // 登录
  router.post('/register', controller.login.register); // 注册
  router.post('/updateAvatar', controller.users.updateAvatar);
  router.post('/uploadfile', controller.users.uploadfile);
  router.resources('menu', '/menu', controller.menu);
  router.resources('syscity', '/syscity', controller.sysCity);
  router.resources('users', '/users', controller.users);
  router.resources('posts', '/posts', controller.posts);
  router.resources('posts', '/usersAuths', controller.usersAuths);
  router.get('*', controller.index.index);
};
console.log(6);
