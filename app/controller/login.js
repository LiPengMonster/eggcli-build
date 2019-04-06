'use strict';

const Controller = require('egg').Controller;
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */


class LoginController extends Controller {

  //
  async find() {
    const {
      ctx,
    } = this;

    const user = await this.app.mysql.query('select * from users'); // 单实例可以直接通过 app.mysql 访问
    console.log(user);
    ctx.body = user;
    return ctx.body;
  }
}

module.exports = LoginController;
