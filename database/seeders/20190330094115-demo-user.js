'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [{
      name: 'John',
      age: 30,
    }], {});
  },

  down: queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete('users', null, {});

  },
};
