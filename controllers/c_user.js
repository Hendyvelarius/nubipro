const { User } = require('../models');
const bcrypt = require('bcryptjs');
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
            // console.log("🚀 ~ Controller ~ postRegister ~ role:", role)
            // console.log("🚀 ~ Controller ~ postRegister ~ email:", email)
            // console.log("🚀 ~ Controller ~ postRegister ~ password:", password)
            // console.log("🚀 ~ Controller ~ postRegister ~ username:", username)
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
                // console.log("👤 User found:", user.username, user.id);
                const isValidPassword = bcrypt.compareSync(password, user.password);

                if(isValidPassword) {
                    // case user success login
                    req.session.userId = user.id; //save session in controller login
                    // console.log("🚀 ~ Controller ~ postLogin ~ req.session.userId:", req.session)
                    return res.redirect('/logout')
                } else {
                    return res.redirect('/user/login?error=Invalid username or password')
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
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;