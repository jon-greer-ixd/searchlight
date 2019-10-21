/////////////////////
// value functions //
/////////////////////

function setPV(pv, chosenValue) {
  pv.partner = false;
  pv.value = false;
  pv.member = false;
  for (var x in chosenValue) {
    if (chosenValue[x] == 'The person\'s partner') {
      pv.partner = true;
    } else if (chosenValue[x] == 'Someone else in the household') {
      pv.member = true;
    } else if (chosenValue[x] == 'The person') {
      pv.value = true;
    }
  }
  return pv;
};

function setNeeds(needsObject, chosenValue) {
  needsObject.value = chosenValue;
  return needsObject;
};

function flipValue(value) {
    value = (value != true ? true : false); 
  return value;
};

function setValue(chosenDetail, detailObject, chosenValue, tempValue, updateType) {
  if (updateType == 4 || updateType == 5) {
    detailObject.value = null;
    return detailObject;
  }
  if(chosenValue == "null") {
    chosenValue = null;
  }
  if(chosenValue == "true") {
    chosenValue = true;
  }
  if(chosenValue == "false") {
    chosenValue = false;
  }
  if(tempValue == "null") {
    tempValue = null;
  }
  if (chosenDetail == 'sex') {
    detailObject.value = flipValue(detailObject.value);
   return detailObject;
  } else if (chosenDetail == 'pv') {
    return setPV(detailObject, chosenValue);
  } else if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    return setIndicatorValue(detailObject, updateType);
  } else if (chosenDetail == 'additionalNeeds') {
    if (updateType == 3) {
      return correctadditionalNeeds(detailObject, chosenValue, tempValue);
    } else {
      return setNeeds(detailObject, chosenValue);
    }
  } else {
    detailObject.value = chosenValue;
    return detailObject;
  }
};

function correctadditionalNeeds (detailObject, chosenValue, tempValue) {
  if (typeof detailObject.value == 'string') {
    detailObject.value = tempValue;
  } else {
//    tempValue = JSON.stringify(tempValue);
    if(tempValue != 'null' && tempValue != null){
      detailObject.value.push(tempValue);
    }
    for (var item in detailObject.value) {
      if (detailObject.value[item] == chosenValue) {
        remove(detailObject.value,item);
      }
    }
  }
  return detailObject;
};

function remove(arr, index){
  arr.splice(index,1);
  return arr;
};

function setIndicatorValue(detailObject, updateType) {
  if (updateType == 1) {
    detailObject.value = true;
  } else {
    detailObject.value = false;
  } 
  return detailObject;
}

function setDates(personDetailObject, startDate, endDate) {
  personDetailObject.start = startDate;
  if (endDate != '' && endDate != null) {
    personDetailObject.end = endDate;
  } else {
    personDetailObject.end = null
  }
  return personDetailObject;
}

///////////////////////
// display functions //
///////////////////////


function setDisplay(chosenDetail, detailObject) {
  if(detailObject.value == 'null') {
    detailObject.value = null;
  }

  if (chosenDetail == 'pv') {
    if (detailObject.value != true && detailObject.memeber != true && detailObject.partner != true) {
      detailObject.show = false;
    } else {
      detailObject.show = true;
    }
  } else if (chosenDetail == 'assetFreeze' || chosenDetail == 'idAtRisk') {
    detailObject.show = true;
  } else if (chosenDetail == 'disability') {
    if(detailObject.value != null) {
      detailObject.show = true;
    } else {
      detailObject.show = false;
    }
  } else {
    detailObject.show = false;
    if(detailObject.value != null && detailObject.value != false) {
      detailObject.show = true;
    }  
  }
  return detailObject;
};




// NEW
var setPDValue = function(personDetailObject, personalDetailValue) {
  if (personalDetailValue == 'null' || personalDetailValue == null) {
    personDetailObject.value = null;
  } else if (personalDetailValue == 'true' || personalDetailValue == true) {
    personDetailObject.value = true;
  } else if (personalDetailValue == 'false' || personalDetailValue == false) {
    personDetailObject.value = false;
  } else {
    personDetailObject.value = personalDetailValue;
  }
  return personDetailObject;
}

var setPDView = function(personDetailObject) {
  if (personDetailObject.value != null) {
    personDetailObject.show = true;
  } else {
    personDetailObject.show = false;
  }
  return personDetailObject;
}

var setVerificationLevel = function(personDetailObject, verificationlevel) {
  if (verificationlevel == null) {
    personDetailObject.level = null;  
  } else {
    personDetailObject.level = verificationlevel;  
  }
  return personDetailObject;
}

module.exports.setPDValue = setPDValue;
module.exports.setPDView = setPDView;
module.exports.setVerificationLevel = setVerificationLevel;


module.exports.setDates = setDates;
module.exports.setNeeds = setNeeds;
module.exports.correctadditionalNeeds = correctadditionalNeeds;
module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;
module.exports.setPV = setPV;
module.exports.setValue = setValue;