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
			//log profile
			//console.log(profile);
			// asynchronous verification, for effect...
			process.nextTick(async function() {
				const existingUser = await User.findOne({ uniqueId: profile.id });
				if (existingUser) {
					//account already exists
					return done(null, existingUser);
				}
				//check for premium 
				if(profile.product === 'premium'){
					//else make a new record
					const newUser = await new User({ uniqueId: profile.id, authType: 'spotify', name: profile.displayName,
														spotifyPremium: true, profilePic: profile.photos}).save();
					return done(null, newUser);
				}
				//else return null
				else{
					return done(null, false, {msg: "Do not have Spotify Premium"});
				}

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
