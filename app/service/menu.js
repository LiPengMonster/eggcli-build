'use strict';

const Service = require('egg').Service;

class Menu extends Service {
  async list({
    offset = 0,
    limit = 10,
    id,
  }) {
    const options = {
      offset,
      limit,
      order: [
        [ 'created_at', 'asc' ],
        [ 'id', 'asc' ],
      ],
    };
    if (id) {
      options.where = {
        id,
      };
    }
    return this.ctx.model.Menu.findAndCountAll(options);
  }

  async find(id) {
    const menu = await this.ctx.model.Menu.findById(id, {
      include: [{
        model: this.ctx.model.Menu,
        as: 'menu',
      }],
    });
    if (!menu) {
      this.ctx.throw(404, 'menu not found');
    }
    return menu;
  }
}

module.exports = Menu;
