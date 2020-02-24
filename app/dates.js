//dates.js
var today = new Date();
var dayOfTheWeek = today.getDay();
var dayOfTheMonth = today.getDate();
var thisMonth = today.getMonth();
var year = today.getFullYear();

var weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
var dayAsString = weekdays[dayOfTheWeek];

var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var monthAsString = months[thisMonth];

var dates = {
  months : [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  convertDayToString : function (date) {
      //if it doesnt contain a / return it as it is
    if (!date.includes('/')) {
      return (date);
    } else {
      var parts = date.split('/');
      var d = parseInt(parts[0]);
      var m = parseInt(parts[1]);
      var y = parseInt(parts[2]);
      date = d + " " + this.months[m - 1] + " " + y;
      return (date);
    }
  },
  yesterdayAsString : function() {
    return (today.getDate() - 1) + " " + monthAsString + " " + year;
  },
  todayAsString : function() {
    return dayOfTheMonth + " " + monthAsString + " " + year;
  },
  todayAsFigure : function(separator) {
    if (separator != null) {
      return dayOfTheMonth + separator + (thisMonth+1) + separator + year;
    } else {
      return dayOfTheMonth + " " + (thisMonth+1) + " " + year;
    }
  },
  yesterdayAsFigure : function(separator) {
    if (separator != null) {
      return (dayOfTheMonth-1) + separator + (thisMonth+1) + separator + year;
    } else {
      return (dayOfTheMonth-1) + " " + (thisMonth+1) + " " + year;
    }
  },
  dayDeforeYesterdayAsFigure : function(separator) {
    if (separator != null) {
      return (dayOfTheMonth-2) + separator + (thisMonth+1) + separator + year;
    } else {
      return (dayOfTheMonth-2) + " " + (thisMonth+1) + " " + year;
    }
  },
  logToday : function() {
  }
};


module.exports.dates = dates; 
module.exports.months = months; 