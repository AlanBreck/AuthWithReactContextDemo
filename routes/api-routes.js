const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = function (app) {

	app.post("/api/authenticate", function (req, res) {
		User.find(req.body)
			.then(function (user) {
				const token = jwt.sign({ data: user.id }, config.jwtSecret);
				res.json({
					id: user.id,
					token: token
				});
			})
			.catch(function (err) {
				res.json(err);
			});
	});

	app.get("/api/protected", function (req, res) {
		res.json({
			message: "Super secret stuff. I mean really.",
			user: req.user
		});
	});

	app.get("/api/public", function (req, res) {
		res.json({
			message: "This is just boring, public data."
		});
	});

}