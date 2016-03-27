var express = require('express');
var router = express.Router();

router.get('/home', function(req, res, next) {
    res.render('home', {});
});

router.get('/event', function(req, res, next) {
    res.render('event-page', {});
});

router.get('/event-form', function(req, res, next) {
    res.render('event-form', {});
});

module.exports = router;
