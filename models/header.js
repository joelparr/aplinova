'use strict';
module.exports = (sequelize, DataTypes) => {
  const Header = sequelize.define('Header', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    imagemUrl: DataTypes.STRING
  }, {});
  Header.associate = function(models) {
    //associations
  };
  return Header;
};