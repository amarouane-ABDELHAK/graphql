'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  book.associate = function(models) {

  };
  return book;
};