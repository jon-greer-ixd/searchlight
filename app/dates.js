//dates.js
var today = new Date();
var dayOfTheWeek = today.getDay();
var dayOfTheMonth = today.getDate();
var month = today.getMonth();
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
weekdays[0] = "January";
weekdays[1] = "February";
weekdays[2] = "March";
weekdays[3] = "April";
weekdays[4] = "May";
weekdays[5] = "June";
weekdays[6] = "July";
weekdays[7] = "August";
weekdays[8] = "September";
weekdays[9] = "October";
weekdays[10] = "November";
weekdays[11] = "December";

var monthAsString = weekdays[dayOfTheWeek];

var dates = {
  todayAsString : function() {
    return dayOfTheMonth + " " + monthAsString + " " + year;
  },
  todayAsFigure : function(separator) {
    if (separator != null) {
      return dayOfTheMonth + separator + (month+1) + separator + year;
    } else {
      return dayOfTheMonth + " " + (month+1) + " " + year;
    }
  },
  logToday : function() {
    console.log( this.todayAsString() );
    console.log( this.todayAsFigure() );
  }
};

module.exports.dates = dates; 