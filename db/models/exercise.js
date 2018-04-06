'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exercise = sequelize.define('Exercise', {
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    method: {
      type: DataTypes.ENUM('W', 'R', 'C'),
      allowNull: false,
    },
  }, {});
  Exercise.associate = function(models) {
    Exercise.belongsTo(models.User, {
      foreignKey: 'userID',
    });
  };
  return Exercise;
};