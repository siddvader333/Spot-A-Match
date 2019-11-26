module.exports = (app) => {
	const passport = require('passport');
	app.get(
		'/auth/spotify',
		passport.authenticate('spotify', {
			scope: [ 'user-read-email', 'user-read-private' ],
			showDialog: true
		}),
		function(req, res) {
			// The request will be redirected to spotify for authentication, so this
			// function will not be called.
		}
	);

	app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }), function(req, res) {
		res.redirect('/dashboard');
	});

	// app.get('/loginFailed', (req, res) => {
	// 	res.send('error occurred');
	// });
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		console.log(req.user);
		res.send(`${JSON.stringify(req.user)} <br>
					<a href="/dashboard"> Go back to dashboard </a>`);
	});
};
