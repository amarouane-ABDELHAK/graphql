'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  author.associate = function(models) {
    author.hasMany(models.book);
  };
  return author;
};