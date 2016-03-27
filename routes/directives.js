var express = require('express');
var router = express.Router();

router.get('/event-datatable', function(req, res, next) {
    res.render('directives/event-datatable', {});
});

module.exports = router;
