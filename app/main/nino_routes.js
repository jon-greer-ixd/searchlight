var express = require('express')
var router = express.Router()

//name
router.get('/nino/2/name/', function (req, res) {
  res.render('nino/2/name', {
    createjourney : createJourney
  })
})

module.exports = router
