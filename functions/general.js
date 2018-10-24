// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE

function setToasterMessage(item, type, state) {
  var message;
  if (state == 1 || state == "adding") {
    state = "added";
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
  if (state == 2 || state == "updating") {
    state = "updated";
  }
  if (state == 3 || state == "correcting") {
    state = "corrected";
  }
  if (state == 4) {
    state = "removed";
  }
  if (state == 5) {
    state = "ended";
  }
  if (state == 6) {
    state = "deleted";
  }
  if (state == "removing") {
    state = "ended";
  }
  if (type == null) {
    message = `${item} ${state}`;
  } else {
    message = `${item} ${type} ${state}`;
  }
  return message
}

module.exports.setToasterMessage = setToasterMessage;
