var express = require('express')
var router = express.Router()

// new routes

var isUpdated = false;
var editDate = "14 Dec 2017";
var updateType = "update";
var previousAddresses =  false;
var pageTitle = "Update residential address";
var correspondence = false;

var main = require('./main/routes');

router.use('/', main);

// Route index page
router.get('/', function (req, res) {
  isUpdated = false;
  previousAddresses = false;
  correspondence = false;
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

router.get('/update/account', function (req, res) {
  res.render('account', {
    updated : isUpdated,
    editDate : editDate,
    previous_addresses : previousAddresses,
    correspondence : correspondence
  })
})

//v1
router.get('/update/v1/account', function (req, res) {
  res.render('update/v1/account', {
    updated : isUpdated,
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

//v1
router.get('/update/v1/update', function (req, res) {
  res.render('update/v1/update', {
    correspondence : correspondence,
    pagetitle : pageTitle
  })
})

router.get('/update/dates', function (req, res) {
  res.render('update/dates', {
    updatetype : updateType
  })
})

//v1
router.get('/update/v1/dates', function (req, res) {
  res.render('update/v1/dates', {
    updatetype : updateType
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    updatetype : updateType
  })
})

//v1
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

//v1
router.get('/update/v1/search-results', function (req, res) {
  console.log(updateType);
  res.render('update/v1/search-results', {
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
  res.redirect('account')
})

router.get(/check-handler-v1/, function (req, res) {
  if(updateType === "add") {
    correspondence = true;
  }
  if (updateType === "address") {
    previousAddresses = true;    
    isUpdated = true;
  }
  res.redirect('account')
})

router.get(/update-type-handler/, function (req, res) {
  if(req.query.data === 'status') {
    updateType = "status";
    res.render('update/status')
  } else if (req.query.data === 'cherish') {
    updateType = "cherish";
    res.render('update/cherish-line')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/dates')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/dates')
  } else {
    updateType = "address";
    res.render('update/address-search')
  }
})

//v1
router.get(/update-handler-v1/, function (req, res) {
  if(req.query.data === 'status') {
    updateType = "status";
    res.render('update/v1/status')
  } else if (req.query.data === 'cherish') {
    updateType = "cherish";
    res.render('update/v1/cherish-line')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/v1/dates')
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/v1/dates')
  } else {
    updateType = "address";
    res.render('update/v1/address-search')
  }
})

//v1
router.get(/change-handler-v1/, function (req, res) {
  console.log(req.query);
  if (req.query.tochange == "add") {
    updateType = "new";
    res.redirect('address-search')
  } else if (req.query.tochange == "correct"){
    res.redirect('correct')
  } else {
    res.redirect('update')
  }
})

module.exports = router