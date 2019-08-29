//test
var express = require('express')
var router = express.Router()


router.get('/notifications/page-one', function (req, res) {
    res.render('notifications/page-one.njk')
  })
  
  router.get('/notifications/v2/page-one', function (req, res) {
    res.render('notifications/v2/page-one.njk')
  })
  
  router.get('/notifications/v3/page-one', function (req, res) {
    res.render('notifications/v3/page-one.njk')
  })
  
  router.get('/notifications/search', function (req, res) {
    res.render('notifications/search.njk')
  })
   
  
module.exports = router