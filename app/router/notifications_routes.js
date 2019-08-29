//test
var express = require('express')
var router = express.Router()

//notifications
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
  

//alerts
router.get('/alerts/page-one', function (req, res) {
    res.render('alerts/page-one.njk')
})
  
router.get('/alerts/alert-search', function (req, res) {
    res.render('alerts/alert-search.njk')
})
  
router.get('/alerts/v2/page-one', function (req, res) {
    res.render('alerts/v2/page-one.njk')
})
  
module.exports = router