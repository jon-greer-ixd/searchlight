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
  
  //sex
  sex : "Male",
  sexCorrected : false,
  
  //gender
  showGra : false,
  showPreGra : false,
  graState : null,     // adding // updating // correcting // removing // added // removed // updated
  preGraState : null, 
  
  //death
  addDeath : false,
  deathUpdated : false,
  
  //pv
  addPv : false,
  pvUpdated : false,
  
  //nationality
  showNationality : false,
  nationalityState : null,
  
  //nifu
  addNifu : false,
  nifuUpdated : false,
  
  //special needs
  addNeeds : false,
  needsUpdated : false,
  
  //disability
  disability: false,
  showDisability : false,
  disabilityStatus : null,

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

module.exports.defaults = defaults;
