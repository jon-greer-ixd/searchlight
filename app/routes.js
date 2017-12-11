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


var editStep = 0;
var updated = "26 Oct 1960 - present";

router.get('/account', function (req, res) {
  res.render('account', {
    updated : updated,
    step : 0
  })
})

router.get('/update-handler', function (req, res) {
  res.render('account', {
    updated : updated,
    step : 1
  })
})

router.get('/search-handler', function (req, res) {
  res.render('account', {
    updated : updated,
    step : 2
  })
})

router.get('/check-handler', function (req, res) {
  res.render('account', {
    updated : updated,
    step : 3
  })
})

router.get('/submit-handler', function (req, res) {
  res.render('account', {
    updated : "11 December 2017",
    step : 0
  })
})

module.exports = router