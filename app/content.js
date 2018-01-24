var dataState = require('./dataState').dataState;

var content = {
  editDate : "16 Jan 2018",
  pageTitle : "Update residential address",
  setPageTitle : function(updateType) {
    var title;
    if (updateType == "updateStatus" || 
        updateType == "updateStatusDLO") {
      title = "Update an address status";
    } else if (updateType == "updateAddCherish") {
      title = "Add a cherished line";
    } else if (updateType == "addCorrespondence") {
      title = "Add a correspondence address";
    } else if (updateType == "correctStatus" || 
               updateType == "correctStatusDlo" || 
               updateType == "correctStatusLive" || 
               updateType == "updateStatusLive" ) {
      title = "Correct an address status";
    } else if (updateType == "correctCherish") {
      title = "Correct a cherished line";
    } else if (updateType == "correctNew") {
      title = "Correct an address";
    } else if (updateType == "correctDate") {
      title = "Correct a start date or notified start date";
    } else if (updateType == "end") {
      title = "End an address";
    } else if (updateType == "updateRemoveCherish") {
      title = "Remove a cherished line";
    } else if (updateType == "correctAddCherish") {
      title = "Add a cherished line";
    } else if (updateType == "updateChangeCherish") {
      title = "Update a cherished line";
    } else if (updateType == "correctDateNotified") {
      title = "Correct the notified start date";
    } else {
      title = "Update an address";
    }
    this.pageTitle = title;
    return title;
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