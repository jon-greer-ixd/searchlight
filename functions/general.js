// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE

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

module.exports.setToasterMessage = setToasterMessage;
