// 1 ADD / 2 UPDATE / 3 CORRECT / 4 REMOVE / 5 END / 6 DELETE / 7 CHANGE PREFERENCE

var updateAddress = function (address, lineOne, status) {
  address.lineOne = lineOne;
  address.status = status;
  return address;
}

var setCherish = function (address, bool) {
  address.cherish = bool;
  return address;
}

var setShow = function (address, updateType, addressValue) {
  if (addressValue == 5) {
    address.show = false;
  } else {
    address.show = true;
  }
  return address;
}

var flipStatus = function (residential) {
  return (residential.status == 'dlo' ? 'live' : 'dlo');
}

module.exports.flipStatus = flipStatus;
module.exports.setShow = setShow;
module.exports.updateAddress = updateAddress;
module.exports.setCherish = setCherish;

//var updater = function (updatetype, correspondenceAddress, residentialAddress, previousAddress, dataState, content, addressOne, addressTwo, addressThree) {
//  if(updatetype === 'addCorrespondence') {
//    correspondenceAddress.show = true;
//  }
//  //cherish - add
//  if (updatetype == 'updateAddCherish') {
//    addCherish(residentialAddress);
//  }
//  //cherish - correct
//  if (updatetype === 'correctAddCherish') {
//    residentialAddress.updated = true;
//    residentialAddress.cherish = 'Flat A';
//    residentialAddress.startDate = '01 Jan 1990';
//    previousAddress.line = addressOne;
//    previousAddress.show = true;
//    previousAddress.correct = false;
//    dataState.cherishedLineCorrected = true;
//  }
//  if(updatetype === 'updateRemoveCherish') {
//    previousAddress.cherish = 'Flat A';
//    previousAddress.line = addressOne;
//    previousAddress.correct = true;
//    previousAddress.show = true;
//    residentialAddress.cherish = false;
//    residentialAddress.line = addressOne;
//    residentialAddress.updated = true;
//  }
//  if(updatetype === 'correctChangeCherish') {
//    previousAddress.cherish = 'Flat A';
//    previousAddress.line = addressOne;
//    previousAddress.correct = false;
//    previousAddress.show = true;
//    residentialAddress.cherish = 'Flat B';
//    residentialAddress.line = addressOne;
//    residentialAddress.updated = true;
//  }
//  if(updatetype === 'correctRemoveCherish') {
//    previousAddress.cherish = 'Flat A';
//    previousAddress.line = addressOne;
//    previousAddress.correct = false;
//    previousAddress.show = true;
//    residentialAddress.cherish = false;
//    previousAddress.startDate = content.editDate;
//    residentialAddress.line = addressOne;
//    residentialAddress.updated = true;
//    dataState.cherishedLineCorrected = true;
//  }
//  if(updatetype === 'updateChangeCherish') {
//    previousAddress.cherish = 'Flat A';
//    previousAddress.line = addressOne;
//    previousAddress.correct = true;
//    previousAddress.show = true;
//    residentialAddress.cherish = 'Flat B';
//    residentialAddress.line = addressOne;
//    residentialAddress.updated = true;
//  }
//  // add new
//  if (updatetype === 'updateNew') {
//    previousAddress.cherish = residentialAddress.cherish;
//    previousAddress.line = addressOne;
//    previousAddress.correct = true;
//    previousAddress.show = true;
//    residentialAddress.cherish = false;
//    residentialAddress.line = addressTwo;
//    residentialAddress.updated = true;
//  }
//  if (updatetype === 'updateStatus' || 
//    updatetype === 'updateStatusDLO' || 
//    updatetype === 'updateStatusLive') {
//    residentialAddress.status = dataState.newStatus;
//    residentialAddress.updated = true;
//    if (residentialAddress.status === 'nfa' || residentialAddress.status === 'pwa') {
//      previousAddress.line = addressOne;
//      previousAddress.show = true;
//      previousAddress.correct = true;
//    } else {
//      previousAddress.line = addressOne;
//      previousAddress.show = true;
//      previousAddress.correct = true;
//    }
//  }
//  if(updatetype === 'addCorrespondence') {
//    dataState.correspondenceAdded = true;
//  }
//  if (updatetype === 'end') {
//    dataState.correspondenceAdded = false;   
//    dataState.correspondenceRemoved = true;
//    previousAddress.line = addressThree;
//    previousAddress.show = true;
//  }
//  if (updatetype === 'correctNew') {
//    previousAddress.cherish = residentialAddress.cherish;
//    previousAddress.line = addressOne;
//    previousAddress.correct = false;
//    previousAddress.show = true;
//    residentialAddress.cherish = false;
//    residentialAddress.line = addressTwo;
//    residentialAddress.updated = true;
//  }
//  if (updatetype === 'correctStatus' || 
//    updatetype === 'correctStatusDlo' || 
//    updatetype === 'correctStatusLive') {
//    residentialAddress.status = dataState.newStatus;
//    residentialAddress.updated = true;
//    previousAddress.line = addressOne;
//    previousAddress.show = true;
//    previousAddress.correct = false;
//  }
//  if (updatetype === 'correctDate') {
//    residentialAddress.updated = true;
//    residentialAddress.startDate = '30 Nov 1990';
//    previousAddress.line = addressOne;
//    previousAddress.show = true;
//    previousAddress.correct = false;
//    // update the dates
//  } 
//  if (updatetype === 'correctDateNotified') {
//    residentialAddress.updated = true;
//    previousAddress.line = addressOne;
//    previousAddress.show = true;
//    previousAddress.correct = false;
//    // update the dates
//  } 
//}
//
//module.exports.updater = updater;


