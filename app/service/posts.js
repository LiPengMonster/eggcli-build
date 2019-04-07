'use strict';

const Service = require('egg').Service;

class Posts extends Service {
  async list({
    offset = 0,
    limit = 10,
    users_id,
  }) {
    const options = {
      offset,
      limit,
      attributes: [ 'id', 'title', 'content', 'user_id', 'created_at', 'updated_at' ],
      order: [
        [ 'created_at', 'desc' ],
        [ 'id', 'desc' ],
      ],
    };
    if (users_id) {
      options.where = {
        users_id,
      };
    }
    return this.ctx.model.Posts.findAndCountAll(options);
  }

  async find(id) {
    const posts = await this.ctx.model.Posts.findById(id, {
      include: [{
        model: this.ctx.model.Users,
        as: 'users',
        attributes: [ 'id', 'name', 'age' ],
      }],
    });
    if (!posts) {
      this.ctx.throw(404, 'posts not found');
    }
    return posts;
  }

  async create(posts) {
    return this.ctx.model.Post.create(posts);
  }

  async update({
    id,
    users_id,
    title,
    content,
    updates,
  }) {
    const posts = await this.ctx.model.Posts.findByIdWithUser(id, users_id, title, content);
    if (!posts) this.ctx.throw(404, 'posts not found');
    return posts.update(updates);
  }

  async destroy({
    id,
    users_id,
  }) {
    const posts = await this.ctx.model.Posts.findByIdWithUser(id, users_id);
    if (!posts) this.ctx.throw(404, 'posts not found');
    return posts.destroy();
  }
}

module.exports = Posts;
