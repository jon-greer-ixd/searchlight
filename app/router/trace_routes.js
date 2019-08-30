//test
var express = require('express')
var router = express.Router()

router.get(/trace-handler/, function (req, res) {
  // mainsearch_firstname: 'Jon',
  // mainsearch_lastname: 'greer',
  // mainsearch_dateofbirth: '21/06/1979',
  // mainsearch_dateofbdeath: 'none',
  // mainsearch_firstline: 'none',
  // mainsearch_town: 'consett',
  // mainsearch_postcode: 'dh85ye'
  res.render('pages/search-v3.njk')
})

    
module.exports = router