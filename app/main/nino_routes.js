var express = require('express')
var router = express.Router()

// function setTrace(y) {
//   if(y == 'true') {
//     trace = true;
//   }
// }

//name
router.get('/nino/2/name/', function (req, res) {
  res.render('nino/2/name', {
    createjourney : createJourney
  })
})

//type-handler
router.get(/v1-type-handler/, function (req, res) {
  ninoVersion = 1;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v2-type-handler/, function (req, res) {
  ninoVersion = 2;
  if ((req.query.trace[0]) == 'true') true;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v3-type-handler/, function (req, res) {
  // ninoVersion = 3;
  if ((req.query.trace[0]) == 'true') trace = true;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v4-type-handler/, function (req, res) {
  ninoVersion = 4;
  if ((req.query.trace[0]) == 'true') trace = true;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v5-type-handler/, function (req, res) {
  ninoVersion = 5;
  if ((req.query.trace[0]) == 'true') trace = true;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

router.get(/v6-type-handler/, function (req, res) {
  ninoVersion = 6;
  if ((req.query.trace[0]) == 'true') trace = true;
  req.session.data.createJourney = setCreateJourney(req.query.data);
  res.redirect('../../search')
})

//contact-handler
router.get(/contact-question-handler/, function (req, res) {
  if(req.query.data === 'yes') {
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//non-mandatory-handler
router.get(/v2-non-mandatory-handler/, function (req, res) {
  if (req.query.data === 'yes') {
    res.redirect('task-list')
  } else {
    res.redirect('check')
  }
})



//*********
//Version 4
//*********

//nino-contacts-handler
router.get(/nino-contacts-handler/, function (req, res) {
  req.session.data.contactTypes[req.session.data.contactType].show = true;
  req.session.data.contactTypes[req.session.data.contactType].state = 'added';
  res.redirect('another-contact')
})


//contact-group-handler
router.get(/contact-group-handler/, function (req, res) {
  req.session.data.toaster = null;
  req.session.data.preferredContactState = null;
  req.session.data.updateType = 1;
  if (req.query.contactType == 'telephone' || req.query.contactType == 'email' || req.query.contactType == 'fax') {
    res.redirect('contact-type')
  } else {
    res.redirect('contact-details')
  }
})

//current-name
router.get('/nino/6/name-current/', function (req, res) {
  res.render('nino/6/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/6/name-alternative/', function (req, res) {
  res.render('nino/6/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/6/name-previous/', function (req, res) {
  res.render('nino/6/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/6/address-search/', function (req, res) {
  res.render('nino/6/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/6/search-results/', function (req, res) {
  res.render('nino/6/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/6/previous-results/', function (req, res) {
  res.render('nino/6/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/6/search-correspondence/', function (req, res) {
  res.render('nino/6/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/6/correspondence-results/', function (req, res) {
  res.render('nino/6/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/6/search-previous/', function (req, res) {
  res.render('nino/6/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/6/name-requested/', function (req, res) {
  res.render('nino/6/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/6/requested-name/', function (req, res) {
  res.render('nino/6/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/6/previous-name/', function (req, res) {
  res.render('nino/6/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-correspondence/', function (req, res) {
  res.render('nino/6/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/6/manual-previous/', function (req, res) {
  res.render('nino/6/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/6/previous-names/', function (req, res) {
  res.render('nino/6/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/6/address-question/', function (req, res) {
  res.render('nino/6/address-question', {
    person : person
  })
})

//check
router.get('/nino/6/check/', function (req, res) {
  res.render('nino/6/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/6/check-v2/', function (req, res) {
  res.render('nino/6/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/6/task-list/', function (req, res) {
  res.render('nino/6/task-list', {
    person : person
  })
})



//*********
//Version 3
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == 'yes'){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})

//current-name
router.get('/nino/5/name-current/', function (req, res) {
  res.render('nino/5/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/5/name-alternative/', function (req, res) {
  res.render('nino/5/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/5/name-previous/', function (req, res) {
  res.render('nino/5/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/5/address-search/', function (req, res) {
  res.render('nino/5/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/5/search-results/', function (req, res) {
  res.render('nino/5/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/5/previous-results/', function (req, res) {
  res.render('nino/5/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/5/search-correspondence/', function (req, res) {
  res.render('nino/5/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/5/correspondence-results/', function (req, res) {
  res.render('nino/5/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/5/search-previous/', function (req, res) {
  res.render('nino/5/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/5/name-requested/', function (req, res) {
  res.render('nino/5/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/5/requested-name/', function (req, res) {
  res.render('nino/5/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/5/previous-name/', function (req, res) {
  res.render('nino/5/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-correspondence/', function (req, res) {
  res.render('nino/5/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/5/manual-previous/', function (req, res) {
  res.render('nino/5/manual-previous', {
    person : person
  })
})


//address-search
router.get('/nino/5/previous-names/', function (req, res) {
  res.render('nino/5/previous-names', {
    person : person
  })
})

//address-question
router.get('/nino/5/address-question/', function (req, res) {
  res.render('nino/5/address-question', {
    person : person
  })
})

//nationality
router.get(/v3-nationality-handler/, function (req, res) {
  if(underSixteen === true) {
    res.redirect('check')
  } else {
    res.redirect('marital')
  }
})


//check
router.get('/nino/5/check/', function (req, res) {
  res.render('nino/5/check', {
    today : dates.todayAsString(),
    underSixteen : underSixteen
  })
})

//check
router.get('/nino/5/check-v2/', function (req, res) {
  res.render('nino/5/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/5/task-list/', function (req, res) {
  res.render('nino/5/task-list', {
    person : person
  })
})


//*********
//Version 2
//*********
 
//nino
router.get(/another-handler/, function (req, res) {
  if (req.query.data == 'yes'){
    res.redirect('add-contact')
  } else {
    res.redirect('nationality')
  }
})


//current-name
router.get('/nino/4/name-current/', function (req, res) {
  res.render('nino/4/name-current', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-alternative
router.get('/nino/4/name-alternative/', function (req, res) {
  res.render('nino/4/name-alternative', {
    person : person
  })
})

//name-previous
router.get('/nino/4/name-previous/', function (req, res) {
  res.render('nino/4/name-previous', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//address-search
router.get('/nino/4/address-search/', function (req, res) {
  res.render('nino/4/address-search', {
    person : person
  })
})

//search-results
router.get('/nino/4/search-results/', function (req, res) {
  res.render('nino/4/search-results', {
    person : person
  })
})

//search-previous
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name
  })
})

//previous-results
router.get('/nino/4/previous-results/', function (req, res) {
  res.render('nino/4/previous-results', {
    person : person
  })
})

//search-correspondence
router.get('/nino/4/search-correspondence/', function (req, res) {
  res.render('nino/4/search-correspondence', {
    person : person
  })
})

//correspondence-results
router.get('/nino/4/correspondence-results/', function (req, res) {
  res.render('nino/4/correspondence-results', {
    person : person
  })
})

//current-name
router.get('/nino/4/search-previous/', function (req, res) {
  res.render('nino/4/search-previous', {
    previous_name : person.previous_name,
  })
})

//requested-name
router.get('/nino/4/name-requested/', function (req, res) {
  res.render('nino/4/name-requested', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//requested-name
router.get('/nino/4/requested-name/', function (req, res) {
  res.render('nino/4/requested-name', {
    previous_name : person.previous_name,
    requested_name : person.requested_name
  })
})

//previous-name
router.get('/nino/4/previous-name/', function (req, res) {
  res.render('nino/4/previous-name', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-correspondence/', function (req, res) {
  res.render('nino/4/manual-correspondence', {
    person : person
  })
})

//manual-correspondence
router.get('/nino/4/manual-previous/', function (req, res) {
  res.render('nino/4/manual-previous', {
    person : person
  })
})

//address-question
router.get('/nino/4/address-question/', function (req, res) {
  res.render('nino/4/address-question', {
    person : person
  })
})

//check
router.get('/nino/4/check/', function (req, res) {
  res.render('nino/4/check', {
    today : dates.todayAsString()
  })
})

//check
router.get('/nino/4/check-v2/', function (req, res) {
  res.render('nino/4/check-v2', {
    today : dates.todayAsString()
  })
})

//task-list
router.get('/nino/4/task-list/', function (req, res) {
  res.render('nino/4/task-list', {
    person : person
  })
})

//check-handler
router.get(/check-handler/, function (req, res) {
  if(trace === true) {
    res.redirect('trace')
  } else {
    res.redirect('done')
  }
})


//*********
//Version 1
//*********

//task-list
router.get('/nino/2/task-list/', function (req, res) {
  res.render('nino/2/task-list', {
    person : person
  })
})

module.exports = router