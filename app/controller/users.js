'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.Users.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Users.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const {
      name,
      age,
    } = ctx.request.body;
    const users = await ctx.model.Users.create({
      name,
      age,
    });
    ctx.status = 201;
    ctx.body = users;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const users = await ctx.model.Users.findById(id);
    if (!users) {
      ctx.status = 404;
      return;
    }

    const {
      name,
      age,
    } = ctx.request.body;
    await users.update({
      name,
      age,
    });
    ctx.body = users;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const users = await ctx.model.Users.findById(id);
    if (!users) {
      ctx.status = 404;
      return;
    }

    await users.destroy();
    ctx.status = 200;
  }
}

module.exports = UsersController;
