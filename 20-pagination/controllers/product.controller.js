var db = require('../db');

module.exports.index = (req, res) => {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var start = (page - 1)*perPage;
	var end = page*perPage;

	var len = db.get('products').value().length;
	var numOfPage = Math.ceil(len / 8);

	var status = '';
	if (page === 1) {
		status = 'start';
	}
	else if (page === numOfPage) {
		status = 'end';
	}
	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		page: page,
		status: status
	});
}