'use strict';
const tokenHelp = require('../utils/token-help');

module.exports = () => {
  return async function midHttp(ctx, next) {

    const token = ctx.request.header.authorization; // 获取token

    !token && (ctx.throw(401, '您还没有登录，请登陆后再进行操作'));

    const result = tokenHelp.verifyToken(token); // 解密token

    // 校验结果:1校验成功(result),2过期，3重置token,4校验失败

    result.state === 4 && (ctx.throw(401, result.msg)); // 校验失败，存在风险

    result.state === 2 && (ctx.throw(401, result.msg)); // 登录过期

    // const hasToken = await ctx.app.redis.get(token); // 检查服务端是否存在token

    // !hasToken && (ctx.throw(401, '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态'));

    result.state === 3 && (await next(), ctx.response.append('token', tokenHelp.createToken({
      id: result.decode.id,
      username: result.decode.username,
    }))); // 登录过期,重置token

    result.state === 1 && (await next()); // 登录成功

  };
};
