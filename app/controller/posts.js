'use strict';

const Controller = require('egg').Controller;

class PostsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.posts.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.posts.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const posts = await ctx.service.posts.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = posts;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.body = await ctx.service.post.update({
      id,
      users_id: ctx.request.body.users_id,
      updates,
    });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const users_id = ctx.helper.parseInt(ctx.request.body.users_id);
    await ctx.service.posts.destroy({
      id,
      users_id,
    });
    ctx.status = 200;
  }
}

module.exports = PostsController;
