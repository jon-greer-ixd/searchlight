var express = require('express')
var router = express.Router()

var addressOne = "1 Current Crescent";
var addressTwo = "2 New Street";
var addressThree = "7 Post Street";
var addressFour = "Gateshead, Tyne and Wear NE1 1HH";

var NINO = require('./nino.js');

var Dates = require('./dates.js');
var dates = Dates.dates;
dates.logToday();

var createJourney = null;
var ninoVersion = null;

var person = {
  reset : function() {
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

/*

update
  add new
  remove
  update to new
  update to dlo
  update to live
  update to nfa/pwa
  Update add a cherished line   
    
correct
  Correct to new address 
  Correct to dead letter office 
  correct to nfa/pwa
  Show correct dates
  Correct the start date 
  
cherish
  Add a line
  Remove a line
  Change a line (update)
  Correct a line (update)
  Correct a line (remove)
  correct update cherish

*/

/*
//in progress
content - notified start date
nino allocation


//to do
add neils new address pattern in
check updateTypes
remove inline styles
control the dates from the javascript not the html
none to live not working
Reset function
make notifications work correctly

*/

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

var updateOmatic = function() {
  if(dataState.updateType === "addCorrespondence") {
    correspondenceAddress.show = true;
  }
  //cherish - add
  if (dataState.updateType === "updateAddCherish") {
    residentialAddress.cherish = "Flat A";
    residentialAddress.startDate = content.editDate;
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.cherish = false;
    previousAddress.show = true;
    previousAddress.correct = true;
  }
  //cherish - correct
  if (dataState.updateType === "correctAddCherish") {
    residentialAddress.updated = true;
    residentialAddress.cherish = "Flat A";
    residentialAddress.startDate = "01 Jan 1990";
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    dataState.cherishedLineCorrected = true;
  }
  if(dataState.updateType === "updateRemoveCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  if(dataState.updateType === "correctChangeCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = false;
    previousAddress.show = true;
    residentialAddress.cherish = "Flat B";
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  if(dataState.updateType === "correctRemoveCherish") {
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
  if(dataState.updateType === "updateChangeCherish") {
    previousAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = "Flat B";
    residentialAddress.line = addressOne;
    residentialAddress.updated = true;
  }
  // add new
  if (dataState.updateType === "updateNew") {
    previousAddress.cherish = residentialAddress.cherish;
    previousAddress.line = addressOne;
    previousAddress.correct = true;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressTwo;
    residentialAddress.updated = true;
  }
  if (dataState.updateType === "updateStatus" || 
    dataState.updateType === "updateStatusDLO" || 
    dataState.updateType === "updateStatusLive") {
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
  if(dataState.updateType === "addCorrespondence") {
    dataState.correspondenceAdded = true;
  }
  if (dataState.updateType === "end") {
    dataState.correspondenceAdded = false;   
    dataState.correspondenceRemoved = true;
    previousAddress.line = addressThree;
    previousAddress.show = true;
  }
  if (dataState.updateType === "correctNew") {
    previousAddress.cherish = residentialAddress.cherish;
    previousAddress.line = addressOne;
    previousAddress.correct = false;
    previousAddress.show = true;
    residentialAddress.cherish = false;
    residentialAddress.line = addressTwo;
    residentialAddress.updated = true;
  }
  if (dataState.updateType === "correctStatus" || 
    dataState.updateType === "correctStatusDlo" || 
    dataState.updateType === "correctStatusLive") {
    residentialAddress.status = dataState.newStatus;
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
  }
  if (dataState.updateType === "correctDate") {
    residentialAddress.updated = true;
    residentialAddress.startDate = "30 Nov 1990";
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
  if (dataState.updateType === "correctDateNotified") {
    residentialAddress.updated = true;
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
}
  
var dataState = {
  updateType : null,
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

var content = {
  editDate : "16 Jan 2018",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "updateStatus" || dataState.updateType == "updateStatusDLO") {
      this.pageTitle = "Update an address status";
    } else if (dataState.updateType == "updateAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (dataState.updateType == "addCorrespondence") {
      this.pageTitle = "Add a correspondence address";
    } else if (dataState.updateType == "correctStatus" || 
               dataState.updateType == "correctStatusDlo" || 
               dataState.updateType == "correctStatusLive" || 
               dataState.updateType == "updateStatusLive" ) {
      this.pageTitle = "Correct an address status";
    } else if (dataState.updateType == "correctCherish") {
      this.pageTitle = "Correct a cherished line";
    } else if (dataState.updateType == "correctNew") {
      this.pageTitle = "Correct an address";
    } else if (dataState.updateType == "correctDate") {
      this.pageTitle = "Correct a start date or notified start date";
    } else if (dataState.updateType == "end") {
      this.pageTitle = "End an address";
    } else if (dataState.updateType == "updateRemoveCherish") {
      this.pageTitle = "Remove a cherished line";
    } else if (dataState.updateType == "correctAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (dataState.updateType == "updateChangeCherish") {
      this.pageTitle = "Update a cherished line";
    } else if (dataState.updateType == "correctDateNotified") {
      this.pageTitle = "Correct the notified start date";
    } else {
      this.pageTitle = "Update an address";
    }
  }, 
  statusToText : function(status) {
    if (status === "dlo") {
      return "Dead letter office";
    } else if (status === "pwa") {
      return "Person without address";
    } else if (status === "nfa") {
      return "No fixed abode";
    } else {
      return "Live";
    }
  }
};

var main = require('./main/routes');

// search page
router.get('/search', function (req, res) {
  res.render('pages/search.njk', {
    createjourney : createJourney,
    ninoversion : ninoVersion
  })
})


router.use('/', main);
// Route index page
  router.get('/', function (req, res) {
  resetAll();
  dataState.updateType = null;
  trace = false;
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
  res.render('account', {
    residentialaddress : residentialAddress,
    correspondenceaddress : correspondenceAddress,
    previousaddress : previousAddress,
    startdate : residentialAddress.startDate,
    updatetype : dataState.updateType,
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
    createjourney : createJourney
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
    pagetitle : content.pageTitle,
    updatetype : dataState.updateType
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
  console.log("The new status is: " + dataState.newStatus );
  console.log("The update type is: " + dataState.updateType );
//  dataState.statusUpdated = true;
  if (dataState.newStatus === "live") {
    if (dataState.currentStatus == "nfa" || dataState.currentStatus == "pwa") {
      res.redirect('address-search')
    } else {
      res.redirect('dates')
    }
  } else {
    if (dataState.updateType != "correctStatus") {
      res.redirect('dates')
    } else {
      res.redirect('check')
    }
  }
})

router.get('/update/cherish-line', function (req, res) {
  res.render('update/cherish-line', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/cherish-handler', function (req, res) {
  console.log("here " + req.query.data);
  if (dataState.updateType === "updateAddCherish") {
    res.redirect('dates')
  }
  if (dataState.updateType === "correctAddCherish") {
    res.redirect('check')
  }
  if (req.query.data === "remove_cherish") {
    if (dataState.updateType === "correctCherish") {
      dataState.updateType = "correctRemoveCherish";
      content.setPageTitle();
      console.log(dataState.updateType);
      res.redirect('check')
    } 
    if (dataState.updateType === "updateCherish") {
      dataState.updateType = "updateRemoveCherish";
      content.setPageTitle();
      console.log(dataState.updateType);
      res.redirect('dates')
    }
  }
  if (req.query.data === "change_cherish") {
    if (dataState.updateType === "correctCherish") {
      dataState.updateType = "correctChangeCherish";
      content.setPageTitle();
      console.log(dataState.updateType);
      res.redirect('check')
    } 
    if (dataState.updateType === "updateCherish") {
      dataState.updateType = "updateChangeCherish";
      content.setPageTitle();
      console.log(dataState.updateType);
      res.redirect('dates')
    }
  }
})

router.get('/update/address-search', function (req, res) {
  res.render('update/address-search', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/search-results', function (req, res) {
  res.render('update/search-results', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get(/dates-handler/, function (req, res) {
  res.redirect('/update/check')
})

router.get(/update-type-handler/, function (req, res) {
  if (req.query.data == 'add_correspondence') {
    dataState.updateType = "addCorrespondence";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('address-search')
    //status
  } else if (req.query.data === 'update_status') {
    dataState.updateType = "updateStatus";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('status')
  } else if (req.query.data === 'update_status_dlo') {
    dataState.updateType = "updateStatusDLO";
    content.setPageTitle();
    dataState.newStatus = "dlo";
    console.log(dataState.updateType);
    res.redirect('dates')
  } else if (req.query.data === 'update_live') {
    dataState.updateType = "updateStatusLive";
    content.setPageTitle();
    dataState.newStatus = "live";
    console.log(dataState.updateType);
    if (dataState.currentStatus == "nfa" || dataState.currentStatus == "pwa") {
      res.redirect('address-search')
    } else {
      res.redirect('dates')
    }
  } else if (req.query.data === 'update_new') {
    dataState.updateType = "updateNew";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('address-search')
    //corrections
  } else if (req.query.data === 'correct_new') {
    dataState.updateType = "correctNew";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('address-search')
    //status
  } else if (req.query.data === 'correct_status') {
    dataState.updateType = "correctStatus";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('status')
  } else if (req.query.data === 'correct_dlo') {
    dataState.updateType = "correctStatusDlo";
    content.setPageTitle();
    console.log(dataState.updateType);
    dataState.newStatus = "dlo";
    res.redirect('check')
  } else if (req.query.data === 'correct_live') {
    dataState.updateType = "correctStatusLive";
    content.setPageTitle();
    dataState.newStatus = "live";
    console.log(dataState.updateType);
    res.redirect('check')
    //date
  } else if (req.query.data === 'correct_date') {
    dataState.updateType = "correctDate";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('dates')
  } else if (req.query.data === 'correct_date_notified') {
    dataState.updateType = "correctDateNotified";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('dates')
    //cherish
  } else if (req.query.data === 'update_add_cherish') {
    dataState.updateType = "updateAddCherish";
    dataState.cherished = true;
    content.setPageTitle();
    res.redirect('cherish-line')
  } else if (req.query.data === 'update_cherish') {
    dataState.updateType = "updateCherish";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'correct_cherish') {
    dataState.updateType = "correctCherish";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'correct_add_cherish') {
    dataState.updateType = "correctAddCherish";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('cherish-line')
  } else if (req.query.data === 'update_remove_cherish') {
    dataState.updateType = "updateRemoveCherish";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('dates')
    //end
  } else if (req.query.data === 'end') {
    dataState.updateType = "end";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('dates')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (dataState.updateType === "correctNew") {
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
    updatetype : dataState.updateType,
    correcting : dataState.correcting,
    pagetitle : content.pageTitle,
    currentstatus : content.statusToText(dataState.currentStatus),
    newstatus : content.statusToText(dataState.newStatus)
  })
})

router.get(/check-answers-handler/, function (req, res) {
  updateOmatic();
  if(dataState.updateType === "addCorrespondence") {
    dataState.correspondenceAdded = true;
  }
  if (dataState.updateType === "updateNew") {
    dataState.updatedToNewAddress = true;
    dataState.currentStatus = "live";
  }
  if (dataState.updateType === "updateStatus" || 
      dataState.updateType === "updateStatusDLO" || 
      dataState.updateType === "updateStatusLive") {
      dataState.statusUpdated = true; 
      dataState.currentStatus = dataState.newStatus;
  }
  if (dataState.updateType === "correctStatus" || 
      dataState.updateType === "correctStatusDlo" || 
      dataState.updateType === "correctStatusLive") {
      dataState.statusCorrected = true; 
      dataState.currentStatus = dataState.newStatus;
  }
  if (dataState.updateType === "correctNew") {
    dataState.addressCorrected = true;   
  }
  if (dataState.updateType === "correctDate") {
    dataState.dateIsUpdated = true;   
  } 
  if (dataState.updateType === "correctCherish") {
    dataState.cherishedLineCorrected = true;   
  }
  if (dataState.updateType === "end") {
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
  if(dataState.updateType === "add") {
    correspondence = true;
  }
  if (dataState.updateType === "address") {
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

router.get('/update/v1/dates', function (req, res) {
  res.render('update/v1/dates', {
    updatetype :  dataState.updateType
  })
})

router.get('/update/v1/check', function (req, res) {
  res.render('update/v1/check', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/v1/search-results', function (req, res) {
  res.render('update/v1/search-results', {
    updatetype : dataState.updateType
  })
})

router.get(/update-handler-v1/, function (req, res) {
  if(req.query.data === 'status') {
    dataState.updateType = "status";
    console.log(dataState.updateType);
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    dataState.updateType = "cherish";
    console.log(dataState.updateType);
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    console.log(dataState.updateType);
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    console.log(dataState.updateType);
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    dataState.updateType = "address";
    console.log(dataState.updateType);
    res.redirect('address-search')
  }
})

router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == "add") {
    dataState.updateType = "new";
    res.render('update/address-search')
  } else if (req.query.tochange == "correct"){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

router.get(/correction-type-handler/, function (req, res) {
  console.log(req.query);
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
  console.log(dataState.correctionType);
  res.render(next);
})



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
  console.log(person);
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
    console.log(person.correspondence_address);
    res.redirect('search-correspondence')
  } else {
    person.correspondence_address = false;
    console.log(person.correspondence_address);
    res.redirect('contact-question')
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
    res.redirect('address-question')
  } else {
    res.redirect('search-results')
  }
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
  console.log(person.correspondence_address);
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
    createJourney = true;
  } else {
    createJourney = false;
  }
  res.redirect('../../search')
})

router.get(/v2-type-handler/, function (req, res) {
  ninoVersion = 2;
  if(req.query.trace[0] === "true") {
    trace = true;
    console.log("Trace = " + trace);
  }
  if(req.query.data === "create") {
    createJourney = true;
  } else {
    createJourney = false;
  }
  res.redirect('../../search')
})

router.get(/v3-type-handler/, function (req, res) {
  ninoVersion = 3;
  if(req.query.trace[0] === "true") {
    trace = true;
    console.log("Trace = " + trace);
  }
  if(req.query.data === "create") {
    createJourney = true;
  } else {
    createJourney = false;
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

//nino
router.get('/nino/5/nino/', function (req, res) {
  res.render('nino/5/nino', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")
  })
})

//TRACE
router.get('/nino/5/trace/', function (req, res) {
  res.render('nino/5/trace', {
    createjourney : createJourney
  })
})

//current-name
router.get('/nino/5/name-current/', function (req, res) {
  res.render('nino/5/name-current', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name,
    today : dates.todayAsFigure("/")
  })
})

//address-alternative
router.get('/nino/5/name-alternative/', function (req, res) {
  res.render('nino/5/name-alternative', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//name-previous
router.get('/nino/5/name-previous/', function (req, res) {
  res.render('nino/5/name-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name,
    today : dates.todayAsFigure("/")
  })
})

//address-search
router.get('/nino/5/address-search/', function (req, res) {
  res.render('nino/5/address-search', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-results
router.get('/nino/5/search-results/', function (req, res) {
  res.render('nino/5/search-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-previous
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    today : dates.todayAsFigure("/")
  })
})

//previous-results
router.get('/nino/5/previous-results/', function (req, res) {
  res.render('nino/5/previous-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-correspondence
router.get('/nino/5/search-correspondence/', function (req, res) {
  res.render('nino/5/search-correspondence', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//correspondence-results
router.get('/nino/5/correspondence-results/', function (req, res) {
  res.render('nino/5/correspondence-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//name
router.get('/nino/5/add-contact/', function (req, res) {
  res.render('nino/5/add-contact', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/5/correspondence-question/', function (req, res) {
  res.render('nino/5/correspondence-question', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/5/telephone/', function (req, res) {
  res.render('nino/5/telephone', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/5/mobile/', function (req, res) {
  res.render('nino/5/mobile', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/5/another-contact/', function (req, res) {
  res.render('nino/5/another-contact', {
    createjourney : createJourney
  })
})

//current-name
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/5/name-requested/', function (req, res) {
  res.render('nino/5/name-requested', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/previous-name/', function (req, res) {
  res.render('nino/5/previous-name', {
    createjourney : createJourney,
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-correspondence/', function (req, res) {
  res.render('nino/5/manual-correspondence', {
    createjourney : createJourney,
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-previous/', function (req, res) {
  res.render('nino/5/manual-previous', {
    createjourney : createJourney,
    person : person
  })
})

//nino
router.get('/nino/5/nino/', function (req, res) {
  res.render('nino/5/nino', {
    createjourney : createJourney
  })
})

//another name
router.get('/nino/5/name-question/', function (req, res) {
  res.render('nino/5/name-question', {
    createjourney : createJourney
  })
})

//dob
router.get('/nino/5/dob/', function (req, res) {
  res.render('nino/5/dob', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/5/sex/', function (req, res) {
  res.render('nino/5/sex', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/5/sex/', function (req, res) {
  res.render('nino/5/sex', {
    createjourney : createJourney
  })
})

//verification
router.get('/nino/5/verification/', function (req, res) {
  res.render('nino/5/verification', {
    createjourney : createJourney
  })
})

//address-search
router.get('/nino/5/previous-names/', function (req, res) {
  res.render('nino/5/previous-names', {
    createjourney : createJourney,
    person : person
  })
})

//manual-address
router.get('/nino/5/manual-address/', function (req, res) {
  res.render('nino/5/manual-address', {
    createjourney : createJourney
  })
})

//address-date
router.get('/nino/5/address-date/', function (req, res) {
  res.render('nino/5/address-date', {
    createjourney : createJourney
  })
})

//address-question
router.get('/nino/5/address-question/', function (req, res) {
  res.render('nino/5/address-question', {
    createjourney : createJourney,
    person : person
  })
})

//contact-question
router.get('/nino/5/contact-question/', function (req, res) {
  res.render('nino/5/contact-question', {
    createjourney : createJourney
  })
})

//nationality
router.get('/nino/5/nationality/', function (req, res) {
  res.render('nino/5/nationality', {
    createjourney : createJourney
  })
})

//marital
router.get('/nino/5/marital/', function (req, res) {
  res.render('nino/5/marital', {
    createjourney : createJourney
  })
})

//non-mandatory-question
router.get('/nino/5/non-mandatory-question/', function (req, res) {
  res.render('nino/5/non-mandatory-question', {
    createjourney : createJourney
  })
})

//check
router.get('/nino/5/check/', function (req, res) {
  res.render('nino/5/check', {
    createjourney : createJourney,
    today : dates.todayAsString()
  })
})

//check
router.get('/nino/5/check-v2/', function (req, res) {
  res.render('nino/5/check-v2', {
    createjourney : createJourney,
    today : dates.todayAsString()
  })
})

//done
router.get('/nino/5/done/', function (req, res) {
  res.render('nino/5/done', {
    createjourney : createJourney
  })
})

//task-list
router.get('/nino/5/task-list/', function (req, res) {
  res.render('nino/5/task-list', {
    createjourney : createJourney,
    person : person
  })
})

//ethnic-origin
router.get('/nino/5/ethnic-origin/', function (req, res) {
  res.render('nino/5/ethnic-origin', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")
  })
})

//immigration
router.get('/nino/5/immigration/', function (req, res) {
  res.render('nino/5/immigration', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//language
router.get('/nino/5/language/', function (req, res) {
  res.render('nino/5/language', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//spoken-language
router.get('/nino/5/spoken-language/', function (req, res) {
  res.render('nino/5/spoken-language', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//disabilities
router.get('/nino/5/disabilities/', function (req, res) {
  res.render('nino/5/disabilities', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//special-needs
router.get('/nino/5/special-needs/', function (req, res) {
  res.render('nino/5/special-needs', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

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

//nino
router.get('/nino/4/nino/', function (req, res) {
  res.render('nino/4/nino', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")
  })
})

//TRACE
router.get('/nino/4/trace/', function (req, res) {
  res.render('nino/4/trace', {
    createjourney : createJourney
  })
})

//current-name
router.get('/nino/4/name-current/', function (req, res) {
  res.render('nino/4/name-current', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name,
    today : dates.todayAsFigure("/")
  })
})

//address-alternative
router.get('/nino/4/name-alternative/', function (req, res) {
  res.render('nino/4/name-alternative', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//name-previous
router.get('/nino/4/name-previous/', function (req, res) {
  res.render('nino/4/name-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name,
    today : dates.todayAsFigure("/")
  })
})

//address-search
router.get('/nino/4/address-search/', function (req, res) {
  res.render('nino/4/address-search', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-results
router.get('/nino/4/search-results/', function (req, res) {
  res.render('nino/4/search-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-previous
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    today : dates.todayAsFigure("/")
  })
})

//previous-results
router.get('/nino/4/previous-results/', function (req, res) {
  res.render('nino/4/previous-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//search-correspondence
router.get('/nino/4/search-correspondence/', function (req, res) {
  res.render('nino/4/search-correspondence', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//correspondence-results
router.get('/nino/4/correspondence-results/', function (req, res) {
  res.render('nino/4/correspondence-results', {
    createjourney : createJourney,
    person : person,
    today : dates.todayAsFigure("/")
  })
})

//name
router.get('/nino/4/add-contact/', function (req, res) {
  res.render('nino/4/add-contact', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/4/correspondence-question/', function (req, res) {
  res.render('nino/4/correspondence-question', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/4/telephone/', function (req, res) {
  res.render('nino/4/telephone', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/4/mobile/', function (req, res) {
  res.render('nino/4/mobile', {
    createjourney : createJourney
  })
})

//name
router.get('/nino/4/another-contact/', function (req, res) {
  res.render('nino/4/another-contact', {
    createjourney : createJourney
  })
})

//current-name
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    createjourney : createJourney,
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/4/name-requested/', function (req, res) {
  res.render('nino/4/name-requested', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    createjourney : createJourney,
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/previous-name/', function (req, res) {
  res.render('nino/4/previous-name', {
    createjourney : createJourney,
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-correspondence/', function (req, res) {
  res.render('nino/4/manual-correspondence', {
    createjourney : createJourney,
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-previous/', function (req, res) {
  res.render('nino/4/manual-previous', {
    createjourney : createJourney,
    person : person
  })
})

//nino
router.get('/nino/4/nino/', function (req, res) {
  res.render('nino/4/nino', {
    createjourney : createJourney
  })
})

//another name
router.get('/nino/4/name-question/', function (req, res) {
  res.render('nino/4/name-question', {
    createjourney : createJourney
  })
})

//dob
router.get('/nino/4/dob/', function (req, res) {
  res.render('nino/4/dob', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/4/sex/', function (req, res) {
  res.render('nino/4/sex', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/4/sex/', function (req, res) {
  res.render('nino/4/sex', {
    createjourney : createJourney
  })
})

//verification
router.get('/nino/4/verification/', function (req, res) {
  res.render('nino/4/verification', {
    createjourney : createJourney
  })
})

//address-search
router.get('/nino/4/previous-names/', function (req, res) {
  res.render('nino/4/previous-names', {
    createjourney : createJourney,
    person : person
  })
})

//manual-address
router.get('/nino/4/manual-address/', function (req, res) {
  res.render('nino/4/manual-address', {
    createjourney : createJourney
  })
})

//address-date
router.get('/nino/4/address-date/', function (req, res) {
  res.render('nino/4/address-date', {
    createjourney : createJourney
  })
})

//address-question
router.get('/nino/4/address-question/', function (req, res) {
  res.render('nino/4/address-question', {
    createjourney : createJourney,
    person : person
  })
})

//contact-question
router.get('/nino/4/contact-question/', function (req, res) {
  res.render('nino/4/contact-question', {
    createjourney : createJourney
  })
})

//nationality
router.get('/nino/4/nationality/', function (req, res) {
  res.render('nino/4/nationality', {
    createjourney : createJourney
  })
})

//marital
router.get('/nino/4/marital/', function (req, res) {
  res.render('nino/4/marital', {
    createjourney : createJourney
  })
})

//non-mandatory-question
router.get('/nino/4/non-mandatory-question/', function (req, res) {
  res.render('nino/4/non-mandatory-question', {
    createjourney : createJourney
  })
})

//check
router.get('/nino/4/check/', function (req, res) {
  res.render('nino/4/check', {
    createjourney : createJourney,
    today : dates.todayAsString()
  })
})

//check
router.get('/nino/4/check-v2/', function (req, res) {
  res.render('nino/4/check-v2', {
    createjourney : createJourney,
    today : dates.todayAsString()
  })
})

//done
router.get('/nino/4/done/', function (req, res) {
  res.render('nino/4/done', {
    createjourney : createJourney
  })
})

//task-list
router.get('/nino/4/task-list/', function (req, res) {
  res.render('nino/4/task-list', {
    createjourney : createJourney,
    person : person
  })
})

//ethnic-origin
router.get('/nino/4/ethnic-origin/', function (req, res) {
  res.render('nino/4/ethnic-origin', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")
  })
})

//immigration
router.get('/nino/4/immigration/', function (req, res) {
  res.render('nino/4/immigration', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//language
router.get('/nino/4/language/', function (req, res) {
  res.render('nino/4/language', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//spoken-language
router.get('/nino/4/spoken-language/', function (req, res) {
  res.render('nino/4/spoken-language', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//disabilities
router.get('/nino/4/disabilities/', function (req, res) {
  res.render('nino/4/disabilities', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//special-needs
router.get('/nino/4/special-needs/', function (req, res) {
  res.render('nino/4/special-needs', {
    createjourney : createJourney,
    today : dates.todayAsFigure("/")

  })
})

//special-needs
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

//name
router.get('/nino/2/name/', function (req, res) {
  res.render('nino/2/name', {
    createjourney : createJourney
  })
})

//nino
router.get('/nino/2/nino/', function (req, res) {
  res.render('nino/2/nino', {
    createjourney : createJourney
  })
})

//another name
router.get('/nino/2/name-question/', function (req, res) {
  res.render('nino/2/name-question', {
    createjourney : createJourney
  })
})

//dob
router.get('/nino/2/dob/', function (req, res) {
  res.render('nino/2/dob', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/2/sex/', function (req, res) {
  res.render('nino/2/sex', {
    createjourney : createJourney
  })
})

//sex
router.get('/nino/2/sex/', function (req, res) {
  res.render('nino/2/sex', {
    createjourney : createJourney
  })
})

//verification
router.get('/nino/2/verification/', function (req, res) {
  res.render('nino/2/verification', {
    createjourney : createJourney
  })
})

//address-search
router.get('/nino/2/address-search/', function (req, res) {
  res.render('nino/2/address-search', {
    createjourney : createJourney
  })
})

//search-results
router.get('/nino/2/search-results/', function (req, res) {
  res.render('nino/2/search-results', {
    createjourney : createJourney
  })
})

//manual-address
router.get('/nino/2/manual-address/', function (req, res) {
  res.render('nino/2/manual-address', {
    createjourney : createJourney
  })
})

//address-date
router.get('/nino/2/address-date/', function (req, res) {
  res.render('nino/2/address-date', {
    createjourney : createJourney
  })
})

//address-question
router.get('/nino/2/address-question/', function (req, res) {
  res.render('nino/2/address-question', {
    createjourney : createJourney
  })
})

//contact-question
router.get('/nino/2/contact-question/', function (req, res) {
  res.render('nino/2/contact-question', {
    createjourney : createJourney
  })
})

//nationality
router.get('/nino/2/nationality/', function (req, res) {
  res.render('nino/2/nationality', {
    createjourney : createJourney
  })
})

//marital
router.get('/nino/2/marital/', function (req, res) {
  res.render('nino/2/marital', {
    createjourney : createJourney
  })
})

//non-mandatory-question
router.get('/nino/2/non-mandatory-question/', function (req, res) {
  res.render('nino/2/non-mandatory-question', {
    createjourney : createJourney
  })
})

//check
router.get('/nino/2/check/', function (req, res) {
  res.render('nino/2/check', {
    createjourney : createJourney
  })
})

//done
router.get('/nino/2/done/', function (req, res) {
  res.render('nino/2/done', {
    createjourney : createJourney
  })
})

//task-list
router.get('/nino/2/task-list/', function (req, res) {
  res.render('nino/2/task-list', {
    createjourney : createJourney,
    person : person
  })
})

//ethnic-origin
router.get('/nino/2/ethnic-origin/', function (req, res) {
  res.render('nino/2/ethnic-origin', {
    createjourney : createJourney
  })
})

//immigration
router.get('/nino/2/immigration/', function (req, res) {
  res.render('nino/2/immigration', {
    createjourney : createJourney
  })
})

//language
router.get('/nino/2/language/', function (req, res) {
  res.render('nino/2/language', {
    createjourney : createJourney
  })
})

//spoken-language
router.get('/nino/2/spoken-language/', function (req, res) {
  res.render('nino/2/spoken-language', {
    createjourney : createJourney
  })
})

//disabilities
router.get('/nino/2/disabilities/', function (req, res) {
  res.render('nino/2/disabilities', {
    createjourney : createJourney
  })
})

//special-needs
router.get('/nino/2/special-needs/', function (req, res) {
  res.render('nino/2/special-needs', {
    createjourney : createJourney
  })
})

module.exports = router