//test
var express = require('express')
var router = express.Router()


//add
router.get(/interest-change-handler/, function (req, res) {
  req.session.data.tempInterest = req.query.interest;
  req.session.data.interestState = req.query.state;
  if (req.query.state == 'ending' && req.query.interest != 'both') {
    res.redirect('/update/auth-interests/check')
  } else {
    res.redirect('/update/auth-interests/interest-detail')
  }
})

//check
router.get(/authority-handler/, function (req, res) {
  for (var y in req.session.data.authority) {
    if ( req.session.data.authority[y].state == 'added') {
      req.session.data.authority[y].state = 'existing';
    }
    if ( req.session.data.authority[y].state == 'ended') {
      req.session.data.authority[y].state = 'old';
    }
  }
  //adding
  if(req.session.data.interestState == 'adding') {
    if (req.session.data.ctr == 'true') {
      req.session.data.authority.councilTaxReduction.state = 'added';
      req.session.data.authority.councilTaxReduction.show = true;
    }
    if (req.session.data.hb == 'true') {
      req.session.data.authority.housingBenefit.state = 'added';
      req.session.data.authority.housingBenefit.show = true;
    }
  //updating
  } else if (req.session.data.interestState == 'updating') {
    req.session.data.authority[req.session.data.tempInterest].state = 'added';
    req.session.data.authority[req.session.data.tempInterest].show = true;
  //ending
  } else { //ending
    if (req.session.data.ctr == 'true') {
      req.session.data.authority.councilTaxReduction.state = 'ended';
      req.session.data.authority.councilTaxReduction.show = false;
    }
    if (req.session.data.hb == 'true') {
      req.session.data.authority.housingBenefit.state = 'ended';
      req.session.data.authority.housingBenefit.show = false;
    }
    if (req.session.data.tempInterest != 'both') {
      req.session.data.authority[req.session.data.tempInterest].state = 'ended';
      req.session.data.authority[req.session.data.tempInterest].show = false;
    }
  }
  req.session.data.ctr = null;
  req.session.data.hb = null;
  res.redirect('authority-account')
})    
    
module.exports = router