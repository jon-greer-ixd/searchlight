// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE

var express = require('express')
var router = express.Router()

var generalFunctions = require('../functions/general.js');

router.get(/add-relationships-handler/, function (req, res) {
  req.session.data.updateType = 1;
  res.redirect('check')
})

router.get(/change_relationship/, function (req, res) {
  if(req.session.data.updateType == 1) {
    res.redirect('/update/relationships/add')
  } else {
    res.redirect('/update/relationships/check')
  }
})

router.get(/relationship-handler/, function (req, res) {
  if (req.session.data.updateType == 1) {
    req.session.data.citizen.relationship = true;
  } else if (req.session.data.updateType == 5) {
    req.session.data.citizen.relationship = false;
  } else if (req.session.data.updateType == 6) {
    req.session.data.citizen.relationship = null;
  }
  req.session.data.toaster = generalFunctions.setToasterMessage("Relationship", null, req.session.data.updateType);
  req.session.updateType = null;
  res.redirect('/account3/account')
})

router.get(/recover-relationships-handler/, function (req, res) {
  req.session.data.updateType = 9;
  res.redirect('/update/relationships/check')
})

module.exports = router