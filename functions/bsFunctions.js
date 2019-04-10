function getPerson(nino, peopleList) {
  nino = nino.toUpperCase();
  var found = false;
  for (person in peopleList) {
    if(person == nino ) {
      found = true;
    }
  }
  return found;
};

module.exports.getPerson = getPerson;