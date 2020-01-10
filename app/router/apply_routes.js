var express = require('express')
var router = express.Router()

var getApplication = require('../../functions/search-functions.js').getApplication;

var updateStatus = function(ninoApplicationNumber, ninoApplications, status) {
  for (var location in ninoApplications) {
    if (ninoApplications[location].applicationNumber == ninoApplicationNumber) {
      ninoApplications[location].status = status;
      console.log("here   " + ninoApplications[location].status)
    }
  }
  return ninoApplications;
}

//get cases
router.get(/get-cases-handler/, function (req, res) {
  req.session.data.ninoApplication = getApplication(req.query.applicationNumber, req.session.data.ninoApplications);
  req.session.data.ninoApplicationNumber = req.session.data.ninoApplication.applicationNumber;
  res.redirect('./verify')
})

//verify case
router.get(/verify-data-handler/, function (req, res) {
  if (req.query.allocate == "true") {
    //allocate
    if(req.session.data.ninoApplication.matchInCis == true) {
      req.session.data.ninoApplications = updateStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 1);
      res.redirect('./trace')
    } else {
      req.session.data.ninoApplications = updateStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 2);
      res.redirect('./cases')
    }
  } else {
  //dont allocate  
    req.session.data.ninoApplications = updateStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, 3);
    res.redirect('./cases')
  }
})

//trace-handler
router.get(/check-accounts-handler/, function (req, res) {
  var status = parseInt(req.query.status);
    req.session.data.ninoApplications = updateStatus(req.session.data.ninoApplicationNumber, req.session.data.ninoApplications, status);
    res.redirect('./cases')
})



//data.applicationNumber.status = newStatus;


module.exports = router