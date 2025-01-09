const express = require('express');
const Controller = require('../controllers/c_user');
const user = express.Router();

user.get('/register', Controller.getRegister)
user.post('/register', Controller.postRegister)

user.get('/login', Controller.getLogin)
user.post('/login', Controller.postLogin)


user.get('/logout', Controller.getLogout)


module.exports = user;