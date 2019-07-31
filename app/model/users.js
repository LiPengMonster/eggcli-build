'use strict';
const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const flakeIdGen = new FlakeId({
  epoch: 1300000000000,
});

module.exports = app => {
  const {
    BIGINT,
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const UsersDo = app.model.define(
    'users', {
      id: {
        type: BIGINT,
        primaryKey: true,
        defaultValue: () => intformat(flakeIdGen.next(), 'dec'),
      },
      // 用户名
      nickname: STRING(30),
      // 性别
      sex: INTEGER,
      // 电话
      phone: STRING(30),
      // 头像图片名称
      avatar: STRING(255),
      // 默认邮箱
      email: STRING(255),
      // 出生日期
      birthday: DATE,
      // 省
      province: INTEGER,
      // 市
      city: INTEGER,
      // 区
      region: INTEGER,
      // 是否有效
      status: INTEGER,
      //
      createdAt: DATE,
      //
      updatedAt: DATE,

    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: 'users',
      underscored: true,
      paranoid: false,
      // createdAt: '',
      // updatedAt: '',
      // deletedAt: '',
    }
  );
  UsersDo.associate = function() {
    app.model.Users.hasOne(app.model.UsersAuths, {
      foreignKey: 'usersId',
    });
  };
  return UsersDo;
};
