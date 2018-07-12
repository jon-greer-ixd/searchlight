var express = require('express');
var router = express.Router();

var addressOne = "1 Current Crescent";
var addressTwo = "2 New Street";
var addressThree = "7 Post Street";
var addressFour = "Gateshead, Tyne and Wear NE1 1HH";

var content = require('./content.js').content;

var Interest = require('./interest.js');

var defaults = require('./defaults.js').defaults;

var contactTypes = require('./defaults.js').contactTypes;

var flip = require('./defaults.js').flip;

var setState = require('./defaults.js').setState;

var changeSex = require('./defaults.js').changeSex;

var messageCentre = require('./defaults.js').messageCentre;


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

// simple search page for interests
router.get('/search-v3', function (req, res) {
  res.render('pages/search-v3.njk', {
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
    
  req.session.data.details = require('./defaults.js').details;
  req.session.data.personalDetails = require('./defaults.js').personalDetails;
  req.session.data.contactTypes = contactTypes;
  req.session.data.authority = require('./defaults.js').authority;
      
//  for (var item in contactTypes) {
//    if (contactTypes.hasOwnProperty(item)) {
//      req.session.data[item] = contactTypes[item];
//    }
//  }
          
  resetTempInterest(req.session.data.tempInterest);
  resetInterests();
  req.session.data.interests = interests;    
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

//add
router.get(/interest-change-handler/, function (req, res) {
  req.session.data.tempInterest = req.query.interest;
  req.session.data.interestState = req.query.state;
  if (req.query.state == "ending" && req.query.interest != "both") {
    res.redirect('/update/auth-interests/check')
  } else {
    res.redirect('/update/auth-interests/interest-detail')
  }
})

//check
router.get(/authority-handler/, function (req, res) {
  for (var y in req.session.data.authority) {
    if ( req.session.data.authority[y].state == "added" ) {
      req.session.data.authority[y].state = "existing";
    }
    if ( req.session.data.authority[y].state == "ended" ) {
      req.session.data.authority[y].state = "old";
    }
  }
  //adding
  if(req.session.data.interestState == "adding") {
    if (req.session.data.ctr == "true" ) {
      req.session.data.authority.councilTaxReduction.state = "added";
      req.session.data.authority.councilTaxReduction.show = true;
    }
    if (req.session.data.hb == "true" ) {
      req.session.data.authority.housingBenefit.state = "added";
      req.session.data.authority.housingBenefit.show = true;
    }
  //updating
  } else if (req.session.data.interestState == "updating") {
    req.session.data.authority[req.session.data.tempInterest].state = "added";
    req.session.data.authority[req.session.data.tempInterest].show = true;
  //ending
  } else { //ending
    if (req.session.data.ctr == "true" ) {
      req.session.data.authority.councilTaxReduction.state = "ended";
      req.session.data.authority.councilTaxReduction.show = false;
    }
    if (req.session.data.hb == "true" ) {
      req.session.data.authority.housingBenefit.state = "ended";
      req.session.data.authority.housingBenefit.show = false;
    }
    if (req.session.data.tempInterest != "both") {
      req.session.data.authority[req.session.data.tempInterest].state = "ended";
      console.log(req.session.data.tempInterest);
      console.log(req.session.data.authority[req.session.data.tempInterest]);
      req.session.data.authority[req.session.data.tempInterest].show = false;
    }
  }
  req.session.data.ctr = null;
  req.session.data.hb = null;
  res.redirect('authority-account')
})

//CONTACT

router.get(/contact-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.contactType = req.query.contactType;
  res.redirect('/update/contact/update-type')
})

router.get(/update-contact-handler/, function (req, res) {
  req.session.data.preferredContactState = null;
  var next = "check";
  if (req.query.data == "updating" || req.query.data == "correcting") {
    req.session.data.contactState = req.query.data;
    next = "contact-details";
  } else if (req.query.data == "removing") {
    req.session.data.contactState = req.query.data;
    next = "end";
  } else if (req.query.data == "removePref") {
     req.session.data.preferredContactState = "removing";
  } else if (req.query.data == "setPref") {
     req.session.data.preferredContactState = "updating";
  }
    console.log(`preferredContactState = ${req.session.data.preferredContactState}`);
  res.redirect(next);
})

router.get(/contact-type-handler/, function (req, res) {
  var method = req.query.data;
  req.session.data[method].state = "adding";
  res.redirect(method)
})

router.get(/pref-handler/, function (req, res) {
  if (req.query.pref != "true") {
    req.session.data.pref = false;
  }
  res.redirect('check')
})

//** check-contact-handler **
router.get(/check-contact-handler/, function (req, res) {  
  function setSelectedContactState(newState) {
    req.session.data.contactTypes[req.session.data.contactType].state = newState;
    req.session.data.toaster = messageCentre(
      req.session.data.contactTypes[req.session.data.contactType].display, 
      req.session.data.contactTypes[req.session.data.contactType].type, 
      req.session.data.contactState);
  }
  function setSelectedContactToShow(show) {
    req.session.data.contactTypes[req.session.data.contactType].show = show;
  }
  //reset the states to existing
  for (var y in req.session.data.contactTypes) {
    if (req.session.data.contactTypes[y].state == "added" ) {
      req.session.data.contactTypes[y].state = "existing";
    }
  }
  //adding new
  if(req.session.data.contactState == "adding" ) {
    req.session.data.showContact = true;
    setSelectedContactToShow(true);
    setSelectedContactState("added");
  }
  //updating
  if(req.session.data.contactState == "updating" ) {
    setSelectedContactState("updated");
  }
  //removing
  if(req.session.data.contactState == "removing" ) {
    setSelectedContactState("removed");
    setSelectedContactToShow(false);
  }
  //correcting
  if(req.session.data.contactState == "correcting" ) {
    setSelectedContactState("corrected");
  }
  //update preference
  if (req.session.data.pref == "true" || req.session.data.preferredContactState == "updating") {
    for (var x in req.session.data.contactTypes) {
      req.session.data.contactTypes[x].pref = false;
    }
    req.session.data.contactTypes[req.session.data.contactType].pref = true;
  } else {
    req.session.data.contactTypes[req.session.data.contactType].pref = false;
  }
  if (req.session.data.preferredContactState == "updating") {
    req.session.data.preferredContactState = "updated";
    req.session.data.toaster = messageCentre("preferred method of contact", null, "set");
  }
  //remove preference
  if ( req.session.data.preferredContactState == "removing") {
    req.session.data.toaster = messageCentre("preferred contact state", null, "removed");
    req.session.data.preferredContactState = "removed";
  }
  if (req.session.data.exdirectory == "true") {
    req.session.data.contactTypes.homeTelephone.exD = true;
  } else {
    req.session.data.contactTypes.homeTelephone.exD = false;
  }
  //reset
  req.session.data.pref = false;
  req.session.data.exdirectory = false;
  req.session.data.contactState = null;
  //redirect
  res.redirect('/account2/account')
})


//PERSON
router.get(/add-person-handler/, function (req, res) {
  console.log(req.session.data.personalDetail);
  req.session.data.editState = "adding";
  if (req.session.data.personalDetail == "nifu") {
    req.session.data.personalDetailValue = "Yes";
    res.redirect("/update/person/check");
  } else if (req.session.data.personalDetail == "disability" ) {
    req.session.data.personalDetailValue = "Disabled";
    res.redirect("/update/person/check");
  } else if (req.session.data.personalDetail == "gender") {
    res.redirect("/update/person/gender/add");
  } else {
    res.redirect("/update/person/update");
  }
})



router.get(/pv-update-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.personalDetail = "pv";
  req.session.data.editState = "adding";
  res.redirect('/update/person/update')
})

router.get(/person-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.personalDetail = req.query.personalDetail;
  if (req.session.data.personalDetail == "sex") {
    req.session.data.editState = "correcting";
    req.session.data.personalDetailValue = changeSex(req.session.data.personalDetails.sex.value);
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == "dateOfDeath" || req.session.data.personalDetail == "dateOfBirth") {
    req.session.data.editState = "correcting";
    res.redirect('/update/person/update')
  } else if (req.session.data.personalDetail == "recordLevel") {
    req.session.data.editState = "updating";
    res.redirect('/update/person/update')
  } else {
    res.redirect('/update/person/type')
  }
})

router.get(/change-person-type-handler/, function (req, res) {
  req.session.data.editState = req.query.data;
  if (req.session.data.personalDetail == "nationality" || req.session.data.personalDetail == "pv" || req.session.data.personalDetail == "maritalStatus" ) {
//    if (req.session.data.editState == 'correcting') {
//      req.session.data.editState = req.query.correct;
//    }
    if (req.session.data.editState == 'ending') {
      res.redirect('/update/person/check')
    }
  }
  if (req.session.data.personalDetail == "nifu") {
    req.session.data.personalDetailValue = "No";
    req.session.data.personalDetails.nifu.show = false;
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == "preferredLanguage" && req.session.data.editState == "updating") {
    if (req.session.data.personalDetails[req.session.data.personalDetail].value == "Welsh") {
      req.session.data.personalDetailValue = "English";
    } else {
      req.session.data.personalDetailValue = "Welsh";
    }
    res.redirect('/update/person/check')
  } else if (req.session.data.personalDetail == "disability") {
    req.session.data.personalDetailValue = "This person is not disabled";
    req.session.data.personalDetails.disability.show = false;
    if (req.session.data.editState == "correcting" ) {
      res.redirect('/update/person/update')
    } else {
      res.redirect('/update/person/check')
    }
  } else {
    res.redirect('/update/person/update')
  }
})

router.get(/personal-detail-handler/, function (req, res) {
  if (req.query.data == "stateless") {
    req.session.data.personalDetailValue = "Stateless";
  } else if (req.query.data == "unknown") {
    req.session.data.personalDetailValue = "Unknown";
  }
  res.redirect('/update/person/check')
})

// create a copy of the personal detail
// edit it
// pass it back so that the route can swap it back 

//check-person-handler
router.get(/check-person-handler/, function (req, res) {  
  if (req.session.data.editState == "adding") {
    req.session.data.personalDetails[req.session.data.personalDetail].state = "added";
    req.session.data.personalDetails[req.session.data.personalDetail].show = true;
  } else if (req.session.data.editState == "updating") {
    req.session.data.personalDetails[req.session.data.personalDetail].state = "updated";
  } else if (req.session.data.editState == "correcting") {
    req.session.data.personalDetails[req.session.data.personalDetail].state = "corrected";
  } else if (req.session.data.editState == "ending") {
    req.session.data.personalDetails[req.session.data.personalDetail].state = "ended";
    req.session.data.personalDetails[req.session.data.personalDetail].show = false;
  }
  req.session.data.toaster = messageCentre(req.session.data.personalDetails[req.session.data.personalDetail].display, null, req.session.data.personalDetails[req.session.data.personalDetail].state);
  req.session.data.personalDetails[req.session.data.personalDetail].value = req.session.data.personalDetailValue;
  if (req.session.data.personalDetails[req.session.data.personalDetail].value == "Unknown") {
    req.session.data.personalDetails[req.session.data.personalDetail].show = false;
  }
  
  if (req.session.data.personalDetail == "recordLevel") {
    if (req.session.data.personalDetails.recordLevel.value == "1 - Unrestricted access") {
        req.session.data.personalDetails[req.session.data.personalDetail].show = false;
    }
  }
  
  if (req.session.data.personalDetail == "pv") {
    req.session.data.personalDetails.pv.partner = false;
    req.session.data.personalDetails.pv.member = false;
    if (req.session.data.editState != "ending") {
      var temp;
      for (var item in req.session.data.personalDetails.pv.value) {
        if (req.session.data.personalDetails.pv.value[item] == "The person's partner") {
          req.session.data.personalDetails.pv.partner = true
        } else if (req.session.data.personalDetails.pv.value[item] == "Someone else in the household") {
          req.session.data.personalDetails.pv.member = true
        } else if (req.session.data.personalDetails.pv.value[item] == "The person") {
          temp = true;        
        }
      }
      if (temp == true) {
        req.session.data.personalDetails.pv.value = true;
      }
    } else {
      //ending
      req.session.data.personalDetails.pv.show = true;
      req.session.data.personalDetails.pv.value = false;
      req.session.data.personalDetails.pv.state = "ended";
    }
  }
  
  if (req.session.data.personalDetail == "dateOfDeath") {
    req.session.data.personalDetails.dateOfDeath.level = req.session.data.verificationlevel;  
  }
  req.session.data.personalDetail = null;
  res.redirect('/account2/account')
})

//DISABILITY
router.get(/disability-type-handler/, function (req, res) {
  req.session.data.disability.state = req.query.data;
  if (req.session.data.disability.state === "updating" || req.session.data.disability.state === "correcting") {
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
  console.log(req.query);
  req.session.data.maritalState = req.query.data;
  res.redirect('/update/person/marital/update')
})

//Special customer record level
router.get(/recordLevel-type-handler/, function (req, res) {
  console.log(req.query);
  req.session.data.recordLevel.state = req.query.data;
  if(req.session.data.recordLevel.state == "removing") {
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
  if (req.query.data === "update") {
    req.session.data.specialNeeds.state = "updating"
    res.redirect('/update/person/needs/update')
  } else {
    req.session.data.specialNeeds.state = "correcting"
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
  req.session.data.editState = "adding";
  if (req.query.data == "gra") {
    req.session.data.personalDetail = "gra";
  } else {
    req.session.data.personalDetail = "preGra";
  }
  res.redirect('/update/person/gender/sex')
})

router.get(/gender-type-handler/, function (req, res) {
  if (req.session.data.personalDetails.gra.state === "updating") {
    req.session.data.personalDetails.gra.state = req.query.data;
    console.log("gra.state = " + req.session.data.personalDetails.gra.state);
  } else {
    req.session.data.personalDetails.preGra.state = req.query.data;
    console.log("preGra.state = " + req.session.data.personalDetails.preGra.state);
  }
  res.redirect('/update/person/gender/update')
})

router.get(/updating-handler/, function (req, res) {
  var feature = req.query.feature;
//  var featureState = feature+"State";
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
  } else if (req.query.feature == "disability" || req.query.feature == "needs" || req.query.feature == "nifu" || req.query.feature == "recordLevel") {
    res.redirect('/update/person/' + feature + '/type')
    console.log('/update/person/' + feature + '/type');
  } else if (req.query.feature == "sex") {
    req.session.data.personalDetails.sex = changeSex(req.session.data.personalDetails.sex.value);
    res.redirect('/update/person/check')
  } else {
    // var toPage = '/update/person/' + req.query.feature + '/update';
    res.redirect('/update/person/' + feature + '/update')
  }
})

router.get(/updatecontact-handler/, function (req, res) {
  console.log(req.query);
  var feature = req.query.feature;
  var state = req.query.state;
  req.session.data[feature].state = state;
  res.redirect('/update/person/contact/' + feature)
})

router.get(/check-gender-handler/, function (req, res) {
  if (req.session.data.personalDetail == "gra") {
    req.session.data.personalDetails.gender.gra = true;
  } else {    
    req.session.data.personalDetails.gender.preGra = true;
  }
  req.session.data.personalDetails.gender.show = true;
  req.session.data.toaster = messageCentre("Gender details", null, "added");
  req.session.data.personalDetails.sex.value = req.session.data.sexValue;
  res.redirect('/account2/account')
})


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
    req.session.data.personalDetails.genderUpdated = true;
  }
  req.session.data.sex = "Female";
  res.redirect('/account2/account')
})


