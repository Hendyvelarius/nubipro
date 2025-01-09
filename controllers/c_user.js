const { User , Game , GameStatistic , UserGame } = require('../models');
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
            const { username, password, email } = req.body;
            await User.create({ username, password, email, role: 'user' });
            res.redirect('/user/logout')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getLogin(req, res) {
        try {
            let user = req.session?.user;
            if(user) {
                return res.redirect('/games')
            } 
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
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        username: user.username,
                    }; //save session in controller login
                    return res.redirect(`/games?session=${req.session.id}`)
                    // return res.send("Login Success")
                } else {
                    return res.redirect('/user/login?error=Invalid username or password')
                    // return res.send("Invalid username or password")
                }
            } else {
                return res.redirect('/user/login?error=Invalid username or password')
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            console.error("🔍 Session state at error:", req.session);
            return res.redirect('/user/login?error=An error occurred during login')
        }
    }

    static async getLogout(req, res) {
        try {
            req.session.destroy((error) => {
                if(error) {
                    res.send(error);
                } else {
                    res.redirect('/games')
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getLibrary(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findByPk(id);
            const userGames = await UserGame.findAll({
                where: { UserId: user.id },
                include: [
                    {
                        model: GameStatistic
                    },
                    {
                        model: Game
                    }
                ]
            });
            res.render('library', { user , userGames });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;