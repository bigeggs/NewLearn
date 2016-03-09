(function() {

	function _my$(arg) {
		this.selectors = [];
		for (var i = 0; i < arg.length; i++) {
			var seletor = arg[i];
			if (typeof seletor == 'string') {
				if (seletor.indexOf("#") == 0) {
					var idName = seletor.substring(1);
					this.selectors.push(document.getElementById(idName));
				}
				if (seletor.indexOf(".") == 0) {
					var className = seletor.substring(1);
					this.selectors.push(document.getElementsByClassName(className));
				}

			}
		}
		return this;
	}
	_my$.prototype = {
		myvalue: function() {
			if (this.selectors.length == 1) {
				return this.selectors[0];
			} else {
				return this.selectors;
			}
		},
		each: function(fn) {
			for (var i = 0; i < this.selectors.length; i++) {
				fn.call(this, this.selectors[i]);
			}
			return this;
		},
		eachAll: function(fn) {
			fn.apply(this, this.selectors);
			return this;
		},
		changeStyle: function(proper, value) {
			this.each(function(el) {
				el.style[proper] = value;
			});
			return this;
		},
		changeStyleAll: function(proper, value) {
			this.eachAll(function() {
				var els=arguments;
				for (var i = 0; i < els.length; i++) {
					els[i].style[proper] = value;
				}
			});
			return this;
		}
	}
	window.my$ = function() {
		return new _my$(arguments);

	}
})()