var express = require('express')
var router = express.Router()

var addressFunctions = require('../../functions/address.js');
var generalFunctions = require('../../functions/general.js');


router.get(/update-address-handler/, function (req, res) {
  if (req.session.data.updateType == 1) {
    res.redirect('/update/address-search')
  } else { 
    res.redirect('/update/type')
  }
})

router.get(/address-type-handler/, function (req, res) {
  var addressType = req.session.data.addressType;
  var chosenAddress = req.session.data.addresses[addressType];
  
  if (req.session.data.tempValue == 5) {
    if (req.session.data.updateType == 3) {
      res.redirect('/update/check')
    } else {
      res.redirect('/update/dates')
    }
  } else if (req.session.data.tempValue == 'status') {
    if (req.session.data.addresses.correspondence.show == true) {
      res.redirect('/update/status')
    } else {
      req.session.data.tempStatus = addressFunctions.flipStatus(chosenAddress);
      res.redirect('/update/check')
    }
  } else if (req.session.data.tempValue == 'cherish') {
    res.redirect('/update/cherish-line')
  } else if (req.session.data.tempValue == 'dates') {
    res.redirect('/update/dates')
  } else {
    res.redirect('/update/address-search')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (req.session.data.updateType == 3) {
    res.redirect('/update/check')
  } else {
    res.redirect('/update/dates')
  }
})

router.get(/cherish-handler/, function (req, res) {
  if (req.session.data.updateType == 2) {
    res.redirect('dates')
  }
  if (req.session.data.updateType == 3) {
    res.redirect('check')
  }
})

router.get(/check-address-handler/, function (req, res) {
  var addressType = req.session.data.addressType;
  var chosenAddress = req.session.data.addresses[addressType];
  var updateType = req.session.data.updateType;
  var tempValue = req.session.data.tempValue;
  var cherishStatus = req.session.data.cherishStatus;

  // SET STATE
  req.session.data.addresses[req.session.data.addressType].state = updateType;
  
  // SET VALUES
  if (tempValue == 'status') {
    req.session.data.addresses[req.session.data.addressType].status = req.session.data.tempStatus;
  }
    
  if (tempValue == 'cherish') {
    if (req.session.data.cherishStatus == 4 ) {
      req.session.data.addresses[req.session.data.addressType].cherish = false;
    } else {
      req.session.data.addresses[req.session.data.addressType].cherish = true;
    }
  }
    
  // SET DISPLAY
  req.session.data.addresses[req.session.data.addressType] = addressFunctions.setShow(chosenAddress, updateType, tempValue);
  
  // SET MESSAGE
  req.session.data.toaster = generalFunctions.setToasterMessage (chosenAddress.display, null, updateType);
 
  // RESET
  req.session.data.tempStatus = null;
  addressType, chosenAddress, updateType, tempValue, cherishStatus = null;
  req.session.data.addressType, req.session.data.updateType, req.session.data.tempValue, req.session.data.cherishStatus = null;
  
  // REDIRECT
  res.redirect('/account3/account')
})
module.exports = router