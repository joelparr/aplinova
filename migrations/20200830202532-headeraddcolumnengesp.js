'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.addColumn('Headers', 'tituloEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Headers', 'descricaoEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Headers', 'tituloEsp', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Headers', 'descricaoEsp', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.removeColumn('Headers', 'tituloEng', {transaction: t}),
        queryInterface.removeColumn('Headers', 'descricaoEng', {transaction: t}),
        queryInterface.removeColumn('Headers', 'tituloEsp', {transaction: t}),
        queryInterface.removeColumn('Headers', 'descricaoEsp', {transaction: t})
      ])
    })
  }
};
