var mongo = require('mongodb');
var monk = require('monk');

var db = monk('localhost:27017/eventcounter');

var createSuperUserIfNotExists() {

	var collection = db.get('userList');

	collection.find({
			'userName': 'super'
		}, {},
		function(e, user) {

			if (e) {

				console.log('Error creating Super user');
			}

			if (user) {

				return;

			} else {

				var superUser = {
					'userName': 'super',
					'password': createHash('eventcounter123$$'),
					'email': 'victorlaertedoliveira@gmail.com',
					'firstName': 'Super',
					'lastName': 'User'
				}

				console.log('Creating Super User');
			}
		}
	);
}

createSuperUserIfNotExists();

module.exports = db;