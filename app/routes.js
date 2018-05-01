var express = require('express');
var router = express.Router();

var addressOne = "1 Current Crescent";
var addressTwo = "2 New Street";
var addressThree = "7 Post Street";
var addressFour = "Gateshead, Tyne and Wear NE1 1HH";

var content = require('./content.js').content;

var Interest = require('./interest.js');

var defaults = require('./defaults.js').defaults;

var flip = require('./defaults.js').flip;

var authority = require('./authority.js').authority;

//***********
// INTERESTS 
//***********

var interests = [];
var pip = Interest.createInterest();
var jsa = Interest.createInterest();
var esa = Interest.createInterest();

var resetInterests = function() {
  interests.length = 0;
  //reset PIP
  pip.live = true;
  pip.title = "Personal Independence Payment";
  pip.startDate = "1 Jun 2017";
  pip.system = "sys";
  
  jsa.live = false;
  jsa.title = "Job Seekers Allowance";
  jsa.startDate = "1 Jun 2017";
  jsa.system = "crl";
  
  esa.live = true;
  esa.title = "Employment and Support Allowance";
  esa.startDate = "1 Mar 2018";
  esa.system = "clerical";
  
  addInterest(pip);
  addInterest(jsa);
  addInterest(esa);
}

function addInterest(interest) {
  interests.unshift(interest);
}

function resetTempInterest(interest) {
  tempInterest = Interest.createInterest();
  interest = tempInterest;
}

function resetToDefaults() {
  tempInterest = Interest.createInterest();
}

