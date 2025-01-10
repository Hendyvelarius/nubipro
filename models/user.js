'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Game, { through: models.UserGame });
    }
  }
User.init({
username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Username must be unique.',
    },
    validate: {
    notNull: true,
    notEmpty: true
    }
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email must be unique.',
    },
    validate: {
    notNull: true,
    notEmpty: true,
    isEmail: true
    }
},
password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notNull: true,
    notEmpty: true,
    len:{
      args: [6, 100],
      msg: 'Password length must be between 6 and 100 characters' // Password length must be between {{args[0]}} and {{args[1]}
    } 
  }
},
role: DataTypes.STRING,
profilePicture: DataTypes.STRING
}, {
    hooks: {
      beforeCreate: (instance) => {
        if (instance.password) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        }
      },
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};
