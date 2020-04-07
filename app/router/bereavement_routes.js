var express = require('express')
var router = express.Router()

var bsFunctions = require('../functions/bsFunctions.js');

router.get(/bereavement-handler/, function (req, res) {
    req.session.data.bsNino = req.query.bsnino.toUpperCase();
    req.session.data.bsPerson = req.session.data.bsCustomers[req.session.data.bsNino];
    if( bsFunctions.getPerson(req.session.data.bsNino, req.session.data.bsCustomers) ) {
      res.redirect('/bereavement/account-v2')
    } else {
      res.redirect('/search-v8')
    }
  })
    
    
module.exports = router