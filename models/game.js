'use strict';
const {Op} = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Category);
      Game.belongsToMany(models.User, {through: models.UserGame});
      Game.hasOne(models.GameDetails);
    }

    static searchGameTitle(value) {
      const options = {
        include: [sequelize.models.Category, sequelize.models.GameDetails]
      };

      if(value) {
        options.where = {
          name: {
            [Op.iLike]: `%${value}%`
          }
        };
      }
      return options;
    }

    get price() {
      return this.price;
    }

    get priceCurrency() {
      return `Rp ${this.price.toLocaleString('id-ID')}`;
    }
  };

  Game.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });

  return Game;
};
