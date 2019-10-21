var express = require('express');
var router = express.Router();

var addressOne = '1 Current Crescent';
var addressTwo = '2 New Street';
var addressThree = '7 Post Street';
var addressFour = 'Gateshead, Tyne and Wear NE1 1HH';

var getCitizen = require('../functions/search-functions.js').getCitizen;

var content = require('./content.js').content;
var Interest = require('./interest.js');
var defaults = require('./defaults.js').defaults;
var flip = require('./defaults.js').flip;
var setState = require('./defaults.js').setState;
var changeSex = require('./defaults.js').changeSex;
var personalDetailsFunctions = require('../functions/personalDetailsFunctions.js');
var generalFunctions = require('../functions/general.js');
var addressFunctions = require('../functions/address.js');

var dates = require('./dates.js').dates;
console.log(`yesterdayAsFigure ${dates.yesterdayAsFigure('/')}`);
console.log(`todayAsFigure ${dates.todayAsFigure('/')}`);


///////////////
// July 2019 //
/////////////// 
var guardianRole = false;
let refactor = false;

// var getCitizen = function(nino, cis) {
//   return cis[nino]
// }

router.get('/cis-handler/', function (req, res) {
  req.session.data.refactor = refactor;
  req.session.data.guardianRole = guardianRole;
  req.session.data.citizen = getCitizen(req.query.nino, req.session.data.cis);
  res.redirect('account3/account')
})


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

function resetToDefaults() {
  tempInterest = Interest.createInterest();
}

