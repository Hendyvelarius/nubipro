const express = require('express')
const router = express.Router();

const game = require('./r_game')
const user = require('./r_user')

router.get("/", (req, res) => {
    res.redirect("/games")
})

router.use('/games', game)
router.use('/user', user)


module.exports = router;