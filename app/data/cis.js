var cis = {
  "SX170201" : { 
    // personal details
    nino: {value : "SX170201", level: 2},
    nameOne : {title : "Mr", first : "Alex", last : "Campbell"},
    nameTwo : {title : "Mr", first : "Alexander", last : "Campbell Jones"},
    requestedName : {title : "Reverend", first : "Campbell", last : "Jones"},
    previousNames : false,
    dob : {value: "1 Dec 1963", level: 2},
    dod : {value: null, level: null},
    recordLevel : "Unrestricted access",
    // other PD
    disability : null,
    // address
    prevAddress : true,
    addressLineOne : "25 Lambton St",
    addressLineTwo : "Chester le Street",
    postCode : "DH3 3NH",
    // contact
    mobile : "07761 111 111",
    home : "0191 111 111",
    email : "email@address.com",
    // benefits
    uc : false,
    dla : false,
    sp : false,
    pip : false,
    ca : false,

    specialNeeds : {state : null, show : false, display : "Additional needs", value : undefined},
    assetFreeze : {state : null, show : false, showHistory : false, display : "Asset freeze indicator", value : false, start : null, end : null},
    gender : {state : null, show : false, display : "Gender recognition details", value : null, gra : false, preGra : false},
    nifu : {state : null, show : false, display : "Identity fraud interest", value : null},
    idAtRisk : {state : null, show : false, showHistory : false, display : "Identity at risk indicator", value : false, start : null, end : null},
    immigration : {state : null, show : false, display : "Immigration status", value : null, level : null},
    INDIndicator : {state : null, show : false, display : "Immigration and nationality interest", value : false},
    maritalStatus : {state : null, show : false, display : "Marital or Civil Partnership status", value : null},
    ninoVerificationLevel : {state : null, show : true, display : "National Insurance number verification level", value : "Verified"},
    nationality : {state : null, show : false, display : "Nationality", value : null},
    pv : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
    preferredLanguage : {state : 1, show : true, display : "Preferred language", value : "English"},
    sex : {state : null, show : true, display : "Sex", value : false},
    spokenLanguage : {state : null, show : false, display : "Spoken language", value : null},
    bereavementBenefit : {state : null, show : true, display : "Bereavement Benefit", value : true},
    accountStatus : {state : null, show : false, display : "Account status", value : 'Open'}
  },

  "SX170202" : { 
    // personal details
    nino: {value : "SX170202", level: 2},
    nameOne : {title : "Mrs", first : "Sita", last : "Chowdry"},
    nameTwo : {title : null, first : null, last : null},
    requestedName : {title : null, first : null, last : null},
    previousNames : false,
    dob : {value: "1 Dec 1963", level: 2},
    dod : {value: null, level: null},
    recordLevel : "Unrestricted access",
    // other PD
    disability : null,
    // address
    prevAddress : false,
    addressLineOne : "98 Hammerfield Ave",
    addressLineTwo : "Aberdeen",
    postCode : "AB10 7FE",
    // contact
    mobile : "07761 111 111",
    home : "0191 111 111",
    email : "email@address.com",
    // benefits
    uc : false,
    dla : false,
    sp : false,
    pip : false,
    ca : false,

    specialNeeds : {state : null, show : false, display : "Additional needs", value : undefined},
    assetFreeze : {state : null, show : false, showHistory : false, display : "Asset freeze indicator", value : false, start : null, end : null},
    gender : {state : null, show : false, display : "Gender recognition details", value : null, gra : false, preGra : false},
    nifu : {state : null, show : false, display : "Identity fraud interest", value : null},
    idAtRisk : {state : null, show : false, showHistory : false, display : "Identity at risk indicator", value : false, start : null, end : null},
    immigration : {state : null, show : false, display : "Immigration status", value : null, level : null},
    INDIndicator : {state : null, show : false, display : "Immigration and nationality interest", value : false},
    maritalStatus : {state : null, show : false, display : "Marital or Civil Partnership status", value : null},
    ninoVerificationLevel : {state : null, show : true, display : "National Insurance number verification level", value : "Verified"},
    nationality : {state : null, show : false, display : "Nationality", value : null},
    pv : {state : null, show : false, display : "Potentially violent status", value : null, partner : false, member : false},
    preferredLanguage : {state : 1, show : false, display : "Preferred language", value : "English"},
    sex : {state : null, show : true, display : "Sex", value : false},
    spokenLanguage : {state : null, show : false, display : "Spoken language", value : null},
    bereavementBenefit : {state : null, show : true, display : "Bereavement Benefit", value : true},
    accountStatus : {state : null, show : false, display : "Account status", value : 'Open'}
  }
}

module.exports.cis = cis;