var personalDetails = {
  "pv" : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
  "dateOfDeath" : {state : null, show : false, display : "Date of death", value : null, level : null},
  "dateOfBirth" : {state : null, show : true, display : "Date of birth", value : "8 Feb 1940", level : "Level 2"},
  "recordLevel" : {state : null, show : true, display : "Customer record level", value : "Unrestricted access"},
  "sex" : {state : null, show : true, display : "Sex", value : false},
  "gender" : {state : null, show : false, display : "Gender recognition details", value : null, gra : false, preGra : false},
  "nifu" : {state : null, show : false, display : "Identity fraud interest", value : null},
  "disability" : {state : null, show : false, display : "Disability status", value : null},
  "specialNeeds" : {state : null, show : false, display : "Additional needs", value : undefined},
  "nationality" : {state : null, show : false, display : "Nationality", value : null},
  "spokenLanguage" : {state : null, show : false, display : "Spoken language", value : null},
  "preferredLanguage" : {state : 1, show : true, display : "Preferred language", value : "Welsh"},
  "immigration" : {state : null, show : false, display : "Immigration status", value : null, level : null},
  "maritalStatus" : {state : null, show : false, display : "Marital or Civil Partnership status", value : null},
  "nino" : {state : null, show : true, display : "National Insurance number", value : null},
  "ninoVerificationLevel" : {state : null, show : true, display : "National Insurance number verification level", value : "Verified"},
  "bereavementBenefit" : {state : null, show : true, display : "Bereavement Benefit", value : true},
  "idAtRisk" : {state : null, show : false, display : "ID AT RISK STATUS", value : false},
  "assetFreeze" : {state : null, show : false, display : "ASSET FREEZE STATUS", value : false},
  "relationships" : {state : null, show : false, display : null, value : null}
}

//  prints all the items
//  Object.keys(contactTypes).map(e => {
//    console.log(`key = ${e} state = ${contactTypes[e].state}`)
//  });


module.exports.personalDetails = personalDetails;