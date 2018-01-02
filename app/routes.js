var express = require('express')
var router = express.Router()

// add temUpdate object
// add new update routes
// add new routes

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

// add your routes here

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
    updatetype : updateType,
    correctiontype : tempUpdate.correctionType
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
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/dates')
    
    //new
  } else if (req.query.data === 'dlo') {
    updateType = "dlo";
    res.render('update/dates')
    //
    
  } else {
    updateType = "address";
    res.render('update/address-search')
  }
  
})

router.get(/correction-type-handler/, function (req, res) {
  console.log(req.query);
  var next = "update/dates";
  if(req.query.data === 'new') {
   tempUpdate.correctionType = "toNew";
    next = "update/address-search"
  } else if(req.query.data === 'status') {
    tempUpdate.correctionType = "status";
    next = "update/status"
  } else if(req.query.data === 'date') {
    tempUpdate.correctionType = "date";
  } else if(req.query.data === 'cherish') {
    next = "update/cherish"
    tempUpdate.correctionType = "cherish";
  }
  console.log(tempUpdate.correctionType);
  res.render(next);
})

//add new address
router.get('/update/change-handler', function (req, res) {
  console.log(req.query);
  if (req.query.data == "new") {
    updateType = "new";
    res.render('update/address-search')
  } else if (req.query.data == "correct"){
    tempUpdate.flip('correct');
    res.render('update/correct')
  } else {
    tempUpdate.flip('update')
    res.redirect('update')
  }
})

//new
router.get('/update/correct-handler', function (req, res) {
  tempUpdate.flip('correct');
  res.render('update/correct')
})

module.exports = router