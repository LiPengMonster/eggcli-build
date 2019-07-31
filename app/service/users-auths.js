'use strict';

const Service = require('egg').Service;

class UsersAuths extends Service {

  // query list
  async list({
    offset = 0,
    limit = 10,
  }) {
    return this.ctx.model.UsersAuths.findAndCountAll({
      offset,
      limit,
      order: [
        [ 'created_at', 'desc' ],
        [ 'id', 'desc' ],
      ],
    });
  }
  // query one by id
  async find(id) {
    const usersauths = await this.ctx.model.UsersAuths.findById(id);
    if (!usersauths) {
      this.ctx.throw(404, 'user not found');
    }
    return usersauths;
  }
  // query one by params
  async findOne(params) {
    const usersauths = await this.ctx.model.UsersAuths.findOne(params);
    if (!usersauths) {
      this.ctx.throw(404, 'user not found');
    }
    return usersauths;
  }
  // insert one
  async create(usersauths) {
    return this.ctx.model.UsersAuths.create(usersauths);
  }
  // update one
  async update({
    id,
    updates,
  }) {
    const usersauths = await this.ctx.model.UsersAuths.findById(id);
    if (!usersauths) {
      this.ctx.throw(404, 'users not found');
    }
    return usersauths.update(updates);
  }
  // delete one
  async del(id) {
    const usersauths = await this.ctx.model.UsersAuths.findById(id);
    if (!usersauths) {
      this.ctx.throw(404, 'users not found');
    }
    return usersauths.destroy();
  }
}
module.exports = UsersAuths;
