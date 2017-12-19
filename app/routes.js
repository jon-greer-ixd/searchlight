var express = require('express')
var router = express.Router()

var dataState = {
  updateType : null,
  cherished : false,
  status : "live",
  previousAddresses : false,
  correspondence : false,
  wasUpdated : false
};

var content = {
  editDate : "19 Dec 2017",
  pageTitle : "Update residential address"
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
    updatetype : dataState.updateType
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    updatetype : dataState.updateType
  })
})

router.get('/update/search-results', function (req, res) {
  res.render('update/search-results', {
    updatetype : dataState.updateType
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
  if(req.query.data === 'status') {
    dataState.updateType = "status";
    res.render('update/status')
  } else if (req.query.data === 'cherish') {
    dataState.updateType = "cherish";
    dataState.cherished = true;
    res.render('update/cherish-line')
  } else if (req.query.data === 'dlo') {
    dataState.updateType = "dlo";
    res.render('update/dates')
  //jump menu
  } else if (req.query.tochange === 'update') {
    //updateType = "";
    res.redirect('update')
  } else if (req.query.tochange === 'correct') {
    //updateType = "";
    res.render('update/correct')
  } else if (req.query.tochange === 'add') {
    dataState.updateType = "add";
    res.render('update/address-search')
  } else {
    dataState.updateType = "address";
    res.render('update/address-search')
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