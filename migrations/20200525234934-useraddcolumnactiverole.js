'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.addColumn('Users', 'active', {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: 0
        }, {transaction: t}),
        queryInterface.addColumn('Users', 'role', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.removeColumn('Users', 'active', {transaction: t}),
        queryInterface.removeColumn('Users', 'role', {transaction: t})
      ])
    })
  }
};
