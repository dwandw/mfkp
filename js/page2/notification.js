define(function() {
	return {
		getUnlockTimes: function(mapStoveBox) {
			function sortAsc(a, b) {
				return a - b;
			}
			var stoves = mapStoveBox;
			var unlockTimes = [0, 0];
			var arr = [];
			for (index in stoves) {
				var stove = stoves[index];
				var millsecend = parseInt(stove.btime) * 1000 + parseInt(stove.locktime) * 1000 - new Date().getTime();
				if (millsecend > 0) {
					arr[arr.length] = millsecend;
				}
			}
			arr.sort(sortAsc)
			if (arr.length > 0) {
				unlockTimes[0] = arr[0];
				if (arr[1] && arr[1] > 0) {
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
			fireCustomEvent(unlockTimes.join('|').escNone());
		}
	};
});