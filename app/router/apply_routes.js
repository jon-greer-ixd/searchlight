var express = require('express')
var router = express.Router()

//version router
router.get(/get-applyForNinoVersion/, function (req, res) {
  var next;
  if (req.session.data.applyForNinoVersion == '1') {
    next = './apply/cases';
  } else if (req.session.data.applyForNinoVersion == '2') {
    next = './apply_mvp/cases';
  } else if (req.session.data.applyForNinoVersion == '3') {
    next = './apply_three/cases';
  } else if (req.session.data.applyForNinoVersion == '4') {
    next = './apply_four/cases';
  } else {
    next = './apply_five/cases';
  }
  res.redirect(next);
})

// FUNCTIONS
var updateApplications = function(applications, application) {
    for (var x in applications) {
    if(applications[x].applicationNumber == application.applicationNumber) {
      applications[x] = application;
    }
  }
  return applications;
}

function getNextApplication(applications) {
  var result = null;
  for (var application in applications) {
    if(applications[application].status == 0) {
      console.log(`Next application = ${applications[application].applicationNumber} ${applications[application].nameOneFirst}`);
      result = applications[application];
      break;
    }
  }
  return result;
}

function getApplication(applicationNumber, applications) {
  var result = null;
  for (var application in applications) {
    if(applications[application].applicationNumber == applicationNumber) {
      console.log(`Found! application = ${applications[application].nameOneFirst}`);
      result = applications[application];
    }
  }
  return result;
}

var setNonMatchItems = function(list, application) {
  application.ninofirstname = true;
  application.ninolastname = true;
  application.ninopassport = true;
  application.ninonationality = true;
  application.ninobrp = true;
  application.ninoiarrival = true;
  application.ninoaddress = true;
  for (var c in list) {
    if (list[c] == 'ninofirstname') {
      application.ninofirstname = false;
    } else if (list[c] == 'ninolastname') {
      application.ninolastname = false;
    } else if (list[c] == 'ninopassport') {
      application.ninopassport = false;
    } else if (list[c] == 'ninonationality') {
      application.ninonationality = false;
    } else if (list[c] == 'ninobrp') {
      application.ninobrp = false;
    } else if (list[c] == 'ninoiarrival') {
      application.ninoiarrival = false;
    } else if (list[c] == 'ninoaddress') {
      application.ninoaddress = false;
    }
  }
  return application;
}


