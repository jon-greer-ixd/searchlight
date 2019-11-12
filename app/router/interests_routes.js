var express = require('express')
var router = express.Router()

var Interest = require('../interest.js');
var dates = require('../dates.js').dates;

var counter;

function resetToDefaults() {
  tempInterest = Interest.createInterest();
}

router.get(/add-interest-handler/, function (req, res) {
  req.session.data.updateType = 'addInterest';
  resetToDefaults();
  tempInterest.live = true;
  tempInterest.title = req.query.interest;
  tempInterest.startDate = dates.convertDayToString(req.query.startdate);
  if(tempInterest.title === 'Carers Credit') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else if (tempInterest.title === 'Bereavement Support Payment') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else if (tempInterest.title === 'Winter Fuel Payment') {
    tempInterest.system = 'sys';
    res.redirect('add-party');
  } else {
    res.redirect('add-system');
  }
})

router.get(/interest-check-handler/, function (req, res) {
  if (req.session.data.updateType == 'addInterest') {
    addInterest(tempInterest);
    dataState.interestAdded = true;   
  }
  resetTempInterest(req.session.data.tempInterest);
//  if (req.session.data.updateType === 'transferInterest') {
//    dataState.interestTransfered = true;
//  }
  res.redirect('/account3/account');
})

router.get(/change-interest-handler/, function (req, res) {
  var y = parseInt(req.query.tempPos);
  tempInterest = interests[y];
  res.redirect('/update/interests/update-interest');
})

router.get(/update-interest-handler/, function (req, res) {
  if (req.query.data === 'end-parties') {
    req.session.data.updateType = 'endfParties'
    res.redirect('end-party');
  } else if (req.query.data === 'transfer') {
    req.session.data.updateType = 'transferInterest'
    res.redirect('transfer-interest');
  } else  {
    req.session.data.updateType = 'endInterest'
    res.redirect('end-interest');
  }
})

router.get(/end-interest-handler/, function (req, res) {
  tempInterest.live = false;
  dataState.interestRemoved = true;
  res.redirect('../account');
})

router.get('/add-system', function (req, res) {
  res.render('add-party', {
    tempInterest : tempInterest
  });
})

router.get(/add-system-handler/, function (req, res) {
  tempInterest.system = req.query.system;
  res.redirect('add-party');
})

router.get('/update/interests/add-system', function (req, res) {
  res.render('update/interests/add-system', {
    tempInterest : tempInterest
  })
})

router.get(/party-handler/, function (req, res) {
  if (req.query.own == 'true') {
    tempInterest.owning = true;
  } else {
    tempInterest.owning = false;
  }
  if (req.query.broadcasting == 'true') {
    tempInterest.broadcasting = true;
  } else {
    tempInterest.broadcasting = false;
  }
  if (req.query.maint == 'true') {
    tempInterest.maintained = true;
  } else {
    tempInterest.maintained = false;
  }
  res.redirect('check');
})

router.get('/update/interests/interests', function (req, res) {
  res.render('update/interests/interests', {
    interests : interests
  })
})

router.get('/update/interests/update-interest', function (req, res) {
  res.render('update/interests/update-interest', {
    interests : interests,
    tempInterest : tempInterest
  })
})

router.get('/update/interests/transfer-interest', function (req, res) {
  res.render('update/interests/transfer-interest', {
    interests : interests,
    tempInterest : tempInterest
  })
})

router.get('/update/interests/check', function (req, res) {
  res.render('update/interests/check', {
    tempInterest : tempInterest
  })
})

router.get('/update/interests/add-party', function (req, res) {
  res.render('update/interests/add-party', {
    tempInterest : tempInterest,
    counter : counter
  })
})
    
module.exports = router