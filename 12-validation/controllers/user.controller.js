var shortid = require('shortid');

var db = require('../db');

module.exports.index = (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	});
}

module.exports.search = (req, res) => {
	try {
		var q = req.query.q;
		var matchUsers = db.get('users').value().filter((user) => {
			return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
		res.render('users/index', {
			users: matchUsers,
			q: q
		});
	} catch (err) {
		res.redirect('/users');
	}
}

module.exports.create = (req, res) => {
	res.render('users/create');
}

module.exports.get = (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	});
}

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	var errors = [];
	if (!req.body.name) {
		errors.push('Name is required.');
	}
	if (!req.body.phone) {
		errors.push('Phone is required.');
	}
	if (errors.length > 0) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
	db.get('users').push(req.body).write();
	res.redirect('/users');
}
 /* Co the dung dang nay
module.exports = {

};
*/