var express = require('express')
var router = express.Router()

var getCitizen = require('../../functions/search-functions.js').getCitizen;

router.get(/trace-handler/, function (req, res) {
  // mainsearch_firstname: 'Jon',
  // mainsearch_lastname: 'greer',
  // mainsearch_dateofbirth: '21/06/1979',
  // mainsearch_dateofbdeath: 'none',
  // mainsearch_firstline: 'none',
  // mainsearch_town: 'consett',
  // mainsearch_postcode: 'dh85ye'
  res.render('./settlement-status/results')
})

router.get('/home-office-handler/', function (req, res) {
  req.session.data.citizen = getCitizen('SX170207', req.session.data.cis);
  res.redirect('account4/account')
})

router.get(/preview-handler/, function (req, res) {
  console.log('preview handler');
  req.session.data.nino = req.query.nino.toUpperCase();
  req.session.data.citizen = getCitizen(req.session.data.nino, req.session.data.cis);
  res.redirect('/account3/account')
})

  
module.exports = router