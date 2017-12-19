var express = require('express')
var router = express.Router()

var dataState = {
  isUpdated : false,
  isCherished : false,
  updateType : "update",
  previousAddresses :  false,
  correspondence : false
};

var content = {
  editDate : "19 Dec 2017",
  pageTitle : "Update residential address"
};

var isUpdated = false;
var isCherished = false;
var editDate = "18 Dec 2017";
var updateType = "update";
var previousAddresses =  false;
var pageTitle = "Update residential address";
var correspondence = false;

var main = require('./main/routes');

router.use('/', main);

// Route index page
  router.get('/', function (req, res) {
  isUpdated = false;
  isCherished = false;
  previousAddresses = false;
  correspondence = false;
  res.render('index')
})

router.get('/kitchen-sink', function (req, res) {
  res.render('kitchen-sink.njk')
})

// add your routes here

//update
router.get('/choice-handler', function (req, res) {
  res.render('address-search')
})

router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : isUpdated,
    cherished : isCherished,
    editDate : editDate,
    previous_addresses : previousAddresses,
    correspondence : correspondence
  })
})

router.get('/update/update', function (req, res) {
  res.render('update/update', {
    correspondence : correspondence,
    pagetitle : pageTitle
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    updatetype : updateType
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    updatetype : updateType
  })
})

router.get('/update/search-results', function (req, res) {
  console.log(updateType);
  res.render('update/search-results', {
    updatetype : updateType
  })
})

router.get(/check-answers-handler/, function (req, res) {
  if(updateType === "add") {
    correspondence = true;
  }
  if (updateType === "address") {
    previousAddresses = true;    
    isUpdated = true;
  }
//  if (updateType === "dlo") {
//    isUpdated = true;
//  }
  res.redirect('account')
})

router.get(/update-type-handler/, function (req, res) {
  if(req.query.data === 'status') {
    updateType = "status";
    res.render('update/status')
  } else if (req.query.data === 'cherish') {
    updateType = "cherish";
    isCherished = true;
    res.render('update/cherish-line')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    console.log(updateType);
    res.render('update/dates')
  //jump menu
  } else if (req.query.tochange === 'update') {
    //updateType = "";
    res.redirect('update')
  } else if (req.query.tochange === 'correct') {
    //updateType = "";
    res.render('update/correct')
  } else if (req.query.tochange === 'add') {
    updateType = "add";
    res.render('update/address-search')
  } else {
    updateType = "address";
    res.render('update/address-search')
  }
})

//add new address
router.get('/update/change-handler', function (req, res) {
  console.log(req.query);
  if (req.query.data == "new") {
    updateType = "new";
    res.render('update/address-search')
  } else if (req.query.data == "correct"){
    res.render('update/correct')
  } else {
    res.redirect('update')
  }
})

module.exports = router