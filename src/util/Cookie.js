const cookieFunctions = {
	setCookie: function(name, value) {
		document.cookie = name + '=' + value + ';';
	},

	getCookie: function(cookieString) {
		return document.cookie.split(';').filter((item) => item.includes(cookieString));
	}
};

export default cookieFunctions;
