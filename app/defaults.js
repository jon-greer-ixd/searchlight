var defaults = {
  //contact
  contactType : null,
  //updater
  updateType : null,

  //CONTACT  
  showContact : false,
  preferedContactState : null,

  //PERSONAL DETAILS  
  //death
  dead : false,
  deathState : null,
  showDeath : false,
          
  //messagecentre
  toaster : null
};

var authority = {
  "housingBenefit" : {"state" : null, "show" : false},
  "councilTaxReduction" : {"state" : null, "show" : false}
};

var details = {
  name : {state : null, show : true, display : "Name type 1", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA", suffix : null},
  nameTwo : {state : null, show : false, display : "Name type 2", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA"},
  requestedName : {state : null, show : false, display : "Requested name", value : null}
}

var personalDetails = {
  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
  "recordLevel" : {state : null, show : false, display : "Special customer record level", value : null},
  "sex" : {state : null, show : true, display : "Sex", value : "Male"},
  "gender" : {state : null, show : false, display : "Gender", value : null, gra : false, preGra : false},
  "nifu" : {state : null, show : false, display : "National fraud interest", value : null},
  "disability" : {state : null, show : false, display : "Disability", value : null},
  "specialNeeds" : {state : null, show : false, display : "Special needs", value : null},
  "nationality" : {state : null, show : false, display : "Nationality", value : null},
  "preferedLanguage" : {state : null, show : false, display : "Prefered language", value : null},
  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null}
}

var contactTypes = {
  "personalMobile" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Personal mobile", value : "07761 111 111"},
  "homeTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Home telephone", value : "0191 111 111", exD : false},
  "daytimeTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Daytime telephone", value : "0191 222 222"},
  "eveningTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Evening telephone", value : "0191 333 333"},
  "businessMobile" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Business mobile", value : "07761 222 222"},
  "businessTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Business telephone", value : "0191 444 444"},
  "thirdParty" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Third party telephone", value : "07761 333 333"},
  "homeEmail" : {"state" : null, "show" : false, "pref" : false, "type" : "email", display : "Home email", value : "home@gmail.com"},
  "businessEmail" : {"state" : null, "show" : false, "pref" : false, "type" : "email", display : "Business email", value : "business@gmail.com"},
  "homeFax" : {"state" : null, "show" : false, "pref" : false, "type" : "fax", display : "Home fax", value : "0191 555 555"},
  "businessFax" : {"state" : null, "show" : false, "pref" : false, "type" : "fax", display : "Business fax", value : "0191 777 777"},
  "textPhone" : {"state" : null, "show" : false, "pref" : false, "type" : "other-phone", display : "Text phone", value : "0191 888 888"},
  "typeTalk" : {"state" : null, "show" : false, "pref" : false, "type" : "other-phone", display : "TypeTalk", value : "0191 999 999"},
  "otherContact" : {"state" : null, "show" : false, "pref" : false, "type" : "other", display : "Other contact method", value : "Fred the Pigeon"}
}


//  prints all the items
//  Object.keys(contactTypes).map(e => {
//    console.log(`key = ${e} state = ${contactTypes[e].state}`)
//  });

//contactTypes.thirdParty.show = false;
//console.log(`thirdParty show = ${contactTypes.thirdParty.show}`);


////access the properties
//contactTypes.homeTelephone.state = "adding";

function flip(value) {
  if (value === "Yes" || value === "yes" ) {
    return "No";
  } else if (value === "No" || value === "no" ) {
    return "Yes";
  } else if (value === "true" || value === true ) {
    return false;
  } else if (value === "false" || value === false ) {
    return true;
  }
}

function changeSex(sex) {
  if(sex === "Male") {
   return "Female";
  } else if (sex === "Female") {
    return "Male";
  }
}

//data.toaster = messageCentre(item, state);
function messageCentre(item, type, state) {
  var message;
  if (state == "adding") {
    state = "added";
  }
  if (type == "phone" || type == "fax" || type == "textPhone" || type == "typeTalk" || type == "other-phone") {
    type = "number";
  }
  if (type == "email") {
    type = "address";
  }
  if (type == "other") {
    type = "";
  }
  if (state == "updating") {
    state = "updated";
  }
  if (state == "correcting") {
    state = "corrected";
  }
  if (state == "removing") {
    state = "ended";
  }
  if (type == null) {
    message = `${item} ${state}`;
  } else {
    message = `${item} ${type} ${state}`;
  }
  console.log(`message = ${message}`);
  return message
}

//state-machine
function setState(state) {
  if (state === "add") {
    state = "added";
  } else if (state === "update") {
    state = "updated";
  } else if (state === "correct") {
    state = "corrected";
  } else if (state === "end") {
    state = "ended";
  }
  return state;
}

module.exports.messageCentre = messageCentre;
module.exports.authority = authority;
module.exports.changeSex = changeSex;
module.exports.flip = flip;
module.exports.defaults = defaults;
module.exports.contactTypes = contactTypes;
module.exports.personalDetails = personalDetails;
module.exports.details = details;
module.exports.setState = setState;
