var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.render('index', {
		name: 'ThinhTPT'
	});
});

app.use('/users', userRoute);

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});