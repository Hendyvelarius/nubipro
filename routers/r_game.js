const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();
const session = require('express-session');

game.get('/', Controller.getAllGames)

module.exports = game;