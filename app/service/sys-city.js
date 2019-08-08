'use strict';

const Service = require('egg').Service;

class SysCity extends Service {
  async list({
    offset = 0,
    limit = 10,
    pid,
  }) {
    const options = {
      offset,
      limit,
      attributes: [ 'id', 'cname', 'pid' ],
      order: [
        [ 'searchcode' ],
      ],
    };
    if (pid >= 0) {
      options.where = {
        pid,
      };
    }
    return await this.ctx.model.SysCity.findAndCountAll(options);
  }

  async find(id) {
    const syscity = await this.ctx.model.SysCity.findByPk(id);
    !syscity && (this.ctx.throw(404, 'syscity not found'));
    return syscity;
  }
}

module.exports = SysCity;
