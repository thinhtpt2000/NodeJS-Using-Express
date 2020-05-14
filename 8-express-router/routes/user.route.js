var express = require('express');
var shortid = require('shortid');
var router = express.Router();

var db = require('../db');

router.get('/', (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	});
});


router.get('/search', (req, res) => {
	var q = req.query.q;
	var matchUsers = db.get('users').value().filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchUsers,
		q: q
	});
});

router.get('/create', (req, res) => {
	res.render('users/create');
});

router.get('/:id', (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	});
});


router.post('/create', (req, res) => {
	// var id = db.get('users').value().length + 1;
	// req.body.id = id;
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

module.exports = router;