'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // async find(uid) {
  //   const user = await this.ctx.db.query('select * from user where uid =？', uid);
  //   return user;
  // }

  async find() {
    const { ctx } = this;

    const user = await { id: 1, name: 2 };
    ctx.body = user;
    return ctx.body;
  }
}

module.exports = LoginController;
