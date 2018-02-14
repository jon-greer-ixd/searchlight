var express = require('express')
var router = express.Router()

// search full page
router.get('/search-full', function (req, res) {
  res.render('pages/search-full.njk')
})


// results page
router.get('/search-results', function (req, res) {
  res.render('pages/results.njk')
})

// add your routes here

module.exports = router
