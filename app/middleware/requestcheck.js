'use strict';
// const fs = require('fs');
// const path = require('path');
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

module.exports = (options, app) => {
  return async function requestcheck(ctx, next) {
    console.log('123123');
    const token = ctx.request.header.authorization; // 获取token
    console.log('加载token');
    console.log(token);
    console.log(ctx.status);

    if (token && token !== 'undefined') { // 验证token是否为空

      const result = verifyToken(token); // 解密token
      const {
        username,
      } = result.decode;
      console.log(999999);
      console.log(result);
      switch (result.res) {
        case 'expired': // 当前时间超过过期时间5分钟登录失效
          {
            const res = {
              code: 462,
              msg: '您的登录过期,请重新登录',
              status: 462,
            };
            ctx.helper.fail(ctx, res);
          }
          break;
        case 'newtoken': // 当前时间超过过期时间小于5分钟重新生成token
          ctx.status = 215;
          await next();
          break;
        case 'wrong': // 发生校验错误
          {
            const res = {
              code: 463,
              msg: '您的账号存在风险',
              status: 463,
            };
            ctx.helper.fail(ctx, res);
          }
          break;
        default: // 校验成功
        {
          const redis_token = await app.redis.get(username); // 获取redis中的token
          if (token === redis_token) { // 验证是否为最新的token
            await next();
          } else { // 如果不是最新token，则代表用户在另一个机器上进行操作，需要用户重新登录保存最新token
            const res = {
              code: 464,
              msg: '您的账号已在其他机器保持登录，如果继续将清除其他机器的登录状态',
              status: 464,
            };
            ctx.helper.fail(ctx, res);
          }
        }
      }

    } else {
      const res = { // 如果token为空，则代表客户没有登录
        code: 465,
        msg: '您还没有登录，请登陆后再进行操作',
        status: 405,
      };
      ctx.helper.fail(ctx, res);
    }
  };
};

// 解密，验证
function verifyToken(token) {
  // console.log('来了');
  console.log(token);
  let res;
  const decode = jwt.decode(token);
  const {
    exp,
  } = decode;

  jwt.verify(token, 'monster', function(err, result) {
    if (err) {
      // 过期
      if (err.name === 'TokenExpiredError') {
        console.log(7777);
        // 判断过期了多久，暂定5分钟内自动生成token,超过5分钟要求客户重新登录
        const current = Math.floor(Date.now() / 1000);
        console.log(current);
        console.log(exp);
        console.log(current - exp);
        if (current - exp > 300) { // 超过5分钟登录失效
          res = 'expired';
        } else {
          res = 'newtoken'; // 小于5分钟重新生成token
        }
      } else {
        console.log(1);
        res = 'wrong'; // 校验失败
      }
    } else {
      res = result;
    }
  });
  return {
    res,
    decode,
  };
}
