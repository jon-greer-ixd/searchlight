var expect = require('chai').expect;
//var chai = require ('chai');
//var expect = chai.expect;

function titleCase (title) { 
  var words = title.split(" "); 
  var titleCasedWords = words.map(function (word){ 
    return word[0].toUpperCase() + word.substring(1); 
  }); 
  return titleCasedWords.join(" ");
}

expect(titleCase('pulp fiction')).to.be.a('string');
expect(titleCase('p')).to.equal('P');
expect(titleCase('the')).to.equal('The')

expect(titleCase('pulp fiction')).to.equal('Pulp Fiction');