var express = require('express')
var router = express.Router()

var getCitizen = require('../../functions/search-functions.js').getCitizen;

router.get('/cis-handler/', function (req, res) {
  req.session.data.citizen = getCitizen(req.query.nino, req.session.data.cis);
  if (req.session.data.citizen.appointee != null) {
    req.session.data.appointee = getCitizen(req.session.data.citizen.appointee, req.session.data.cis);
    console.log(`Apointee = ${req.session.data.appointee.nameOneFirst} ${req.session.data.appointee.nameOneLast}`)
  }
  res.redirect('account3/account')
})

router.get('/appointee-handler/', function (req, res) {
  res.redirect('cis-handler?nino=' + req.session.data.appointee.nino)
})    
    
module.exports = router