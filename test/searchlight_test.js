var expect = require('chai').expect;
var dataState = require('../app/dataState').dataState;
var content = require('../app/content').content;

//describe('checkForShip', function() {
//  var checkForShip = require('../game_logic/sip_methods').checkForShip;
//  it('should correctly report no ship at a given players coordinate', function() {
//    
//  });
//});

//npm test searchlight_test.js

describe('statusToText', function() {
  var statusToText = content.statusToText;
  it('Should return correct sentence for a given status', function() {
    expect( statusToText('dlo') ).to.equal('Dead letter office');
  });
});

describe('setPageTitle', function() {
  var setPageTitle = content.setPageTitle;
  it('Should set the page title to Correct the notified start date', function() {
    expect( setPageTitle('correctDateNotified') ).to.equal('Correct the notified start date');
  });
  it('Should set the page title to Update an address status', function() {
    expect( setPageTitle('updateStatus') ).to.equal('Update an address status');
  });
});

// refactor updateType so that it sets the page title
// refactor the test above to itterate over a list!!