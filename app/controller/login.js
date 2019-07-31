/* eslint-disable */
'use strict';

const Controller = require('egg').Controller;


class LoginController extends Controller {

  //登录
  async login() {
    const ctx = this.ctx;
    const {
      code,
      msg,
      token,
      data,
    } = await ctx.service.login.login();

    if (code === 210) {
      ctx.status = 210;
      const res = {
        code,
        msg,
        token,
        data,
      }
      ctx.helper.success(ctx, res)
    } else {
      const res = {
        code,
        msg,
        token,
        status: code,
      }
      ctx.helper.fail(ctx, res)
    }
  }

  // 返回状态,repeat.用户名重复,success.注册成功，fails.注册失败
  async register() {
    const ctx = this.ctx;
    const {
      code,
      msg
    } = await ctx.service.login.register();
    if (code === 216) {
      ctx.status = 216;
      const res = {
        code,
        msg
      }
      ctx.helper.success(ctx, res)
    } else {
      const res = {
        code,
        msg,
        status: code,
      }
      ctx.helper.fail(ctx, res)
    }
  }
}

module.exports = LoginController;