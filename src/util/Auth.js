const { getCookie } = require('./Cookie');
module.exports = {
	isAuthed: function() {
		//for now check cookies for if authed or not
		//In real version, will have api call to verify authentication with spotify to provide acces to resources
		return getCookie('auth-status') === 'true';
	},

	isPremium: function() {
		//for now check cookies for if authed or not
		//In real version, will have api call to verify if user is premium
		return getCookie('premium-status') === 'true';
	}
};
