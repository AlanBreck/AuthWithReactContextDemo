const User = require("../models/User");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = function (app) {

	app.post("/api/authenticate", function (req, res) {
		User.find(req.body)
			.then(function (user) {
				const token = jwt.sign({ foo: 'bar' }, config.jwtSecret);
				res.json({
					id: user.id,
					token: token
				});
			});
	});

}