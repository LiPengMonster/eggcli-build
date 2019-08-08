'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');

const tokenHelp = require('../utils/token-help');
// const random = require('string-random');//该算法内置salt生成算法，无需加盐
module.exports = () => {
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
      const usersAuths = await ctx.model.UsersAuths.findOne({ // 查询数据库中是否含有该用户，由于存在中间件判断token所以无需这里判断token
        where: {
          identifier: username,
          identity_type,
        },
      });

      !usersAuths && (ctx.throw(500, '该账户不存在'));

      // 验签
      const saltRounds = 10;
      bcrypt.hashSync(userpass, saltRounds);
      !bcrypt.compareSync(userpass, usersAuths.credential) && (ctx.throw(500, '密码错误'));

      const token = tokenHelp.createToken({
        id: usersAuths.id,
        username,
      });
      // await app.redis.set(token, username); // 保存token到redis

      // 查询当前用户信息
      const user = await ctx.model.Users.findOne({
        where: {
          id: usersAuths.users_id,
        },
      }); // 查询数据库中是否含有该用户，由于存在中间件判断token所以无需这里判断token

      // 获取菜单数据
      const menu = await ctx.model.Menu.findAll();

      return {
        token,
        user,
        menu,
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

        const hasmodel = await ctx.model.UsersAuths.findOne({
          where: {
            identifier: username,
            identity_type: identitytype,
          },
        }, {
          transaction: t,
        });

        // 查询判断是否存在相同账户名称
        hasmodel && (await t.rollback(), ctx.throw(500, '用户名重复'));

        const users = await ctx.model.Users.create({
          nickname: username,
        }, {
          transaction: t,
        });
        !users && (await t.rollback(), ctx.throw(500, '用户主表添加失败'));

        const saltRounds = 10; // 加密，采用bcrypt加密算法，不可逆,单向hash,由于该算法内置22位字符长度salt生成方法，所以不需要自己加
        // 该算法为cpu密集型，建议使用异步方式，此处我们采用的同步方式
        const hash = bcrypt.hashSync(password, saltRounds); // saltRounds为正数，代表hash杂凑次数，数值越高越安全，默认10次

        await ctx.model.UsersAuths.create({ // 添加子集数据
          users_id: users.id,
          identityType: identitytype,
          identifier: username,
          credential: hash,
        }, {
          transaction: t,
        });

        await t.commit();
      } catch (e) {
        ctx.throw(500, e.message);
      }
    }
  };
};
