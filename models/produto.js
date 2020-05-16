'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    imagemUrl: DataTypes.STRING
  }, {});
  Produto.associate = function(models) {
    Produto.belongsToMany(models.Categoria, {through: 'ProdutoCategorias', foreingKey: 'produtoId', as: 'produto'})
  };
  return Produto;
};