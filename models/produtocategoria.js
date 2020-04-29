'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProdutoCategoria = sequelize.define('ProdutoCategoria', {
    produtoId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER
  }, {});
  ProdutoCategoria.associate = function(models) {
    ProdutoCategoria.belongsTo(models.Produto, {foreignKey: 'produtoId'})
    ProdutoCategoria.belongsTo(models.Categoria, {foreignKey: 'categoriaId'})
  };
  return ProdutoCategoria;
};