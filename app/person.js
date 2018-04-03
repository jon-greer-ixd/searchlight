function Person (
  nameOneFirst,
  nameOneLast,
  nameTwoFirst,
  nameTwoLast,
  requestedName,
  hasNameTwo
) {
  this.nameOneFirst = nameOneFirst;
  this.nameOneLast = nameOneLast;
  this.nameTwoFirst = nameTwoFirst;
  this.nameTwoLast = nameTwoLast;
  this.requestedName = requestedName;
  this.hasNameTwo = hasNameTwo;
}

function createPerson() {
  return new Person();
}

module.exports.createPerson = createPerson;