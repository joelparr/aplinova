'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email:DataTypes.STRING,
    active:DataTypes.BOOLEAN,
    role:DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Forgotcode, {foreignKey: "userId", onDelete:"CASCADE"});
  };
  return User;
};