var express = require('express')
var router = express.Router()

var personalDetailsFunctions = require('../../functions/personalDetailsFunctions.js');
var generalFunctions = require('../../functions/general.js');
var setState = require('../defaults.js').setState;


//check-person-handler
router.get(/check-person-handler/, function (req, res) {
  let objectKey = req.session.data.personDetailObject.key;
  if(objectKey == 'disability' ||
    objectKey == 'dateOfBirth' ||
    objectKey == 'dateOfDeath' ||
    objectKey == 'recordLevel' ||
    objectKey == 'preferredLanguage' ||
    objectKey == 'nifu' ||
    objectKey == 'immigration' ||
    objectKey == 'indIndicator' ||
    objectKey == 'maritalStatus' ||
    objectKey == 'nationality' ||
    objectKey == 'spokenLanguage' ||
    objectKey == 'assetFreeze' ||
    objectKey == 'idAtRisk' ||
    objectKey == 'sex') {
    var personalDetailValue = req.session.data.personalDetailValue;
    var verificationlevel = req.session.data.verificationlevel;
    req.session.data.personDetailObject = personalDetailsFunctions.setPDValue(req.session.data.personDetailObject, personalDetailValue);
    req.session.data.personDetailObject = personalDetailsFunctions.setVerificationLevel(req.session.data.personDetailObject, verificationlevel);
    
//    if (personDetailObject.key == 'assetFreeze' || personDetailObject.key == 'idAtRisk') {
//      var endDate = personDetailObject.key + 'End';
//      var startDate = personDetailObject.key + 'Start';
//      personDetailObject = personalDetailsFunctions.setDates(personDetailObject, req.session.data[startDate], req.session.data[endDate]);
//    }

    req.session.data.personDetailObject = personalDetailsFunctions.setPDView(req.session.data.personDetailObject);
    req.session.data.personDetailObject.state = req.session.data.updateType;
    req.session.data.personalDetails[req.session.data.personDetailObject.key] = req.session.data.personDetailObject;
    req.session.data.toaster = generalFunctions.setToasterMessage(req.session.data.personDetailObject.display, null, req.session.data.personDetailObject.state);

  } else {
  
  var chosenDetail = req.session.data.personalDetail;
  var detailObject = req.session.data.personalDetails[req.session.data.personalDetail];
  var chosenValue = req.session.data.personalDetailValue;
  var tempValue = req.session.data.tempValue;
  var updateType = req.session.data.updateType;
  var verificationlevel = req.session.data.verificationlevel;
  // SET VALUES  
  if(req.session.data.updateType == 4 || req.session.data.updateType == 5) {
    req.session.data.personalDetails[req.session.data.personalDetail].value = null;   
  } else { 
    req.session.data.personalDetails[req.session.data.personalDetail] = personalDetailsFunctions.setValue(chosenDetail, detailObject, chosenValue, tempValue, updateType);
  }
  // SET VERIFICATION LEVEL  
  if (req.session.data.verificationlevel != null) {
    req.session.data.personalDetails[req.session.data.personalDetail].level = verificationlevel;  
  }
  // SET DATES FOR ASSET FREEZE AND ID AT RISK
  if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    var endDate = chosenDetail + 'End';
    var startDate = chosenDetail + 'Start';
    req.session.data.personalDetails[chosenDetail] = personalDetailsFunctions.setDates(detailObject, req.session.data[startDate], req.session.data[endDate]);
  }
  // SET STATE
  req.session.data.personalDetails[req.session.data.personalDetail].state = updateType;
  // SET DISPLAY
  if (req.session.data.personalDetail != 'sex' && req.session.data.personalDetail != 'dob' ) {   
    req.session.data.personalDetails[req.session.data.personalDetail] = personalDetailsFunctions.setDisplay(chosenDetail, detailObject);
  }
  // SET MESSAGE
  req.session.data.toaster = generalFunctions.setToasterMessage(detailObject.display, null, detailObject.state);
  
  //ASSET FREEZE
  if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    if (req.session.data.assetFreezeEnd != '') {
      req.session.data.personalDetails.assetFreeze.state = 5;
    }
  } 
}
  //RESET
  req.session.data.personalDetailValue = null;
  // NEXT
  res.redirect('/account2/account')
})


