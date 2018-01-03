var express = require('express')
var router = express.Router()
  
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

var dataState = {
  updateType : null,
  updating : false, //not used
  correcting : true, //not used
  correctionType: 'toNew', //status, date, cherish
  status : 'pwa', //dlo, live, nfa
  cherished : false,
  status : "live",
  previousAddresses : false,
  correspondence : false,
  wasUpdated : false,
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

router.get('/search-v1', function (req, res) {
  res.render('pages/search-v1.njk')
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

//v1
router.get('/update/v1/account', function (req, res) {
  res.render('update/v1/account', {
    updated : dataState.wasUpdated,
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

//v1
router.get('/update/v1/update', function (req, res) {
  res.render('update/v1/update', {
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

//v1
router.get('/update/v1/dates', function (req, res) {
  res.render('update/v1/dates', {
    updatetype :  dataState.updateType
  })
})

router.get('/update/check', function (req, res) {
  res.render('update/check', {
    correctiontype :dataState.correctionType,
    updatetype : dataState.updateType
  })
})

//v1
router.get('/update/v1/check', function (req, res) {
  res.render('update/v1/check', {
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

//v1
router.get('/update/v1/search-results', function (req, res) {
  console.log(updateType);
  res.render('update/v1/search-results', {
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
  } else {
    dataState.updateType = "address";
    content.setPageTitle();
    res.redirect('address-search')
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
    res.render('update/dates')
    res.render('update/v1/dates')
  } else {
    updateType = "address";
    res.render('update/v1/address-search')
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
    tempUpdate.flip('correct');
    res.render('update/correct')
    res.redirect('address-search')
  } 
  console.log(tempUpdate.correctionType);
  res.render(next);
})

//v1
router.get(/change-handler-v1/, function (req, res) {
  if (req.query.tochange == "add") {
    updateType = "new";
    res.render('update/address-search')
  } else if (req.query.tochange == "correct"){
    res.redirect('correct')
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