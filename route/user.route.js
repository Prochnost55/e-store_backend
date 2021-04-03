var express = require('express')
var router = express.Router()

router.post('/login', function (req, res) {
        res.sendStatus(200);
})


router.post('/register', function (req, res) {
        res.sendStatus(200)
})

module.exports = router