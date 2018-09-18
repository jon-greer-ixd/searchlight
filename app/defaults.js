var defaults = {
  //contact
  contactType : null,
  //updater
  updateType : null,

  //CONTACT  
  showContact : false,
  preferredContactState : null,

  //PERSONAL DETAILS  
  //death
  dead : false,
  deathState : null,
  showDeath : false,
          
  //messagecentre
  toaster : null,
  
  //gcii
  gciiExample : 4
};

var authority = {
  "housingBenefit" : {"state" : null, "show" : false},
  "councilTaxReduction" : {"state" : null, "show" : false}
};

//'FILING CABINET 7, DRAW 3'
//var details = {
//  name : {state : null, show : true, display : "Name type 1", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA", suffix : null},
//  nameTwo : {state : null, show : false, display : "Name type 2", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA"},
//  requestedName : {state : null, show : true, display : "Requested name", value : 'FILING CABINET 7, DRAW 3'}
//}

//MINISTER TRAORE 
//var details = {
//  name : {state : null, show : true, display : "Name type 1", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA", suffix : null},
//  nameTwo : {state : null, show : false, display : "Name type 2", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "BOUBACAR", last : "KEITA"},
//  requestedName : {state : null, show : true, display : "Requested name", value : "MINISTER TRAORE"}
//}

//var details = {
//  name : {state : null, show : true, display : "Name type 1", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "IBRAHIM BOUBACAR", last : "KEITA", suffix : null},
//  nameTwo : {state : null, show : true, display : "Name type 2", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : " BOUBACAR", last : "KEITA"},
//  requestedName : {state : null, show : false, display : "Requested name", value : null}
//}

var details = {
  name : {state : null, show : true, display : "Name type 1", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : "TOM MICHAEL", last : "SMITH", suffix : null},
  nameTwo : {state : null, show : true, display : "Name type 2", value : (this.title + " " + this.first + " " + this.last), title : "mr", first : " THOMAS", last : "SMITH"},
  requestedName : {state : null, show : false, display : "Requested name", value : null}
}

//current
var personalDetails = {
  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
  "recordLevel" : {state : null, show : true, display : "Customer record level", value : "Unrestricted access"},
  "sex" : {state : null, show : true, display : "Sex", value : "Female"},
  "gender" : {state : null, show : false, display : "Gender recognition details", value : null, gra : false, preGra : false},
  "nifu" : {state : null, show : false, display : "Identity fraud interest", value : null},
  "disability" : {state : null, show : false, display : "Disability status", value : null},
  "specialNeeds" : {state : null, show : false, display : "Additional needs", value : null},
  "nationality" : {state : null, show : false, display : "Nationality", value : null},
  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
  "preferredLanguage" : {state : null, show : false, display : "Preferred language", value : null},
  "immigration" : {state : null, show : false, display : "Immigration status", value : null, level : null},
  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null},
  "nino" : {state : null, show : true, display : "National Insurance number", value : null},
  "ninoVerificationLevel" : {state : null, show : true, display : "National Insurance number verification level", value : "Verified"}
}


//disability and special needs
//var personalDetails = {
//  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
//  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
//  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
//  "recordLevel" : {state : null, show : false, display : "Special customer record level", value : null},
//  "sex" : {state : null, show : true, display : "Sex", value : "Female"},
//  "gender" : {state : null, show : false, display : "Gender", value : null, gra : false, preGra : false},
//  "nifu" : {state : null, show : false, display : "National fraud interest", value : null},
//  "disability" : {state : "start", show : true, display : "Disability status", value : "This person is disabled"},
//  "specialNeeds" : {state : "added", show : true, display : "Special needs", value : ["A lift", "A ramp", "Wide doorways"]},
//  "nationality" : {state : null, show : false, display : "Nationality", value : null},
//  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
//  "preferredLanguage" : {state : null, show : false, display : "Preferred language", value : null},
//  "immigration" : {state : null, show : false, display : "Immigration status", value : null, reference : null},
//  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null}
//}


//pv
//var personalDetails = {
//  "pv" : {state : "start", show : true, display : "Potentially violent status", value : true, partner : false, member : false},
//  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
//  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
//  "recordLevel" : {state : null, show : false, display : "Special customer record level", value : null},
//  "sex" : {state : null, show : true, display : "Sex", value : "Female"},
//  "gender" : {state : null, show : false, display : "Gender", value : null, gra : false, preGra : false},
//  "nifu" : {state : null, show : false, display : "National fraud interest", value : null},
//  "disability" : {state : null, show : false, display : "Disability status", value : null},
//  "specialNeeds" : {state : null, show : false, display : "Special needs", value : null},
//  "nationality" : {state : null, show : false, display : "Nationality", value : null},
//  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
//  "preferredLanguage" : {state : null, show : false, display : "Preferred language", value : null},
//  "immigration" : {state : null, show : false, display : "Immigration status", value : null, reference : null},
//  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null}
//}


//NIFU
//var personalDetails = {
//  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
//  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
//  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
//  "recordLevel" : {state : null, show : false, display : "Special customer record level", value : null},
//  "sex" : {state : null, show : true, display : "Sex", value : "Female"},
//  "gender" : {state : null, show : false, display : "Gender", value : null, gra : false, preGra : false},
//  "nifu" : {state : "start", show : true, display : "National fraud interest", value : "Do not tell the customer. This account may be under investigation for fraud. Continue as normal, do not make any changes to the account. Contact the fraud team on 0191 111 111."},
//  "disability" : {state : null, show : false, display : "Disability status", value : null},
//  "specialNeeds" : {state : null, show : false, display : "Special needs", value : null},
//  "nationality" : {state : null, show : false, display : "Nationality", value : null},
//  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
//  "preferredLanguage" : {state : null, show : false, display : "Preferred language", value : null},
//  "immigration" : {state : null, show : false, display : "Immigration status", value : null, reference : null},
//  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null}
//}


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
  "textPhone" : {"state" : null, "show" : false, "pref" : false, "type" : "other-phone", display : "Textphone", value : "0191 888 888"},
  "typeTalk" : {"state" : null, "show" : false, "pref" : false, "type" : "other-phone", display : "Typetalk", value : "0191 999 999"},
  "otherContact" : {"state" : null, "show" : false, "pref" : false, "type" : "other", display : "Another contact method", value : "Fred the Pigeon"}
}

var alerts = [
  {"title" : null, "type" : false, "code" : false, "system" : "phone", "Office" : "Personal mobile", "type" : "07761 111 111", "nino" : "07761 111 111", "surname" : "07761 111 111", "forename" : "07761 111 111", "startDate" : "07761 111 111", "processedDate" : "07761 111 111"}
];


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
  if (state == 1 || state == "adding") {
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
  if (state == 2 || state == "updating") {
    state = "updated";
  }
  if (state == 3 || state == "correcting") {
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
