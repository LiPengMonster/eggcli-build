'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.toInt(ctx.query.limit),
      offset: ctx.helper.toInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.menu.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.menu.find(ctx.helper.toInt(ctx.params.id));
  }
}

module.exports = MenuController;
