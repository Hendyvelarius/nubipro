const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();





game.get('/', Controller.getAllGames)

module.exports = game;