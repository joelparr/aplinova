'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    imagemUrl: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER,
    idCategoriaPai: DataTypes.INTEGER,
    headerId: DataTypes.INTEGER
  }, {});
  Categoria.associate = function(models) {
    Categoria.belongsTo(models.Header, {foreignKey: 'headerId', as:'header'})
    Categoria.belongsToMany(models.Produto, {through: 'ProdutoCategoria', foreignKey: 'categoriaId', as: 'categoria'})
  };
  return Categoria;
};