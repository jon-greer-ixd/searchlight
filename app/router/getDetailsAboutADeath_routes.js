//test
var express = require('express')
var router = express.Router()

router.get(/dap-search-handler/, function (req, res) {
    req.session.data.showDapResults = true;
    req.session.data.dap_date = req.query.not_date;
    req.session.data.dap_type = req.query.systemid;
    res.redirect('./notifications-search')
  })
  
router.get(/dap-process-handler/, function (req, res) {
    for (var item in req.query) {
      console.log("here " + item)
    }
    req.session.data.showDapResults = false;
    res.redirect('./notifications-search')
  })
    
module.exports = router