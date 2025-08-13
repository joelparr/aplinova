'use strict';
module.exports = (sequelize, DataTypes) => {
  const Forgotcode = sequelize.define('Forgotcode', {
    codigo: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {timestamps: false});
  Forgotcode.associate = function(models) {
    Forgotcode.belongsTo(models.User)
  };
  return Forgotcode;
};