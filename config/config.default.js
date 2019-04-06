/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  //  config.baseDir = appInfo.baseDir;
  config.view = {
    // 如果还有其他模板引擎，需要合并多个目录
    root: path.join(appInfo.baseDir, 'app/public'),
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552405209915_659';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'rm-bp12ho57bx75k76ryco.mysql.rds.aliyuncs.com',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '!QAZ2wsx',
      // 数据库名
      database: 'monster_db',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.sequelize = {
    // 类型
    dialect: 'mysql',
    // 主机，域名
    host: 'rm-bp12ho57bx75k76ryco.mysql.rds.aliyuncs.com',
    // 端口
    port: 3306,
    // 用户名
    user: 'root',
    // 密码
    password: '!QAZ2wsx',
    // 数据库
    database: 'monster_db',
  };
  return {
    ...config,
    ...userConfig,
  };
};
