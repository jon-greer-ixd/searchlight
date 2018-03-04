var Interest = require('./interest.js');

var interests = {
  userInterests : [],
  addInterest : function(interest) {
    this.userInterests.unshift(interest);
  },
  removeInterest : function(interest) {
    interest.live = false;
  },
//  getInterest : function() {
//    return userInterests.index
//  }
  getInterests : function () {
    return this.userInterests;
  }
};


module.exports.interests = interests;

//  tempInterest.live = true;
//  tempInterest.title = req.query.title;
//  tempInterest.startDate = dates.convertDayToString(req.query.startdate);
//  tempInterest.businessSystem = req.query.businesssystem;


//    var index = userInterests.indexOf(interest);
//    if (index > -1) {
//      userInterests.splice(index, 1);
//    }