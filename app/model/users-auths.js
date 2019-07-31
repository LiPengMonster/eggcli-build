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
    DATE,
  } = app.Sequelize;

  const UsersAuthsDo = app.model.define(
    'usersAuths', {
      id: {
        type: BIGINT,
        primaryKey: true,
        defaultValue: () => intformat(flakeIdGen.next(), 'dec'),
      },
      // 用户表外建
      usersId: BIGINT,
      // 账户类型：邮箱，电话，用户名，微信，QQ
      identityType: STRING(20),
      // 唯一标识码
      identifier: STRING(50),
      // 密码凭证
      credential: STRING(255),
      // 创建时间
      createdAt: DATE,
      // 修改时间
      updatedAt: DATE,

    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: 'users_auths',
      underscored: true,
      paranoid: false,
      // createdAt: '',
      // updatedAt: '',
      // deletedAt: '',
    }
  );
  UsersAuthsDo.associate = function() {
    app.model.UsersAuths.belongsTo(app.model.Users, {
      foreignKey: 'users_id',
      targetKey: 'id',
    });
  };

  return UsersAuthsDo;
};
