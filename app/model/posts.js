'use strict';
const FlakeId = require('flake-idgen');
const intformat = require('biguint-format');
const flakeIdGen = new FlakeId({
  epoch: 1300000000000,
});

module.exports = app => {
  const {
    BIGINT,
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const PostsDo = app.model.define(
    'posts', {
      id: {
        type: BIGINT,
        primaryKey: true,
        defaultValue: () => intformat(flakeIdGen.next(), 'dec'),
      },
      //
      usersid: INTEGER,
      //
      title: STRING(30),
      //
      content: STRING(255),
      //
      created_at: DATE,
      //
      updated_at: DATE,

    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: 'posts',
      underscored: true,
      paranoid: false,
      // createdAt: '',
      // updatedAt: '',
      // deletedAt: '',
    }
  );

  return PostsDo;
};
