'use strict';
module.exports = (sequelize, DataTypes) => {
  const Header = sequelize.define('Header', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
  }, {timestamps: false});
  Header.associate = function(models) {
    Header.belongsTo(models.Categoria)
  };
  return Header;
};