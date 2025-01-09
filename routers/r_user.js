const express = require('express');
const { upload } = require('../middlewares/multer');
const Controller = require('../controllers/c_user');
const user = express.Router();
const { isLogin, isAdmin } = require('../middlewares/auth')

user.get('/register', Controller.getRegister)
user.post('/register', upload.single('profilePicture'), Controller.postRegister)

user.get('/login', Controller.getLogin)
user.post('/login', Controller.postLogin)

user.get('/logout', Controller.getLogout)
user.get('/library/:id', isLogin, Controller.getLibrary)


module.exports = user;