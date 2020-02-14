var express = require('express')
var router = express.Router()


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


// ROUTES

//get specific case
router.get(/get-case-handler/, function (req, res) {
  req.session.data.currentNinoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
  req.session.data.currentApplicationNumber = req.session.data.currentNinoApplication.applicationNumber;
  console.log(req.session.data.currentNinoApplication.nameOneFirst)
  console.log(req.session.data.currentNinoApplication.status)
  console.log(req.session.data.currentNinoApplication.statusDescription)
  console.log(req.session.data.currentNinoApplication.matchInCis)
  if(req.session.data.currentNinoApplication.matchInCis == true) {
    res.redirect('./trace')
  } else {
    res.redirect('./verify')
  }
})

//get next case
router.get(/next-case-handler/, function (req, res) {
  req.session.data.currentNinoApplication = getNextApplication(req.session.data.ninoApplications);
  req.session.data.currentApplicationNumber = req.session.data.currentNinoApplication.applicationNumber;
  req.session.data.ninoAllocated = null;
  res.redirect('./verify')
})


//cases

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
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect(next);
})

//right to work question
router.get(/right-to-work-handler/, function (req, res) {
  var status;
  if(req.query.allocate == 'true') {
    status = 2;
    req.session.data.ninoAllocated = true;
  } else {
    status = 4;
    req.session.data.ninoAllocated = false;
  }
  req.session.data.currentNinoApplication.status = status;
  req.session.data.ninoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication);
  res.redirect('./done');
})


module.exports = router

// update the current case status
// put this one back in the cases
//     req.session.data.ninoApplications = setStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, status);



// var getStatus = function (allocate) {
//   var status;
//   if (allocate == 'true') {
//     status = 2;
//   } else if (allocate == 'null') {
//     status = 1;
//   } else {
//     status = 3;
//   }
//   return status;
// }

// function getApplication(applicationNumber, applications) {
//   var result = null;
//   for (var application in applications) {
//     if(applications[application].applicationNumber == applicationNumber) {
//       console.log(`Found! application = ${applications[application].nameOneFirst}`);
//       result = applications[application];
//     }
//   }
//   return result;
// }

// var getStatusDescription = function(application) {
//   var statusDescription;
//     // {# scenario 2 - no right to work  #}
//     if (application.rightToWork == false) {
//     statusDescription = 2;
//     // {# scenario 8 - DOB, Nationality mismatch  #}
//   } else if (application.BRPMatch == false && application.passportMatch == false) {
//     statusDescription = 8;
//     // {# scenario 4 - BRP mismatch and name mismatch  #}
//   } else if (application.BRPMatch == false && application.nameMatch == false) {
//     statusDescription = 4;
//     // {# scenario 3 - BRP mismatch  #}
//   } else if (application.BRPMatch == false && application.nameMatch == true) {
//     statusDescription = 3;
//     // {# scenario 6 - Passport mismatch and name mismatch  #}
//   } else if (application.passportMatch == false && application.nameMatch == false) {
//     statusDescription = 6;
//     // {# scenario 5 - Passport mismatch #}
//   } else if (application.passportMatch == false && application.nameMatch == true) {
//     statusDescription = 5;
//     // {# scenario 7 - Name mismatch  #}
//   } else if (application.passportMatch == true && application.BRPMatch == true && application.nameMatch == false) {
//     statusDescription = 7;
//     // {# scenario 1 - all match  #}
//   } else {
//     statusDescription = 1;
//   }
//   console.log(`The status description = ${statusDescription}`)
//   return statusDescription;
// }


// var updateApplications = function(applications, application) {
//     for (var x in applications) {
//     if(applications[x].applicationNumber == application.applicationNumber) {
//       applications[x] = application;
//       console.log("here " + applications[x].status);
//     }
//   }
//   return applications;
// }




// router.get(/check-cis-handler/, function (req, res) {
//   if(req.query.allocate == 'true') {
//     if(req.session.data.currentNinoApplication.matchInCis == true) {
//       res.redirect('./trace')
//     } else {
//       res.redirect('set-case-handler?allocate=true')
//     }  
//   } else {
//     res.redirect('set-case-handler?allocate=false')
//   }
// })

