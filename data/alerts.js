//alerts
var alerts = [
  { "title" : "Non-match on NI number", 
   "alertType" : "Rejection report", 
   "code" : 3000,
   "Office" : 11611,
   "transactionType" : "07761 111 111",
   "nino" : "NY170202",
   "surname" : "NAHASAPEEMAPETILON",
   "forename" : "REYANSH",
   "startDate" : "01 Mar 1989",
   "processedDate" : null,
   "description" : "Transaction date - 01 Jan 2005, Name Start Date - 01012005, Titile - Mr,   Forename 1 - JOHN, Forname 2 - SAM,   Surname - JONES,   Requested form of address = BILL"
  },  
  { "title" : "Name 2 not held", 
   "alertType" : "Rejection report", 
   "code" : 3001,
   "Office" : 112345,
   "transactionType" : "T011",
   "nino" : "JR170207",
   "surname": null,
   "forename": null,
   "startDate" : "5 Sep 2000",
   "processedDate" :  null,
   "description" : "Transaction date - 01 Jan 2005, Name Start Date - 01012005, Titile - Mr,   Forename 1 - JOHN, Forname 2 - SAM,   Surname - JONES,   Requested form of address = BILL"
  },
  { "title" : "Purge of payment success", 
   "alertType" : "Rejection report", 
   "code" : 3001,
   "Office" : 13512,
   "transactionType" : "T011",
   "nino" : "SX170204",
   "surname": "SMITH",
   "forename": "JAMES JOHN",
   "startDate" : "15 Jan 1970",
   "processedDate" :  null,
   "description" : "Transaction date - 01 Jan 2005, Name Start Date - 01012005, Titile - Mr,   Forename 1 - JOHN, Forname 2 - SAM,   Surname - JONES,   Requested form of address = BILL"
  }
];

module.exports.alerts = alerts;
