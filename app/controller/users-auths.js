'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UsersAuthsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.usersAuths.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.usersAuths.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const {
      users_id,
      identity_type,
      identifier,
      credential,
    } = ctx.request.body;
    const usersauths = await ctx.service.usersAuths.create({
      users_id,
      identity_type,
      identifier,
      credential,
    });
    ctx.status = 201;
    ctx.body = usersauths;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const usersauths = await ctx.service.usersAuths.findById(id);
    if (!usersauths) {
      ctx.status = 404;
      return;
    }

    const {
      users_id,
      identity_type,
      identifier,
      credential,
    } = ctx.request.body;
    await usersauths.update({
      users_id,
      identity_type,
      identifier,
      credential,
    });
    ctx.body = usersauths;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const usersauths = await ctx.service.usersAuths.findById(id);
    if (!usersauths) {
      ctx.status = 404;
      return;
    }

    await usersauths.destroy();
    ctx.status = 200;
  }
}

module.exports = UsersAuthsController;
