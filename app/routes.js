var express = require('express')
var router = express.Router()

// new routes

var main = require('./main/routes');

router.use('/', main);

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})


router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

// add your routes here

module.exports = router