/////////////////////////////////////////  * version 5  /////////////////////////////////////////
//data does not match question
router.get(/non-match-v5/, function (req, res) {
  var status;
  var next;
  if(req.query.match == 'hold') {
    status = 1;
  } else if (req.query.match == 'book') {
    status = 7;
  } else if (req.query.match == 'manual') {
    status = 8;
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
  }
  next = './done';
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})
/////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////  * version 4  /////////////////////////////////////////
//data match question
router.get(/data-match-v4/, function (req, res) {
  var status;
  var next;
  if(req.query.datamatch == 'true') {
    next = './right_to_work';
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
    next = './options';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.currentNinoApplication = setNonMatchItems([], req.session.data.currentNinoApplication)
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

//right to work question
router.get(/right-to-work-handler/, function (req, res) {
  var status;
  var next = './done';
  if(req.query.allocate == 'true') {
    status = 2;
    req.session.data.ninoAllocated = true;
    if (req.session.data.currentNinoApplication.ninofirstname == false) {
      next = './data';
    }
    if(req.session.data.currentNinoApplication.ninoReturned == true) {
      status = 6;
      next = './done';
    } else if(req.session.data.currentNinoApplication.matchInCis == true) {
      status = 1;
      next = './trace';
    }
  } else {
    status = 4;
    req.session.data.ninoAllocated = false;
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

//get specific case
router.get(/get-case-handler/, function (req, res) {
  req.session.data.currentNinoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
  req.session.data.currentApplicationNumber = req.session.data.currentNinoApplication.applicationNumber;
  if(req.session.data.currentNinoApplication.matchInCis == true) {
    res.redirect('./trace')
  } else {
    res.redirect('./verify')
  }
})

//data does not match question
router.get(/non-match-v4/, function (req, res) {
  var status;
  var next;
  if(req.query.allocate == 'true') {
    next = './right_to_work';
  } else if (req.query.allocate == 'null') {
    status = 1;
    next = './done';
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
    next = './done';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})
/////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////  * version 2  /////////////////////////////////////////
router.get(/data-match-mvp/, function (req, res) {
  var status;
  var next;
  if(req.query.datamatch == 'true') {
    next = './right_to_work';
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
    next = './done';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.currentNinoApplication = setNonMatchItems([], req.session.data.currentNinoApplication)
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

router.get(/overwrite-mvp/, function (req, res) {
  req.session.data.currentNinoApplication.status = 2;
  req.session.data.currentNinoApplication = setNonMatchItems([], req.session.data.currentNinoApplication)
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect('./done');
})

router.get(/get-aplication-by-ref/, function (req, res) {
  req.session.data.currentNinoApplication = getApplication(req.query.ninoapplication_applicationnumber, req.session.data.ninoApplications);
  res.redirect('./verify');
})

router.get(/get-crs-by-ref/, function (req, res) {
  req.session.data.currentNinoApplication = getApplication(req.query.ninoapplication_applicationnumber, req.session.data.ninoApplications);
  res.redirect('../apply_mvp/crs_data');
})

//data does not match question
router.get(/mvp-options-handler/, function (req, res) {
  var status;
  if(req.query.allocate == 'true') {
    status = 2;
  } else if (req.query.allocate == 'null') {
    status = 0;
  } else {
    status = 5;
    req.session.data.ninoAllocated = false;
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect('./done');
})

router.get(/mvp-traceoptions-handler/, function (req, res) {
  var status;
  if(req.query.allocate == 'true') {
    status = 2;
    req.session.data.ninoAllocated = true;
  } else if (req.query.allocate == 'false') {
    status = 6;
    req.session.data.ninoAllocated = false;
  } else {
    status = 1;
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect('./done');
})
/////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////  * version 1  /////////////////////////////////////////
//get next case
router.get(/next-case-handler/, function (req, res) {
  req.session.data.ninoapplication_firstnames = null;
  req.session.data.ninoapplication_lastname = null;
  var next;
  req.session.data.currentNinoApplication = getNextApplication(req.session.data.ninoApplications);
  if(req.session.data.currentNinoApplication != null) {
    req.session.data.currentApplicationNumber = req.session.data.currentNinoApplication.applicationNumber;
    next = './verify';
  } else {
    next = './cases';
  }
  req.session.data.ninoAllocated = null;
  res.redirect(next)
})

//verify personal details
router.get(/verify-details-handler/, function (req, res) {
  res.redirect('./data_match')
})

//data match question
router.get(/data-match-handler/, function (req, res) {
  var status;
  var next;
  if(req.query.datamatch == 'true') {
    next = './right_to_work';
  } else if (req.query.datamatch == 'null') {
    status = 1;
    next = './cases';
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
    next = './match';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.currentNinoApplication = setNonMatchItems([], req.session.data.currentNinoApplication)
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

//data does not match question
router.get(/non-match-handler/, function (req, res) {
  var status;
  var next;
  if(req.query.allocate == 'true') {
    next = './right_to_work';
  } else if (req.query.allocate == 'null') {
    status = 1;
    next = './cases';
  } else {
    status = 3;
    req.session.data.ninoAllocated = false;
    next = './done';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

router.get(/nino-match-handler/, function (req, res) {
  req.session.data.currentNinoApplication = setNonMatchItems(req.query, req.session.data.currentNinoApplication);
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect('./options');
})

router.get(/nameentry-handler/, function (req, res) {
  req.session.data.currentNinoApplication.updatedNameOneFirst = req.session.data.ninoapplication_firstnames;
  req.session.data.currentNinoApplication.updatedNameOneLast = req.session.data.ninoapplication_lastname;
  req.session.data.currentNinoApplication.status = 2;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  req.session.data.ninoAllocated = true;
  res.redirect('./done')
})

router.get(/trace-options-handler/, function (req, res) {
  var status;
  var next;
  if(req.query.allocate == 'true') {
    status = 2;
    req.session.data.ninoAllocated = true;
    next = './done';
  } else if (req.query.allocate == 'null') {
    status = 1;
    next = './cases';
  } else {
    status = 5;
    req.session.data.ninoAllocated = false;
    next = './done';
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})
/////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router