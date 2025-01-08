const express = require('express')
const Controller = require('../controllers/c_user')
const user = express.Router();

user.get('/register', Controller.getRegister)
user.post('/register', Controller.postRegister)

user.use(function( req, res, next) {

    // if(!req.session.userId) {
    //     const error = 'You must login first';
    //     res.redirect('/user/login?error=' + error);
    // } else {
    //     next();
    // }
    console.log("🚀 ~ user.use ~ req.session.userId:", req.session.userId)
    next()
})
user.get('/login', Controller.getLogin)
user.post('/login', Controller.postLogin)





user.get('/logout', Controller.getLogout)


module.exports = user;