'use strict';
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

module.exports = {
  /**
   * 调用正常情况的返回数据封装
   * @param {Object} ctx - context
   * @param {*} res  - res
   */
  success(ctx, {
    code,
    msg,
    data,
    token,
  }) {

    switch (ctx.status) {
      case 215: { // 判断是否刷新token
        // 获取token
        const oldtoken = ctx.request.header.authorization;
        if (oldtoken) { // 验证旧token是否为空
          const {
            username,
          } = jwt.decode(oldtoken);
          const newtoken = jwt.sign({
            username,
          }, 'monster', { // 密钥
            expiresIn: 2, // 过期时间
          });

          this.app.redis.set(username, newtoken); // 保存token到redis
          ctx.body = {
            code,
            msg,
            data,
            token: newtoken,
          };
        }
      }
        break;
      case 210: // 登陆成功
        ctx.body = {
          code,
          msg,
          data,
          token,
        };
        ctx.status = 210;
        break;
      default: // 请求成功
        ctx.body = {
          code,
          msg,
          data,
        };
        ctx.status = 200;
    }
  },

  /**
   * 处理失败，处理传入的失败原因
   * @param {*} ctx - context
   * @param {Object} res - 返回的状态数据
   */
  fail(ctx, {
    code,
    msg,
    data,
    status,
  }) {
    ctx.body = {
      code,
      msg,
      data,
    };
    ctx.msg = '999999';
    ctx.status = status;

  },
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
