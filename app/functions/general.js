// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE

let convertDetailToString = (detail) => {
  switch(detail) {
    case 'additionalNeeds':
      return 'Additional needs';
      break;
    case 'assetFreeze':
      return 'Asset freeze indicator';
      break;
    case 'disability':
      return 'Disability status';
      break;
    case 'dateOfDeath':
      return 'Date of death';
    break;
    case 'genderGra':
      return 'Gender recognition details';
    break;
    case 'genderPreGra':
      return 'Gender recognition details';
    break;
    case 'nifu':
      return 'Identity fraud interest';
    break;
    case 'idAtRisk':
      return 'Identity at risk indicator';
    break;
    case 'immigration':
      return 'Immigration status';
    break;
    case 'indIndicator':
      return 'Immigration and nationality interest';
    break;
    case 'maritalStatus':
      return 'Marital or Civil Partnership status';
    break;
    case 'nationality':
      return 'Nationality';
    break;
    case 'pv':
      return 'Potentially violent status';
    break;
    case 'spokenLanguage':
      return 'Spoken language';
    break;
    case 'sex':
      return 'Sex';
    break;
    case 'nameOne':
      return 'Name type 1';
    break;
    case 'nameTwo':
      return 'Name type 2';
    break;
    case 'requestedName':
      return 'Requested name';
    break;
    case 'dateOfBirth':
      return 'Date of birth';
    break;
    case 'homeEmail':
      return 'Home email address';
    break;
    
    default:
      return null;
  }
}





function setToasterMessage(item, type, updateType) {
  var message;
  if (updateType == 1 || updateType == "adding") {
    updateType = "added";
  }
  if (type == "phone" || type == "fax" || type == "textPhone" || type == "typeTalk" || type == "other-phone") {
    type = "number";
  }
  if (type == "email") {
    type = "address";
  }
  if (type == "other") {
    type = "";
  }
  if (updateType == 2 || updateType == "updating" || updateType == 7) {
    updateType = "updated";
  }
  if (updateType == 3 || updateType == "correcting") {
    updateType = "corrected";
  }
  if (updateType == 4) {
    updateType = "removed";
  }
  if (updateType == 5) {
    updateType = "ended";
  }
  if (updateType == 6) {
    updateType = "deleted";
  }
  if (updateType == 9) {
    updateType = "recovered";
    item = item + "s"
  }
  if (updateType == "removing") {
    updateType = "ended";
  }
  if (type == null || updateType == 'updated') {
    message = `${item} ${updateType}`;
  } else {
    message = `${item} ${type} ${updateType}`;
  }
  return message
}


module.exports.convertDetailToString = convertDetailToString;
module.exports.setToasterMessage = setToasterMessage;