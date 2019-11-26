const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = require('../models/User');

//Spotify strategy
passport.use(
	new SpotifyStrategy(
		{
			clientID: keys.spotifyClientID,
			clientSecret: keys.spotifyClientSecret,
			callbackURL: 'http://localhost:8888/callback'
		},
		function(accessToken, refreshToken, expires_in, profile, done) {
			// asynchronous verification, for effect...
			process.nextTick(async function() {
				const existingUser = await User.findOne({ uniqueId: profile.id });
				if (existingUser) {
					//account already exists
					return done(null, existingUser);
				}
				//else make a new record
				const newUser = await new User({ uniqueId: profile.id, authType: 'spotify' }).save();
				return done(null, newUser);
			});
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
