import cookieFunctions from '../util/Cookie';
const authFunctions = {
	isAuthed: function() {
		//for now check cookies for if authed or not
		//In real version, will have api call to verify authentication with spotify to provide acces to resources
		return cookieFunctions.getCookie('auth-status') === 'true';
	},

	isPremium: function() {
		//for now check cookies for if authed or not
		//In real version, will have api call to verify if user is premium
		return cookieFunctions.getCookie('premium-status') === 'true';
	}
};

export default authFunctions;
