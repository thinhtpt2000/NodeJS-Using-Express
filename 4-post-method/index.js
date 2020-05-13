var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var users = [
	{id: 1, name: 'ThinhTPT', phone: '0378693372'},
	{id: 2, name: 'CodersX', phone: '0123456789'}
];

app.get('/', (req, res) => {
	res.render('index', {
		name: 'ThinhTPT'
	});
});

app.get('/users', (req, res) => {
	res.render('users/index', {
		users: users
	});
});


app.get('/users/search', (req, res) => {
	var q = req.query.q;
	var matchUsers = users.filter((user) => {
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

app.post('/users/create', (req, res) => {
	var id = users.length + 1;
	req.body.id = id;
	users.push(req.body);
	res.redirect('/users');
});


app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});