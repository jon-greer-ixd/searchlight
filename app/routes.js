var express = require('express')
var router = express.Router()
  
var dataState = {
  updateType : null,
  correctionType: 'toNew',
  /*
  correctNew 
  correctStatus 
  correctStatusDLO
  correctStart 
  correctCherished
  */

  /*
  correspondence
  updateNew 
  updateStatus
  updateStatusDLO
  updateCherished
  */
  status : "live",//dlo, pwa, nfa
  correspondenceAdded: false,
  updatedToNewAddress : false,
  cherished : false,
  statusUpdated : false,
  addressCorrected : false
};

var content = {
  editDate : "19 Dec 2017",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "updateStatus" || dataState.updateType == "updateStatusDLO") {
      this.pageTitle = "Update residential address status"
    } else if (dataState.updateType == "updateCherished") {
      this.pageTitle = "Add a cherished line"
    } else if (dataState.updateType == "addCorrespondence") {
      this.pageTitle = "Add a correspondence address"
    } else if (dataState.updateType == "correctStatus" || 
               dataState.updateType == "correctStatusDLO" ||
               dataState.updateType == "correctStatusLive" ||
               dataState.updateType == "updateStatusLive" ) {
      this.pageTitle = "Correct residential address status"
    } else if (dataState.updateType == "correctCherished") {
      this.pageTitle = "Correct a cherished line"
    } else if (dataState.updateType == "correctNew") {
      this.pageTitle = "Correct residential address"
    } else {
      this.pageTitle = "Update residential address"
    }
  console.log(this.pageTitle);
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
  dataState.statusUpdated = false;
  dataState.addressCorrected = false;
  dataState.status = "live";
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
router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

//account
router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : dataState.updatedToNewAddress,
    cherished : dataState.cherished,
    editDate : content.editDate,
    correspondence : dataState.correspondenceAdded,
    statusupdated : dataState.statusUpdated,
    addresscorrected : dataState.addressCorrected,
    status : dataState.status
  })
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
    status : dataState.status
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    pagetitle : content.pageTitle,
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    correctiontype :dataState.correctionType,
    updatetype : dataState.updateType,
    correcting : dataState.correcting,
    pagetitle : content.pageTitle
  })
})

router.get('/update/status', function (req, res) {
  res.render('update/status', {
    pagetitle : content.pageTitle,
    status : dataState.status
  })
})

router.get(/status-handler/, function (req, res) {
  dataState.status = req.query.data;
  dataState.statusUpdated = true;
  if (dataState.updateType != "correctStatus") {
    res.redirect('dates')
  } else {
    res.redirect('check')
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
  console.log("data " + req.query.data);  
  if (req.query.data == 'add_correspondence') {
    dataState.updateType = "addCorrespondence";
    content.setPageTitle();
    res.redirect('address-search')
  } else if (req.query.data === 'update_cherished') {
    dataState.updateType = "updateCherished";
    dataState.cherished = true;
    content.setPageTitle();
    res.redirect('cherish-line')
    //status
  } else if (req.query.data === 'update_status') {
    dataState.updateType = "updateStatus";
    content.setPageTitle();
    console.log('here ' + dataState.updateType);
    res.redirect('status')
  } else if (req.query.data === 'update_status_dlo') {
    dataState.updateType = "updateStatusDLO";
    content.setPageTitle();
    dataState.status = "dlo";
    res.redirect('dates')
  } else if (req.query.data === 'update_live') {
    dataState.updateType = "updateStatusLive";
    content.setPageTitle();
    dataState.status = "live";
    res.redirect('dates')
  } else if (req.query.data === 'update_new') {
    dataState.updateType = "updateNew";
    content.setPageTitle();
    res.redirect('address-search')
    //corrections
  } else if (req.query.data === 'correct_new') {
    dataState.updateType = "correctNew";
    content.setPageTitle();
    res.redirect('address-search')
    //status
  } else if (req.query.data === 'correct_status') {
    dataState.updateType = "correctStatus";
    content.setPageTitle();
    dataState.status = "dlo";
    res.redirect('status')
  } else if (req.query.data === 'correct_dlo') {
    dataState.updateType = "correctStatusDlo";
    content.setPageTitle();
    dataState.status = "dlo";
    res.redirect('check')
  } else if (req.query.data === 'correct_live') {
    dataState.updateType = "correctStatusLive";
    content.setPageTitle();
    dataState.status = "live";
    res.redirect('check')
  }
})

router.get('/update/search-results-handler', function (req, res) {
  if (dataState.updateType === "correctNew") {
    res.redirect('check')
  } else {
    res.redirect('dates')
  }
})

router.get(/check-answers-handler/, function (req, res) {
  if(dataState.updateType === "addCorrespondence") {
    dataState.correspondenceAdded = true;
  }
  if (dataState.updateType === "updateNew") {
    dataState.updatedToNewAddress = true;
  }
  if (dataState.updateType === "updateStatus" || 
      dataState.updateType === "updateStatusDLO" || 
      dataState.updateType === "updateStatusLive" || 
      dataState.updateType === "correctStatus" || 
      dataState.updateType === "correctStatusDlo" || 
      dataState.updateType === "correctStatusLive") {
      dataState.statusUpdated = true;   
  }
  if (dataState.updateType === "correctNew") {
    dataState.addressCorrected = true;   
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