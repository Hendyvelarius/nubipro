const { Game, Category } = require('../models');
class Controller {
    static async getAllGames(req, res) {
        try {
            const games = await Game.findAll({
                include: [{
                    model: Category,
                    attributes: ['id', 'name']
                }],
                order: [['id', 'ASC']]
            });

            return res.status(200).json({
                status: 'success',
                message: 'Games retrieved successfully',
                data: games
            });
        } catch (error) {
            console.error('Error retrieving games:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve games',
                error: error.message
            });
        }
    }
}

module.exports = Controller;