//test
var express = require('express')
var router = express.Router()

var generalFunctions = require('../functions/general.js');
var contactFunctions = require('../functions/contact.js');

router.get(/contact-change-handler/, function (req, res) {
  req.session.data.toaster = null;
  res.redirect('/update/contact/update-type')
})

router.get(/update-contact-new/, function (req, res) {
  var next = 'contact-details';
  if (req.query.updateType == 5) {
    next = 'end';
  } else if (req.query.updateType == 7) {
    next = 'check';
  }
  res.redirect(next);
})

router.get(/pref-handler/, function (req, res) {
  if (req.query.pref != 'true') {
    req.session.data.pref = false;
  }
  res.redirect('check')
})

//check-contact-handler
router.get(/check-contact-new/, function (req, res) {  
  var chosenContact = req.session.data.contactType;
  var contactObject = req.session.data.contactTypes[chosenContact];
  var contactTypes = req.session.data.contactTypes;
  var updateType = req.session.data.updateType;
  var contactDisplay;
  
  // SET STATE  
  req.session.data.contactTypes[chosenContact].state = updateType;
  
  // SET DISPLAY  
  req.session.data.contactTypes[chosenContact].show = (updateType == 5 ? false : true);

  // SET PREFERENCE
  if (req.session.data.pref == 'true' || req.session.data.updateType == 7) {
    req.session.data.contactTypes = contactFunctions.setPreferedContact(contactTypes, chosenContact);
  }

  // SET EX DIRECTORY
  req.session.data.contactTypes.homeTelephone.exD = (req.session.data.exdirectory == 'true' ? true : false);
  
  // SET MESSAGE
  if (updateType == 7) {
    contactDisplay = 'Preferred method of contact';
  } else if (chosenContact == 'otherContact') {
    contactDisplay = 'Contact method';
  } else {
    contactDisplay = req.session.data.contactTypes[chosenContact].display;
  }
  req.session.data.toaster = generalFunctions.setToasterMessage (contactDisplay, contactObject.type, updateType);

  //reset
  req.session.data.pref = false;
  req.session.data.exdirectory = false;
  chosenContact, contactObject, updateType, contactDisplay = null;

  //redirect
  res.redirect('/account3/account')
})    
    
module.exports = router