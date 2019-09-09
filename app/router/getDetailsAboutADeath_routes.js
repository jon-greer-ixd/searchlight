//test
var express = require('express')
var router = express.Router()


function processNotifications(selectedNotifications, notifications) {
  //for every marked nino
  console.log("+++++++++++++++++++");
  for (var item in selectedNotifications) {
    if (selectedNotifications[item][0] == 'true') {
      console.log(item);
      for (var x in notifications) {
        if(notifications[x].nino == item) {
          notifications[x].processed = true;
          console.log(notifications[x]);
        }
      }
    }
  }
}

function getNotifications(notifications) {
  var notificationsToShow = [];
  for (var item in notifications) {
    if (notifications[item].processed == false) {
      notificationsToShow.push(notifications[item]);
    }
  }
  return notificationsToShow;
}

router.get(/get-daps-handler/, function (req, res) {
    req.session.data.showDapResults = true;
    req.session.data.dap_date = req.query.not_date;
    req.session.data.dap_type = req.query.systemid;
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.dapNotifications);
    // console.log(req.session.data.dapNotifications);
    res.redirect('./notifications-search')
  })
  
router.get(/dap-process-handler/, function (req, res) {
    processNotifications(req.query, req.session.data.dapNotifications)
    req.session.data.dapNotificationstoShow = getNotifications(req.session.data.dapNotifications);
    res.redirect('./notifications-search')
  })
    
module.exports = router