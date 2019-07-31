'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const random = require('string-random');//该算法内置salt生成算法，无需加盐
module.exports = app => {
  return class Login extends Service {
    /**
     * 登录
     */
    async login() {
      const ctx = this.ctx; // 获取用户名，密码，分析类型，邮箱，手机，其中手机暂不考虑
      const {
        username,
        userpass,
        identity_type,
      } = ctx.request.body;
      const usersauths = await ctx.model.UsersAuths.findOne({ // 查询数据库中是否含有该用户，由于存在中间件判断token所以无需这里判断token
        where: {
          identifier: username,
          identity_type,
        },
      });
      if (!usersauths) {
        return {
          code: 461,
          msg: '该账户不存在',
        };
      }
      // 验签
      const saltRounds = 10;
      console.log(userpass);
      const hash = bcrypt.hashSync(userpass, saltRounds);
      console.log(hash);

      const rst = bcrypt.compareSync(userpass, usersauths.credential);
      // console.log(rst);
      if (!rst) {
        return {
          code: 462,
          msg: '密码不正确',
        };
      }
      const token = jwt.sign({ // 验签成功，生成token并保存到redis
        id: usersauths.id,
        username,
      }, 'monster', { // 密钥
        expiresIn: 300, // 过期时间
      });
      await app.redis.set(username, token); // 保存token到redis

      // 查询当前用户信息
      console.log(usersauths.users_id);
      const user = await ctx.model.Users.findOne({
        where: {
          id: usersauths.users_id,
        },
      }); // 查询数据库中是否含有该用户，由于存在中间件判断token所以无需这里判断token
      console.log(user);
      // 获取菜单数据
      // const offset = 0,
      //   limit = 0;
      const menu = await ctx.model.Menu.findAll();
      console.log('menu', menu);
      return await {
        code: 210,
        msg: '登录成功',
        token,
        data: {
          user,
          menu,
        },
      };
    }

    /**
     * 注册
     **/
    async register() {

      const ctx = this.ctx;
      const {
        username, // 用户名
        password, // 密码
        identitytype, // 用户名数据类型，默认account
      } = ctx.request.body;

      let t;
      try {
        t = await ctx.model.transaction({
          isolationLevel: 'SERIALIZABLE',
        });
        console.log(t);
        const hasmodel = await ctx.model.UsersAuths.findOne({
          where: {
            identifier: username,
            identity_type: identitytype,
          },
        }, {
          transaction: t,
        });
        if (hasmodel) { // 查询判断是否存在相同账户名称
          await t.rollback();
          return {
            code: 466,
            msg: '该用户名重复',
          };
        }
        const users = await ctx.model.Users.create({
          nickname: username,
        }, {
          transaction: t,
        });
        if (!users) {
          await t.rollback();
          return {
            code: 467,
            msg: '用户主表添加失败',
          };
        }
        const saltRounds = 10; // 加密，采用bcrypt加密算法，不可逆,单向hash,由于该算法内置22位字符长度salt生成方法，所以不需要自己加
        // 该算法为cpu密集型，建议使用异步方式，此处我们采用的同步方式
        const hash = bcrypt.hashSync(password, saltRounds); // saltRounds为正数，代表hash杂凑次数，数值越高越安全，默认10次
        console.log(hash);
        await ctx.model.UsersAuths.create({ // 添加子集数据
          users_id: users.id,
          identityType: identitytype,
          identifier: username,
          credential: hash,
        }, {
          transaction: t,
        });

        await t.commit();

        return {
          code: 216,
          msg: '注册成功',
        };
      } catch (e) {
        await t.rollback();
        return {
          code: 468,
          msg: '注册失败',
        };
      }
    }
  };
};
