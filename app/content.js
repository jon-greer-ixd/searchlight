var dataState = require('./dataState').dataState;

var content = {
  editDate : "16 Jan 2018",
  pageTitle : "Update residential address",
  setPageTitle : function() {
    if (dataState.updateType == "updateStatus" || dataState.updateType == "updateStatusDLO") {
      this.pageTitle = "Update an address status";
    } else if (dataState.updateType == "updateAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (dataState.updateType == "addCorrespondence") {
      this.pageTitle = "Add a correspondence address";
    } else if (dataState.updateType == "correctStatus" || 
               dataState.updateType == "correctStatusDlo" || 
               dataState.updateType == "correctStatusLive" || 
               dataState.updateType == "updateStatusLive" ) {
      this.pageTitle = "Correct an address status";
    } else if (dataState.updateType == "correctCherish") {
      this.pageTitle = "Correct a cherished line";
    } else if (dataState.updateType == "correctNew") {
      this.pageTitle = "Correct an address";
    } else if (dataState.updateType == "correctDate") {
      this.pageTitle = "Correct a start date or notified start date";
    } else if (dataState.updateType == "end") {
      this.pageTitle = "End an address";
    } else if (dataState.updateType == "updateRemoveCherish") {
      this.pageTitle = "Remove a cherished line";
    } else if (dataState.updateType == "correctAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (dataState.updateType == "updateChangeCherish") {
      this.pageTitle = "Update a cherished line";
    } else if (dataState.updateType == "correctDateNotified") {
      this.pageTitle = "Correct the notified start date";
    } else {
      this.pageTitle = "Update an address";
    }
  }, 
  statusToText : function(status) {
    if (status === "dlo") {
      return "Dead letter office";
    } else if (status === "pwa") {
      return "Person without address";
    } else if (status === "nfa") {
      return "No fixed abode";
    } else {
      return "Live";
    }
  }
};

//function checkForShip() {
//
//}
//
module.exports.content = content; 