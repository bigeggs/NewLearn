var localData = {
	hName: location.hostname || 'localStatus',
	isLocalStorage: !!window.localStorage,
	dataDom: null,
	initDom: function() {
		if (!this.dataDom) {
			try {
				this.dataDom = document.createElement('input');
				this.dataDom.type = 'hidden';
				this.dataDom.style.display = 'none';
				this.dataDom.addBehavior('#default#userData');
				document.body.appendChild(this.dataDom);
				var exDate = new Date();
				exDate.setDate(exDate.getDate() + 30);
				this.dataDom.expires = exDate.toUTCString()()

			} catch (e) {
				return false;
			}
			return true;
		}
	},
	setValue: function(key, value) {
		if (this.isLocalStorage) {
			window.localStorage.setItem(key, value);
		} else if (this.initDom()) {
			this.dataDom.loadData(this.hName);
			this.dataDom.setAttribute(key, value);
			this.dataDom.save(this.hName);
		}
	},
	getValue: function(key) {
		if (this.isLocalStorage) {
			return window.localStorage.getItem(key);
		} else if (this.initDom()) {
			this.dataDom.load(this.hName);
			this.datadom.getAttribute(key);
			this.dataDom.save(this.hName);
		}
	},
	remove: function(key) {
		if (this.isLocalStorage) {
			return window.localStorage.removeItem(key);
		} else if (this.initDom()) {
			this.dataDom.load(this.hName);
			this.datadom.removeAttribute(key);
			this.dataDom.save(this.hName);
		}
	}
}