var express = require('express');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', (req, res) => {
	res.render('index', {
		name: 'ThinhTPT'
	});
});

app.get('/users', (req, res) => {
	res.render('users/index', {
		users: [
			{id: 1, name: 'ThinhTPT'},
			{id: 2, name: 'CodersX'}
		]
	});
});


app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});