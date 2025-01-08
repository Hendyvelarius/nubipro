'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameDetails.belongsTo(models.Game);
    }
  }
  GameDetails.init({
    imageList: DataTypes.TEXT,
    description: DataTypes.STRING,
    GameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GameDetails',
  });
  return GameDetails;
};