/**********/
/** NAME **/
/**********/

router.get(/add-handler/, function (req, res) {
  req.session.data.updateType = "add";
  if(req.session.data.details.nameTwo.show == true) {
    req.session.data.nameType = "requestedName";
    res.redirect('../../update/name/update-name')
  } else if(req.session.data.details.requestedName.show == true) {
    req.session.data.nameType = "nameTwo";
    res.redirect('../../update/name/update-name')
  } else {
    res.redirect('../../update/name/add')
  }
})

router.get(/name-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.updateType = "change";
  res.redirect('/update/name/update')
})

//change name
router.get(/change-name-type-handler/, function (req, res) {
  if(req.session.data.updateType == "end") {
    res.redirect("remove")
  } else {
    res.redirect("update-name")
  }
})

//check name
router.get(/check-name-handler/, function (req, res) {
  req.session.data.toaster = null;  
  if (req.session.data.nameType == "name" || req.session.data.nameType == "nameTwo") {
    if (req.session.data.updateType != "end") {
      req.session.data.details[req.session.data.nameType].title = req.session.data.title;
      req.session.data.details[req.session.data.nameType].first = req.session.data.firstname;
      req.session.data.details[req.session.data.nameType].last = req.session.data.lastname;
      req.session.data.details[req.session.data.nameType].suffix = req.session.data.suffix;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.nameTwo.show = false;
    }
  }
  if (req.session.data.nameType == "requestedName") {
    if (req.session.data.updateType != "end") {
      req.session.data.details.requestedName.value = req.session.data.requestedName;
      req.session.data.details[req.session.data.nameType].show = true;
    } else { 
      req.session.data.details.requestedName.show = false;
    }
  }
  req.session.data.details[req.session.data.nameType].state = setState(req.session.data.updateType);
  req.session.data.toaster = messageCentre(req.session.data.details[req.session.data.nameType].display, null, req.session.data.details[req.session.data.nameType].state);
  res.redirect('../../account2/account')
})



