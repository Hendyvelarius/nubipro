
class Controller {

    static async getAllGames(req, res) {
        try {
            // code here
            res.send('OK')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller;