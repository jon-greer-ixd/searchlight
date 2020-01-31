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

var getStatusDescription = function(application) {
  var statusDescription;
    // {# scenario 2 - no right to work  #}
    if (application.rightToWork == false) {
    statusDescription = 2;
    // {# scenario 8 - DOB, Nationality mismatch  #}
  } else if (application.BRPMatch == false && application.passportMatch == false) {
    statusDescription = 8;
    // {# scenario 4 - BRP mismatch and name mismatch  #}
  } else if (application.BRPMatch == false && application.nameMatch == false) {
    statusDescription = 4;
    // {# scenario 3 - BRP mismatch  #}
  } else if (application.BRPMatch == false && application.nameMatch == true) {
    statusDescription = 3;
    // {# scenario 6 - Passport mismatch and name mismatch  #}
  } else if (application.passportMatch == false && application.nameMatch == false) {
    statusDescription = 6;
    // {# scenario 5 - Passport mismatch #}
  } else if (application.passportMatch == false && application.nameMatch == true) {
    statusDescription = 5;
    // {# scenario 7 - Name mismatch  #}
  } else if (application.passportMatch == true && application.BRPMatch == true && application.nameMatch == false) {
    statusDescription = 7;
    // {# scenario 1 - all match  #}
  } else {
    statusDescription = 1;
  }
  console.log(`The status description = ${statusDescription}`)
  return statusDescription;
}

var setStatus = function(ninoApplicationNumber, ninoApplications, status) {
  for (var application in ninoApplications) {
    if (ninoApplications[application].applicationNumber == ninoApplicationNumber) {
      ninoApplications[application].status = status;
      console.log(`The status = ${ninoApplications[application].status}`)
    }
  }
  return ninoApplications;
}

var setStatusDescription = function(ninoApplicationNumber, ninoApplications) {
  for (var application in ninoApplications) {
    if (ninoApplications[application].applicationNumber == ninoApplicationNumber) {
      ninoApplications[application].statusDescription = getStatusDescription(ninoApplications[application]);
    }
  }
  return ninoApplications;
}



//get next case
router.get(/next-case-handler/, function (req, res) {
  req.session.data.ninoApplication = getNextApplication(req.session.data.ninoApplications);
  req.session.data.ninoApplicationNumber = req.session.data.ninoApplication.applicationNumber;
  req.session.data.ninoApplications = setStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 1);
  req.session.data.ninoApplication.statusDescription = getStatusDescription(req.session.data.ninoApplication);
  res.redirect('./verify')
})

//set details
router.get(/set-case-handler/, function (req, res) {
  req.session.data.ninoApplications = setStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
  req.session.data.ninoApplications = setStatusDescription(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
  res.redirect('./cases')
})





// var updateApplicationStatus = function(ninoApplicationNumber, ninoApplications, status) {
//   for (var location in ninoApplications) {
//     if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
//       ninoApplications[location].status = status;
//       console.log("here   " + ninoApplications[location].status)
//     }
//   }
//   return ninoApplications;
// }

// var updateCisMatch = function(ninoApplicationNumber, ninoApplications) {
//   for (var location in ninoApplications) {
//     if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
//       ninoApplications[location].matchInCis = false;
//     }
//   }
//   console.log(`CISMatch updated! ${ninoApplications[location].matchInCis}` )
//   return ninoApplications;
// }
// var updateApplicationScenario = function(ninoApplicationNumber, ninoApplications) {
//   for (var location in ninoApplications) {
//     if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
//       ninoApplications[location].statusDescription = setstatusDescription(ninoApplications[location]);
//       console.log(ninoApplications[location].statusDescription);
//     }
//   }
//   return ninoApplications;
// }

// var updateName = function(ninoApplicationNumber, ninoApplications, firstnames, lastname) {
//   for (var location in ninoApplications) {
//     if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
//       ninoApplications[location].nameOneFirst = firstnames;
//       ninoApplications[location].nameOneLast = lastname;
//       console.log(`Name updated! ${ninoApplications[location].nameOneFirst} ${ninoApplications[location].nameOneLast}` )
//     }
//   }
//   return ninoApplications;
// }

// //get cases
// router.get(/get-case-handler/, function (req, res) {
//   req.session.data.ninoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
//   req.session.data.ninoApplicationNumber = req.session.data.ninoApplication.applicationNumber;
//   req.session.data.applyScenario = setstatusDescription(req.session.data.ninoApplication);
//   if(req.session.data.ninoApplication.matchInCis == true) {
//     req.session.data.matchInCis = true;
//   } else {
//     req.session.data.matchInCis = false;
//   }
//   res.redirect('./verify')
// })

// //verify case
// router.get(/nino-master-router/, function (req, res) {
//   if (req.query.allocate == "true") {
//     //allocate
//     if(req.session.data.ninoApplication.matchInCis == true) {
//       req.session.data.ninoApplication.matchInCis == false
//       req.session.data.ninoApplications = updateCisMatch(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
//       res.redirect('./trace')
//     } else if(req.session.data.ninoApplication.nameMatch != false) {
//       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
//       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
//       res.redirect('./cases')
//     } else {
//       res.redirect('./data')
//     }
//   } else if (req.query.allocate == "false") {
//     //dont allocate  
//       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
//       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
//       res.redirect('./cases')
//   } else {
//     //hold
//       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 1);
//       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
//       res.redirect('./cases')
//     }
//   })

// //trace-handler
// router.get(/check-accounts-handler/, function (req, res) {
//   var status = parseInt(req.query.status);
//     // req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, status);
//     res.redirect('./cases')
// })


// router.get(/nameentry-handler/, function (req, res) {
//     req.session.data.ninoApplications = updateName(req.session.data.ninoApplicationNumber, 
//                                                     req.session.data.ninoApplications, 
//                                                     req.session.data.ninoapplication_firstnames, 
//                                                     req.session.data.ninoapplication_lastname);
                                                    
//     req.session.data.ninoApplications = updateApplicationStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
//     req.session.data.ninoApplications = updateApplicationScenario(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications);
//     res.redirect('./cases')
// })


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