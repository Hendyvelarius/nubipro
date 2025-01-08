const { Game, Category, GameDetails } = require('../models');
class Controller {
    static async getAllGames(req, res) {
        try {
            const games = await Game.findAll({ 
                include: [Category, GameDetails]
            });
            
            res.render('gamesHome', { games });
        } catch (error) {
            console.log(error);
            res.send(error); 
        }
    }
}

module.exports = Controller;