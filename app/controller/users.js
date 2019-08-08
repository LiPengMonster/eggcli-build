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
    ctx.body = await ctx.service.users.list(query);
  }

  async updateAvatar() { // 获取用户id,图片资源,此处读取stream

    const ctx = this.ctx;
    ctx.body = await ctx.service.users.updateAvatar();
  }
  async uploadfile() { // 获取用户id,图片资源,此处读取stream

    const ctx = this.ctx;
    ctx.body = await ctx.service.users.uploadfile();
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.users.find(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    const {
      nickname,
      sex,
      phone,
      avatar,
      email,
      birthday,
      province,
      city,
      region,
      status,
    } = ctx.request.body;
    const users = await ctx.service.users.create({
      nickname,
      sex,
      phone,
      avatar,
      email,
      birthday,
      province,
      city,
      region,
      status,
    });
    ctx.body = users;
  }

  // update one
  async update() {
    const id = this.ctx.params.id;
    const updates = this.ctx.request.body;
    const users = await this.ctx.service.users.update({
      id,
      updates,
    });
    if (!users) {
      this.ctx.throw(404, 'users not found');
    }
    this.ctx.body = users;
  }

  async edit() {
    console.log(this.ctx.params.id);
    console.log(this.ctx.query);
    this.ctx.body = 'asdf';
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const users = await ctx.service.users.findById(id);
    if (!users) {
      ctx.status = 404;
      return;
    }

    await users.destroy();
    ctx.status = 200;
  }
}

module.exports = UsersController;