// router.get(/trace-options-handler/, function (req, res) {
//   var status = getStatus(req.query.allocate);
//   req.session.data.currentNinoApplication.statusDescription = 9;
//   if(req.query.allocate == 'true') {
//     req.session.data.currentNinoApplication.matchInCis = false; 
//   }
//   req.session.data.currentNinoApplication.status = status;
//   req.session.data.currentNinoApplications = updateApplications(req.session.data.ninoApplications, req.session.data.currentNinoApplication)
//   res.redirect('./cases')
// })

// //set details
// router.get(/set-case-handler/, function (req, res) {
//   var status = getStatus(req.query.allocate);
//   req.session.data.currentNinoApplication.status = status;
//   req.session.data.currentNinoApplication.statusDescription = getStatusDescription(req.session.data.currentNinoApplication);
//   req.session.data.currentNinoApplications = updateApplications(req.session.data. ninoApplications, req.session.data.currentNinoApplication)
//   if (req.session.data.currentNinoApplication.statusDescription == 7 && req.query.allocate == 'true') {
//     res.redirect('./data')
//   } else {
//     if(req.query.allocate = false) {
//       req.session.data.ninoAllocated = false;
//     } else {
//       req.session.data.ninoAllocated = true;
//     } 
//     res.redirect('./cases')
//   }
// })

// router.get(/nameentry-handler/, function (req, res) {
//   req.session.data.currentNinoApplication.nameOneFirst = req.session.data.ninoapplication_firstnames;
//   req.session.data.currentNinoApplication.nameOneLast = req.session.data.ninoapplication_lastname;
//   req.session.data.currentNinoApplication.statusDescription = getStatusDescription(req.session.data.currentNinoApplication);
//   req.session.data.currentNinoApplications = updateApplications(req.session.data. ninoApplications, req.session.data.currentNinoApplication)
//     res.redirect('./cases')
// })

// var updateName = function(currentApplicationNumber, ninoApplications, firstnames, lastname) {
//   for (var location in ninoApplications) {
//     if (ninoApplications[location].applicationNumber == currentApplicationNumber) {
//       ninoApplications[location].nameOneFirst = firstnames;
//       ninoApplications[location].nameOneLast = lastname;
//       console.log(`Name updated! ${ninoApplications[location].nameOneFirst} ${ninoApplications[location].nameOneLast}` )
//     }
//   }
//   return ninoApplications;
// }





// router.get(/data-match-handler/, function (req, res) {
//   if(req.query.datamatch == 'false') {
//     req.session.data.ninoAllocated = false;
//     res.redirect('set-case-handler?allocate=false')
//   } else {
//     res.redirect('./right_to_work')
//   }
// })



// function getApplication(applicationNumber, applications) {
//   var result = null;
//   for (var application in applications) {
//     if(applications[application].applicationNumber == applicationNumber) {
//       console.log(`Found! application = ${applications[application].nameOneFirst}`);
//       result = applications[application];
//     }
//   }
//   return result;
// }

// function getNextApplication(applications) {
//   var result = null;
//   for (var application in applications) {
//     if(applications[application].status == 0) {
//       console.log(`Next application = ${applications[application].applicationNumber} ${applications[application].nameOneFirst}`);
//       result = applications[application];
//       break;
//     }
//   }
//   return result;
// }





