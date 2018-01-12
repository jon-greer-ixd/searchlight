var express = require('express')
var router = express.Router()

var addressOne = "1 Current Crescent";
var addressTwo = "2 New Street";
var addressThree = "7 Post Street";

/*
update
  add new
  remove
  update to new
  update to dlo
  update to live
  update to nfa/pwa
  
  update add a cherished line
  if no cherrished line > add a cherrished line
  if a cherrished line > update the cherrished line
    > update / remove 
      if update > show current and field
      
  Correct the cherished line
    
correct
  Correct the start date 

  Correct to new address 
  Correct to dead letter office 
  correct to nfa/pwa
  
update addressess
update check your answers
Show correct dates
view maintenance data
make notifications work correctly
Reset function :)
*/

var residentialAddress = {
  status : "live",
  line : addressOne,
  startDate : null,
  endDate : null,
  cherish : false,
  show : true,
  updated : false
};

var correspondenceAddress = {
  line : "4 Post Street",
  startDate : null,
  endDate : null,
  cherish : false,
  show : false
};

var previousAddress = {
  status : "live",
  line : addressOne,
  startDate : null,
  endDate : null,
  cherish : false,
  show : false,
  correct : true
};

var updateOmatic = function() {
  if(dataState.updateType === "addCorrespondence") {
    correspondenceAddress.show = true;
  }
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
    }
  }
  if (dataState.updateType == "updateCherished") {
    residentialAddress.cherish = "Flat A";
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
  //correct
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
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
    // update the dates
  } 
  if (dataState.updateType === "correctCherish") {
    residentialAddress.updated = true;
    residentialAddress.cherish = "Flat A";
    previousAddress.line = addressOne;
    previousAddress.show = true;
    previousAddress.correct = false;
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
  editDate : "12 Jan 2018",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "updateStatus" || dataState.updateType == "updateStatusDLO") {
      this.pageTitle = "Update a residential address status";
    } else if (dataState.updateType == "updateCherished") {
      this.pageTitle = "Add a cherished line to an address";
    } else if (dataState.updateType == "addCorrespondence") {
      this.pageTitle = "Add a correspondence address";
    } else if (dataState.updateType == "correctStatus" || 
               dataState.updateType == "correctStatusDlo" || 
               dataState.updateType == "correctStatusLive" || 
               dataState.updateType == "updateStatusLive" ) {
      this.pageTitle = "Correct a residential address status";
    } else if (dataState.updateType == "correctCherish") {
      this.pageTitle = "Correct a cherished line";
    } else if (dataState.updateType == "correctNew") {
      this.pageTitle = "Correct a residential address";
    } else if (dataState.updateType == "correctDate") {
      this.pageTitle = "Correct a residential address start date";
    } else if (dataState.updateType == "end") {
      this.pageTitle = "End a correspondence address";
    } else {
      this.pageTitle = "Update a residential address";
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

router.use('/', main);
// Route index page
  router.get('/', function (req, res) {
  dataState.updating = false;
  dataState.correcting = false;
  dataState.updateType = null;
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
    statuscorrected : dataState.statusCorrected
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
  } else if (req.query.data === 'update_cherished') {
    dataState.updateType = "updateCherished";
    dataState.cherished = true;
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('cherish-line')
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
    //correct cherish
  } else if (req.query.data === 'correct_cherish') {
    dataState.updateType = "correctCherish";
    content.setPageTitle();
    console.log(dataState.updateType);
    res.redirect('cherish-line')
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

router.get('/update/cherish-handler', function (req, res) {
  if (dataState.updateType === "correctCherish") {
    res.redirect('check')
  } else {
    res.redirect('dates')
  }
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
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

module.exports = router