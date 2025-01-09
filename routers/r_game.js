const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();
const session = require('express-session');

game.use(function( req, res, next) {
    console.log("🚀 ~ user.use ~ req.session.userId:", req.session)
    if(!req.session.user.id) {
        res.redirect('/user/login?error=please login first')
    } else {
        next()
    }
})

game.use(function( req, res, next) {
    if(req.session.user.role !== 'admin') {
        res.redirect('/user/login?error=You have no access')
    } else {
        next()
    }
})

game.get('/', Controller.getAllGames)
game.get('/:id', Controller.gameDetails)

module.exports = game;