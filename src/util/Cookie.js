const cookieFunctions = {
	setCookie: function(name, value) {
		console.log('cookie setting time');
		document.cookie = '' + name + '=' + value + ';';
	},

	getCookie: function(cookieString) {
		return document.cookie.split(';').filter((item) => item.includes(cookieString)).length;
	}
};

export default cookieFunctions;
