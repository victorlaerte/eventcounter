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

router.get('/eventlist/future', function(req, res) {
	var db = req.db;
	var today = new Date();

	today.setHours(23,59,59,999);
	today = today.toISOString();

	db.get('eventlist').find(
		{ 'startDate' : { $gt : today } },
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
});

router.get('/eventlist/past', function(req, res) {
	var db = req.db;
	var today = new Date();

	today.setHours(0,0,0,0);
	today = today.toISOString();

	db.get('eventlist').find(
		{ 'startDate' : { $lt : today } },
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
});

router.get('/eventlist/today', function(req, res) {
	var db = req.db;
	var begin = new Date();
	var end = new Date();

	begin.setHours(0,0,0,0);
	end.setHours(23,59,59,999);

	begin = begin.toISOString();
	end = end.toISOString();

	db.get('eventlist').find(
		{
			'startDate' : {
				$gte : begin,
				$lte : end
			}
		},
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
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