//which verification level should be updated?
//what is the level?
// req.session.[{verification level}] = {level}
function getVerificationType(personalDetail) {
  if (personalDetail == 'dateOfDeath') {
    console.log(`${personalDetail} returning dodLevel`);
    return 'dodLevel';
  }
}

function setVerificationLevel(verificationlevel) {
  if (verificationlevel == 'Level 3') {
    return 3;
  } else if (verificationlevel == 'Level 2') {
    return 2;
  } else if (verificationlevel == 'Level 1') {
    return 1;
  } else if (verificationlevel == 'Level 0') {
    return 0;
  }  
  return verificationlevel;
}
var checkBoolForString = function(personalDetailValue){
  if (personalDetailValue == 'true') {
    return true;
  } else if (personalDetailValue == 'false') {
    return false;
  } else if (personalDetailValue == 'null') {
    return null;
  } else {
    return personalDetailValue;
  }
}

router.get(/add-detail-handler/, function (req, res) {
  let personalDetail = req.session.data.personalDetail;
  let personalDetailValue = req.session.data.personalDetailValue;
  let verificationlevel;
  //check for bool or null as a string
  personalDetailValue = checkBoolForString(personalDetailValue);
  if (req.session.data.verificationlevel != null) {
    verificationlevel = req.session.data.verificationlevel;
    req.session.data.citizen[getVerificationType(personalDetail)] = setVerificationLevel(verificationlevel);
  }
  if (personalDetail == 'additionalNeeds') {
    req.session.data.citizen.additionalNeeds = [personalDetailValue];
  } else if (personalDetail == 'dateOfDeath') {
    if (req.session.data.updateType == 4) {
      req.session.data.citizen.dodValue = null;
    } else {
      req.session.data.citizen.dodValue = personalDetailValue;
    }
  } else if(personalDetail == 'pv') {
    req.session.data.citizen.pv = null;
    req.session.data.citizen.pvPartner = null;
    req.session.data.citizen.pvMember = null;
    // req.session.data.citizen[personalDetail] = personalDetailValue;
    for (let x in personalDetailValue ) {
      if(personalDetailValue[x] == "The person" ) {
        req.session.data.citizen.pv = true;
      } else if(personalDetailValue[x] == "The person's partner" ) {
        req.session.data.citizen.pvPartner = true;
      } else if(personalDetailValue[x] == "Someone else in the household" ) {
        req.session.data.citizen.pvMember = true;
      } 
    } 
  } else if(personalDetail == 'dateOfBirth') {
    req.session.data.citizen.dobValue = personalDetailValue;
  } else {
    req.session.data.citizen[personalDetail] = personalDetailValue;
    console.log(`${personalDetail} = ${personalDetailValue}`);
  }
  req.session.data.toaster = generalFunctions.setToasterMessage(generalFunctions.convertDetailToString(personalDetail), null, req.session.data.updateType);
  req.session.data.verificationlevel = null;
  res.redirect('/account3/account')
})

router.get(/check-gender-handler/, function (req, res) {
  let personalDetail= req.session.data.personalDetail;
  let personalDetailValue = req.session.data.personalDetailValue;  
  if (personalDetail == 'gra') {
    req.session.data.citizen.genderGra = true;
  } else {    
    req.session.data.citizen.genderPreGra = true;
  }
  req.session.data.toaster = generalFunctions.setToasterMessage('Gender recognition details', null, 'added');
  if (req.session.data.sexValue == 'Male') {
    req.session.data.citizen.sex = 'male';
  } else if (req.session.data.sexValue == 'Female'){
    req.session.data.citizen.sex = 'female';
  }
  req.session.data.sexValue = null;
  res.redirect('/account3/account')
})

//check name
router.get(/check-name-handler/, function (req, res) {
  req.session.data.toaster = null;  
  var updatetype = req.session.data.updateType
  var nametype = req.session.data.nameType
  var title = (nametype + "Title");
  var first = (nametype+ "First");
  var last = (nametype + "Last");
  var suffix = (nametype+ "Suffix");
  if (nametype == 'nameOne' || nametype == 'nameTwo') {
    if (updatetype != 5) {
      if(req.session.data.title.toUpperCase() == "NONE") {
        req.session.data.citizen[title] = "";
      } else {
        req.session.data.citizen[title] = req.session.data.title;
      }
      req.session.data.citizen[first] = req.session.data.firstname;
      req.session.data.citizen[last] = req.session.data.lastname;
      req.session.data.citizen[suffix] = req.session.data.suffix;
    } else { 
      req.session.data.citizen[title] = null;
      req.session.data.citizen[first] = null;
      req.session.data.citizen[last] = null;
      req.session.data.citizen[suffix] = null;
    }
  }
  if (req.session.data.nameType == 'requestedName') {
    if (updatetype != 5) {
      req.session.data.citizen.requestedNameFirst = req.session.data.requestedName;
    } else { 
      req.session.data.citizen.requestedNameFirst = null;
    }
  }
  req.session.data.toaster = generalFunctions.setToasterMessage(generalFunctions.convertDetailToString(nametype), null, updatetype);
  res.redirect('../../account3/account')
})

