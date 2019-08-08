'use strict';

const Controller = require('egg').Controller;
const path = require('path');
class IndexController extends Controller {
  async index() {
    await this.ctx.render('index.html', {}, {
      templatePath: path.join(this.app.config.baseDir, 'app/public/index.html'),
      templateViewEngine: 'nunjucks',
    });
  }
}

module.exports = IndexController;
