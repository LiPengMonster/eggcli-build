'use strict';

const Service = require('egg').Service;

class Users extends Service {
  // query list
  async list({
    offset = 0,
    limit = 10,
  }) {
    return this.ctx.model.users.findAndCountAll({
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
    const users = await this.ctx.model.Users.findById(id);
    if (!users) {
      this.ctx.throw(404, 'user not found');
    }
    return users;
  }
  // insert one
  async create(users) {
    return this.ctx.model.Users.create(users);
  }
  // update one
  async update({
    id,
    updates,
  }) {
    const users = await this.ctx.model.Users.findById(id);
    if (!users) {
      this.ctx.throw(404, 'users not found');
    }
    return users.update(updates);
  }
  // delete one
  async del(id) {
    const users = await this.ctx.model.Users.findById(id);
    if (!users) {
      this.ctx.throw(404, 'users not found');
    }
    return users.destroy();
  }
}
module.exports = Users;
