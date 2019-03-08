module.exports = function (app) {

	app.post("/api/authenticate", function (req, res) {
		res.json({
			username: "darthvader",
			token: "io8887ce2"
		});
	});

}