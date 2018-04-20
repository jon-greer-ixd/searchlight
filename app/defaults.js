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
  graState : null,     // adding // updating // removing // added // removed // updated
  preGraState : null, 
  
  addGender : false,
  graAdded : false,
  preGraAdded : false,
  genderUpdated : false,
  //death
  addDeath : false,
  deathUpdated : false,
  //pv
  addPv : false,
  pvUpdated : false,
  //nationality
  addNationality : false,
  nationalityAdded : false,
  //nifu
  addNifu : false,
  nifuUpdated : false,
  //special needs
  addNeeds : false,
  needsUpdated : false,
  //disability
  addDisability : false,
  disabilityUpdated : false,
  //prefered language
  addPreferedLanguage : false,
  preferedLanguageUpdated : false,
  //spoken language
  addSpokenLanguage : false,
  spokenLanguageUpdated : false,
  // marital status
  maritalStatus : null,
  addMarital : false,
  maritalAdded : false,
  //immigration status
  addImmigration : false,
  ImmigrationUpdated : false
};

module.exports.defaults = defaults;
