// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE
function setToasterMessage(item, type, state) {
  var message;
  if (state == 1) {
    state = "added";
  }
  if (state == 2) {
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
  if (type == null) {
    message = `${item} ${state}`;
  } else {
    message = `${item} ${type} ${state}`;
  }
  console.log(`message = ${message}`);
  return message
}

module.exports.setToasterMessage = setToasterMessage;
