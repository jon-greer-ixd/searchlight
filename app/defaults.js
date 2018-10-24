var defaults = {
  
// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE
//  //contact
//  contactType : null,
//  //updater
//  updateType : null,
//
//  //CONTACT  
//  showContact : false,
//  preferredContactState : null,

  //PERSONAL DETAILS  
  //death
//  dead : false,
//  deathState : null,
//  showDeath : false,
          
  //messagecentre
  toaster : null,
    
  //gcii
  gciiExample : 4
};

var authority = {
  "housingBenefit" : {"state" : null, "show" : false},
  "councilTaxReduction" : {"state" : null, "show" : false}
};

//function flip(value) {
//  if (value === "Yes" || value === "yes" ) {
//    return "No";
//  } else if (value === "No" || value === "no" ) {
//    return "Yes";
//  } else if (value === "true" || value === true ) {
//    return false;
//  } else if (value === "false" || value === false ) {
//    return true;
//  }
//}

function changeSex(sex) {
  if(sex === "Male") {
   return "Female";
  } else if (sex === "Female") {
    return "Male";
  }
}

//data.toaster = messageCentre(item, state);
//function messageCentre(item, type, state) {
//  var message;
//  if (state == 1 || state == "adding") {
//    state = "added";
//  }
//  if (type == "phone" || type == "fax" || type == "textPhone" || type == "typeTalk" || type == "other-phone") {
//    type = "number";
//  }
//  if (type == "email") {
//    type = "address";
//  }
//  if (type == "other") {
//    type = "";
//  }
//  if (state == 2 || state == "updating") {
//    state = "updated";
//  }
//  if (state == 3 || state == "correcting") {
//    state = "corrected";
//  }
//  if (state == 4) {
//    state = "removed";
//  }
//  if (state == 5) {
//    state = "ended";
//  }
//  if (state == 6) {
//    state = "deleted";
//  }
//  if (state == "removing") {
//    state = "ended";
//  }
//  if (type == null) {
//    message = `${item} ${state}`;
//  } else {
//    message = `${item} ${type} ${state}`;
//  }
//  console.log(`message = ${message}`);
//  return message
//}

  // 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE



//state-machine
function setState(state) {
  if (state === "add") {
    state = "added";
  } else if (state === "update") {
    state = "updated";
  } else if (state === "correct") {
    state = "corrected";
  } else if (state === "end") {
    state = "ended";
  }
  return state;
}

//module.exports.messageCentre = messageCentre;
module.exports.authority = authority;
module.exports.changeSex = changeSex;
//module.exports.flip = flip;
module.exports.defaults = defaults;
module.exports.setState = setState;
