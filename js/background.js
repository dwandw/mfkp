function onRequestListener(request, sender, sendResponse) {
	var arr = request.name.split("|");
	if (arr.length === 2) {
		if (timer1) {
			clearTimeout(timer1);
		}
		if (timer2) {
			clearTimeout(timer2);
		}
		var timeOutSecond1 = parseInt(arr[0].split(",")[0]) - 5 * 1000;
		var timeOutSecond2 = parseInt(arr[1].split(",")[0]) - 5 * 1000;
		if (timeOutSecond1 > 0) {
			timer1 = setTimeout(function() {
				showNofification('快炼好了，去收卡吧！--' + new Date().Format("HH:MM:ss"), arr[0].split(",")[1]);
			}, timeOutSecond1);
		};
		if (timeOutSecond2 > 0) {
			timer2 = setTimeout(function() {
				showNofification('快炼好了，去收卡吧！--' + new Date().Format("HH:MM:ss"), arr[1].split(",")[1]);
			}, timeOutSecond2);
		};
		console.log(new Date().Format("HH:MM:ss"));
	};
};

function showNofification(msg, cardId) {
	chrome.notifications.create("qq_card_helper", {
		type: "basic",
		title: "魔法卡片-提示",
		message: msg,
		iconUrl: chrome.extension.getURL("images/card/" + cardId + "_56"),
		eventTime: Date.now() + 24 * 3600 * 1000,
		priority: 2,
		buttons: [{
			title: "去收卡->"
		}]
	}, function(id) {});
}

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
	if (notificationId === "qq_card_helper" && buttonIndex === 0) {
		chrome.tabs.create({
			'url': 'http://appimg.qq.com/card/index_v3.html',
			'selected': true
		});
		chrome.notifications.clear("qq_card_helper", function() {});
	}
});

function onStart() {
	chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, {
		urls: urlreg
	}, ['blocking']);
	chrome.extension.onRequest.addListener(onRequestListener);
};

var timer1, timer2;
var urlreg = [];
urlreg.push("http://*.qq.com/snsapp/app/free_gif*/all.js*");

function onBeforeRequestListener(details) {
	if (/all.js/i.test(details.url)) {
		return {
			redirectUrl: chrome.extension.getURL("js/hook/all.js")
		};
	}
};

onStart();