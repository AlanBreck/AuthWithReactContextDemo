const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = function (app) {

	app.post("/api/authenticate", function (req, res) {
		const {username, password} = req.body;
		User.find({ username: username })
			.then(function (user) {
				const isValidPass = bcrypt.compareSync(password, user.password);
				if (isValidPass) {
					const token = jwt.sign({ data: user.id }, config.jwtSecret);
					res.json({
						id: user.id,
						username: user.username,
						token: token
					});
				} else {
					res.status(404).json({ message: "Incorrect username or password." });
				}
			})
			.catch(function (err) {
				res.status(404).json({ message: "Incorrect username or password." });
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