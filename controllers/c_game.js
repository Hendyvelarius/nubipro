const { Game, Category, GameDetails } = require('../models');
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
}

module.exports = Controller;