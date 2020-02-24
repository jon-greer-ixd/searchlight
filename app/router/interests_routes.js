var express = require('express')
var router = express.Router()

var dates = require('../dates.js').dates;
var interests = [];

class Interest {
  constructor(live, title, startDate, system) {
    this.live = live;
    this.title = title;
    this.startDate = startDate;
    this.system = system;
  }
  //
  printInterest () {
    console.log("Interest = " + this.system + ", " + this.title + " " +  this.startDate + " " +  this.systemRef);
  }
  reset() {
    this.system = null; 
    this.title = null;
    this.startDate = null; 
    this.systemRef = null;
  }  
  createInterest() {
    return new Interest();
  }
}

let myInterest = new Interest();
myInterest.live = false;
myInterest.title = "State pension";
myInterest.startDate = "01 Jan 2019";
myInterest.system = true;
myInterest.printInterest();
myInterest.reset();
myInterest.printInterest();

var counter;

function resetToDefaults() {
  tempInterest = Interest.createInterest();
}

function addInterest(interest) {
  interests.unshift(interest);
}

function resetTempInterest(interest) {
  tempInterest = Interest.createInterest();
  interest = tempInterest;
}

var dataState = {
  correctionType: 'toNew',
  currentStatus : 'live',//dlo, pwa, nfa
  newStatus : 'live',//dlo, pwa, nfa
  correspondenceAdded: false,
  correspondenceRemoved: false,
  updatedToNewAddress : false,
  cherished : false,
  cherishedLineCorrected : false,
  statusUpdated : false,
  dateIsUpdated : false,
  interestAdded : false,
  interestRemoved : false,
  typeTwoAdded : false,
  interestTransfered : false,
  addressCorrected : false,
  statusCorrected : false
};

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

router.get(/interest-checkpage-handler/, function (req, res) {
  if (req.session.data.updateType == 'addInterest') {
    addInterest(tempInterest);
    dataState.interestAdded = true;   
  }
  resetTempInterest(req.session.data.tempInterest);
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