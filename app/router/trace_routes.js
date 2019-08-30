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

router.get(/main-search-handler/, function (req, res) {
  req.session.data.nino = req.query.nino.toUpperCase();
  req.session.data.bsPerson = req.session.data.bsCustomers[req.session.data.bsNino];
  if( bsFunctions.getPerson(req.session.data.bsNino, req.session.data.bsCustomers) ) {
    res.redirect('/bereavement/account-v2')
  } else {
    res.redirect('/search-v8')
  }
})
  
    
module.exports = router