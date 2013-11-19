H.localStorage = {
	get: function(key) {
		if (localStorage[key]) {
			return localStorage[key];
		} else {
			return "";
		}
	},
	add: function(key, value) {
		if (localStorage[key]) {
			values = ',' + localStorage[key] + ',';
			_value = ',' + value + ','
			if (values.indexOf(_value) < 0) {
				localStorage[key] = localStorage[key] + ',' + value;
			}
		} else {
			localStorage[key] = value;
		}
	},
	checkIn: function(key, value) {
		if (!localStorage[key]) {
			return false;
		} else {
			values = ',' + localStorage[key] + ',';
			_value = ',' + value + ','
			if (values.indexOf(_value) > -1) {
				return true;
			} else {
				return false;
			}
		}
	},
	remove: function(key, value) {
		if (!localStorage[key]) {
			return;
		} else {
			values = ',' + localStorage[key] + ',';
			_value = ',' + value + ','
			if (values.indexOf(_value) > -1) {
				values = values.replace(_value, ',');
				if (values.indexOf(",") == 0) {
					values = values.replace(",", "");
				}
				if (values.lastIndexOf(",") == values.length - 1) {
					values = values.substring(0, values.length - 1);
				}
				localStorage[key] = values;
			}
		}
	},
	clear: function(key) {
		localStorage[key] = '';
	}
};