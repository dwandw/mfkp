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
		var customEvent = document.createEvent('Event');
		customEvent.initEvent('myCustomEvent', true, true);

		function fireCustomEvent(data) {
			hiddenDiv = document.getElementById("eventDiv");
			var html = '<a href="javascript:void(1);" onclick="H.notification.getUnlockTimes();" class="exit">' + data + '</a>';
			hiddenDiv.innerHTML = html;
			hiddenDiv.dispatchEvent(customEvent);
		}
		var data = '';
		for (var i = 0; i < unlockTimes.length; i++) {
			var stove = unlockTimes[i];
			data += (stove.btime * 1000 + stove.locktime * 1000 - now) + ',' + stove.id + (i == unlockTimes.length - 1 ? '' : '|');
		};
		fireCustomEvent(data);
	}
};