function printInterests() {
  for (var x in interests) {
  }
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

// dateTwo : '30 Dec 2000',

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

var updater = function (updatetype) {
  if (updatetype === 'correctDate') {
    residentialAddress.updated = true;
    residentialAddress.startDate = '30 Nov 1990';
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
  if (updatetype === 'correctDateNotified') {
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
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


//routes
var main = require('./main/routes');
var settlementStatusRoutes = require('./router/settlementStatus_routes');
var getDetailsAboutADeathRoutes = require('./router/getDetailsAboutADeath_routes');
var bereavementRoutes = require('./router/bereavement_routes');
var localAuthorityRoutes = require('./router/local_authority_routes');
var notificationsRoutes = require('./router/notifications_routes');
var ninoRoutes = require('./router/nino_routes');
var contactRoutes = require('./router/contact_routes');
var interestRoutes = require('./router/contact_routes');
var traceRoutes = require('./router/trace_routes');
var updateRoutes = require('./router/update_routes');


  

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

router.use('/', main, 
                getDetailsAboutADeathRoutes, 
                settlementStatusRoutes, 
                bereavementRoutes,
                localAuthorityRoutes,
                notificationsRoutes,
                ninoRoutes,
                contactRoutes,
                interestRoutes,
                updateRoutes,
                traceRoutes);
                
  // Route index page
  router.get('/', function (req, res) { 
    
  req.session.data.mcheck = false;

  //dap
  req.session.data.showDapResults = null;
  console.log( `${req.session.data.showDapResults}` );
  req.session.data.dap_type = null;
  req.session.data.dap_type = null;
  req.session.data.not_date = null;
  req.session.data.notificationStatus = 'unprocessed';
  req.session.data.dapNotifications = require('./data/dapNotifications.js').dapNotifications;

  //set a nino for account version 3
  req.session.data.cis = require('../public/javascripts/cis.json');
  req.session.data.citizen = getCitizen("SX170202", req.session.data.cis);
              
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
  req.session.data.addresses = require('./data/addresses.js').addresses;
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

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
})

router.get('/managementcheck', function (req, res) {
  req.session.data.mcheck = managementCheck(req.session.data.mcheck);
  res.redirect(req.get('referer'));
})

function managementCheck(check) {
  if(check == true) {
    check = false;
  } else {
    check = true;
  }
  return check;
}


//PERSON
router.get(/add-person-handler/, function (req, res) {
  req.session.data.personDetailObject = req.session.data.personalDetails[req.session.data.personalDetail];
  req.session.data.personDetailObject.key = req.session.data.personalDetail;
  req.session.data.updateType = 1;
  if (req.session.data.personalDetail == 'nifu') {
    req.session.data.personalDetailValue = 'Yes';
    res.redirect('/update/person/check');
  } else if (req.session.data.personalDetail == 'gender') {
    res.redirect('/update/person/gender/add');
  } else if (req.session.data.personalDetail == 'assetFreeze' || req.session.data.personalDetail == 'idAtRisk') {
    req.session.data.personalDetailValue = true;
    res.redirect('/update/person/dates');
  } else if (req.session.data.personalDetail == 'INDIndicator') {
    req.session.data.personalDetailValue = 'INDIndicator';
    req.session.data.personalDetailValue = true;
    res.redirect('/update/person/check');
  } else {
    res.redirect('/update/person/update');
  }
})

router.get(/adding-detail-handler/, function (req, res) {
  req.session.data.personalDetail = req.query.personalDetail;
  req.session.data.toaster = null;
  req.session.data.updateType = 1;
  res.redirect('/update/person/update')
})

router.get(/person-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.personalDetail = req.query.personalDetail;
  if (req.session.data.personalDetail == 'sex') {
    req.session.data.updateType = 3;
    req.session.data.personalDetailValue = personalDetailsFunctions.flipValue(req.session.data.personalDetails.sex);
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == 'dateOfDeath') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/dod-options')
  } else if (req.session.data.personalDetail == 'dateOfBirth') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/update')
  } else if (req.session.data.personalDetail == 'recordLevel') {
    req.session.data.updateType = 2;
    res.redirect('/update/person/update')
  } else if (req.session.data.personalDetail == 'INDIndicator') {
    req.session.data.updateType = 2;
    req.session.data.personalDetailValue = 'null';
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == 'assetFreeze' || req.session.data.personalDetail == 'idAtRisk') {
    if (req.session.data.personalDetails[req.session.data.personalDetail].state == 1) {
      req.session.data.updateType = 5;
    } else {
      req.session.data.updateType = 1;
    }
    res.redirect('/update/person/dates')
  } else if (req.session.data.personalDetail == 'nifu') {
    req.session.data.updateType = 2;
    req.session.data.personalDetailValue = 'null';
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/type')
  }
})

router.get(/change-person-type-handler/, function (req, res) {
  if (req.session.data.personalDetail == 'nino' || req.session.data.updateType == 4) {
    req.session.data.updateType == 2;
    req.session.data.personalDetail = 'ninoVerificationLevel';
    res.redirect('/update/person/update')
  }
  if (req.session.data.personalDetail == 'specialNeeds' && req.session.data.updateType == 3) {
    if (req.session.data.personalDetails.specialNeeds.value.length > 1) {
      res.redirect('/update/person/correct-needs/select-need')
    } else {
      req.session.data.personalDetailValue = req.session.data.personalDetails.specialNeeds.value[0] ;
      res.redirect('/update/person/correct-needs/all-needs')
    }
  } else if (req.session.data.personalDetail == 'preferredLanguage') {
    if (req.session.data.updateType == 2) {
      if (req.session.data.personalDetailValue == 'English') {
        req.session.data.personalDetailValue = 'Welsh';
      } else {
        req.session.data.personalDetailValue = 'English';
      }
      res.redirect('/update/person/check')
    } else {
      res.redirect('/update/person/update')
    }
  } else {
    res.redirect('/update/person/update')
  }
})

router.get(/dod-handler/, function (req, res) {
  if (req.session.data.updateType == 4) {
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/update')
  }
})

router.get(/personal-detail-handler/, function (req, res) {
  if (req.query.data == 'stateless') {
    req.session.data.personalDetailValue = 'stateless';
  } else if (req.query.data == 'unknown') {
    req.session.data.personalDetailValue = 'unknown';
  } else if (req.query.data == 'null') {
    req.session.data.personalDetailValue = 'null';
  }
  res.redirect('/update/person/check')
})

router.get(/change_pd/, function (req, res) {
  req.session.data.personDetailObject = req.session.data.personalDetails[req.query.personalDetail];
  req.session.data.personDetailObject.key = req.query.personalDetail;
  if(req.session.data.personDetailObject.key == 'dateOfBirth') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/update')
  } else if (req.session.data.personDetailObject.key == 'recordLevel') {
    req.session.data.updateType = 2;
    res.redirect('/update/person/update')
  } else if (req.session.data.personDetailObject.key == 'dateOfDeath') {
    res.redirect('/update/person/dod-options')
  } else if (req.session.data.personDetailObject.key == 'sex') {
    req.session.data.personalDetailValue = personalDetailsFunctions.flipValue(req.session.data.personalDetailValue);
    req.session.data.updateType = 3;
    res.redirect('/update/person/check')
  } else if (req.session.data.personDetailObject.key == 'INDIndicator') {
    req.session.data.personalDetailValue = null;
    req.session.data.updateType = 2;
    res.redirect('/update/person/check')
  } else if (req.session.data.personDetailObject.key == 'assetFreeze'|| req.session.data.personDetailObject.key == 'idAtRisk') {
    if (req.session.data.personDetailObject.state == 1) {
      req.session.data.updateType = 5;
      req.session.data.personalDetailValue = false;
    } else {
      req.session.data.updateType = 1;
      req.session.data.personalDetailValue = true;
    }
    res.redirect('/update/person/dates')
  } else {
    res.redirect('/update/person/type')
  }
})


