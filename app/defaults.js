var defaults = {
  //contact
  contactType : null,
  //updater
  updateType : null,
  
  //names
  title : "LORD",
  nameOneFirst : "JAMES",
  nameOneLast : "SMITH",
  nameTwoFirst : "MICHAEL",
  nameTwoLast : "SMITH JONES BOOTH",
  hasNameTwo : false,
  hasRequestedName : false,
  requestedName : "JIMBOB",
  nameOneUpdated : false,
  nameOneCorrected : false,
  nameTwoAdded : false,
  nameTwoUpdated : false,
  nameTwoCorrected : false,
  nameTwoRemoved : false,
  requestedNameAdded : false,
  requestedNameUpdated : false,
  requestedNameCorrected : false,
  requestedNameRemoved : false,
  
  //CONTACT  
  
  showContact : false,

  //PERSONAL DETAILS  
  
  //sex
  sex : { state : null, show : true },
  sexValue : "Male",
  
  //nathan
  nathan : { value : null, state : null, show : false },
  
  //nifu
  nifu : { value : null, state : null, show : false },

  //disability
  disability : {state : null, show : false},
  disabilityValue : null,
  
  //gender
  gender : {state : null, show : false },
  
  //gender-gra
  gra : { state : null, show : false },
  
  //gender-pre-gra
  preGra : { state : null, show : false },
  
  //nationality
  nationality : {state : null, show : false},
  nationalityValue : null,
  
  //special needs
  specialNeeds : {state : null, show : false},

  //marital status
  maritalStatus : null,
  maritalState : null,
  showMarital : false,
  
  //death
  dead : false,
  deathState : null,
  showDeath : false,
  
  //pv
  potentiallyViolent : null,
  pvState : null,
  showPv : false,
    
  //prefered language
  addPreferedLanguage : false,
  preferedLanguageUpdated : false,
  
  //spoken language
  addSpokenLanguage : false,
  spokenLanguageUpdated : false,
  
  //immigration status
  addImmigration : false,
  ImmigrationUpdated : false
};

var contactTypes = {
  "homeTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Home telephone"},
  "personalMobile" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Personal mobile"},
  "daytimeTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Daytime telephone"},
  "eveningTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Evening telephone"},
  "businessMobile" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Business mobile"},
  "businessTelephone" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Business telephone"},
  "thirdParty" : {"state" : null, "show" : false, "pref" : false, "type" : "phone", display : "Third party telephone number"},
  "homeEmail" : {"state" : null, "show" : false, "pref" : false, "type" : "email", display : "Home email"},
  "businessEmail" : {"state" : null, "show" : false, "pref" : false, "type" : "email", display : "Business email"},
  "homeFax" : {"state" : null, "show" : false, "pref" : false, "type" : "fax", display : "Home fax"},
  "businessFax" : {"state" : null, "show" : false, "pref" : false, "type" : "fax", display : "Business fax"},
  "textPhone" : {"state" : null, "show" : false, "pref" : false, "type" : "other", display : "Text phone"},
  "typeTalk" : {"state" : null, "show" : false, "pref" : false, "type" : "other", display : "TypeTalk"},
  "otherContact" : {"state" : null, "show" : false, "pref" : false, "type" : "other", display : "Another contact method"}
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

module.exports.changeSex = changeSex;
module.exports.flip = flip;
module.exports.defaults = defaults;
module.exports.contactTypes = contactTypes;
