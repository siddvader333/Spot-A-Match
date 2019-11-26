const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
let user={}


passport.serializeUser((user,cb) =>{
	cb(null,user);
});

passport.deserializeUser((user,cb) =>{
  cb(null,user);
});

//Spotify strategy
passport.use(
	new SpotifyStrategy(
	  {
		clientID: 'c2b9fe2dba9343d5966d5cc5fed36ed6',
		clientSecret: 'd0529a823c894b889b72224e74090011',
		callbackURL: '/auth/spotify/callback'
	  },
	  function(accessToken, refreshToken, expires_in, profile, cb) {
		// User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
		//   return cb(err, user);
		// }); 
		console.log(JSON.stringify(profile));
		user = {...profile};
		return(null, profile);
		}
	)
);

//api endpoints
app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
	// The request will be redirected to spotify for authentication, so this
	// function will not be called.
});
  
app.get(
	'/auth/spotify/callback',
	passport.authenticate('spotify', { failureRedirect: '/loginFailed' }),
	function(req, res) {
	  // Successful authentication, redirect home.
	  res.redirect('/');
	}
);

app.get("/auth/logout", (res,req) =>{
	console.log("Logging out...")
	user ={};
	res.redirect("/")
});


//middleware, converts requests from string to js object
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

//Hello World Route
app.get('/', (req, res) => {
	res.send(`Hello!  User = ${user} <br> <a href="/auth/spotify"> Login with Spotify </a>
											<br> <a href="/auth/logout"> Logout </a> `);
});

app.get('/loginFailed', (req, res) => {
	res.send(`Login failed`);
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
