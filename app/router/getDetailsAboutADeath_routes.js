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
  console.log(status);
  var notificationsToShow = [];
  //setup the notifications
  if (date == "1/9/2019") {
    notifications = notifications.slice(0, 1);
  } else {
    notifications = notifications.slice(1, 4);
  }
  //get by status
  for (var item in notifications) {
    if (status == "all") {
      notificationsToShow.push(notifications[item]);
    } else if (notifications[item].processed == false && status == "unprocessed") {
      notificationsToShow.push(notifications[item]);
    } else if (notifications[item].processed == true && status == "processed") {
      notificationsToShow.push(notifications[item]);
    }
  }
  return notificationsToShow;
}

router.get(/get-daps-handler/, function (req, res) {
  console.log(req.query);
    req.session.data.showDapResults = true;
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.notificationStatus, req.query.not_date, req.session.data.dapNotifications);
    req.session.data.dapDateAsString = dates.convertDayToString(req.query.not_date);
    req.session.data.dap_type = req.query.systemid;
    res.redirect('./notifications-search')
  })
  
router.get(/dap-process-handler/, function (req, res) {
    processNotifications(req.query, req.session.data.dapNotifications)
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.notificationStatus, req.session.data.dap_date, req.session.data.dapNotifications);
    res.redirect('./notifications-search')
  })
    
module.exports = router