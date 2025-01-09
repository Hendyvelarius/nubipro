const { Game, Category, GameDetails } = require('../models');
const session = require('express-session');
class Controller {
    static async getAllGames(req, res) {
        try {
            // const { session } = req.query;
            let user = req.session?.user;
            // console.log("🚀 ~ Controller ~ getAllGames ~ idUser:", user)
            // if(req.session.id === session) {
            //     idUser = req.session.user.id;
            // }
            const games = await Game.findAll({ 
                include: [Category, GameDetails]
            });
            // res.send(games)
            res.render('gamesHome', { games , user});
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