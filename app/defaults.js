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
  
//  homeTelephone 
//  personalMobile 
//  daytimeTelephone 
//  eveningTelephone 
//  businessMobile 
//  businessTelephone 
//  thirdParty 
//  homeEmail 
//  businessEmail 
//  homeFax 
//  businessFax 
//  textPhone 
//  typeTalk 
//  otherContact 

  
  homeTelephone : {state : null, show : false, pref : false},
  
  personalMobile : {state : null, show : false, pref : false},

  daytimeTelephone : {state : null, show : false, pref : false},

  eveningTelephone : {state : null, show : false, pref : false},

  businessMobile : {state : null, show : false, pref : false},

  businessTelephone : {state : null, show : false, pref : false},

  thirdParty : {state : null, show : false, pref : false},

  homeEmail : {state : null, show : false, pref : false},

  businessEmail : {state : null, show : false, pref : false},

  homeFax : {state : null, show : false, pref : false},
  
  businessFax : {state : null, show : false, pref : false},

  textPhone : {state : null, show : false, pref : false},

  typeTalk : {state : null, show : false, pref : false},

  otherContact : {state : null, show : false, pref : false},


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
