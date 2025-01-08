const express = require('express')
const router = express.Router();

const game = require('./r_game')
const category = require('./r_category')
const gameDetails = require('./r_gamedetails')
const gameStatistic = require('./r_gamestatistic')
const user = require('./r_user')
const userGame = require('./r_usergame')

router.get("/", (req, res) => {
    res.redirect("/games")
})

router.use('/games', game)
router.use('/category', category)
router.use('/gamedetails', gameDetails)
router.use('/gamestatistic', gameStatistic)
router.use('/user', user)
router.use('/usergame', userGame)


module.exports = router;