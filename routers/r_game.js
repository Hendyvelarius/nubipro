const express = require('express')
const Controller = require('../controllers/c_game')
const game = express.Router();
const session = require('express-session');
const { isLogin, isAdmin } = require('../middlewares/auth')

//Home page
game.get('/', Controller.getAllGames)

//User as Admin
game.get('/manage', isLogin, isAdmin, Controller.getManageGame)
game.get('/delete/:id', isLogin, isAdmin, Controller.deleteGame)
game.get('/edit/:id', isLogin, isAdmin, Controller.getEditGame)
game.post('/edit/:id', isLogin, isAdmin, Controller.postEditGame)
// game.get('/add', isLogin, isAdmin, Controller.getAddGame)

//User as User
game.get('/:id', Controller.gameDetails)
game.post('/buy/:id', isLogin, Controller.buyGame)


module.exports = game;