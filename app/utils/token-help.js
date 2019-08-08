/*
 * @Author: 李鹏
 * @Date: 2019-08-07 11:55:41
 * @Last Modified by: 李鹏
 * @Last Modified time: 2019-08-08 19:14:07
 * 常量表
 */
'use strict';
const jwt = require('jsonwebtoken'); // 引入jsonwebtoken

module.exports = {
  // 解密，验证
  verifyToken(token) {
    let state, // 校验结果:1校验成功(result),2过期，3重置token,4校验失败
      decode, // token decode
      msg;

    jwt.verify(token, 'monster', (err, result) => {
      if (err) {
        err.name !== 'TokenExpiredError' && (state = 4, msg = '您的账号存在风险'); // 其他校验错误
        err.name === 'TokenExpiredError' && (state = 2, msg = '您的登录过期,请重新登录'); // 过期
      } else {
        const {
          iat, // 开始时间戳
          exp, // 结束时间戳
        } = result;
        // 暂定（当前时间-过期时间参数起始时间）<=二分之一过期时间,则重新分配token
        const current = Math.floor(Date.now() / 1000);
        const past = current - iat; // 已经经过的时间
        const canNewToken = (exp - iat) / 2 - past; //

        canNewToken < 0 && (state = 3, decode = result, msg = '重置token'); // 规定过期时间内，重新赋值token
        canNewToken >= 0 && (state = 1, decode = result, msg = '校验成功');
      }
    });

    return {
      msg,
      state,
      decode,
    };
  },
  createToken({ // 创建token
    id,
    username,
    expiresIn = 30000, // 默认时间30000秒=500分钟=8小时
  }) {
    return jwt.sign({ // 验签成功，生成token并保存到redis
      id,
      username,
    }, 'monster', { // 密钥
      expiresIn, // 过期时间
    });

  },
};
