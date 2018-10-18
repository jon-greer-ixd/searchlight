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

function setNeeds(needs, value) {
  needs.value = value;
  return needs;
};

function flipValue(value) {
    value = (value != true ? true : false); 
  return value;
};

function setValue(chosenDetail, detailObject, chosenValue, tempValue) {
  if(chosenValue == "null") {
    chosenValue = null;
  }
  if(tempValue == "null") {
    tempValue = null;
  }
  if (chosenDetail == 'sex' || chosenDetail == 'disability') {
    detailObject.value = flipValue(detailObject.value);
   return detailObject;
  } else if (chosenDetail == 'pv') {
    return setPV(detailObject, chosenValue);
  } else if (chosenDetail == 'specialNeeds') {
    return setNeeds(detailObject, tempValue);
  } else {
    detailObject.value = chosenValue;
    return detailObject;
  }
};


///////////////////////
// display functions //
///////////////////////


function setDisplay(chosenDetail, detailObject) {
  if (chosenDetail == 'pv') {
    if (detailObject.value != true && detailObject.memeber != true && detailObject.partner != true) {
      detailObject.show = false;
    } else {
      detailObject.show = true;
    }
  } else {
    detailObject.show = false;
    if(detailObject.value != null && detailObject.value != false) {
      detailObject.show = true;
    }  
  }
  return detailObject;
};

function remove(arr, index){
  arr.splice(index,1);
  return arr;
};

function correctSpecialNeeds (specialNeeds, personalDetailValue, tempValue) {
  if (typeof specialNeeds.value == 'string') {
    specialNeeds.value = tempValue;
  } else {
//    tempValue = JSON.stringify(tempValue);
    if(!tempValue.includes('null') ){
      specialNeeds.value.push(tempValue);
    }
    for (var item in specialNeeds.value) {
      if (specialNeeds.value[item] == personalDetailValue) {
        remove(specialNeeds.value,item);
      }
    }
  }
  return specialNeeds;
};


module.exports.correctSpecialNeeds = correctSpecialNeeds;
module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;
module.exports.setPV = setPV;
module.exports.setValue = setValue;