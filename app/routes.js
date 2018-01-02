var express = require('express')
var router = express.Router()

// new routes

var isUpdated = false;
var isCherished = false;
var editDate = "19 Dec 2017";
var updateType = "update";
var previousAddresses =  false;
var pageTitle = "Update residential address";
var correspondence = false;

//add this
var tempUpdate = {
  updating : false,
  correcting : true,
  correctionType: 'toNew', //status, date, cherish
  status : 'pwa', //dlo, live, nfa
  flip : function(type) {
    if(type === 'correct') {
        this.correcting = true;
        this.updating = false;
      } else if(type === 'update') {
        this.updating = true;
        this.correcting = false;
      }
    console.log("updating = " + this.updating + " correcting = " + this.correcting);
    }
  /*
  Steps -
  view the account
  select correct - set correcting to true, updating to false
  select correction type 
  correct : add - add journey
  correct status - view the status
  correct : start date - view the dates
  correct : cherish - view the cherrish
  */
};

var dataState = {
  updateType : null,
  //ADD
  //CHERISH
  //STATUS
  //DLO
  cherished : false,
  status : "live",
  previousAddresses : false,
  correspondence : false,
  wasUpdated : false
};

var content = {
  editDate : "19 Dec 2017",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "status" || dataState.updateType == "dlo") {
      this.pageTitle = "Update address status"
    } else if (dataState.updateType == "cherish") {
      this.pageTitle = "Add a cherished line"
    } else if (dataState.updateType == "add") {
      this.pageTitle = "Add a correspondence address"
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
  dataState.updateType = null;
  dataState.wasUpdated = false;
  dataState.cherished = false;
  dataState.previousAddresses = false;
  dataState.correspondence = false;
  pageTitle = "Update residential address";
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})


//update
router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : dataState.wasUpdated,
    cherished : dataState.cherished,
    editDate : content.editDate,
    previous_addresses : dataState.previousAddresses,
    correspondence : dataState.correspondence
  })
})

router.get('/update/update', function (req, res) {
  res.render('update/update', {
    correspondence : dataState.correspondence,
    pagetitle : content.pageTitle
  })
})
router.get('/update/update-v2', function (req, res) {
  res.render('update/update-v2', {
    correspondence : dataState.correspondence,
    pagetitle : content.pageTitle
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    updatetype : dataState.updateType,
    pagetitle : content.pageTitle
  })
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

router.get(/check-answers-handler/, function (req, res) {
  if(dataState.updateType === "add") {
    dataState.correspondence = true;
  }
  if (dataState.updateType === "address") {
    dataState.previousAddresses = true;    
    dataState.wasUpdated = true;
  }
//  if (updateType === "dlo") {
//    dataState.wasUpdated = true;
//  }
  res.redirect('account')
})

router.get(/update-type-handler/, function (req, res) {
  console.log("here " + req.query.data);
  if(req.query.data === 'status') {
    dataState.updateType = "status";
    content.setPageTitle();
    res.render('update/status');
  } else if (req.query.data === 'cherish') {
    dataState.updateType = "cherish";
    dataState.cherished = true;
    content.setPageTitle();
    res.redirect('cherish-line');
  } else if (req.query.data == 'add') {
    dataState.updateType = "add";
    content.setPageTitle();
    res.redirect('address-search');
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    content.setPageTitle();
    res.redirect('dates');
  //jump menu
  } else if (req.query.tochange === 'update') {
    //updateType = "";
    content.setPageTitle();
    res.redirect('update');
  } else if (req.query.tochange === 'correct') {
    //updateType = "";
    content.setPageTitle();
    res.render('update/correct')
  } else if (req.query.tochange === 'add') {
    dataState.updateType = "add";
    content.setPageTitle();
    res.redirect('address-search')
  } else {
    dataState.updateType = "address";
    content.setPageTitle();
    res.redirect('address-search')
  }
})

//add new address
router.get('/update/change-handler', function (req, res) {
  console.log(req.query);
  if (req.query.data == "new") {
    dataState.updateType = "new";
    res.render('update/address-search')
  } else if (req.query.data == "correct"){
    res.render('update/correct')
  } else {
    res.redirect('update')
  }
})

module.exports = router