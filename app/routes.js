/*jslint devel: true */

var express = require('express');
var router = express.Router();

var addressOne = "1 Current Crescent";
var addressTwo = "2 New Street";
var addressThree = "7 Post Street";
var addressFour = "Gateshead, Tyne and Wear NE1 1HH";

//var NINO = require('./nino.js');
var content = require('./content.js').content;

var Interest = require('./interest.js');

var interests = [];

var addInterest = function (interest) {
  interests.unshift(interest);
};

var pip = Interest.createInterest();
var jsa = Interest.createInterest();

function resetInterests() {
  interests.length = 0;
  pip.startDate = "1 Jun 2017";
  pip.live = true;
  pip.title = "Personal Independence Payment";
  pip.system = true;
  pip.businessSystem = "Personal Independence Payment";
  pip.systemRef = 1;
  pip.partyRef = 1;
  
  jsa.startDate = "1 Jun 2017";
  jsa.live = false;
  jsa.title = "Job Seekers Allowance";
  jsa.system = false;
  jsa.businessSystem = "JSA";
  pip.systemRef = 3;
  pip.partyRef = 1;
  
  addInterest(pip);
  addInterest(jsa);
  console.log("Resetting interests...");
  console.log(interests);
}  

function setSystemAndParties(selectedInterest) {
  if (selectedInterest === "Child support reform") {
    tempInterest.partyRef = 0; //none
    tempInterest.systemRef = 3; //both
  } else if (selectedInterest === "Bereavement Allowance" ||
    selectedInterest === "Bereavement Benefit") {
    tempInterest.partyRef = 1; //owning
    tempInterest.systemRef = 1; //system
  } else if ( 
    selectedInterest === "Carers Credit") {
    tempInterest.partyRef = 2; //broadcasting
    tempInterest.systemRef = 1; //system
  } else if (selectedInterest === "Attendance Allowance") {
    tempInterest.partyRef = 3; //both
    tempInterest.systemRef = 3; //both
  } else if (selectedInterest === "Jobseeker's Allowance") {
    tempInterest.partyRef = 4; //CRL Office ID
    tempInterest.systemRef = 3; //both
  } else {
    tempInterest.partyRef = 3; //both
    tempInterest.systemRef = 3; //both
  }
}

var removeInterest = function (interest) {
  interest.live = false;
};

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

var tempInterest

router.use('/', main);
// Route index page
  router.get('/', function (req, res) { 
  tempInterest = Interest.createInterest();
  resetInterests();
  req.session.data.tempInterests = [];
  req.session.data.interests = interests;
    
  req.session.data.updateType = null;
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

//update

//account
router.get('/update/account', function (req, res) {
//  var interestsReversed = interests.slice();
//  interestsReversed.reverse();
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
    cherishedlinecorrected : dataState.cherishedLineCorrected,
    currentstatus : dataState.currentStatus,
    statuscorrected : dataState.statusCorrected,
    interests : interests
//    interestsReversed : interestsReversed
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
    res.redirect('address-search')
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
      res.redirect('address-search')
    } else {
      res.redirect('dates')
    }
  } else if (req.query.data === 'update_new') {
    req.session.data.updateType = "updateNew";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('address-search')
    //corrections
  } else if (req.query.data === 'correct_new') {
    req.session.data.updateType = "correctNew";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('address-search')
    //status
  } else if (req.query.data === 'correct_status') {
    req.session.data.updateType = "correctStatus";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('status')
  } else if (req.query.data === 'correct_dlo') {
    req.session.data.updateType = "correctStatusDlo";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "dlo";
    res.redirect('check')
  } else if (req.query.data === 'correct_live') {
    req.session.data.updateType = "correctStatusLive";
    content.setPageTitle(req.session.data.updateType);
    dataState.newStatus = "live";
    res.redirect('check')
    //date
  } else if (req.query.data === 'correct_date') {
    req.session.data.updateType = "correctDate";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('dates')
  } else if (req.query.data === 'correct_date_notified') {
    req.session.data.updateType = "correctDateNotified";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('dates')
    //cherish
  } else if (req.query.data === 'update_add_cherish') {
    req.session.data.updateType = "updateAddCherish";
    dataState.cherished = true;
    content.setPageTitle(req.session.data.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'update_cherish') {
    req.session.data.updateType = "updateCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'correct_cherish') {
    req.session.data.updateType = "correctCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'correct_add_cherish') {
    req.session.data.updateType = "correctAddCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'update_remove_cherish') {
    req.session.data.updateType = "updateRemoveCherish";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('dates')
    //end
  } else if (req.query.data === 'end') {
    req.session.data.updateType = "end";
    content.setPageTitle(req.session.data.updateType);
    res.redirect('dates')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (req.session.data.updateType === "correctNew") {
    res.redirect('check')
  } else {
    res.redirect('dates')
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
  res.redirect('account')
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

router.get(/update-interest-handler/, function (req, res) {
  if (req.query.data === "end") {
    req.session.data.updateType = "endInterest"
    res.redirect("interests");
  } else {
    res.redirect("parties");
  }
})

router.get(/end-interests-handler/, function (req, res) {
  console.log(req.query.interests);
  for (item in req.query.interests) {
    var x = parseInt(req.query.interests[item]);
    req.session.data.tempInterests.unshift(interests[x].title);
    console.log("item = " + x);
    interests[x].live = false;
  }
  res.redirect("check");
})

router.get(/add-interest-handler/, function (req, res) {
  req.session.data.updateType = "addInterest"
  tempInterest.title = req.query.title;
  tempInterest.startDate = dates.convertDayToString(req.query.startdate);
  tempInterest.live = true;
  setSystemAndParties(tempInterest.title);
  console.log("title = " + tempInterest.title);
  console.log("systems = " + tempInterest.systemRef);
  console.log("parties = " + tempInterest.partyRef);
  if (tempInterest.systemRef === 2 ||
    tempInterest.systemRef === 3) {
    res.redirect("add-system");
  } else {
    tempInterest.system = true;
    res.redirect("add-party");
  }
})

router.get(/add-system-handler/, function (req, res) {
  if (req.query.system === 'true') {
    tempInterest.system = true;
  } else {
    tempInterest.system = false;
  }
  res.redirect("add-party");
})

router.get(/party-handler/, function (req, res) {
  res.redirect("check");
})

router.get('/update/interests/interests', function (req, res) {
  res.render('update/interests/interests', {
    interests : interests
  })
})

router.get('/update/interests/check', function (req, res) {
  res.render('update/interests/check', {
    tempInterest : tempInterest
  })
})

router.get('/update/interests/add-party', function (req, res) {
  res.render('update/interests/add-party', {
    tempInterest : tempInterest
  })
})

router.get(/interest-check-handler/, function (req, res) {
  interests.unshift(tempInterest);
  req.session.data.tempInterest = tempInterest;
  res.redirect("../account");
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
    res.redirect('address-question')
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
//    console.log(req.query.sixteen);
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