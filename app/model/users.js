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
      //
      name: STRING(20),
      //
      age: INTEGER,
      //
      created_at: DATE,
      //
      updated_at: DATE,

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

  return UsersDo;
};