function printInterests() {
  console.log(" \n Interests ////");
  for (var x in interests) {
    console.log(interests[x]);
  }
  console.log("//// end \n");
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

var createJourney = null;
var ninoVersion = null;

var person = {
  reset : function () {
    //address
    this.previous_address = null;
    this.previous_address_count = 0;
    this.correspondence_address = null;
    //names
    this.previous_name = null;
    this.previous_name_count = 0;
    this.alternative_name = null;
    this.rfa_name = null;
    //other
    this.ethnic_origin = null;
    this.immigration = null;
    this.preferred_language = null;
    this.spoken_language = null;
    this.disability = null;
    this.special_needs = null;
  }
};
person.reset();

var trace = false;
var underSixteen = false;

var resetAll = function() {
  residentialAddress.reset();
  correspondenceAddress.reset();
  previousAddress.reset();
  person.reset();
  createJourney = null;
  ninoVersion = null;
};

var residentialAddress = {
  reset : function() {
    this.status = "live",
    this.line = addressOne,
    this.startDate = "01 Jan 1990",
    this.endDate = null,
    this.cherish = false,
    this.show = true,
    this.updated = false
  }
};
residentialAddress.reset();

// dateTwo : "30 Dec 2000",

var correspondenceAddress = {
  reset : function() {
    this.line = addressThree;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
  }
};
correspondenceAddress.reset();

var previousAddress = {
  reset : function() {
    this.status = "live";
    this.line = addressOne;
    this.startDate = null;
    this.endDate = null;
    this.cherish = false;
    this.show = false;
    this.correct = true;
  }
};
previousAddress.reset();

var updater = function(updatetype) {
  if(updatetype === "addCorrespondence") {
    correspondenceAddress.show = true;
  }
  //cherish - add
  if (updatetype === "updateAddCherish") {
    residentialAddress.cherish = "Flat A";
    residentialAddress.startDate = content.editDate;
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.cherish = false;
    previousAddress.show = true;
    previousAddress.correct = true;
  }
  //cherish - correct
  if (updatetype === "correctAddCherish") {
    residentialAddress.updated = true;
    residentialAddress.cherish = "Flat A";
    residentialAddress.startDate = "01 Jan 1990";
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    dataState.cherishedLineCorrected = true;
  }
  if(updatetype === "updateRemoveCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  if(updatetype === "correctChangeCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = false;
    previousAddress.show = true;
    residentialAddress.cherish = "Flat B";
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  if(updatetype === "correctRemoveCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = false;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    previousAddress.startDate = content.editDate;
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
    dataState.cherishedLineCorrected = true;
  }
  if(updatetype === "updateChangeCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = "Flat B";
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  // add new
  if (updatetype === "updateNew") {
    previousAddress.cherish = residentialAddress.cherish;
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressTwo;
    residentialAddress.updated = true;
  }
  if (updatetype === "updateStatus" || 
    updatetype === "updateStatusDLO" || 
    updatetype === "updateStatusLive") {
    residentialAddress.status = dataState.newStatus;
    residentialAddress.updated = true;
    if (residentialAddress.status === "nfa" || residentialAddress.status === "pwa") {
      previousAddress.line = addressOne;
      previousAddress.show = true;
      previousAddress.correct = true;
    } else {
      previousAddress.line = addressOne;
      previousAddress.show = true;
      previousAddress.correct = true;
    }
  }
  if(updatetype === "addCorrespondence") {
    dataState.correspondenceAdded = true;
  }
  if (updatetype === "end") {
    dataState.correspondenceAdded = false;   
    dataState.correspondenceRemoved = true;
    previousAddress.line = addressThree;
    previousAddress.show = true;
  }
  if (updatetype === "correctNew") {
    previousAddress.cherish = residentialAddress.cherish;
    previousAddress.line = addressOne;
    previousAddress.correct = false;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressTwo;
    residentialAddress.updated = true;
  }
  if (updatetype === "correctStatus" || 
    updatetype === "correctStatusDlo" || 
    updatetype === "correctStatusLive") {
    residentialAddress.status = dataState.newStatus;
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
  }
  if (updatetype === "correctDate") {
    residentialAddress.updated = true;
    residentialAddress.startDate = "30 Nov 1990";
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
  if (updatetype === "correctDateNotified") {
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
}
  
var dataState = {
  correctionType: 'toNew',
  currentStatus : "live",//dlo, pwa, nfa
  newStatus : "live",//dlo, pwa, nfa
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
  nameAdded : false,
  interestTransfered : false,
  addressCorrected : false,
  statusCorrected : false
};

var main = require('./main/routes');

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

var tempInterest;

router.use('/', main);
  // Route index page
  router.get('/', function (req, res) { 
      
  for (var key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      req.session.data[key] = defaults[key];
    }
  }
      
  //AUTHORITY ACCOUNT
  req.session.data.authority = authority;
  req.session.data.authority.reset();
    
  resetTempInterest(req.session.data.tempInterest);
  resetInterests();
  req.session.data.interests = interests;
    
  req.session.data.dob = "8 Feb 1940";
    
  req.session.data.updateOne = "20 May 1990";
  req.session.data.startOne = "20 May 1990";
  req.session.data.updateTwo = "5 Jun 2010";
  req.session.data.startTwo = "4 Jun 2010";
  req.session.data.updateThree = "30 Jan 2018";
  req.session.data.startThree = "29 Jan 2018";
  req.session.data.updateFour = "2 Feb 2018";
  req.session.data.startFour = "1 Feb 2018";
  req.session.data.dod = "20 Jan 2018";
  req.session.data.age = "78";
  req.session.data.creation = "11 Jan 1980";
    
  req.session.data.createJourney = null;
  req.session.data.prepopulatedDate = dates.todayAsFigure("/");    
  req.session.data.prepopulatedString = ( dates.convertDayToString( req.session.data.prepopulatedDate ) );    
  req.session.data.tests = "foo";    
    
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
  dataState.currentStatus = "live";
  dataState.newStatus = "live";
  //corrections
  dataState.cherishedLineCorrected = false;
  dataState.statusCorrected = false;

  pageTitle = "Update residential address";
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
})

/************/
/** UPDATE **/
/************/

/***************/
/** AUTHORITY **/
/***************/

//hb-handler
router.get(/hb-handler/, function (req, res) {
  req.session.data.authority.editHousing = true;
  res.redirect('check')
})

router.get(/ctax-handler/, function (req, res) {
  req.session.data.authority.editTax = true;
  res.redirect('check')
})

router.get(/authority-select-handler/, function (req, res) {
  if (req.query.ctr[0] === "true" ) {
    req.session.data.authority.editTax = true;
  } else {
    req.session.data.authority.editTax = false;
  }
  if (req.query.hb[0] === "true" ) {
    req.session.data.authority.editHousing = true;
  } else {
    req.session.data.authority.editHousing = false;
  }
  res.redirect('check')
})

router.get(/authority-check-handler/, function (req, res) {
  if ( req.session.data.authority.editTax === true ) {
    req.session.data.authority.taxReduction = "on";
  }
  if ( req.session.data.authority.editHousing === true ) {
    req.session.data.authority.housingBenefit = "on";
  }
  req.session.data.authority.added = true;
  req.session.data.authority.removed = false;
  req.session.data.authority.editTax = false;
  req.session.data.authority.editHousing = false;
  res.redirect('authority-account')
})

router.get(/authority-end-handler/, function (req, res) {
  if( req.session.data.authority.housingBenefit === "on" && req.session.data.authority.taxReduction === "on") {
    res.redirect('end-interest')
  } else if(req.session.data.authority.housingBenefit === "on") {
    req.session.data.authority.editHousing = true
    res.redirect('check-end')
  } else if(req.session.data.authority.taxReduction === "on") {
    req.session.data.authority.editTax = true
    res.redirect('check-end')
  }
})

//router.get(/authority-end-handler/, function (req, res) {
//  req.session.data.authority.added = false;
//  req.session.data.authority.removed = true;
//  if( req.session.data.authority.housingBenefit  === "on" && req.session.data.authority.taxReduction === "on") {
//    res.redirect('end-interest')
//  } else {
//    res.redirect('check-end')
//  }
//})

router.get(/authority-switch-handler/, function (req, res) {
  if (req.query.ctr[0] === "true" ) {
    req.session.data.authority.editTax = true;
  } else {
    req.session.data.authority.editTax = false;
  }
  if (req.query.hb[0] === "true" ) {
    req.session.data.authority.editHousing = true;
  } else {
    req.session.data.authority.editHousing = false;
  }
  res.redirect('check-end')
})

router.get(/authority-stop-handler/, function (req, res) {
  if (req.session.data.authority.editHousing === true && req.session.data.authority.editTax === true) {
    req.session.data.authority.taxReduction = "off";
    req.session.data.authority.housingBenefit = "off";
      req.session.data.authority.removed = true;
      req.session.data.authority.added = false;
      req.session.data.authority.editTax = false;
      req.session.data.authority.editHousing = false;
    res.redirect('authority-account')
  } else {
    if(req.session.data.authority.editHousing === true) {
      req.session.data.authority.housingBenefit = "off"
    }
    if(req.session.data.authority.editTax === true) {
      req.session.data.authority.taxReduction = "off";
    }
      req.session.data.authority.removed = true;
      req.session.data.authority.added = false;
      req.session.data.authority.editTax = false;
      req.session.data.authority.editHousing = false;
    res.redirect('authority-account')
  }
})


//PERSON

router.get(/edit-person-handler/, function (req, res) {
  var next = "gender/update";
  var item;
  var x;
  for (x in req.query.data) {
    item = req.query.data[x];
    if (item === "gender" ) {
      req.session.data.gender.state = "adding";
      next = "gender/add";
    } else if (item ===  "death") {
      req.session.data.adddDeath = true;
      next = "death/update";
    } else if (item ===  "pv") {
      req.session.data.adddPv = true;
      next = "pv/update";
    } else if (item === "nationality") {
      req.session.data.nationalityState = "adding";
      next = "nationality/update";
    } else if (item === "nifu") {
      req.session.data.nifu.state = "adding";
      req.session.data.nifu.value = "Yes";
      next = "check";
    } else if (item === "needs") {
      req.session.data.needsState = "adding";
      console.log("needs");
      next = "needs/update";
    } else if (item === "disability") {
      req.session.data.disability.state = "adding";
      next = "disability/update";
    } else if (item === "planguage") {
      req.session.data.adddPreferedLanguage = true;
      next = "prefered/update";
   } else if (item === "spokenlanguage") {
      req.session.data.adddSpokenLanguage = true;
      next = "spoken/update";
    } else if (item === "marital") {
      req.session.data.maritalState = "adding";
      next = "marital/update";
   } else if (item === "immigration") {
      req.session.data.adddImmigration = true;
      next = "immigration/update";
   }
  }
  res.redirect(next)
})

//check-person-handler
router.get(/check-person-handler/, function (req, res) {
  //nationality
  if (req.session.data.nationalityState === "adding") {
    req.session.data.nationalityState = "added";
    req.session.data.showNationality = true;
  } else if (req.session.data.nationalityState === "updating") {
    req.session.data.nationalityState = "updated";
  } else if (req.session.data.nationalityState === "correcting") {
    req.session.data.nationalityState = "corrected";
  //marital
  } else if (req.session.data.maritalState === "adding") {
    req.session.data.maritalState = "added";
    req.session.data.showMarital = true;
  } else if (req.session.data.maritalState === "updating") {
    req.session.data.maritalState = "updated";
  } else if (req.session.data.maritalState === "correcting") {
    req.session.data.maritalState = "corrected";
  //needs
  } else if (req.session.data.needsState === "adding") {
    req.session.data.needsState = "added";
    req.session.data.showNeeds = true;
  } else if (req.session.data.needsState === "correcting") {
    req.session.data.needsState = "corrected";
  } else if (req.session.data.needsState === "updating") {
    req.session.data.needsState = "updated";
  //disability
  } else if (req.session.data.disability.state === "adding") {
    req.session.data.disability.state = "added";
    req.session.data.disability.show = true;
  } else if (req.session.data.disability.state === "removing") {
    req.session.data.disability.state = "removed";
    req.session.data.disability.show = false;
    req.session.data.disability.value = false;
  } else if (req.session.data.disability.state === "correcting") {
    req.session.data.disability.state = "corrected";
  } else if (req.session.data.disability.state === "updating") {
    req.session.data.disability.state = "updated";
    req.session.data.disability.value = req.session.data.disabilityvalue;
  //nifu
  } else if (req.session.data.nifu.state === "adding") {
    req.session.data.nifu.state = "added";
    req.session.data.nifu.show = true;
  } else if (req.session.data.nifu.state === "updating") {
    req.session.data.nifu.state = "updated";
    req.session.data.nifu.show = false;
  } else if (req.session.data.nifu.state === "correcting") {
    req.session.data.nifu.state = "corrected";
    req.session.data.nifu.show = false;
  //nathan
  } else if (req.session.data.nathan.state === "adding") {
    req.session.data.nathan.value = req.session.data.nathanvalue;
    req.session.data.nathan.state = "added";
    req.session.data.nathan.show = true;
  } else if (req.session.data.nathan.state === "updating") {
    req.session.data.nathan.value = req.session.data.nathanvalue;
    req.session.data.nathan.state = "updated";
  }
  
  res.redirect('/account2/account')
})


//DISABILITY
router.get(/disability-type-handler/, function (req, res) {
  req.session.data.disability.state = req.query.data;
  if (req.session.data.disability.state === "updating" || req.session.data.disability.state === "correcting") {
    req.session.data.disabilityValue = flip(req.session.data.disabilityValue);
  }
  res.redirect('/update/person/check')
})
//router.get(/disability-type-handler/, function (req, res) {
//  req.session.data.disability.state = req.query.data;
//  console.log(req.session.data.disability.state);
//  if (req.session.data.disability.state === "removing") {
//    res.redirect('/update/person/check')
//  } else {
//    res.redirect('/update/person/disability/update')
//  }
//})

//NATIONALITY
router.get(/nationality-type-handler/, function (req, res) {
  req.session.data.nationalityState = req.query.data;
  res.redirect('/update/person/nationality/update')
})

//MARITAL
router.get(/marital-type-handler/, function (req, res) {
  console.log(req.query);
  req.session.data.maritalState = req.query.data;
  res.redirect('/update/person/marital/update')
})

//nifu
router.get(/nifu-type-handler/, function (req, res) {
  req.session.data.nifu.state = req.query.data;
  console.log(req.session.data.nifu.state);
  req.session.data.nifu.value = flip(req.session.data.nifu.value);
  res.redirect('/update/person/check')
})

//NEEDS
router.get(/sneeds-handler/, function (req, res) {
  res.redirect('/update/person/needs/update')
})

//GENDER
function changeSex(sex) {
  // req.session.data.sex = changeSex(req.session.data.sex);
  if(sex === "Male") {
   return "Female";
  } else if (sex === "Female") {
    return "Male";
  }
}

function updateGender(show, hide) {
  show = true;
  hide = false;
}

router.get(/add-gender-handler/, function (req, res) {
  if (req.query.data === "gra") {
    req.session.data.graState = "adding";
  } else {
    req.session.data.preGraState = "adding";
  }
  res.redirect('/update/person/gender/update')
})

router.get(/gender-type-handler/, function (req, res) {
  if (req.session.data.graState === "updating") {
    req.session.data.graState = req.query.data;
    console.log("graState = " + req.session.data.graState);
  } else {
    req.session.data.preGraState = req.query.data;
    console.log("preGraState = " + req.session.data.preGraState);
  }
  res.redirect('/update/person/gender/update')
})

router.get(/updating-handler/, function (req, res) {
  var feature = req.query.feature;
  var featureState = feature+"State";
  req.session.data[featureState] = req.query.state;
  if(req.query.feature === "preGra" || req.query.feature === "gra") {
    if (req.query.state == "adding") {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == "disability" || req.query.feature == "needs" || req.query.feature == "nifu") {
    res.redirect('/update/person/' + feature + '/type')
    console.log('/update/person/' + feature + '/type');
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/newupdate-handler/, function (req, res) {
  console.log(req.query);
  var feature = req.query.feature;
  var featureState = feature+"State";
  req.session.data[feature].state = req.query.state;
  if(req.query.feature === "preGra" || req.query.feature === "gra") {
    if (req.query.state == "adding") {
      res.redirect('/update/person/gender/update')
    } else {
      res.redirect('/update/person/gender/type')
    }
  } else if (req.query.feature == "disability" || req.query.feature == "needs" || req.query.feature == "nifu") {
    res.redirect('/update/person/' + feature + '/type')
    console.log('/update/person/' + feature + '/type');
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/update-gender-handler/, function (req, res) {
  //update
  if (req.session.data.preGraState === "updating" || req.session.data.graState === "updating") {
    if (req.query.data != req.session.data.sex) {
      if (req.session.data.preGraState === "updating") {
        console.log("here1");
        req.session.data.showPreGra = true;
        req.session.data.showGra = false;
        req.session.data.sex = changeSex(req.session.data.sex);
        console.log(req.session.data.sex);
      } else if (req.session.data.graState === "updating") {
        console.log("here2");
        req.session.data.showGra = true;
        req.session.data.showPreGra = false;
        req.session.data.sex = changeSex(req.session.data.sex);
        console.log(req.session.data.sex);
      }
    }
  }
  //add
  if (req.session.data.preGraState === "adding" || req.session.data.graState === "adding") {
    if (req.session.data.gender.state != "added") {
      req.session.data.sex = changeSex(req.session.data.sex);
      req.session.data.gender.state = "added";
    } else {
      if (req.query.data != req.session.data.sex) {
        if (req.session.data.preGraState === "adding") {
        console.log("here3");
        req.session.data.showPreGra = true;
        req.session.data.showGra = false;
        req.session.data.sex = changeSex(req.session.data.sex);
        } else if (req.session.data.graState === "adding") {
          console.log("here2");
          req.session.data.showGra = true;
          req.session.data.showPreGra = false;
          req.session.data.sex = changeSex(req.session.data.sex);
        }
      }
    }
  }
  res.redirect('/update/person/gender/check')
})

router.get(/check-gender-handler/, function (req, res) {
  if (req.session.data.preGraState === "adding") {
    req.session.data.preGraState = "added"
    req.session.data.showPreGra = true;
    req.session.data.sexChanged = true;
  } else if (req.session.data.graState === "adding") {
    req.session.data.graState = "added"
    req.session.data.showGra = true;
    req.session.data.sexChanged = true;
  } else if (req.session.data.preGraState === "updating") {
    req.session.data.preGraState = "updated"
  } else if (req.session.data.graState === "updating") {
    req.session.data.graState = "updated";
  } else if (req.session.data.graState === "correcting") {
    req.session.data.graState = "corrected";
  } else if (req.session.data.preGraState === "correcting") {
    req.session.data.preGraState = "corrected";
  }
  console.log(req.session.data.sex);
  req.session.data.gender.show = true;
  res.redirect('/account2/account')
})

//router.get(/add-gender-handler/, function (req, res) {
//  if(req.session.data.preGraAdded === true && req.session.data.graAdded === false) {
//    req.session.data.updateType = "addGra";
//  } else {
//    req.session.data.updateType = "addPreGra";
//  }
//  res.redirect('/update/person/gender/update-gender')
//})



/*********/
/** SEX **/
/*********/


router.get(/update-sex-handler/, function (req, res) {
  if (req.query.data === "gra") {
    req.session.data.updateType = "addGra";
  } else {
    req.session.data.updateType = "addPreGra";
  }
  res.redirect('/update/gender/update-gender')
})

router.get(/sex-adv-handler/, function (req, res) {
  req.session.data.updateType = "updateGender";
  res.redirect('/update/sex/update-sex')
})

router.get(/sex-simple-handler/, function (req, res) {
  req.session.data.updateType = "correctSex";
  res.redirect('/update/sex/check')
})

router.get('/sex/update', function (req, res) {
  req.session.data.updateType = "updateGender";
  res.render('update/sex/update')
})

router.get(/check-sex-handler/, function (req, res) {
  if(req.session.data.updateType === "correctSex") {
    req.session.data.sexChanged = true;
  } else {
    req.session.data.genderUpdated = true;
  }
  req.session.data.sex = "Female";
  res.redirect('../../account2/account')
})


/**********/
/** NAME **/
/**********/

//change-type-handler
router.get(/change-type-handler/, function (req, res) {
  if (req.query.name === "one") {
    req.session.data.updateType = "changeNameOne";  
  } else if (req.query.name === "two") {
    req.session.data.updateType = "changeNameTwo";  
  } else { //requested
    req.session.data.updateType = "changeRequested";  
  }
  res.redirect('../update/name/update')
})

router.get(/add-handler/, function (req, res) {
  if(req.session.data.hasNameTwo == true) {
    req.session.data.updateType = "addRequestedName";
    res.redirect('../../update/name/requested-name')
  } else if(req.session.data.hasRequestedName == true) {
    req.session.data.updateType = "addNameTwo";
    res.redirect('../../update/name/update-name')
  } else {
    res.redirect('../../update/name/add')
  }
})

//change name
router.get(/change-name-handler/, function (req, res) {
  var nextPage = "update-name";
  if(req.query.data === "update") {
    if(req.session.data.updateType == "changeRequested") {
      nextPage = 'requested-name';
      req.session.data.updateType = "updateRequestedName";
    } else if (req.session.data.updateType == "changeNameTwo") {
      req.session.data.updateType = "updateNameTwo";
    } else if (req.session.data.updateType == "changeNameOne") {
      req.session.data.updateType = "updateNameOne";
    }
  } else if (req.query.data === "correct") {
    if(req.session.data.updateType == "changeRequested") {
      req.session.data.updateType = "correctRequestedName";
      nextPage = 'requested-name';
    } else if (req.session.data.updateType == "changeNameTwo") {
      req.session.data.updateType = "correctNameTwo";
    } else if (req.session.data.updateType == "changeNameOne") {
      req.session.data.updateType = "correctNameOne";
    }
  } else if (req.query.data === "remove") {
    nextPage = "remove"
    if(req.session.data.updateType == "changeNameTwo") {
      req.session.data.updateType = "removeNameTwo";
    } else {
      req.session.data.updateType = "removeRequestedName";
    }
  }
  res.redirect(nextPage)
})

//add name
router.get(/add-name-handler/, function (req, res) {
  if(req.query.data === "requested") {
    req.session.data.updateType = "addRequestedName"
    dataState.nameAdded = true;
    res.redirect('requested-name')
  } else {
    req.session.data.updateType = "addNameTwo"
    dataState.typeTwoAdded = true;
    res.redirect('update-name')
  }
})

router.get(/check-name-handler/, function (req, res) {
  if(req.session.data.updateType === "updateNameOne") {
    req.session.data.nameOneUpdated = true;
  } else if(req.session.data.updateType === "correctNameOne") {
    req.session.data.nameOneCorrected = true;
  } else if(req.session.data.updateType === "addNameTwo") {
    req.session.data.hasNameTwo = true;
    req.session.data.nameTwoAdded = true;
  } else if(req.session.data.updateType === "updateNameTwo") {
    req.session.data.nameTwoUpdated = true;
  } else if(req.session.data.updateType === "correctNameTwo") {
    req.session.data.nameTwoCorrected = true;
  } else if(req.session.data.updateType === "removeNameTwo") {
    req.session.data.hasNameTwo = false;
    req.session.data.nameTwoRemoved = true;
  } else if(req.session.data.updateType === "addRequestedName") {
    req.session.data.hasRequestedName = true;
    req.session.data.requestedNameAdded = true;
  } else if(req.session.data.updateType === "updateRequestedName") {
    req.session.data.requestedNameUpdated = true;
  } else if(req.session.data.updateType === "correctRequestedName") {
    req.session.data.requestedNameCorrected = true;
  } else if(req.session.data.updateType === "removeRequestedName") {
    req.session.data.hasRequestedName = false;
    req.session.data.requestedNameRemoved = true;
  }
  res.redirect('../../account2/account')
})


/*************/
/** ADDRESS **/
/*************/

//account2
router.get('/account2/account', function (req, res) {
  res.render('account2/account.html', {
    nameOneUpdated : req.session.data.nameOneUpdated,
    nameOneCorrected : req.session.data.nameOneCorrected,

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
    nameAdded : dataState.nameOneCorrected,
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
  })
})

//account
router.get('/update/account', function (req, res) {
  res.render('update/account.html', {
    nameOneUpdated : req.session.data.nameOneUpdated,
    nameOneCorrected : req.session.data.nameOneCorrected,
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

router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/update', function (req, res) {
  res.render('update/update', {
    correspondence : dataState.correspondenceAdded,
    pagetitle : content.pageTitle
  })
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

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    pagetitle : content.pageTitle
  })
})

router.get('/update/status', function (req, res) {
  res.render('update/status', {
    pagetitle : content.pageTitle,
    status : dataState.currentStatus
  })
})

router.get(/status-handler/, function (req, res) {
  dataState.newStatus = req.query.data;
//  dataState.statusUpdated = true;
  if (dataState.newStatus === "live") {
    if (dataState.currentStatus == "nfa" || dataState.currentStatus == "pwa") {
      res.redirect('address-search')
    } else {
      res.redirect('dates')
    }
  } else {
    if (req.session.data.updateType != "correctStatus") {
      res.redirect('dates')
    } else {
      res.redirect('check')
    }
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

router.get('/update/cherish-handler', function (req, res) {
  if (req.session.data.updateType === "updateAddCherish") {
    res.redirect('dates')
  }
  if (req.session.data.updateType === "correctAddCherish") {
    res.redirect('check')
  }
  if (req.query.data === "remove_cherish") {
    if (req.session.data.updateType === "correctCherish") {
      req.session.data.updateType = "correctRemoveCherish";
      content.setPageTitle(req.session.data.updateType);
      res.redirect('check')
    } 
    if (req.session.data.updateType === "updateCherish") {
      req.session.data.updateType = "updateRemoveCherish";
      content.setPageTitle(req.session.data.updateType);
      res.redirect('dates')
    }
  }
  if (req.query.data === "change_cherish") {
    if (req.session.data.updateType === "correctCherish") {
      req.session.data.updateType = "correctChangeCherish";
      content.setPageTitle(req.session.data.updateType);
      res.redirect('check')
    } 
    if (req.session.data.updateType === "updateCherish") {
      req.session.data.updateType = "updateChangeCherish";
      content.setPageTitle(req.session.data.updateType);
      res.redirect('dates')
    }
  }
})

router.get('/update/address-search', function (req, res) {
  res.render('update/address-search', {
    pagetitle : content.pageTitle
  })
})

router.get('/update/search-results', function (req, res) {
  res.render('update/search-results', {
    pagetitle : content.pageTitle
  })
})

router.get(/dates-handler/, function (req, res) {
  res.redirect('/update/check')
})

router.get(/update-type-handler/, function (req, res) {
  if (req.query.data == 'add_correspondence') {
    req.session.data.updateType = "addCorrespondence";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/address-search')
    //status
  } else if (req.query.data === 'update_status') {
    req.session.data.updateType = "updateStatus";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('status')
  } else if (req.query.data === 'update_status_dlo') {
    req.session.data.updateType = "updateStatusDLO";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "dlo";
    res.redirect('dates')
  } else if (req.query.data === 'update_live') {
    req.session.data.updateType = "updateStatusLive";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "live";
    if (dataState.currentStatus == "nfa" || dataState.currentStatus == "pwa") {
      res.redirect('/update/address-search')
    } else {
      res.redirect('/update/dates')
    }
  } else if (req.query.data === 'update_new') {
    req.session.data.updateType = "updateNew";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/address-search')
    //corrections
  } else if (req.query.data === 'correct_new') {
    req.session.data.updateType = "correctNew";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/address-search')
    //status
  } else if (req.query.data === 'correct_status') {
    req.session.data.updateType = "correctStatus";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/status')
  } else if (req.query.data === 'correct_dlo') {
    req.session.data.updateType = "correctStatusDlo";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "dlo";
    res.redirect('/update/check')
  } else if (req.query.data === 'correct_live') {
    req.session.data.updateType = "correctStatusLive";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "live";
    res.redirect('/update/check')
    //date
  } else if (req.query.data === 'correct_date') {
    req.session.data.updateType = "correctDate";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/dates')
  } else if (req.query.data === 'correct_date_notified') {
    req.session.data.updateType = "correctDateNotified";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/dates')
    //cherish
  } else if (req.query.data === 'update_add_cherish') {
    req.session.data.updateType = "updateAddCherish";
    dataState.cherished = true;
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/cherish-line')
  } else if (req.query.data === 'update_cherish') {
    req.session.data.updateType = "updateCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/cherish-line')
  } else if (req.query.data === 'correct_cherish') {
    req.session.data.updateType = "correctCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/cherish-line')
  } else if (req.query.data === 'correct_add_cherish') {
    req.session.data.updateType = "correctAddCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/cherish-line')
  } else if (req.query.data === 'update_remove_cherish') {
    req.session.data.updateType = "updateRemoveCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/dates')
    //end
  } else if (req.query.data === 'end') {
    req.session.data.updateType = "end";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('/update/dates')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (req.session.data.updateType === "correctNew") {
    res.redirect('/update/check')
  } else {
    res.redirect('/update/dates')
  }
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    addressone : addressOne,
    addresstwo : addressTwo,
    addressthree : addressThree,
    addressfour : addressFour,
    editdate : content.editDate,
    correctiontype :dataState.correctionType,
    correcting : dataState.correcting,
    pagetitle : content.pageTitle,
    currentstatus : content.statusToText(dataState.currentStatus),
    newstatus : content.statusToText(dataState.newStatus)
  })
})

router.get(/check-answers-handler/, function (req, res) {
  updater(req.session.data.updateType);
  if(req.session.data.updateType === "addCorrespondence") {
    dataState.correspondenceAdded = true;
  }
  if (req.session.data.updateType === "updateNew") {
    dataState.updatedToNewAddress = true;
    dataState.currentStatus = "live";
  }
  if (req.session.data.updateType === "updateStatus" || 
      req.session.data.updateType === "updateStatusDLO" || 
      req.session.data.updateType === "updateStatusLive") {
      dataState.statusUpdated = true; 
      dataState.currentStatus = dataState.newStatus;
  }
  if (req.session.data.updateType === "correctStatus" || 
      req.session.data.updateType === "correctStatusDlo" || 
      req.session.data.updateType === "correctStatusLive") {
      dataState.statusCorrected = true; 
      dataState.currentStatus = dataState.newStatus;
  }
  if (req.session.data.updateType === "correctNew") {
    dataState.addressCorrected = true;   
  }
  if (req.session.data.updateType === "correctDate") {
    dataState.dateIsUpdated = true;   
  } 
  if (req.session.data.updateType === "correctCherish") {
    dataState.cherishedLineCorrected = true;   
  }
  if (req.session.data.updateType === "end") {
    dataState.correspondenceAdded = false;   
    dataState.correspondenceRemoved = true;   
  }
  res.redirect('/account2/account')
})



//*********
//Version 1
//*********

var previousAddresses = false;

router.get(/check-handler-v1/, function (req, res) {
  if(req.session.data.updateType === "add") {
    correspondence = true;
  }
  if (req.session.data.updateType === "address") {
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
    req.session.data.updateType = "status";
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    req.session.data.updateType = "cherish";
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = "dlo";
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    req.session.data.updateType = "dlo";
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    req.session.data.updateType = "address";
    res.redirect('address-search')
  }
})

router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == "add") {
    req.session.data.updateType = "new";
    res.render('update/address-search')
  } else if (req.query.tochange == "correct"){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

router.get(/correction-type-handler/, function (req, res) {
  var next = "update/dates";
  if(req.query.data === 'new') {
  dataState.correctionType = "toNew";
    next = "update/address-search"
  } else if(req.query.data === 'status') {
   dataState.correctionType = "status";
    next = "update/status"
  } else if(req.query.data === 'date') {
   dataState.correctionType = "date";
  } else if(req.query.data === 'cherish') {
    next = "update/cherish"
   dataState.correctionType = "cherish";
  } else if (req.query.data == "correct"){
    res.render('update/correct')
    res.redirect('address-search')
  } 
  res.render(next);
})


//***********
// INTERESTS 
//***********

router.get(/add-int-handler/, function (req, res) {
  res.redirect("/update/interests/add-interest");
})

var counter;

router.get(/add-interest-handler/, function (req, res) {
  
//Child Support Reform - 1:24, 3:71, 3:72
//Bereavement Allowance - 1:24, 2:24
//Bereavement Benefit - 1:24, 2:24, 3:71, 3:72
//Jobseeker's Allowance - 1:24, 1:70, 2:24, 2:70, 3:71, 3:72
//Winter Fuel Payment - 3:71 - DONE
//Carers Credit - 1:70 - DONE

  req.session.data.updateType = "addInterest";
  resetToDefaults();
  tempInterest.live = true;
  tempInterest.title = req.query.title;
  tempInterest.startDate = dates.convertDayToString(req.query.startdate);
  if(tempInterest.title === "Carers Credit") {
    tempInterest.system = "sys";
    res.redirect("add-party");
  } else if (tempInterest.title === "Bereavement Support Payment") {
    tempInterest.system = "sys";
    res.redirect("add-party");
  } else if (tempInterest.title === "Winter Fuel Payment") {
    tempInterest.system = "sys";
    res.redirect("add-party");
  } else {
    res.redirect("add-system");
  }
})

router.get(/interest-check-handler/, function (req, res) {
  if (req.session.data.updateType === "addInterest") {
    addInterest(tempInterest);
    dataState.interestAdded = true;   
  }
  resetTempInterest(req.session.data.tempInterest);
  if (req.session.data.updateType === "transferInterest") {
    dataState.interestTransfered = true;
  }
  res.redirect("../account");
})

router.get(/change-interest-handler/, function (req, res) {
  var y = parseInt(req.query.tempPos);
  tempInterest = interests[y];
  res.redirect("/update/interests/update-interest");
})

router.get(/update-interest-handler/, function (req, res) {
  if (req.query.data === "end-parties") {
    req.session.data.updateType = "endfParties"
    res.redirect("end-party");
  } else if (req.query.data === "transfer") {
    req.session.data.updateType = "transferInterest"
    res.redirect("transfer-interest");
  } else  {
    req.session.data.updateType = "endInterest"
    res.redirect("end-interest");
  }
})

router.get(/end-interest-handler/, function (req, res) {
  tempInterest.live = false;
  dataState.interestRemoved = true;
  res.redirect("../account");
})

router.get('/add-system', function (req, res) {
  res.render("add-party", {
    tempInterest : tempInterest
  });
})

router.get(/add-system-handler/, function (req, res) {
  tempInterest.system = req.query.system;
  res.redirect("add-party");
})

router.get('/update/interests/add-system', function (req, res) {
  res.render('update/interests/add-system', {
    tempInterest : tempInterest
  })
})

router.get(/party-handler/, function (req, res) {
  if (req.query.own == "true") {
    tempInterest.owning = true;
  } else {
    tempInterest.owning = false;
  }
  if (req.query.broadcasting == "true") {
    tempInterest.broadcasting = true;
  } else {
    tempInterest.broadcasting = false;
  }
  if (req.query.maint == "true") {
    tempInterest.maintained = true;
  } else {
    tempInterest.maintained = false;
  }
  res.redirect("check");
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


//router.get('/update/check', function (req, res) {
//  res.render('update/check', {
//    addressone : addressOne,
//    addresstwo : addressTwo,
//    addressthree : addressThree,
//    addressfour : addressFour,
//    editdate : content.editDate,
//    correctiontype :dataState.correctionType,
//    correcting : dataState.correcting,
//    pagetitle : content.pageTitle,
//    currentstatus : content.statusToText(dataState.currentStatus),
//    newstatus : content.statusToText(dataState.newStatus)
//  })
//})


//*****************
// ACCOUNT CREATION 
//*****************

/*
Create
Cant see:
Name Start Date
Name Notified Start Date
are pre populated with the current system date. 


Update/insert
Can edit:
Name Start Date
Name Notified Start Date
are pre populated with the current system date. 
dont see trace
*/

//************
//All versions
//************


//special-needs
router.get(/check-handler/, function (req, res) {
  if(trace === true) {
    res.redirect('trace')
  } else {
    res.redirect('done')
  }
})

//other-name-handler
router.get(/other-name-handler/, function (req, res) {
  var next = "dob";
  if (req.query.requested[0] === "true") {
    person.rfa_name = true;
    next = "name-requested";
  }
  if (req.query.previous[0] === "true") {
    person.previous_name = true;
    next = "name-previous";
  }
  if (req.query.alternative[0] === "true") {
    person.alternative_name = true;
    next = "name-alternative";
  }
  res.redirect(next)
})

//alternative-name-handler
router.get(/alternative-name-handler/, function (req, res) {
  var next = "dob";
  if (person.rfa_name === true) {
    next = "name-requested";
  }
  if (person.previous_name === true) {
    next = "name-previous";
  }
  res.redirect(next)
})

//previous-question-handler
router.get(/previous-question-handler/, function (req, res) {
  if (req.query.data === "yes") {
    person.previous_name_count++;
    res.redirect('name-previous')
  } else if (person.rfa_name === true) {
    res.redirect('name-requested')
  } else {
    res.redirect('dob')
  }
})

//correspondence-address-handler
router.get(/correspondence-address-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    res.redirect('search-correspondence')
  } else {
    person.correspondence_address = false;
    res.redirect('address-question')
  }
})

//manual-address-handler
router.get(/manual-handler/, function (req, res) {
  if (person.previous_address != null) {
    res.redirect('contact-question')
  } else {
    res.redirect('address-question')
  }
})


//correspondence-address-handler
router.get(/correspondence-results-handler/, function (req, res) {
  if(person.previous_address === null) {
    res.redirect('address-question')
  } else {
    res.redirect('contact-question')
  }
})

//search-results-handler
router.get(/address-stat-handler/, function (req, res) {
  if (req.query.data === 'live' || req.query.data === 'dlo') {
    res.redirect('address-search')
  } else {
    res.redirect('search-correspondence')
  }  
})

//search-handler
router.get(/search-handler/, function (req, res) {
  if (req.query.uk === "no") {
    res.redirect('correspondence-question')
  } else {
    res.redirect('search-results')
  }
})

//search-handler
router.get(/mauual-previous-handler/, function (req, res) {
  person.previous_address_count++;
  res.redirect('address-question')
})

//search-previous-handler
router.get(/s-previous-handler/, function (req, res) {
  if (req.query.uk === "no") {
    res.redirect('contact-question')
  } else {
    res.redirect('previous-results')
  }
})

//search-previous-handler
router.get(/s-correspondence-handler/, function (req, res) {
  person.correspondence_address = true;
  if (req.query.uk === "no") {
    if (person.previous_address === null) {
      res.redirect('address-question')
    } else {
      res.redirect('contact-question')
    }
  } else {
    res.redirect('correspondence-results')
  }
})

//previous-address-handler
router.get(/previous-address-handler/, function (req, res) {
  var next;
  if (person.previous_address_count === 0) {
    if (req.query.data === 'yes') {
      person.previous_address = true;
    } else {
      person.previous_address = false;
    }
    person.previous_address_count++;
  }
  if (req.query.data === 'yes') {
    next = 'search-previous';
  } else if (person.correspondence_address === null) {
    next = 'correspondence-question';
  } else {
    next = 'contact-question';
  }
  res.redirect(next)
})
////previous-address-handler
//router.get(/previous-address-handler/, function (req, res) {
//  if (person.previous_address_count === 0) {
//    if (req.query.data === 'yes') {
//      person.previous_address = true;
//      res.redirect('search-previous')
//    } else {
//      person.previous_address = false;
//    }
//    person.previous_address_count++;
//  }
//  if (req.query.data === 'yes') {
//    res.redirect('search-previous')
//  } else if (person.correspondence_address === null) {
//    res.redirect('correspondence-question')
//  } else {
//    res.redirect('contact-question')
//  }
//})

//contact-handler
router.get(/contact-handler/, function (req, res) {
  if (req.query.data === "telephone") {
    res.redirect('telephone')
  } else if (req.query.data === "email") {
    res.redirect('email')
  } else {
    res.redirect('mobile')
  }
})
  // enter name
  // other name - no
  // previous name - no
  // dob
  
  // enter name
  // other name - yes
  // enter other name
  // no previous name
  // dob
  
  // enter name
  // other name - no
  // previous name - yes
  // previous name
  // another previous name - no
  // dob
  
////first-name-handler
//router.get(/main-name-handler/, function (req, res) {
//  if (person.requested_name === null) {
//    res.redirect('requested-name')
//  } else {
//    if (person.previous_name_count < 2) {
//      res.redirect('previous-name')
//    } else {
//      res.redirect('dob')
//    }
//  }
//})

//requested-name-handler
router.get(/requested-name-handler/, function (req, res) {
  if (req.query.data === "yes") {
    person.requested_name = true;
    res.redirect('name-requested')
  } else {
    person.requested_name = false;
    res.redirect('previous-name')
  }
})

//ethnic-handler
router.get(/ethnic-origin-handler/, function (req, res) {
  person.ethnic_origin = true;
  res.redirect('task-list')
})

//immigration-handler
router.get(/immigration-handler/, function (req, res) {
  person.immigration = true;
  res.redirect('task-list')
})

//prefered-language-handler
router.get(/prefered-language-handler/, function (req, res) {
  person.preferred_language = true;
  res.redirect('task-list')
})

//spoken-language-handler
router.get(/spoken-language-handler/, function (req, res) {
  person.spoken_language = true;
  res.redirect('task-list')
})

//disability-handler
router.get(/disability-handler/, function (req, res) {
  person.disability = true;
  res.redirect('task-list')
})

//special-needs-handler
router.get(/special-needs-handler/, function (req, res) {
  person.special_needs = true;
  res.redirect('task-list')
})

//type-handler
router.get(/v1-type-handler/, function (req, res) {
  ninoVersion = 1;
  if(req.query.data === "create") {
    req.session.data.createJourney = true;
  } else {
    req.session.data.createJourney = false;
  }
  res.redirect('../../search')
})

router.get(/v2-type-handler/, function (req, res) {
  ninoVersion = 2;
  if(req.query.trace[0] === "true") {
    trace = true;
  }
  if(req.query.data === "create") {
    req.session.data.createJourney = true;
  } else {
    req.session.data.createJourney = false;
  }
  res.redirect('../../search')
})

router.get(/v3-type-handler/, function (req, res) {
  ninoVersion = 3;
  if(req.query.trace[0] === "true") {
    trace = true;
  }
//  if(req.query.sixteen[0] === "true") {
//    underSixteen = true;
//  } else {
//    underSixteen = false;
//  }
  if(req.query.data === "create") {
    req.session.data.createJourney = true;
  } else {
    req.session.data.createJourney = false;
  }
  res.redirect('../../search')
})

//contact-handler
router.get(/contact-question-handler/, function (req, res) {
  if(req.query.data === "yes") {
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//non-mandatory-handler
router.get(/v2-non-mandatory-handler/, function (req, res) {
  if (req.query.data === "yes") {
    res.redirect('task-list')
  } else {
    res.redirect('check')
  }
})


//*********
//Version 3
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == "yes"){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//current-name
router.get('/nino/5/name-current/', function (req, res) {
  res.render('nino/5/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/5/name-alternative/', function (req, res) {
  res.render('nino/5/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/5/name-previous/', function (req, res) {
  res.render('nino/5/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/5/address-search/', function (req, res) {
  res.render('nino/5/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/5/search-results/', function (req, res) {
  res.render('nino/5/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/5/previous-results/', function (req, res) {
  res.render('nino/5/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/5/search-correspondence/', function (req, res) {
  res.render('nino/5/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/5/correspondence-results/', function (req, res) {
  res.render('nino/5/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/5/name-requested/', function (req, res) {
  res.render('nino/5/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/previous-name/', function (req, res) {
  res.render('nino/5/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-correspondence/', function (req, res) {
  res.render('nino/5/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-previous/', function (req, res) {
  res.render('nino/5/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/5/previous-names/', function (req, res) {
  res.render('nino/5/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/5/address-question/', function (req, res) {
  res.render('nino/5/address-question', {
    person : person
  })
})

//nationality
router.get(/v3-nationality-handler/, function (req, res) {
  if(underSixteen === true) {
    res.redirect('check')
  } else {
    res.redirect('marital')
  }
})


//check
router.get('/nino/5/check/', function (req, res) {
  res.render('nino/5/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/5/check-v2/', function (req, res) {
  res.render('nino/5/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/5/task-list/', function (req, res) {
  res.render('nino/5/task-list', {
    person : person
  })
})


//*********
//Version 2
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == "yes"){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})


//current-name
router.get('/nino/4/name-current/', function (req, res) {
  res.render('nino/4/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/4/name-alternative/', function (req, res) {
  res.render('nino/4/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/4/name-previous/', function (req, res) {
  res.render('nino/4/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/4/address-search/', function (req, res) {
  res.render('nino/4/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/4/search-results/', function (req, res) {
  res.render('nino/4/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/4/previous-results/', function (req, res) {
  res.render('nino/4/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/4/search-correspondence/', function (req, res) {
  res.render('nino/4/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/4/correspondence-results/', function (req, res) {
  res.render('nino/4/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/4/name-requested/', function (req, res) {
  res.render('nino/4/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/previous-name/', function (req, res) {
  res.render('nino/4/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-correspondence/', function (req, res) {
  res.render('nino/4/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-previous/', function (req, res) {
  res.render('nino/4/manual-previous', {
    person : person
  })
})

//address-question
router.get('/nino/4/address-question/', function (req, res) {
  res.render('nino/4/address-question', {
    person : person
  })
})

//check
router.get('/nino/4/check/', function (req, res) {
  res.render('nino/4/check', {
    today : dates.todayAsString()
  })
})

//check
router.get('/nino/4/check-v2/', function (req, res) {
  res.render('nino/4/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/4/task-list/', function (req, res) {
  res.render('nino/4/task-list', {
    person : person
  })
})

//check-handler
router.get(/check-handler/, function (req, res) {
  if(trace === true) {
    res.redirect('trace')
  } else {
    res.redirect('done')
  }
})


//*********
//Version 1
//*********

//task-list
router.get('/nino/2/task-list/', function (req, res) {
  res.render('nino/2/task-list', {
    person : person
  })
})

module.exports = router

//1714