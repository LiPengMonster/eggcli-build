/* eslint-disable */
'use strict';

const Controller = require('egg').Controller;


class LoginController extends Controller {

  //登录
  async login() {
    this.ctx.body = await this.ctx.service.login.login();
  }

  // 返回状态,repeat.用户名重复,success.注册成功，fails.注册失败
  async register() {
    this.ctx.body = await this.ctx.service.login.register();
  }
}

module.exports = LoginController;