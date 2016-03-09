var Cookie = {
	setCookie: function(key, value, options) {
		var str = key + "=" + value;
		if (options) {
			if (options.escape) {
				str = key + "=" + escape(value);
			}
			if (options.expiresDay) {
				var now = new Date();
				now.setTime(Date.now() + options.expiresDay * 24 * 60 * 60 * 1000);
				str += "; exprires=" + now.toUTCString();
			}
			if (options.domain) {
				str += "; domain=" + options.domain;
			}
			if (options.path) {
				str += "; path=" + options.path;
			}
			if (options.secure) {
				str += "; secure";
			}
		}
		document.cookie = str;
	},
	getCookie: function(key) {
		var cookieCollections = document.cookie.split(';');
		for (var i = 0; i < cookieCollections.length; i++) {
			var choose = cookieCollections[i].split('=');
			if (choose[0] == key) {
				return unescape(choose[1]);
				break;
			}
		}

	},
	deleteCookie: function(key) {
		Cookie.setCookie(key, "", {
			expiresDay: -1
		})
	}
}