//DISABILITY
router.get(/disability-type-handler/, function (req, res) {
  req.session.data.disability.state = req.query.data;
  if (req.session.data.disability.state === 'updating' || req.session.data.disability.state === 'correcting') {
    req.session.data.personalDetails.disability.value = flip(req.session.data.personalDetails.disability.value);
  }
  res.redirect('/update/person/check')
})

//NATIONALITY
router.get(/nationality-type-handler/, function (req, res) {
  req.session.data.nationality.state = req.query.data;
  res.redirect('/update/person/nationality/update')
})

//MARITAL
router.get(/marital-type-handler/, function (req, res) {
  req.session.data.maritalState = req.query.data;
  res.redirect('/update/person/marital/update')
})

//Special customer record level
router.get(/recordLevel-type-handler/, function (req, res) {
  req.session.data.recordLevel.state = req.query.data;
  if(req.session.data.recordLevel.state == 'removing') {
    res.redirect('/update/person/check')
  } else {
    res.redirect('/update/person/recordLevel/update')
  }
})

//nifu
router.get(/nifu-type-handler/, function (req, res) {
  req.session.data.personalDetails.nifu.state = req.query.data;
  req.session.data.personalDetails.nifu.value = flip(req.session.data.personalDetails.nifu.value);
  res.redirect('/update/person/check')
})

//NEEDS
router.get(/sneeds-handler/, function (req, res) {
  res.redirect('/update/person/needs/update')
})

//NEEDS
router.get(/sneeds-type-handler/, function (req, res) {
  if (req.query.data === 'update') {
    req.session.data.specialNeeds.state = 'updating'
    res.redirect('/update/person/needs/update')
  } else {
    req.session.data.specialNeeds.state = 'correcting'
    res.redirect('/update/person/needs/update')
  }
})

//GENDER
function updateGender(show, hide) {
  show = true;
  hide = false;
}

router.get(/add-gender-handler/, function (req, res) {
  if (req.session.data.personalDetails.gender.gra == false && req.session.data.personalDetails.gender.preGra == false) {
    req.session.data.personalDetails.sex.value = changeSex(req.session.data.personalDetails.sex.value);
  }
  req.session.data.editState = 'adding';
  if (req.query.data == 'gra') {
    req.session.data.personalDetail = 'gra';
    if (req.session.data.personalDetails.gender.preGra == true) {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/sex')
    }
  } else {
    req.session.data.personalDetail = 'preGra';
    if (req.session.data.personalDetails.gender.gra == true) {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/sex')
    }
  }
})

router.get(/gender-type-handler/, function (req, res) {
  if (req.session.data.personalDetails.gra.state === 'updating') {
    req.session.data.personalDetails.gra.state = req.query.data;
  } else {
    req.session.data.personalDetails.preGra.state = req.query.data;
  }
  res.redirect('/update/person/gender/update')
})

