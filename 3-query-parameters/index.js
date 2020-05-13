var express = require('express');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
	{id: 1, name: 'ThinhTPT'},
	{id: 2, name: 'CodersX'}
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


app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});