/*************/
/** ADDRESS **/
/*************/

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
  req.session.data.toaster = null;
  if (req.query.data == 'add_correspondence') {
    req.session.data.updateType = "addCorrespondence";
    content.setPageTitle(req.session.data.updateType);
    req.session.data.toaster = messageCentre("Correspondence address", null, "added");
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
    req.session.data.toaster = messageCentre("Correspondence address", null, "ended");
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
  req.session.data.updateType = "addInterest";
  resetToDefaults();
  tempInterest.live = true;
  tempInterest.title = req.query.interest;
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
  if (req.session.data.updateType == "addInterest") {
    addInterest(tempInterest);
    dataState.interestAdded = true;   
  }
  resetTempInterest(req.session.data.tempInterest);
//  if (req.session.data.updateType === "transferInterest") {
//    dataState.interestTransfered = true;
//  }
  res.redirect("/account2/account");
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


//*****************
// ACCOUNT CREATION 
//*****************


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
router.get(/add-man-handler/, function (req, res) {
  if (req.query.uk === "no") {
    res.redirect('dates')
  } else {
    res.redirect('search-results')
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

//preferred-language-handler
router.get(/preferred-language-handler/, function (req, res) {
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

router.get(/v4-type-handler/, function (req, res) {
  ninoVersion = 4;
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
//Version 4
//*********

//nino-contacts-handler
router.get(/nino-contacts-handler/, function (req, res) {
  req.session.data.contactTypes[req.session.data.contactType].show = true;
  req.session.data.contactTypes[req.session.data.contactType].state = "added";
  res.redirect('another-contact')
})


//contact-group-handler
router.get(/contact-group-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.preferredContactState = null;
  req.session.data.contactState = "adding";
  console.log(req.query.contactType);
  if (req.query.contactType == "telephone" || req.query.contactType == "email" || req.query.contactType == "fax") {
    res.redirect('contact-type')
  } else {
    res.redirect('contact-details')
  }
})

//current-name
router.get('/nino/6/name-current/', function (req, res) {
  res.render('nino/6/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/6/name-alternative/', function (req, res) {
  res.render('nino/6/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/6/name-previous/', function (req, res) {
  res.render('nino/6/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/6/address-search/', function (req, res) {
  res.render('nino/6/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/6/search-results/', function (req, res) {
  res.render('nino/6/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/6/previous-results/', function (req, res) {
  res.render('nino/6/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/6/search-correspondence/', function (req, res) {
  res.render('nino/6/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/6/correspondence-results/', function (req, res) {
  res.render('nino/6/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/6/name-requested/', function (req, res) {
  res.render('nino/6/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/previous-name/', function (req, res) {
  res.render('nino/6/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-correspondence/', function (req, res) {
  res.render('nino/6/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-previous/', function (req, res) {
  res.render('nino/6/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/6/previous-names/', function (req, res) {
  res.render('nino/6/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/6/address-question/', function (req, res) {
  res.render('nino/6/address-question', {
    person : person
  })
})

//check
router.get('/nino/6/check/', function (req, res) {
  res.render('nino/6/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/6/check-v2/', function (req, res) {
  res.render('nino/6/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/6/task-list/', function (req, res) {
  res.render('nino/6/task-list', {
    person : person
  })
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