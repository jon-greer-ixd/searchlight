var expect = require('chai').expect;
var dataState = require('../app/dataState').dataState;
var content = require('../app/content').content;

//describe('checkForShip', function() {
//  var checkForShip = require('../game_logic/sip_methods').checkForShip;
//  it('should correctly report no ship at a given players coordinate', function() {
//    
//  });
//});


describe('statusToText', function() {
  var statusToText = content.statusToText;
  it('Should return corresponding sentence', function() {
    expect( statusToText('dlo') ).to.equal('Dead letter office');
  });
});