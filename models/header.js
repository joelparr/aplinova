'use strict';
module.exports = (sequelize, DataTypes) => {
  const Header = sequelize.define('Header', {
    titulo: DataTypes.STRING,
    tituloEng: DataTypes.STRING,
    tituloEsp: DataTypes.STRING,
    descricao: DataTypes.STRING,
    descricaoEng: DataTypes.STRING,
    descricaoEsp: DataTypes.STRING,
  }, {timestamps: false});
  Header.associate = function(models) {
    Header.belongsTo(models.Categoria)
  };
  return Header;
};