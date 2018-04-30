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
  
  //nifu
  nifu : { value : null, state : null, show : false },

  //sex
  sex : "Male",
  sexChanged : null,
  
  //gender
  genderState : null,
  
  //gender-gra
  showGra : false,
  graState : null,     // adding // updating // correcting // removing // added // removed // updated
  
  //gender-pre-gra
  showPreGra : false,
  preGraState : null, 
  
  //death
  dead : false,
  deathState : null,
  showDeath : false,
  
  //pv
  potentiallyViolent : null,
  pvState : null,
  showPv : false,
  
  //nationality
  showNationality : false,
  nationalityState : null,
    
  //special needs
  needsState : null,
  showNeeds : false,
  
  //disability
  disabilityState: false,
  showDisability : false,
  disability : null,

  //prefered language
  addPreferedLanguage : false,
  preferedLanguageUpdated : false,
  
  //spoken language
  addSpokenLanguage : false,
  spokenLanguageUpdated : false,
  
  //marital status
  maritalStatus : null,
  maritalState : null,
  showMarital : false,
//  addMarital : false,
//  maritalAdded : false,
  
  //immigration status
  addImmigration : false,
  ImmigrationUpdated : false
};

function flip(value) {
  if (value === "Yes" || value === "yes" ) {
    return "No";
  } else if (value === "No" || value === "no" ) {
    return "Yes";
  }
}


module.exports.flip = flip;
module.exports.defaults = defaults;
