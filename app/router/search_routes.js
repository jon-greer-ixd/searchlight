var express = require('express')
var router = express.Router()

var bsFunctions = require('../functions/bsFunctions.js');

var ninoVersion = null;

// router.get(/search-handler/, function (req, res) {
//     req.session.data.bsNino = req.query.bsnino.toUpperCase();
//     req.session.data.bsPerson = req.session.data.bsCustomers[req.session.data.bsNino];
//     if( bsFunctions.getPerson(req.session.data.bsNino, req.session.data.bsCustomers) ) {
//       res.redirect('/bereavement/account-v2')
//     } else {
//       res.redirect('/search-v8')
//     }
//   })

router.get('/search-v1', function (req, res) {
  res.render('search/search-v1.njk')
})

// search page
router.get('/search', function (req, res) {
  res.render('search/search.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v3', function (req, res) {
  res.render('search/search-v3.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v4', function (req, res) {
  res.render('search/search-v4.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v5', function (req, res) {
  res.render('search/search-v5.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v6', function (req, res) {
  res.render('search/search-v6.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v7', function (req, res) {
  res.render('search/search-v7.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v8', function (req, res) {
  res.render('search/search-v8.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v9', function (req, res) {
  res.render('search/search-v9.njk', {
    ninoversion : ninoVersion
  })
})

router.get('/search-v11', function (req, res) {
  res.render('search/search-v11.njk', {
    ninoversion : ninoVersion
  })
})

// simple search page for interests
router.get('/search-v2', function (req, res) {
  res.render('search/search-v2.njk', {
    ninoversion : ninoVersion
  })
})
    
module.exports = router