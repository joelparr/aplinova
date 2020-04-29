'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProdutoCategoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produtoId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{ //n:n
          model:'Produtos',
          key: 'id'
        }
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{ //n:n
          model:'Categoria',
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
    return queryInterface.dropTable('ProdutoCategoria');
  }
};