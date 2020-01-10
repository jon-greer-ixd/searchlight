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

function getApplication(applicationNumber, applications) {
  var result = null;
  for (var application in applications) {
    if(applications[application].applicationNumber == applicationNumber) {
      console.log(`Found! application = ${applications[application].nameOneFirst}`);
      result = applications[application];
    }
  }
  return result;
};


module.exports.getApplication = getApplication;
module.exports.getCitizen = getCitizen;