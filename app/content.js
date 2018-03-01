var content = {
  editDate : "16 Jan 2018",
  pageTitle : "Update residential address",
  setPageTitle : function(updatetype) {
    if (updatetype == "updateStatus" || updatetype == "updateStatusDLO") {
      this.pageTitle = "Update an address status";
    } else if (updatetype == "updateAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (updatetype == "addCorrespondence") {
      this.pageTitle = "Add a correspondence address";
    } else if (updatetype == "correctStatus" || 
               updatetype == "correctStatusDlo" || 
               updatetype == "correctStatusLive" || 
               updatetype == "updateStatusLive" ) {
      this.pageTitle = "Correct an address status";
    } else if (updatetype == "correctCherish") {
      this.pageTitle = "Correct a cherished line";
    } else if (updatetype == "correctNew") {
      this.pageTitle = "Correct an address";
    } else if (updatetype == "correctDate") {
      this.pageTitle = "Correct a start date or notified start date";
    } else if (updatetype == "end") {
      this.pageTitle = "End an address";
    } else if (updatetype == "updateRemoveCherish") {
      this.pageTitle = "Remove a cherished line";
    } else if (updatetype == "correctAddCherish") {
      this.pageTitle = "Add a cherished line";
    } else if (updatetype == "updateChangeCherish") {
      this.pageTitle = "Update a cherished line";
    } else if (updatetype == "correctDateNotified") {
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

module.exports.content = content;