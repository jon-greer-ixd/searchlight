var express = require('express')
var router = express.Router()

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

var setsatusDescription = function(application) {
  var applyScenario;
  if (application.rightToWork == false) {
    // {# scenario 2 - no right to work  #}
    applyScenario = 2;
  } else if (application.BRPMatch == false && application.passportMatch == false) {
    // {# scenario 8 - DOB, Nationality mismatch  #}
    applyScenario = 8;
  } else if (application.BRPMatch == false && application.nameMatch == false) {
    // {# scenario 4 - BRP mismatch and name mismatch  #}
    applyScenario = 4;
  } else if (application.BRPMatch == false && application.nameMatch == true) {
    // {# scenario 3 - BRP mismatch  #}
    applyScenario = 3;
  } else if (application.passportMatch == false && application.nameMatch == false) {
    // {# scenario 6 - Passport mismatch and name mismatch  #}
    applyScenario = 6;
  } else if (application.passportMatch == false && application.nameMatch == true) {
    // {# scenario 5 - Passport mismatch #}
    applyScenario = 5;
  } else if (application.passportMatch == true && application.BRPMatch == true && application.nameMatch == false) {
    // {# scenario 7 - Name mismatch  #}
    applyScenario = 7;
  } else if (application.nationalityMatch == false) {
  } else {
    // {# scenario 1 - all match  #}
    applyScenario = 1;
  }
  console.log(`The apply Scenario = ${applyScenario}`)
  return applyScenario;
}

var updateApplicationStatus = function(ninoApplicationNumber, ninoApplications, status) {
  for (var location in ninoApplications) {
    if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
      ninoApplications[location].status = status;
      console.log("here   " + ninoApplications[location].status)
    }
  }
  return ninoApplications;
}

var updateCisMatch = function(ninoApplicationNumber, ninoApplications) {
  for (var location in ninoApplications) {
    if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
      ninoApplications[location].matchInCis = false;
    }
  }
  console.log(`CISMatch updated! ${ninoApplications[location].matchInCis}` )
  return ninoApplications;
}
var updateApplicationScenario = function(ninoApplicationNumber, ninoApplications) {
  for (var location in ninoApplications) {
    if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
      ninoApplications[location].satusDescription = setsatusDescription(ninoApplications[location]);
      console.log(ninoApplications[location].satusDescription);
    }
  }
  return ninoApplications;
}

var updateName = function(ninoApplicationNumber, ninoApplications, firstnames, lastname) {
  for (var location in ninoApplications) {
    if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
      ninoApplications[location].nameOneFirst = firstnames;
      ninoApplications[location].nameOneLast = lastname;
      console.log(`Name updated! ${ninoApplications[location].nameOneFirst} ${ninoApplications[location].nameOneLast}` )
    }
  }
  return ninoApplications;
}

//get cases
router.get(/get-case-handler/, function (req, res) {
  req.session.data.ninoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
  req.session.data.ninoApplicationNumber = req.session.data.ninoApplication.applicationNumber;
  req.session.data.applyScenario = setsatusDescription(req.session.data.ninoApplication);
  if(req.session.data.ninoApplication.matchInCis == true) {
    req.session.data.matchInCis = true;
  } else {
    req.session.data.matchInCis = false;
  }
  res.redirect('./verify')
})

//verify case
router.get(/nino-master-router/, function (req, res) {
  if (req.query.allocate == "true") {
    //allocate
    if(req.session.data.ninoApplication.matchInCis == true) {
      req.session.data.ninoApplication.matchInCis == false
      req.session.data.ninoApplications = updateCisMatch(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
      res.redirect('./trace')
    } else if(req.session.data.ninoApplication.nameMatch != false) {
      req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
      req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
      res.redirect('./cases')
    } else {
      res.redirect('./data')
    }
  } else if (req.query.allocate == "false") {
    //dont allocate  
      req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
      req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
      res.redirect('./cases')
  } else {
    //hold
      req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 1);
      req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
      res.redirect('./cases')
    }
  })

//trace-handler
router.get(/check-accounts-handler/, function (req, res) {
  var status = parseInt(req.query.status);
    // req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, status);
    res.redirect('./cases')
})


router.get(/nameentry-handler/, function (req, res) {
    req.session.data.ninoApplications = updateName(req.session.data.ninoApplicationNumber, 
                                                    req.session.data.ninoApplications, 
                                                    req.session.data.ninoapplication_firstnames, 
                                                    req.session.data.ninoapplication_lastname);
                                                    
    req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
    req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
    res.redirect('./cases')
})


//getApplication
// get the next case (with an optional ref)
  // given a list of cases 
  // cycle through
  // if the status is open - return this case to local


//mark status
  // given a case
  // mark its status as 1 - done allocated
  // mark its status as 2 - done not allocated
  // mark its status as 3 - hold


//set the application note
  // given a case
  // mark its statusDescription as
  // 1 - all match
  // 2 - no right to work
  // 3 - BRP mismatch
  // 4 - BRP mismatch and name mismatch
  // 5 - Passport mismatch
  // 6 - Passport mismatch and name mismatch
  // 7 - Name mismatch
  // 8 - DOB, Nationality mismatch
  // 9 - Matched accounts in CIS








//data.applicationNumber.status = newStatus;


module.exports = router