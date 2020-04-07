// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE / 7 CHANGE PREFERENCE

var express = require('express');
var router = express.Router();

var addressOne = '1 Current Crescent';
var addressTwo = '2 New Street';
var addressThree = '7 Post Street';
var addressFour = 'Gateshead, Tyne and Wear NE1 1HH';


var getCitizen = require('../functions/search-functions.js').getCitizen;

var ninoApplications = require('../public/javascripts/nino_applications.json')

var content = require('./content.js').content;
var Interest = require('./interest.js');
var defaults = require('./defaults.js').defaults;
var flip = require('./defaults.js').flip;
var setState = require('./defaults.js').setState;
var personalDetailsFunctions = require('../functions/personalDetailsFunctions.js');
var generalFunctions = require('../functions/general.js');

var dates = require('./dates.js').dates;
console.log(`yesterdayAsFigure ${dates.yesterdayAsFigure('/')}`);
console.log(`todayAsFigure ${dates.todayAsFigure('/')}`);

//reference
var additionalNeeds = require('./data/additionalNeeds.json');


//***********
// INTERESTS 
//***********

var interests = [];
var pip = Interest.createInterest();
var jsa = Interest.createInterest();
var esa = Interest.createInterest();

function addInterest(interest) {
  interests.unshift(interest);
}

var resetInterests = function () {
  interests.length = 0;
  //reset PIP
  pip.live = true;
  pip.title = 'Personal Independence Payment';
  pip.startDate = '1 Jun 2017';
  pip.system = 'sys';
  
  jsa.live = false;
  jsa.title = 'Job Seekers Allowance';
  jsa.startDate = '1 Jun 2017';
  jsa.system = 'crl';
  
  esa.live = true;
  esa.title = 'Employment and Support Allowance';
  esa.startDate = '1 Mar 2018';
  esa.system = 'clerical';
  
  addInterest(pip);
  addInterest(jsa);
  addInterest(esa);
}

function resetTempInterest(interest) {
  tempInterest = Interest.createInterest();
  interest = tempInterest;
}


var removeInterest = function (interest) {
  interest.live = false;
};


//******•
// DATES 
//******•

var Dates = require('./dates.js');
var dates = Dates.dates;
dates.logToday();

// var example = dates.convertDayToString('21/6/1979')

var createJourney = null;
var ninoVersion = null;

var resetAll = function () {
  residentialAddress.reset();
  correspondenceAddress.reset();
  previousAddress.reset();
  createJourney = null;
  ninoVersion = null;
};

var residentialAddress = {
  reset : function () {
    this.status = 'live',
    this.line = addressOne,
    this.startDate = '01 Jan 1990',
    this.endDate = null,
    this.cherish = false,
    this.show = true,
    this.updated = false
  }
};
residentialAddress.reset();

var correspondenceAddress = {
  reset : function () {
    this.line = addressThree;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
  }
};
correspondenceAddress.reset();

var previousAddress = {
  reset : function () {
    this.status = 'live';
    this.line = addressOne;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
    this.correct = true;
  }
};
previousAddress.reset();
  
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

//routes
var main = require('./main/routes');
var settlementStatusRoutes = require('./router/settlementStatus_routes');
var getDetailsAboutADeathRoutes = require('./router/getDetailsAboutADeath_routes');
var bereavementRoutes = require('./router/bereavement_routes');
var relationshipRoutes = require('./router/relationship_routes');
var localAuthorityRoutes = require('./router/local_authority_routes');
var notificationsRoutes = require('./router/notifications_routes');
var ninoRoutes = require('./router/nino_routes');
var contactRoutes = require('./router/contact_routes');
var interestRoutes = require('./router/interests_routes');
var traceRoutes = require('./router/trace_routes');
var updateRoutes = require('./router/update_routes');
var applyRoutes = require('./router/apply_routes');
var addressRoutes = require('./router/address_routes');
var cisRoutes = require('./router/cis_routes');


router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
})

