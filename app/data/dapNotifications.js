var dates = require('../dates.js').dates;

var dateToday = "8/9/2019";
var dateYesterday = "10/9/2019";

var dapNotifications = [
	{"nino" : "SX170204", notifiedDate: dateYesterday, "surname" : "Harrison", "dob" : "25 February 1943", "processed" : false, date: null},

	{"nino" : "SX170203", notifiedDate: dateToday, "surname" : "Clark", "dob" : "21 May 1954", "processed" : false, date: null},
	{"nino" : "SX170202", notifiedDate: dateToday, "surname" : "Chowdry", "dob" : "1 Dec 1963", "processed" : true, date: dates.todayAsString()},
	{"nino" : "SX170201", notifiedDate: dateToday, "surname" : "Campbell Jones", "dob" : "1 Dec 1963", "processed" : false, date: null}
]
module.exports.dapNotifications = dapNotifications;