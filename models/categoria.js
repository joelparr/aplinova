'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER,
    idCategoriaPai: DataTypes.INTEGER,
  }, {timestamps: false});
  Categoria.associate = function(models) {
    Categoria.hasOne(models.Header, {foreignKey:"categoriaId", onDelete:"CASCADE"})
    Categoria.belongsToMany(models.Produto, {through: "ProdutoCategoria", as: 'produtos', foreignKey:"categoriaId"})
  };
  return Categoria;
};