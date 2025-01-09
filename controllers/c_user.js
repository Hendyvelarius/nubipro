const { User , Game , UserGame } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const {Op} = require('sequelize');
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
            
            // Validate required fields
            if (!username || !password || !email) {
                throw new Error('Username, password and email are required');
            }

            // Handle profile picture upload
            let profilePicture = 'default-profile.png'; // Default image
            if (req.file) {
                profilePicture = req.file.filename;
            }

            // Create user with form data and profile picture
            await User.create({
                username,
                password,
                email,
                role: 'user',
                profilePicture
            });

            res.redirect('/user/login');
        } catch (error) {
            console.log('Registration error:', error);
            res.render('./user/registerForm', {
                error: error.message || 'Registration failed. Please try again.'
            });
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
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } })
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);

                
                if(isValidPassword) {
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        username: user.username,
                    }; //save session in controller login
                    return res.redirect(`/games`)
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
            const userId = req.session?.user?.id;
            const id = req.params.id;
            
            if (!userId) {
                return res.redirect("/user/login?error=Please login first");
            }
            
            if (userId != id) {
                return res.redirect("/games");
            }

            const user = await User.findByPk(id, {
                attributes: ['id', 'username', 'email', 'profilePicture']
            });
            
            if (!user) {
                return res.redirect("/games?error=User not found");
            }

            // Add /uploads/ prefix to profile picture path if it's not the default
            if (user.profilePicture && user.profilePicture !== 'default-profile.png') {
                user.profilePicture = `/uploads/${user.profilePicture}`;
            }

            const userGames = await UserGame.findAll({
                where: { UserId: user.id },
                include: [
                    {
                        model: Game,
                        required: true
                    }
                ]
            });

            res.render('library', { 
                user, 
                userGames,
                profilePicture: user.profilePicture
            });
        } catch (error) {
            console.error("Error in getLibrary:", error);
            res.render('library', { 
                error: "An error occurred while loading your library",
                user: null,
                userGames: [],
                profilePicture: 'default-profile.png'
            });
        }
    }
}

module.exports = Controller;