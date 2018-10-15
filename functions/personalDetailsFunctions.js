function setPV(pv, value) {
  pv.partner = false;
  pv.value = false;
  pv.member = false;
  for (var x in value) {
    if (value[x] == 'The person\'s partner') {
      pv.partner = true;
    } else if (value[x] == 'Someone else in the household') {
      pv.member = true;
    } else if (value[x] == 'The person') {
      pv.value = true;
    }
  }
  return pv;
};

function flipValue(personalDetail) {
  if(personalDetail.display == "Disability status" || personalDetail.display == "Identity fraud interest") {
    if (personalDetail.value != true ){
      personalDetail.value = true;
    } else {
      personalDetail.value = false;
    }
  } else {
    if (personalDetail.value == 'Male') {
      personalDetail.value = 'Female';
    } else {
      personalDetail.value = 'Male';
    }
  }
  return personalDetail;
};

function setDisplay(detail, value) {
  if(value == 4 || value == 5) {
    detail.show = false;
  } else if (detail.display == "Potentially violent status") {
    if (detail.value != true && detail.partner != true && detail.member != true) {
      detail.show = false;
    } else {
      detail.show = true;
    }
  } else {
    if (detail.value != null && detail.value != false) {
      detail.show = true;
    } else {
      detail.show = false;
    }
  }
  return detail;
};

function setValue(detail, value) {
 if (detail.display == "Potentially violent status") {
   detail = setPV(detail, value);
   return detail;
  }
};


module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;
module.exports.setPV = setPV;
module.exports.setValue = setValue;