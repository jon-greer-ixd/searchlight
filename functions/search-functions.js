function getCitizen(nino, list) {
  nino = nino.toUpperCase();
  var result = null;
  for (var person in list) {
    if(person == nino) {
      console.log(`Found! person = ${list[person].nameOne.first}`);
      result = list[person];
    }
  }
  return result;
};

module.exports.getCitizen = getCitizen;