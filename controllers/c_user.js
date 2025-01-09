const { User } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');
class Controller{
    static async getRegister(req, res) {
        try {
            res.render('./user/registerForm')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async postRegister(req, res) {
        try {
            const { username, password, email, role } = req.body;
            await User.create({ username, password, email, role });
            res.redirect('/user/logout')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            const {error} = req.query;
            res.render('./user/loginForm', {error})
        } catch (error) {
            console.log(error);
        }
    }

    static async postLogin(req, res) {
        try {
            // first i want to check if the user is exist or not
            // 1. finOne user from username
            // 2. if exist compare plain password with hashed password inside the database
            // 3. if not match cannot login or show error message
            // 4. if password match redirect to home page
            
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } })
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);

                if(isValidPassword) {
                    // case user success login
                    req.session.userId = user.id; //save session in controller login
                    return res.redirect('/games')
                    // return res.send("Login Success")
                } else {
                    return res.redirect('/user/login?error=Invalid username or password')
                    // return res.send("Invalid username or password")
                }
            } else {
                return res.redirect('/user/login?error=Invalid username or password')
            }
            res.redirect('/user/logout')
        } catch (error) {
            console.error("❌ Login error:", error);
            console.error("🔍 Session state at error:", req.session);
            return res.redirect('/user/login?error=An error occurred during login')
        }
    }

    static async getLogout(req, res) {
        try {
            res.send('LOG OUT')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;