var db = require('../db');

module.exports.login = (req, res) => {
	res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
	var email = req.body.email;
	var password= req.body.password;
	var user = db.get('users').find( {email: email }).value();
	if (!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist'
			],
			email: email
		});
		return;
	}
	if (user.password !== password) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			email: email
		});
		return;
	}
	res.cookie('userId', user.id);
	res.redirect('/users');
}