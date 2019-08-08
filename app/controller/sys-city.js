'use strict';

const Controller = require('egg').Controller;

class SysCityController extends Controller {
  async index() {
    const ctx = this.ctx;

    const query = {
      limit: ctx.helper.toInt(ctx.query.limit),
      offset: ctx.helper.toInt(ctx.query.offset),
      pid: ctx.helper.toInt(ctx.query.pid),
    };
    ctx.body = await ctx.service.sysCity.list(query);
  }

  async show() {
    const ctx = this.ctx;

    const query = {
      limit: ctx.helper.toInt(ctx.query.limit),
      offset: ctx.helper.toInt(ctx.query.offset),
      pid: ctx.params.pid,
    };
    ctx.body = await ctx.service.sysCity.list(query);
  }

}

module.exports = SysCityController;
