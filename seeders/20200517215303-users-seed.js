'use strict';
const bcrypt = require('bcrypt-nodejs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: "Daniel",
      lastName: "Silva",
      admin: 1,
      username: "daniel.silva",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(8), null),
      email: "danieldts2013@gmail.com",
      active: 1,
      role: 'desenvolvedor'
    }])
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
