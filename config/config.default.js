/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const _ = require('lodash');
const {
  NOT_AUTH,
} = require('../app/utils/const-base.js');


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
  config.middleware = [ 'midHttp' ];
  config.midHttp = {
    enable: true,
    match(ctx) {

      for (const item of ctx.app.router.stack) {
        // console.log(ctx.path);
        if ((ctx.path === item.path || _.startsWith(ctx.path, item.path + '/')) && !NOT_AUTH.find( // 路由中存在访问路径并且常量路由集合不等于访问路径进入中间件
          p =>
            p === ctx.path

        )) {
          return true;
        }
      }
      return false;
    },
  };
  config.redis = {
    // your redis configurations
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };
  config.session = {
    // your redis configurations
    // maxAge: 24 * 3600 * 1000, // ms
    // key: 'EGG_SESS',
    // httpOnly: true,
    // encrypt: true,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // csrf
  config.security = {
    csrf: false,
    // debug: 'csrf-disable',
    // domainWhiteList: [ 'http://localhost:8089' ],
    // methodnoallow: {
    //   enable: false,
    // },
  };
  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };
  config.static = {
    prefix: '/',
    dir: [ path.join(appInfo.baseDir, 'app/public'), path.join(appInfo.baseDir, 'app/static') ],
  };
  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
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
    Sequelize: require('sequelize'),
  };
  return {
    ...config,
    ...userConfig,
  };
};
