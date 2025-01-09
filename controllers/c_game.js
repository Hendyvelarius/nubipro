const { Game, Category, GameDetails } = require('../models');
class Controller {
    static async getAllGames(req, res) {
        try {
            const games = await Game.findAll({ 
                include: [Category, GameDetails]
            });
            // res.send(games)
            res.render('gamesHome', { games });
        } catch (error) {
            console.log(error);
            res.send(error); 
        }
    }
    static async gameDetails(req, res) {
        try {
            const id = req.params.id;
            const game = await Game.findByPk(id, {
                include: [Category, GameDetails]
            });
            res.render('gameDetails', { game });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;