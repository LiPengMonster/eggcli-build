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
  } = app.Sequelize;

  const SysCityDo = app.model.define(
    'sysCity', {
      id: {
        type: BIGINT,
        primaryKey: true,
        defaultValue: () => intformat(flakeIdGen.next(), 'dec'),
      },
      // 名称
      cname: STRING(24),
      //
      pid: INTEGER,

    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: 'sys_city',
      underscored: true,
      paranoid: false,
      // createdAt: '',
      // updatedAt: '',
      // deletedAt: '',
    }
  );

  return SysCityDo;
};
