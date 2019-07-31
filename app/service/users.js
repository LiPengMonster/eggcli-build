'use strict';
const upload = require('../utils/upload');
const {
  avatar,
} = require('../utils/const-base.js');
const Service = require('egg').Service;

class Users extends Service {

  async updateAvatar() { // 上传头像图片，需要字段,id,图片,然后随机生成名称，保存到本地,然后保存数据库
    const ctx = this.ctx; // 获取用户名，密码，分析类型，邮箱，手机，其中手机暂不考虑
    const {
      filebase64,
      filename,
    } = ctx.request.body;
    upload.uploadfile({
      encode: 'base64',
      data: filebase64,
      filename,
      basedir: ctx.app.config.baseDir,
      writepath: avatar,
    }).then(_filename => {
      console.log('_filename我是恢复文件');
      console.log(_filename);
    }).catch(error => {
      console.log('_filename我是恢复文件4234234');
      console.log(error);
    });
  }

  async uploadfile() { // 上传头像图片，需要字段,id,图片,然后随机生成名称，保存到本地,然后保存数据库
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const id = stream.fields.id;
    return upload.uploadfile({
      encode: '',
      data: stream,
      filename: stream.filename,
      basedir: ctx.app.config.baseDir,
      writepath: avatar,
    }).then(_filename => {
      // 更新图片名称
      console.log(_filename);
      const updates = {
        avatar: _filename._filename,
      };
      return ctx.service.users.update({
        id,
        updates,
      });
    }).catch(error => {
      console.log(error);
    });
  }

  async getInfo({
    username,
  }) {
    console.log(username);
    // 调用service方法
    return this.ctx.model.Users.findAll({
      where: {
        nickname: username,
      },
    });
  }
  // query list
  async list({
    offset = 0,
    limit = 10,
  }) {
    return await this.ctx.model.Users.findAndCountAll({
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
    const users = await this.ctx.model.Users.findByPk(id);
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
    const users = await this.ctx.model.Users.findByPk(id);
    if (!users) {
      this.ctx.throw(404, 'users not found');
    }
    return users.update(
      updates
    );
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
