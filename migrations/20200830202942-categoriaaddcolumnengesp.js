'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.addColumn('Categoria', 'tituloEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Categoria', 'descricaoEng', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Categoria', 'tituloEsp', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          required: true
        }, {transaction: t}),
        queryInterface.addColumn('Categoria', 'descricaoEsp', {
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
        queryInterface.removeColumn('Categoria', 'tituloEng', {transaction: t}),
        queryInterface.removeColumn('Categoria', 'descricaoEng', {transaction: t}),
        queryInterface.removeColumn('Categoria', 'tituloEsp', {transaction: t}),
        queryInterface.removeColumn('Categoria', 'descricaoEsp', {transaction: t})
      ])
    })
  }
};
