'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    static associate(models) {
      // define association here
      UserGame.belongsTo(models.User);
      UserGame.belongsTo(models.Game);
      UserGame.hasOne(models.GameStatistic, { foreignKey: 'UserGameId' });
    }
  }
  UserGame.init(
    {
      UserId: DataTypes.INTEGER,
      GameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserGame',
      hooks: {
        afterCreate: async (instance, options) => {
          const { GameStatistic } = sequelize.models; // Access the GameStatistic model
          try {
            await GameStatistic.create({
              hoursPlayed: 0, // Initially start at 0
              lastPlayed: null, // Last played is set to null (will display "Never" in last played until user press Play.)
              UserGameId: instance.id, // Link to the created UserGame instance
            });
          } catch (error) {
            console.error('Error creating GameStatistic:', error); //just in case
          }
        },
      },
    }
  );
  return UserGame;
};