const { Game, Category, GameDetails, UserGame } = require('../models');
const session = require('express-session');
class Controller {
    static async getAllGames(req, res) {
        try {
            let user = req.session?.user;
            const {search} = req.query;
            const options = Game.searchGameTitle(search);
            const games = await Game.findAll(options);
            // res.send(games)
            res.render('gamesHome', { games , user});
        } catch (error) {
            console.log(error);
            res.send(error); 
        }
    }

    static async gameDetails(req, res) {
        try {
            let user = req.session?.user;
            const id = req.params.id;
            const game = await Game.findByPk(id, {
                include: [Category, GameDetails]
            });
            res.render('gameDetails', { game, user });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async buyGame(req, res) {
        try {
            let userId = req.session?.user.id;
            // console.log("🚀 ~ Controller ~ buyGame ~ userId:", userId)
            let idGame = req.params.id;
            // console.log("🚀 ~ Controller ~ buyGame ~ idGame:", idGame)

            await UserGame.create({
                UserId: userId,
                GameId: idGame
            });

            res.redirect('/user/library/' + userId);
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
    static async getManageGame(req, res) {
        try {
            let user = req.session?.user;
            
            // Check if user is admin
            if (!user || user.role !== 'admin') {
                return res.redirect('/games');
            }

            const games = await Game.findAll({
                include: [{
                    model: Category,
                    attributes: ['name']
                }],
                order: [['id', 'ASC']]
            });

            res.render('manageGameStore', { 
                games,
                user,
            });
        } catch (error) {
            console.log(error);
            res.render(error)
        }
    }

    static async deleteGame(req, res) {
        try {
            let user = req.session?.user;
            
            // Check if user is admin
            if (!user || user.role !== 'admin') {
                return res.redirect('/games');
            }

            const id = req.params.id;

            // Step 1: Find all related UserGames to get their IDs
            const relatedUserGames = await UserGame.findAll({
                where: { GameId: id }
            });


            // Step 2: Delete UserGame records
            await UserGame.destroy({
                where: { GameId: id }
            });

            //Step 3: Delete GameDetails records
            await GameDetails.destroy({
                where: { GameId: id }
            });

            // Step 4: Finally delete the Game
            await Game.destroy({
                where: { id }
            });

            res.redirect('/games/manage');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getEditGame(req, res) {
        try {
            let user = req.session?.user;
            
            // Check if user is admin
            if (!user || user.role !== 'admin') {
                return res.redirect('/games');
            }

            const id = req.params.id;
            const game = await Game.findByPk(id, {
                include: [Category, GameDetails]
            });
            const categories = await Category.findAll();
            res.render('editGame', { game, categories, user });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postEditGame(req, res) {
        try {
            let user = req.session?.user;
            
            // Check if user is admin
            if (!user || user.role !== 'admin') {
                return res.redirect('/games');
            }

            const { gameId, name, price, imageUrl, categoryId } = req.body;

            // Update the game record
            await Game.update({
                name,
                price: parseFloat(price),
                imageUrl,
                CategoryId: parseInt(categoryId)
            }, {
                where: { id: gameId }
            });
            res.redirect('/games/manage');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }


}

module.exports = Controller;