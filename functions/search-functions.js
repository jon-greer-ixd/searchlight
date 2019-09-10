function getCitizen(nino, list) {
  nino = nino.toUpperCase();
  var result = null;
  for (var person in list) {
    if(list[person].nino == nino) {
      console.log(`Found! person = ${list[person].nameOneFirst}`);
      result = list[person];
    }
  }
  return result;
};

module.exports.getCitizen = getCitizen;