//test
var express = require('express')
var router = express.Router()

var dates = require('../dates.js').dates;

function processNotifications(selectedNotifications, notifications) {
  //for every marked nino
  for (var item in selectedNotifications) {
    if (selectedNotifications[item][0] == 'true') {
      for (var x in notifications) {
        if(notifications[x].nino == item) {
          notifications[x].processed = true;
          notifications[x].date = dates.todayAsString();
        }
      }
    }
  }
}

function getNotifications(status, date, notifications) {
  console.log('req.query.not_date' + date);
  var tempNotifications = [];
  var notificationsToShow = [];
  //get by date
  for (var item in notifications) {
    if (notifications[item].notifiedDate == date) {
      tempNotifications.push(notifications[item]);
    }
  }
  //get by status
  for (var item in tempNotifications) {
    if (status == "unprocessed") {
      if (tempNotifications[item].processed == false ) {
        notificationsToShow.push(tempNotifications[item]);
      }
    } else if (status == "processed") {
      if (tempNotifications[item].processed == true) {
        notificationsToShow.push(tempNotifications[item]);
      }
    } else if (status == "all") {
      notificationsToShow.push(tempNotifications[item]);
    }
  }
  return notificationsToShow;
}

router.get(/get-daps-handler/, function (req, res) {
    req.session.data.showDapResults = true;
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.notificationStatus, req.query.not_date, req.session.data.dapNotifications);
    req.session.data.requestedDateAsString = dates.convertDayToString(req.query.not_date);
    req.session.data.dap_type = req.query.systemid;
    res.redirect('./notifications-search')
  })
  
router.get(/dap-process-handler/, function (req, res) {
    processNotifications(req.query, req.session.data.dapNotifications)
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.notificationStatus, req.session.data.not_date, req.session.data.dapNotifications);
    res.redirect('./notifications-search')
  })
    
module.exports = router