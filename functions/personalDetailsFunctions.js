function flipValue(personalDetail, value) {
  if(personalDetail == "disability") {
    return (value != true ? true : false);
  } else {
    return (value == 'Male' ? 'Female' : 'Male');
  }
};

//function setDisplay(display) {
//  if(display == true || display == false ) {
//    return display;
//  } else if(display == 4 || display == 5) {
//    return false;
//  } else if (display.display == "Potentially violent status") {
//    if (display.value != true && display.partner != true && display.member != true) {
//      display.show = false;
//    } else {
//      display.show = true;
//    }
//    return display;
//  }
//};

function setDisplay(detail, value) {
  if (detail.display == "Disability status") {
    detail.show = value;
  } else if(value == 4 || value == 5) {
    detail.show = false;
  } else if (detail.display == "Potentially violent status") {
    console.log();
  }
  return detail;
};

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


module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;
module.exports.setPV = setPV;