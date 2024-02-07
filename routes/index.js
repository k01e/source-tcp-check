var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: 'Source Tester', 
      text: 'This is a simple application for testing connectivity to your sources.' 
    });
});

module.exports = router;