// var getStatusDescription = function(application) {
//   console.log(application.matchInCis);
//   var statusDescription;
//     // {# scenario 2 - no right to work  #}
//     if (application.rightToWork == false) {
//     statusDescription = 2;
//     // {# scenario 9 - Match in CIS  #}
//   } else if (application.matchInCis == false) {
//     statusDescription = 9;
//     // {# scenario 8 - DOB, Nationality mismatch  #}
//   } else if (application.BRPMatch == false && application.passportMatch == false) {
//     statusDescription = 8;
//     // {# scenario 4 - BRP mismatch and name mismatch  #}
//   } else if (application.BRPMatch == false && application.nameMatch == false) {
//     statusDescription = 4;
//     // {# scenario 3 - BRP mismatch  #}
//   } else if (application.BRPMatch == false && application.nameMatch == true) {
//     statusDescription = 3;
//     // {# scenario 6 - Passport mismatch and name mismatch  #}
//   } else if (application.passportMatch == false && application.nameMatch == false) {
//     statusDescription = 6;
//     // {# scenario 5 - Passport mismatch #}
//   } else if (application.passportMatch == false && application.nameMatch == true) {
//     statusDescription = 5;
//     // {# scenario 7 - Name mismatch  #}
//   } else if (application.passportMatch == true && application.BRPMatch == true && application.nameMatch == false) {
//     statusDescription = 7;
//     // {# scenario 1 - all match  #}
//   } else {
//     statusDescription = 1;
//   }
//   console.log(`The status description = ${statusDescription}`)
//   return statusDescription;
// }

// var getStatus = function (allocate) {
//   var status;
//   if (allocate == 'true') {
//     status = 2;
//   } else if (allocate == 'null') {
//     status = 1;
//   } else {
//     status = 3;
//   }
//   return status;
// }

// var setStatus = function(currentApplicationNumber, ninoApplications, status) {
//   for (var application in ninoApplications) {
//     if (ninoApplications[application].applicationNumber == currentApplicationNumber) {
//       ninoApplications[application].status = status;
//       console.log(`The status = ${ninoApplications[application].status}`)
//     }
//   }
//   return ninoApplications;
// }

// var setStatusDescription = function(currentApplicationNumber, ninoApplications) {
//   for (var application in ninoApplications) {
//     if (ninoApplications[application].applicationNumber == currentApplicationNumber) {
//       ninoApplications[application].statusDescription = getStatusDescription(ninoApplications[application]);
//     }
//   }
//   return ninoApplications;
// }
    
// //get next case
// router.get(/next-case-handler/, function (req, res) {
//   req.session.data.currentNinoApplication = getNextApplication(req.session.data.ninoApplications);
//   req.session.data.currentApplicationNumber = req.session.data.ninoApplication.applicationNumber;
//   req.session.data.ninoApplications = setStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, 1);
//   req.session.data.ninoApplication.statusDescription = getStatusDescription(req.session.data.ninoApplication);
//   res.redirect('./verify')
// })

// router.get(/get-case-handler/, function (req, res) {
//   req.session.data.currentNinoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
//   req.session.data.currentApplicationNumber = req.session.data.ninoApplication.applicationNumber;
//   req.session.data.ninoApplications = setStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, 1);
//   req.session.data.ninoApplication.statusDescription = getStatusDescription(req.session.data.ninoApplication);
//   res.redirect('./verify')
// })

// //set details
// router.get(/set-case-handler/, function (req, res) {
//   var status = getStatus(req.query.allocate);
//   if(status == 2) {
//     if(req.session.data.ninoApplication.matchInCis == true) {
//       res.redirect('./trace')
//     } else {
//       req.session.data.ninoApplications = setStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, status);
//       req.session.data.ninoApplications = setStatusDescription(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
//       res.redirect('./cases')
//     }
//   } else {
//     req.session.data.ninoApplications = setStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, status);
//     req.session.data.ninoApplications = setStatusDescription(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
//     res.redirect('./cases')
//   }
// })

// router.get(/cis-match-handler/, function (req, res) {
//   if(req.query.allocate == 'true') {
//     req.session.data.ninoApplication.matchInCis = false;
//     res.redirect('./set-case-handler?allocate=true')
//   } else if (req.query.allocate == 'false') {
//     req.session.data.ninoApplication.matchInCis = false;
//     res.redirect('./set-case-handler?allocate=false')
//   } else {
//     res.redirect('./set-case-handler?allocate=null')
//   }
// })





// // var updateApplicationStatus = function(currentApplicationNumber, ninoApplications, status) {
// //   for (var location in ninoApplications) {
// //     if (ninoApplications[location].applicationNumber == currentApplicationNumber) {
// //       ninoApplications[location].status = status;
// //       console.log("here   " + ninoApplications[location].status)
// //     }
// //   }
// //   return ninoApplications;
// // }