router.get(/updating-handler/, function (req, res) {
  var feature = req.query.feature;
//  var featureState = feature+'State';
  req.session.data[feature].state = req.query.state;
  if(req.query.feature === 'preGra' || req.query.feature === 'gra') {
    if (req.query.state == 'adding') {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == 'disability' || req.query.feature == 'needs' || req.query.feature == 'nifu') {
    res.redirect('/update/person/' + feature + '/type')
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/newupdate-handler/, function (req, res) {
  var feature = req.query.feature;
  var featureState = feature+'State';
  req.session.data[feature].state = req.query.state;
  if(req.query.feature === 'preGra' || req.query.feature === 'gra') {
    if (req.query.state == 'adding') {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == 'disability' || req.query.feature == 'needs' || req.query.feature == 'nifu' || req.query.feature == 'recordLevel') {
    res.redirect('/update/person/' + feature + '/type')
  } else if (req.query.feature == 'sex') {
    req.session.data.personalDetails.sex = changeSex(req.session.data.personalDetails.sex.value);
    res.redirect('/update/person/check')
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/updatecontact-handler/, function (req, res) {
  var feature = req.query.feature;
  var state = req.query.state;
  req.session.data[feature].state = state;
  res.redirect('/update/person/contact/' + feature)
})

router.get(/check-gender-handler/, function (req, res) {
  if (req.session.data.personalDetail == 'gra') {
    req.session.data.personalDetails.gender.gra = true;
  } else {    
    req.session.data.personalDetails.gender.preGra = true;
  }
  req.session.data.personalDetails.gender.show = true;
  req.session.data.toaster = generalFunctions.setToasterMessage('Gender recognition details', null, 'added');
  if (req.session.data.sexValue == 'Male') {
    req.session.data.personalDetails.sex.value = true;
  } else if (req.session.data.sexValue == 'Female'){
    req.session.data.personalDetails.sex.value = false;
  }
  req.session.data.sexValue = null;
  res.redirect('/account2/account')
})


/*********/
/** SEX **/
/*********/

router.get(/update-sex-handler/, function (req, res) {
  if (req.query.data === 'gra') {
    req.session.data.updateType = 'addGra';
  } else {
    req.session.data.updateType = 'addPreGra';
  }
  res.redirect('/update/gender/update-gender')
})

router.get(/sex-adv-handler/, function (req, res) {
  req.session.data.updateType = 'updateGender';
  res.redirect('/update/sex/update-sex')
})

router.get(/sex-simple-handler/, function (req, res) {
  req.session.data.updateType = 'correctSex';
  res.redirect('/update/sex/check')
})

router.get('/sex/update', function (req, res) {
  req.session.data.updateType = 'updateGender';
  res.render('update/sex/update')
})

router.get(/check-sex-handler/, function (req, res) {
  if(req.session.data.updateType === 'correctSex') {
    req.session.data.sexChanged = true;
  } else {
    req.session.data.personalDetails.genderUpdated = true;
  }
  req.session.data.sex = 'Female';
  res.redirect('/account2/account')
})


/**********/
/** NAME **/
/**********/

router.get(/add-handler/, function (req, res) {
  req.session.data.updateType = 'add';
  if(req.session.data.details.nameTwo.show == true) {
    req.session.data.nameType = 'requestedName';
    res.redirect('../../update/name/update-name')
  } else if(req.session.data.details.requestedName.show == true) {
    req.session.data.nameType = 'nameTwo';
    res.redirect('../../update/name/update-name')
  } else {
    res.redirect('../../update/name/add')
  }
})

router.get(/name-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.updateType = 'change';
  res.redirect('/update/name/update')
})

//change name
router.get(/change-name-type-handler/, function (req, res) {
  if(req.session.data.updateType == 'end') {
    res.redirect('remove')
  } else {
    res.redirect('update-name')
  }
})

//check name
router.get(/check-name-handler/, function (req, res) {
  req.session.data.toaster = null;  
  if (req.session.data.nameType == 'name' || req.session.data.nameType == 'nameTwo') {
    if (req.session.data.updateType != 'end') {
      req.session.data.details[req.session.data.nameType].title = req.session.data.title;
      req.session.data.details[req.session.data.nameType].first = req.session.data.firstname;
      req.session.data.details[req.session.data.nameType].last = req.session.data.lastname;
      req.session.data.details[req.session.data.nameType].suffix = req.session.data.suffix;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.nameTwo.show = false;
    }
  }
  if (req.session.data.nameType == 'requestedName') {
    if (req.session.data.updateType != 'end') {
      req.session.data.details.requestedName.value = req.session.data.requestedName;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.requestedName.show = false;
    }
  }
  req.session.data.details[req.session.data.nameType].state = setState(req.session.data.updateType);
  req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.details[req.session.data.nameType].display, null, req.session.data.details[req.session.data.nameType].state);
  res.redirect('../../account2/account')
})



/*************/
/** ADDRESS **/
/*************/

//master-account
router.get('/master-account/account', function (req, res) {
  res.render('master-account/account.html', {
    dataState : dataState,
    today : dates.todayAsString(),
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    interestTransfered : dataState.interestTransfered,
    typeTwoAdded : dataState.typeTwoAdded,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//account2
router.get('/account2/account', function (req, res) {
  res.render('account2/account.html', {
    dataState : dataState,
    today : dates.todayAsString(),
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    interestTransfered : dataState.interestTransfered,
    typeTwoAdded : dataState.typeTwoAdded,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//account
router.get('/update/account', function (req, res) {
  res.render('update/account.html', {
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    correspondenceremoved : dataState.correspondenceRemoved,
    dateisupdated : dataState.dateIsUpdated,
    interestAdded : dataState.interestAdded,
    interestRemoved : dataState.interestRemoved,
    typeTwoAdded : dataState.typeTwoAdded,
    interestTransfered : dataState.interestTransfered,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//ADDRESSES
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
  res.redirect('/account2/account')
})



router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/update-v2', function (req, res) {
  res.render('update/update-v2', {
    cherish : residentialAddress.cherish,
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle,
    statusupdated : dataState.statusUpdated,
    status : dataState.currentStatus
  })
})

router.get('/update/status', function (req, res) {
  res.render('update/status', {
    pagetitle : content.pageTitle,
    status : dataState.currentStatus
  })
})

router.get(/status-handler/, function (req, res) {
  if (req.session.data.updateType == 2) {
    res.redirect('dates')
  } else {
    res.redirect('check')
  }
})

router.get('/update/cherish-line', function (req, res) {
  res.render('update/cherish-line', {
    pagetitle : content.pageTitle
  })
})

router.get('/update/print-sar', function (req, res) {
  res.render('update/print-sar', {
    sar : true
  })
})

router.get(/change-link-handler/, function (req, res) {
  req.session.data.updateType = 4;
  req.session.data.personalDetail = "bereavementBenefit";
  res.redirect('/update/benefits/check')
})

router.get(/check-benefit-handler/, function (req, res) {
  req.session.data.personalDetails.bereavementBenefit.value = false;
  req.session.data.personalDetails.bereavementBenefit.show = false;
  req.session.data.personalDetails.bereavementBenefit.state = 5;
  req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.personalDetails.bereavementBenefit.display, null, req.session.data.personalDetails.bereavementBenefit.state);
  res.redirect('/account2/account')
})


//maintain account
router.get(/maintain-account-handler/, function (req, res) {
  if (req.session.data.updateType == 3) {
    res.redirect('verification')
  } else if (req.session.data.updateType == 1)  {
    res.redirect('recover')
  } else if (req.session.data.updateType == 0) {
    req.session.data.tempAccountStatus = 'Open'
    res.redirect('check')
  } else {
    res.redirect('status')
  }
})

router.get(/nino-level-handler/, function (req, res) {
  if (req.session.data.tempAccountStatus == 'Superseded' ) {
    res.redirect('supersede')
  } else {
    res.redirect('check')
  }
})

router.get(/check-nino-handler/, function (req, res) {
  if (req.session.data.updateType == 3) {
//  var tempmessage;
    req.session.data.personalDetails.ninoVerificationLevel.value = req.session.data.verificationLevel;
    req.session.data.toaster = generalFunctions.setToasterMessage('National Insurance number verification type', null, 2);
  } else if (req.session.data.updateType == 1) {
//    if (req.session.data.tempawards == 'true' && req.session.data.temprelationships == 'true') {
//      tempmessage = 'Awards and relationship data recovered';
//    } else if (req.session.data.tempawards == 'true') {
//      tempmessage = 'Awards data recovered';
//    } else if (req.session.data.temprelationships == 'true') {
//      tempmessage = 'Relationship data recovered';
//    }
    req.session.data.toaster = generalFunctions.setToasterMessage('Any available data has been recovered', null, ' ');
  } else {
    req.session.data.personalDetails.accountStatus.value = req.session.data.tempAccountStatus;
    req.session.data.toaster = generalFunctions.setToasterMessage('Account status', null, 2);
  }
  req.session.data.tempawards = null;
  req.session.data.temprelationships = null;
//  tempmessage = null;
  res.redirect('/account2/account')
})

// Available data has been recovered


//relationships
router.get(/cancel-handler/, function (req, res) {
  req.session.data.toaster = null;
  res.redirect('/account2/account')
})

router.get(/add-relationships-handler/, function (req, res) {
  req.session.data.updateType = 1;
  res.redirect('check')
})

router.get(/relationship-handler/, function (req, res) {
  req.session.data.miscData.relationships.state = req.session.data.updateType;
  req.session.data.toaster = generalFunctions.setToasterMessage("Relationship", null, req.session.data.updateType);
  req.session.updateType = null;
  res.redirect('/account2/account')
})

router.get(/change_relationship/, function (req, res) {
  if(req.session.data.updateType == 1) {
    res.redirect('/update/relationships/add')
  } else {
    res.redirect('/update/relationships/check')
  }
})

router.get(/recover-relationships-handler/, function (req, res) {
  req.session.data.updateType = 9;
  res.redirect('/update/relationships/check')
})


//*********
//Version 1
//*********

var previousAddresses = false;

router.get(/check-handler-v1/, function (req, res) {
  if(req.session.data.updateType === 'add') {
    correspondence = true;
  }
  if (req.session.data.updateType === 'address') {
    previousAddresses = true;    
    isUpdated = true;
  }
  res.redirect('account')
})

router.get('/update/v1/account', function (req, res) {
  res.render('update/v1/account', {
    updated : dataState.updatedToNewAddress,
    editDate : content.editDate,
    previous_addresses : previousAddresses,
    correspondence : dataState.correspondenceAdded
  })
})

router.get('/update/v1/update', function (req, res) {
  res.render('update/v1/update', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
})

router.get('/update/v1/check', function (req, res) {
  res.render('update/v1/check', {
    pagetitle : content.pageTitle
  })
})

router.get(/update-handler-v1/, function (req, res) {
  if(req.query.data === 'status') {
    req.session.data.updateType = 'status';
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    req.session.data.updateType = 'cherish';
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = 'dlo';
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = 'dlo';
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    req.session.data.updateType = 'address';
    res.redirect('address-search')
  }
})

router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == 'add') {
    req.session.data.updateType = 'new';
    res.render('update/address-search')
  } else if (req.query.tochange == 'correct'){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

router.get(/correction-type-handler/, function (req, res) {
  var next = 'update/dates';
  if(req.query.data === 'new') {
  dataState.correctionType = 'toNew';
    next = 'update/address-search'
  } else if(req.query.data === 'status') {
   dataState.correctionType = 'status';
    next = 'update/status'
  } else if(req.query.data === 'date') {
   dataState.correctionType = 'date';
  } else if(req.query.data === 'cherish') {
    next = 'update/cherish'
   dataState.correctionType = 'cherish';
  } else if (req.query.data == 'correct'){
    res.render('update/correct')
    res.redirect('address-search')
  } 
  res.render(next);
})




module.exports = router