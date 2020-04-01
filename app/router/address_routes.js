var express = require('express')
var router = express.Router()

var generalFunctions = require('../../functions/general.js');


// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE / 7 CHANGE PREFERENCE

var updateAddress = function (address, lineOne, status) {
  address.lineOne = lineOne;
  address.status = status;
  return address;
}

var setCherish = function (address, bool) {
  address.cherish = bool;
  return address;
}

var flipStatus = function (residential) {
  return (residential.status == 'dlo' ? 'live' : 'dlo');
}



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
      req.session.data.tempStatus = flipStatus(chosenAddress);
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
  if (req.session.data.addressType == "correspondence") {
    req.session.data.citizen.correspondenceAddress = true;
  }
  
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