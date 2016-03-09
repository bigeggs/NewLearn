window.ZXMessenger = (function() {

	var defaultPrefix = "[ZX-TEST]",
		existPostMessage = 'postMessage' in window;

	function Target(windowTarget, name, prefix) {
		var errorMsg;
		if (arguments.length < 2) {
			errorMsg = 'parameter error: target and name are both required!'
		}
		if (typeof windowTarget != 'object') {
			errorMsg = 'parameter error: target must be a window object!';
		}
		if (typeof name != 'string') {
			errorMsg = 'parameter error: name must be  string type';
		}
		if (errorMsg) {
			throw new Error(errorMsg);
		}
		this.target = windowTarget;
		this.name = name;
		this.prefix = prefix;
	}
	if (existPostMessage) {
		Target.prototype.sendMessage = function(msg) {
			this.target.postMessage(this.name + '|' + this.prefix + "_msgPart_" + msg, '*');
		}
	} else {
		Target.prototype.sendMessage = function(msg) {
			var selfDefineFunc = window.navigator[this.name + this.prefix];
			if (typeof selfDefineFunc == 'functon') {
				selfDefineFunc(this.name + '|' + this.prefix + "_msgPart_" + msg, window);
			} else {
				throw new Error('target callback function is not defined');
			}
		}

	}

	function ZXMessenger(windowName, messagePrefix) {
		this.windowTargets = {};
		this.windowName = windowName;
		this.messagePrefix = messagePrefix || defaultPrefix;
		this.callbackFnList = [];
	}
	ZXMessenger.prototype.addWindowTargerts = function(windowTarget, name) {
		var target = new Target(windowTarget, name, this.messagePrefix);
		this.windowTargets[name]=target;
	}
	ZXMessenger.sendMessage = function(msg) {
		var targets = this.windowTargets,
			target;
		for (target in targets) {
			if (targets.hasOwnProperty(target)) {
				targets[target].sendMessage(msg);
			}
		}
	}
	ZXMessenger.prototype.addcallbackFn = function(callbackfn) {
		var existFn = false,
			i = 0,
			len = this.callbackFnList.length;
		for (; i < len; i++) {
			if (this.callbackFnList[i] == callbackfn) {
				existFn = true;
				break;
			}
		}
		if (!existFn) {
			this.callbackFnList.push(callbackfn)
		}
	}
	ZXMessenger.prototype.clearCallbackFn = function() {
		this.callbackFuncList = [];
	}
	ZXMessenger.prototype.initCallbackFn = function() {
		var self = this;
		var defaultCallbackFn = function(msg) {
			if (typeof msg == 'object' && msg.data) {
				msg = msg.data;
			}
			if (msg.indexOf('|') > -1 && msg.indexOf('_msgPart_') > -1) {
				var part = msg.split('_msgPart_');
				var message = part[1],
					info = part[0].split('|');
				var target = info[0],
					name = info[1];
				for (var i = 0; i < self.callbackFnList.length; i++) {
					if (target + name === self.windowName + self.messagePrefix) {
						self.callbackFnList[i](message);
					}

				}
			}
		}
		if (existPostMessage) {
			if (window.addEventListener) {
				window.addEventListener('message', defaultCallbackFn, false);
			}
			if (window.attachEvent) {
				window.attachEvent('onmessage', defaultCallbackFn);
			}
		} else {
			window.navigator[this.prefix + this.name];
		}
	}
	return ZXMessenger;
})()