var express = require('express');
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var shortid = require('shortid');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({ users: [] }).write();

app.get('/', (req, res) => {
	res.render('index', {
		name: 'ThinhTPT'
	});
});

app.get('/users', (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	});
});


app.get('/users/search', (req, res) => {
	var q = req.query.q;
	var matchUsers = db.get('users').value().filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchUsers,
		q: q
	});
});

app.get('/users/create', (req, res) => {
	res.render('users/create');
});

app.get('/users/:id', (req, res) => {
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	});
});


app.post('/users/create', (req, res) => {
	// var id = db.get('users').value().length + 1;
	// req.body.id = id;
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});


app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});