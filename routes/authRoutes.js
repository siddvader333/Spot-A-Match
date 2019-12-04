const fetch = require("node-fetch");
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = (app) => {
	const passport = require('passport');
	app.get(
		'/auth/spotify',
		passport.authenticate('spotify', {
			scope: [ 'user-read-email', 'user-read-private', 'user-read-playback-state', 'user-modify-playback-state', 'streaming', 'user-read-currently-playing'],
			showDialog: true
		}),
		function(req, res) {
			// The request will be redirected to spotify for authentication, so this
			// function will not be called.
		}
	);

	app.get('/callback', passport.authenticate('spotify', { failureRedirect: '/loginFailed' }), function(req, res) {
		res.redirect('/dashboard');
	});

	app.get('/loginFailed', (req, res) => {
		res.send('error occurred, no premium');
	});
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	app.get('/api/current_user', (req, res) => {
		console.log(req.user);
		res.send(`${JSON.stringify(req.user)} <br>
					<a href="/dashboard"> Go back to dashboard </a>`);
	});

	app.get('/profile',(req,res)=>{
		res.send(req.user);
	});

	
	app.get('/getSongResults/:itemSearched',async (req, res) =>{
		
		const BASE_URL = "https://api.spotify.com/v1/search?";
		const FETCH_URL = BASE_URL + "q=" + /**this.state.searchValue*/ req.params.itemSearched + "&type=track&market=US&limit=10&offset=0";
		let myOptions = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + req.user.currentAccessToken
			},
			mode: 'cors',
			cache: 'default'
		}
		let songResults = [];
		const json = await fetch(FETCH_URL, myOptions)
			.then(response => response.json())

		if (json.error == null){   //if access token is still valid
			for (let i = 0; i < json.tracks.items.length; i++){
				songResults.push({songName: json.tracks.items[i].name, artist: json.tracks.items[i].album.artists[0].name, 
									trackURI: json.tracks.items[i].uri});
			}
		}
		//console.log(songResults);
		res.send(songResults);
	});

	app.get('/getPremiumStatus', (req, res) =>{
		res.send(req.user.premiumStatus);
		// console.log('status: '+ req.user.premiumStatus)
	});

	/**body expects"
	 * {"status": true/false} 
	 * */
	app.post('/setPremiumStatus',async (req, res)=>{
		
		console.log(req.body)
		const test = await User.findOne({ uniqueId: req.user.uniqueId });
		if(test){
			test.premiumStatus = req.body.status;
			test.save();
			const userStatus = `${req.user.name}'s current premium status is ${test.premiumStatus}`;
			console.log(userStatus);
			res.send({msg: userStatus});
		}
		else{
			console.log('Couldnt find one')
			res.send({msg: 'Could not set Premium Status'});
		}
		
	});











};
