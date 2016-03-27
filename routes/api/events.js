var express = require('express');
var router = express.Router();

router.get('/future', function(req, res) {
	var db = req.db;
    var collection = db.get('eventlist');
	var today = new Date();

	today.setHours(23,59,59,999);

	collection.find(
		{ 'startDate' : { $gt : today.toISOString() } },
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
});

router.get('/past', function(req, res) {
	var db = req.db;
    var collection = db.get('eventlist');
	var today = new Date();

	today.setHours(0,0,0,0);

	collection.find(
		{ 'startDate' : { $lt : today.toISOString() } },
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
});

router.get('/today', function(req, res) {
	var db = req.db;
    var collection = db.get('eventlist');
	var begin = new Date();
	var end = new Date();

	begin.setHours(0,0,0,0);
	end.setHours(23,59,59,999);

	collection.find(
		{
			'startDate' : {
				$gte : begin.toISOString(),
				$lte : end.toISOString()
			}
		},
		{ 'sort' : { 'startDate' : 1 } },
		function(e, docs) {
			res.json(docs);
		}
	);
});

router.get('/:eventId', function(req, res) {
	var db = req.db;
	var collection = db.get('eventlist');

    collection.findById(req.params.eventId, function(e, doc) {
		res.json(doc);
	});
});

router.post('/:eventId/checkin', function(req, res) {
	console.log('dados do checkin', req.body);
	res.send();
});

router.post('/', function(req, res) {
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
