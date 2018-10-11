function flipValue(personalDetailValue) {
        console.log("here", personalDetailValue);
  if(personalDetailValue != true) {
    return true;
  } else {
    return false;
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
