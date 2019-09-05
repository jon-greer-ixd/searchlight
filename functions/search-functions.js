function getCitizen(nino, list) {
  nino = nino.toUpperCase();
  for (person in list) {
    if(person == nino ) {
      console.log(`Found! person = ${person}`);
      return person;
    } else {
      console.log(`Not found`);
      return null;
    }
  }
};

module.exports.getCitizen = getCitizen;