'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameStatistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameStatistic.init({
    hoursPlayed: DataTypes.INTEGER,
    lastPlayed: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GameStatistic',
  });
  return GameStatistic;
};