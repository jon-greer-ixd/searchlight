var defaults = {
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
  
  //marital status
  maritalStatus : null,
  maritalState : null,
  showMarital : false,
//  addMarital : false,
//  maritalAdded : false,

  //sex
  sex : "Male",
  sexChanged : null,
  
  //death
  dead : false,
  deathState : null,
  showDeath : false,
  
  //pv
  potentiallyViolent : null,
  pvState : null,
  showPv : false,
  
  //special needs
  needsState : null,
  showNeeds : false,
  
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


module.exports.flip = flip;
module.exports.defaults = defaults;
