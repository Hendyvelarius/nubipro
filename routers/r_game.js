const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();
const session = require('express-session');
const { isLogin, isAdmin } = require('../middlewares/auth')


game.get('/', Controller.getAllGames)
game.get('/:id', Controller.gameDetails)

module.exports = game;