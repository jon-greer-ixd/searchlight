// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE / 7 CHANGE PREFERENCE

function setPreferedContact(contactTypes, preferedContactType) {
  for (var x in contactTypes) {
    if (x == preferedContactType) {
      contactTypes[x].pref = true;
    } else {
      contactTypes[x].pref = false;
    }
  }
  return contactTypes;
}

module.exports.setPreferedContact = setPreferedContact;


//  if (req.session.data.pref == 'true' || req.session.data.preferredContactState == 'updating') {
//    for (var x in req.session.data.contactTypes) {
//      req.session.data.contactTypes[x].pref = false;
//    }
//    req.session.data.contactTypes[req.session.data.contactType].pref = true;
//  } else {
//    req.session.data.contactTypes[req.session.data.contactType].pref = false;
//  }
//  if (req.session.data.preferredContactState == 'updating') {
//    req.session.data.preferredContactState = 'updated';
//    req.session.data.toaster = generalFunctions.setToasterMessage('preferred method of contact', null, 'set');
//  }
//  //remove preference
//  if ( req.session.data.preferredContactState == 'removing') {
//    req.session.data.toaster = generalFunctions.setToasterMessage('preferred contact state', null, 'removed');
//    req.session.data.preferredContactState = 'removed';
//  }
//  if (req.session.data.exdirectory == 'true') {
//    req.session.data.contactTypes.homeTelephone.exD = true;
//  } else {
//    req.session.data.contactTypes.homeTelephone.exD = false;
//  }
