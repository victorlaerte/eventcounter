var express = require('express');
var router = express.Router();

/*
 * GET eventList
 */
router.get('/eventlist', function(req, res) {

	var db = req.db;
	var collection = db.get('eventlist');

	//TODO: if admin return all, if not admin return only checked true
	collection.find({}, {}, function(e, docs) {
		res.json(docs);
	});
});
/*
 * POST to add event
 */

router.post('/addevent', function(req, res) {

	var db = req.db;
	var collection = db.get('eventlist');

	var eventToAdd = req.body;
	eventToAdd.finishDate = eventToAdd.startDate;
	eventToAdd.checked = false;
	eventToAdd.counter = 0;

	//DO ALL VALIDATIONS

	collection.insert(eventToAdd, function(err, result) {
		res.send(
			(err === null) ? {
				msg: ''
			} : {
				msg: err
			}
		);
	});

});


module.exports = router;