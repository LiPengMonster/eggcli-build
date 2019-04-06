'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg

  // egg内置静态资源服务插件
  static: {
    enable: true, // 启动
    package: 'egg-static',
  },
  security: {
    enable: false,
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  mysql: {
    enable: false,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
