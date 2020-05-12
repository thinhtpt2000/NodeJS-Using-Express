var express = require('express');

var app = express();

var port = 3000;

app.get('/', (request, response) => {
	response.send('<h1>Hello ThinhTPT!</h1>');
});

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});