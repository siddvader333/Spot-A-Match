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
			//console.log(profile);
			// asynchronous verification, for effect...
			console.log(accessToken);
			process.nextTick(async function() {
				const existingUser = await User.findOne({ uniqueId: profile.id });
				if (existingUser) {
					//account already exists (update the access token)
					await User.findOneAndUpdate({ uniqueId: profile.id }, { currentAccessToken: accessToken });
					return done(null, existingUser);
				}
				//check for premium
				if (profile.product === 'premium') {
					//else make a new record
					const newUser = await new User({
						uniqueId: profile.id,
						authType: 'spotify',
						name: profile.displayName,
						spotifyPremium: true,
						profilePic: profile.photos,
						currentAccessToken: accessToken
					}).save();
					return done(null, newUser);
				} else {
					//else return null
					return done(null, false, { msg: 'Do not have Spotify Premium' });
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
