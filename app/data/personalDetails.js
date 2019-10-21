var personalDetails = {
  "additionalNeeds" : {state : null, show : false, display : "Additional needs", value : undefined},
  "assetFreeze" : {state : null, show : false, showHistory : false, display : "Asset freeze indicator", value : false, start : null, end : null},
  "recordLevel" : {state : null, show : true, display : "Customer record level", value : "Unrestricted access"},
  "disability" : {state : null, show : false, display : "Disability status", value : null},
  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
  "gender" : {state : null, show : false, display : "Gender recognition details", value : null, gra : false, preGra : false},
  "nifu" : {state : null, show : false, display : "Identity fraud interest", value : null},
  "idAtRisk" : {state : null, show : false, showHistory : false, display : "Identity at risk indicator", value : false, start : null, end : null},
  "immigration" : {state : null, show : false, display : "Immigration status", value : null, level : null},
  "indIndicator" : {state : null, show : false, display : "Immigration and nationality interest", value : false},
  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null},
  "nino" : {state : null, show : true, display : "National Insurance number", value : null},
  "ninoVerificationLevel" : {state : null, show : true, display : "National Insurance number verification level", value : "Verified"},
  "nationality" : {state : null, show : false, display : "Nationality", value : null},
  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
  "preferredLanguage" : {state : 1, show : true, display : "Preferred language", value : "Welsh"},
  "sex" : {state : null, show : true, display : "Sex", value : false},
  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
  "bereavementBenefit" : {state : null, show : true, display : "Bereavement Benefit", value : true},
  "accountStatus" : {state : null, show : false, display : "Account status", value : 'Open'}
}

//  prints all the items
//  Object.keys(contactTypes).map(e => {
//    console.log(`key = ${e} state = ${contactTypes[e].state}`)
//  });


module.exports.personalDetails = personalDetails;