// // var updateCisMatch = function(currentApplicationNumber, ninoApplications) {
// //   for (var location in ninoApplications) {
// //     if (ninoApplications[location].applicationNumber == currentApplicationNumber) {
// //       ninoApplications[location].matchInCis = false;
// //     }
// //   }
// //   console.log(`CISMatch updated! ${ninoApplications[location].matchInCis}` )
// //   return ninoApplications;
// // }
// // var updateApplicationScenario = function(currentApplicationNumber, ninoApplications) {
// //   for (var location in ninoApplications) {
// //     if (ninoApplications[location].applicationNumber == currentApplicationNumber) {
// //       ninoApplications[location].statusDescription = setstatusDescription(ninoApplications[location]);
// //       console.log(ninoApplications[location].statusDescription);
// //     }
// //   }
// //   return ninoApplications;
// // }

// // var updateName = function(currentApplicationNumber, ninoApplications, firstnames, lastname) {
// //   for (var location in ninoApplications) {
// //     if (ninoApplications[location].applicationNumber == currentApplicationNumber) {
// //       ninoApplications[location].nameOneFirst = firstnames;
// //       ninoApplications[location].nameOneLast = lastname;
// //       console.log(`Name updated! ${ninoApplications[location].nameOneFirst} ${ninoApplications[location].nameOneLast}` )
// //     }
// //   }
// //   return ninoApplications;
// // }

// // //get cases
// // router.get(/get-case-handler/, function (req, res) {
// //   req.session.data.currentNinoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
// //   req.session.data.currentApplicationNumber = req.session.data.ninoApplication.applicationNumber;
// //   req.session.data.applyScenario = setstatusDescription(req.session.data.ninoApplication);
// //   if(req.session.data.ninoApplication.matchInCis == true) {
// //     req.session.data.matchInCis = true;
// //   } else {
// //     req.session.data.matchInCis = false;
// //   }
// //   res.redirect('./verify')
// // })

// // //verify case
// // router.get(/nino-master-router/, function (req, res) {
// //   if (req.query.allocate == "true") {
// //     //allocate
// //     if(req.session.data.ninoApplication.matchInCis == true) {
// //       req.session.data.ninoApplication.matchInCis == false
// //       req.session.data.ninoApplications = updateCisMatch(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
// //       res.redirect('./trace')
// //     } else if(req.session.data.ninoApplication.nameMatch != false) {
// //       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, 2);
// //       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
// //       res.redirect('./cases')
// //     } else {
// //       res.redirect('./data')
// //     }
// //   } else if (req.query.allocate == "false") {
// //     //dont allocate  
// //       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, 2);
// //       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
// //       res.redirect('./cases')
// //   } else {
// //     //hold
// //       req.session.data.ninoApplications = updateApplicationStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, 1);
// //       req.session.data.ninoApplications = updateApplicationScenario(req.session.data.currentApplicationNumber, req.session.data.ninoApplications);
// //       res.redirect('./cases')
// //     }
// //   })

// // //trace-handler
// // router.get(/check-accounts-handler/, function (req, res) {
// //   var status = parseInt(req.query.status);
// //     // req.session.data.ninoApplications = updateApplicationStatus(req.session.data.currentApplicationNumber, req.session.data.ninoApplications, status);
// //     res.redirect('./cases')
// // })




// //getApplication
// // get the next case (with an optional ref)
//   // given a list of cases 
//   // cycle through
//   // if the status is open - return this case to local


// //mark status
//   // given a case
//   // mark its status as 1 - done allocated
//   // mark its status as 2 - done not allocated
//   // mark its status as 3 - hold


// //set the application note
//   // given a case
//   // mark its statusDescription as
//   // 1 - all match
//   // 2 - no right to work
//   // 3 - BRP mismatch
//   // 4 - BRP mismatch and name mismatch
//   // 5 - Passport mismatch
//   // 6 - Passport mismatch and name mismatch
//   // 7 - Name mismatch
//   // 8 - DOB, Nationality mismatch
//   // 9 - Matched accounts in CIS








// //data.applicationNumber.status = newStatus;


// module.exports = router