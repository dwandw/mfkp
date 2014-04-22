H.notification = {
	getUnlockTimes: function() {
		function sortAsc(a, b) {
			return a.btime - b.btime + a.locktime - b.locktime;
		}
		var now = new Date().getTime();
		var stoves = H.user.mapStoveBox;
		var unlockTimes = ["0,0", "0,0"];
		var arr = [];
		for (index in stoves) {
			var stove = stoves[index];
			var millsecend = stove.btime * 1000 + stove.locktime * 1000 - now;
			if (millsecend > 0) {
				arr[arr.length] = stove;
			}
		}
		arr.sort(sortAsc)
		if (arr.length > 0) {
			unlockTimes[0] = arr[0];
			if (arr[1] && arr[1] != "0,0") {
				unlockTimes[1] = arr[1];
			}
		};

		function fireCustomEvent(data) {
			var customEvent = document.createEvent('Event');
			customEvent.initEvent('myCustomEvent', true, true);

			hiddenDiv = jQuery("#eventDiv");
			hiddenDiv.html(data);
			hiddenDiv[0].dispatchEvent(customEvent);
		}
		var data = H.user.getUin() + "," + H.user.getNick() + '|';
		for (var i = 0; i < unlockTimes.length; i++) {
			var stove = unlockTimes[i];
			data += (stove.btime * 1000 + stove.locktime * 1000 - now) + ',' + stove.id + ',' + (stove.id > 0 ? H.ui.getCardBigImgSrc(stove.id) : "0") + (i == unlockTimes.length - 1 ? '' : '|');
		};
		fireCustomEvent(data);
	}
};