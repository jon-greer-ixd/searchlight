function flipValue(personalDetail, value) {
  if(personalDetail == "disability") {
    if(value != true) {
      return true;
    } else {
      return false;
    }
  } else {
    return ('Male' ? 'Female' : 'Male');
  }
};

function setDisplay(display) {
  if(display == true || display == false ) {
    return display;
  } else if(display == 4 || display == 5) {
    return false;
  }
};

module.exports.flipValue = flipValue;
module.exports.setDisplay = setDisplay;