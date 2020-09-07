'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    titulo: DataTypes.STRING,
    tituloEng: DataTypes.STRING,
    tituloEsp: DataTypes.STRING,
    descricao: DataTypes.STRING,
    descricaoEng: DataTypes.STRING,
    descricaoEsp: DataTypes.STRING,
  }, {timestamps: false});
  Produto.associate = function(models) {
    Produto.belongsToMany(models.Categoria, {through: "ProdutoCategoria", as: 'categorias', foreignKey:"produtoId"})
  };
  return Produto;
};