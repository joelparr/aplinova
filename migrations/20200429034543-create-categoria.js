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
      imagemUrl: {
        type: Sequelize.STRING
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
      },
      headerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Headers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categoria');
  }
};