//change name
router.get(/change-name-type-handler/, function (req, res) {
  if(req.session.data.updateType == 5) {
    res.redirect('remove')
  } else {
    res.redirect('update-name')
  }
})

router.get(/name-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.updateType = 0;
  var title = req.session.data.nameType + "Title";
  var firstName = req.session.data.nameType + "First";
  var lastName = req.session.data.nameType + "Last";
  var suffix = req.session.data.nameType + "Suffix";
  req.session.data.selectedNameTitle = req.session.data.citizen[title];
  req.session.data.selectedNameFirst = req.session.data.citizen[firstName];
  req.session.data.selectedNameLast = req.session.data.citizen[lastName];
  req.session.data.selectedNameSuffix = req.session.data.citizen[suffix];
  res.redirect('/update/name/update')
})

/**********/
/** NAME **/
/**********/

router.get(/add-handler/, function (req, res) {
  req.session.data.updateType = 1;
  if(req.session.data.citizen.nameTwoFirst != null) {
    req.session.data.nameType = 'requestedName';
    res.redirect('../../update/name/update-name')
  } else if(req.session.data.citizen.requestedNameFirst != null) {
    req.session.data.nameType = 'nameTwo';
    res.redirect('../../update/name/update-name')
  } else {
    res.redirect('../../update/name/add')
  }
})

router.get(/change_pd/, function (req, res) {
  req.session.data.personDetailObject = req.session.data.personalDetails[req.query.personalDetail];
  req.session.data.personDetailObject.key = req.query.personalDetail;
  if(req.session.data.personDetailObject.key == 'dateOfBirth') {
    req.session.data.updateType = 3;
    res.redirect('/update/person/update')
  } else if (req.session.data.personDetailObject.key == 'recordLevel') {
    req.session.data.updateType = 2;
    res.redirect('/update/person/update')
  } else if (req.session.data.personDetailObject.key == 'dateOfDeath') {
    res.redirect('/update/person/dod-options')
  } else if (req.session.data.personDetailObject.key == 'sex') {
    req.session.data.personalDetailValue = personalDetailsFunctions.flipValue(req.session.data.personalDetailValue);
    req.session.data.updateType = 3;
    res.redirect('/update/person/check')
  } else if (req.session.data.personDetailObject.key == 'indIndicator') {
    req.session.data.personalDetailValue = null;
    req.session.data.updateType = 2;
    res.redirect('/update/person/check')
  } else if (req.session.data.personDetailObject.key == 'assetFreeze'|| req.session.data.personDetailObject.key == 'idAtRisk') {
    if (req.session.data.personDetailObject.state == 1) {
      req.session.data.updateType = 5;
      req.session.data.personalDetailValue = false;
    } else {
      req.session.data.updateType = 1;
      req.session.data.personalDetailValue = true;
    }
    res.redirect('/update/person/dates')
  } else {
    res.redirect('/update/person/type')
  }
})

router.get(/check-nino-handler/, function (req, res) {
  if (req.session.data.updateType == 3) {
    req.session.data.citizen.ninoLevel = req.session.data.verificationLevel;
    console.log(req.session.data.verificationLevel);
    req.session.data.toaster = generalFunctions.setToasterMessage('National Insurance number verification type', null, 2);
  } else if (req.session.data.updateType == 1) {
    req.session.data.toaster = generalFunctions.setToasterMessage('Any available data has been recovered', null, ' ');
  } else {
    req.session.data.citizen.accountStatus = req.session.data.tempAccountStatus;
    req.session.data.toaster = generalFunctions.setToasterMessage('Account status', null, 2);
  }
  req.session.data.tempawards = null;
  req.session.data.temprelationships = null;
  res.redirect('/account3/account')
})



module.exports = router