'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idCategoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
      },
      idCategoriaPai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categoria');
  }
};