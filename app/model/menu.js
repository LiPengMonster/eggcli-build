'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const MenuDo = app.model.define(
    'menu', {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      //
      menu: STRING(255),
      //
      menucode: STRING(255),
      //
      level: INTEGER,
      //
      pid: INTEGER,
      //
      order: STRING(255),
      //
      route: STRING(255),
      //
      c: STRING(255),
      //
      d: STRING(255),
      //
      e: STRING(255),
      //
      createdAt: DATE,
      //
      updatedAt: DATE,

    }, {
      timestamps: true,
      freezeTableName: true,
      tableName: 'menu',
      underscored: true,
      paranoid: false,
      // createdAt: '',
      // updatedAt: '',
      // deletedAt: '',
    }
  );

  return MenuDo;
};
