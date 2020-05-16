'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
  }, {timestamps: false});
  Produto.associate = function(models) {
    Produto.belongsToMany(models.Categoria, {through: "ProdutoCategoria", as: 'categorias', foreignKey:"produtoId"})
  };
  return Produto;
};