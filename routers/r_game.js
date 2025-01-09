const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();





game.get('/', Controller.getAllGames)
game.get('/:id', Controller.gameDetails)

module.exports = game;