// search page
router.get('/search', function (req, res) {
  res.render('pages/search.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v2', function (req, res) {
  res.render('pages/search-v2.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v3', function (req, res) {
  res.render('pages/search-v3.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v4', function (req, res) {
  res.render('pages/search-v4.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v5', function (req, res) {
  res.render('pages/search-v5.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v6', function (req, res) {
  res.render('pages/search-v6.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v7', function (req, res) {
  res.render('pages/search-v7.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v8', function (req, res) {
  res.render('pages/search-v8.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v9', function (req, res) {
  res.render('pages/search-v9.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v11', function (req, res) {
  res.render('pages/search-v11.njk', {
    ninoversion : ninoVersion
  })
})

var tempInterest;

// Import routes
router.use('/', main, 
                getDetailsAboutADeathRoutes, 
                settlementStatusRoutes, 
                bereavementRoutes,
                localAuthorityRoutes,
                notificationsRoutes,
                ninoRoutes,
                contactRoutes,
                interestRoutes,
                relationshipRoutes,
                updateRoutes,
                traceRoutes,
                applyRoutes,
                addressRoutes,
                cisRoutes);
                
  // Route index page
  router.get('/', function (req, res) { 
    
  req.session.data.mcheck = false;

  req.session.data.ninoAllocated = null;

  //dap
  req.session.data.showDapResults = null;
  console.log( `${req.session.data.showDapResults}` );
  req.session.data.dap_type = null;
  req.session.data.dap_type = null;
  req.session.data.not_date = null;
  req.session.data.notificationStatus = 'unprocessed';
  req.session.data.dapNotifications = require('./data/dapNotifications.js').dapNotifications;

  //list of additional needs
  req.session.data.additionalNeeds = additionalNeeds;

  req.session.data.cis = require('../public/javascripts/cis.json');
  req.session.data.ninoApplications = ninoApplications;
  req.session.data.citizen = getCitizen("SX170202", req.session.data.cis);

  //apply for a NINO
  req.session.data.ninoapplication_firstnames = null;
  req.session.data.ninoapplication_lastname = null;
  req.session.data.applyForNinoVersion = null;
  
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      req.session.data[key] = defaults[key];
    }
  }
  
  req.session.data.selectstatus = 'unprocessed';
    
  //data
  req.session.data.alertData = require('./data/alerts.js').alerts;
  req.session.data.notificationsData = require('./data/notifications.js').notifications;
  req.session.data.details = require('./data/details.js').details;
  req.session.data.miscData = require('./data/miscData.js').miscData;
  req.session.data.personalDetails = require('./data/personalDetails.js').personalDetails;
  req.session.data.bsCustomers = require('./data/bsCustomers.js').bsCustomers;
  req.session.data.contactTypes = require('./data/contactTypes.js').contactTypes;
  req.session.data.authority = require('./defaults.js').authority;

//  for (var item in contactTypes) {
//    if (contactTypes.hasOwnProperty(item)) {
//      req.session.data[item] = contactTypes[item];
//    }
//  }
    
  // set the message for startup items such as PV
  if(req.session.data.personalDetails.pv.state == 'start') {
    req.session.data.toaster = 'This person is potentially violent';
  } else if (req.session.data.personalDetails.disability.state == 'start') {
    req.session.data.toaster = 'This person is disabled';
  } else if (req.session.data.personalDetails.dateOfDeath.state == 'start') {
    req.session.data.toaster = 'This person is deceased';
  } else if (req.session.data.personalDetails.nifu.state == 'start') {
    req.session.data.toaster = 'Account is monitored by Identity Fraud Intelligence';
  };
          
  resetTempInterest(req.session.data.tempInterest);
  resetInterests();
  req.session.data.interests = interests;    
  req.session.data.updateOne = '20 May 1990';
  req.session.data.startOne = '20 May 1990';
  req.session.data.updateTwo = '5 Jun 2010';
  req.session.data.startTwo = '4 Jun 2010';
  req.session.data.updateThree = '30 Jan 2018';
  req.session.data.startThree = '29 Jan 2018';
  req.session.data.updateFour = '2 Feb 2018';
  req.session.data.startFour = '1 Feb 2018';
  req.session.data.dod = '20 Jan 2018';
  req.session.data.age = '78';
  req.session.data.creation = '11 Jan 1980';
    
  req.session.data.createJourney = null;
  req.session.data.prepopulatedDate = dates.todayAsFigure('/');    
  req.session.data.prepopulatedString = ( dates.convertDayToString( req.session.data.prepopulatedDate ) );    
  req.session.data.tests = 'foo';    
    
  resetAll();
  req.session.data.updateType = null;
  trace = false;
  underSixteen = false;
  dataState.updating = false;
  dataState.correcting = false;
  dataState.updatedToNewAddress = false;
  dataState.cherished = false;
  dataState.correspondenceAdded = false;
  dataState.correspondenceRemoved = false,
  dataState.statusUpdated = false;
  dataState.addressCorrected = false;
  dataState.dateIsUpdated = false;
  dataState.interestAdded = false;
  dataState.interestRemoved = false;
  dataState.interestTransfered = false;
  dataState.currentStatus = 'live';
  dataState.newStatus = 'live';
  //corrections
  dataState.cherishedLineCorrected = false;
  dataState.statusCorrected = false;
  pageTitle = 'Update residential address';
  res.render('index')
})


//keep
// router.get(/updatecontact-handler/, function (req, res) {
//   var feature = req.query.feature;
//   var state = req.query.state;
//   req.session.data[feature].state = state;
//   res.redirect('/update/person/contact/' + feature)
// })


module.exports = router