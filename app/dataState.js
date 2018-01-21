var dataState = {
  updateType : null,
  correctionType: 'toNew',
  currentStatus : "live",//dlo, pwa, nfa
  newStatus : "live",//dlo, pwa, nfa
  correspondenceAdded: false,
  correspondenceRemoved: false,
  updatedToNewAddress : false,
  cherished : false,
  cherishedLineCorrected : false,
  statusUpdated : false,
  dateIsUpdated : false,
  addressCorrected : false,
  statusCorrected : false
};

module.exports.dataState = dataState; 