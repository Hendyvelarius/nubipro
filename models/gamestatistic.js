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
    GameStatistic.belongsTo(models.UserGame, { foreignKey: 'UserGameId' });
    }
  }
GameStatistic.init({
UserGameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'UserGames',
    key: 'id'
    }
},
hoursPlayed: DataTypes.INTEGER,
lastPlayed: DataTypes.DATE
}, {
    sequelize,
    modelName: 'GameStatistic',
  });
  return GameStatistic;
};