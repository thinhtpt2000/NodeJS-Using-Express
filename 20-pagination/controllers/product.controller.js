var db = require('../db');

module.exports.index = (req, res) => {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var start = (page - 1)*perPage;
	var end = page*perPage;

	var len = db.get('products').value().length;
	var numOfPage = Math.ceil(len / 8);

	var status = '';
	var pageList = [];
	if (page === 1) {
		status = 'start';
		pageList = [1, 2, 3];
	}
	else if (page === numOfPage) {
		status = 'end';
		pageList = [page-2, page-1, page];
	}
	else {
		pageList = [page-1, page, page+1];
	}

	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		curPage: page,
		pages: pageList,
		status: status
	});
}