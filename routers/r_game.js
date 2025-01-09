const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();
const session = require('express-session');

game.use(function( req, res, next) {
    console.log("🚀 ~ user.use ~ req.session.userId:", req.session)
    // console.log('HURAAAAA', '<<<<<<<<');
    next()
})

game.get('/', Controller.getAllGames)
game.get('/:id', Controller.gameDetails)

module.exports = game;