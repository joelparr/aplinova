'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.addColumn('Produtos', 'tituloEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Produtos', 'descricaoEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Produtos', 'tituloEsp', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Produtos', 'descricaoEsp', {
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
        queryInterface.removeColumn('Produtos', 'tituloEng', {transaction: t}),
        queryInterface.removeColumn('Produtos', 'descricaoEng', {transaction: t}),
        queryInterface.removeColumn('Produtos', 'tituloEsp', {transaction: t}),
        queryInterface.removeColumn('Produtos', 'descricaoEsp', {transaction: t})
      ])
    })
  }
};
