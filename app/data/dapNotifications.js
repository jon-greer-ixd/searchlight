var dates = require('../dates.js').dates;

var dateToday = dates.todayAsFigure('/');
var dateYesterday = dates.yesterdayAsFigure('/');

var dapNotifications = [
	{"nino" : "SX170204", notifiedDate: dates.dayDeforeYesterdayAsFigure('/'), "surname" : "Harrison", "dob" : "25 February 1943", "processed" : true, date: dates.yesterdayAsString()},

	{"nino" : "SX170203", notifiedDate: dates.yesterdayAsFigure('/'), "surname" : "Clark", "dob" : "21 May 1954", "processed" : false, date: null},
	{"nino" : "SX170202", notifiedDate: dates.yesterdayAsFigure('/'), "surname" : "Chowdry", "dob" : "1 Dec 1963", "processed" : false, date: null},
	{"nino" : "SX170201", notifiedDate: dates.yesterdayAsFigure('/'), "surname" : "Campbell Jones", "dob" : "1 Dec 1963", "processed" : false, date: null}
]
module.exports.dapNotifications = dapNotifications;