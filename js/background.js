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
				showNofification(0, '快炼好了，去收卡吧！--' + new Date().Format("HH:MM:ss"), arr[0].split(",")[1]);
			}, timeOutSecond1);
		};
		if (timeOutSecond2 > 0) {
			timer2 = setTimeout(function() {
				showNofification(1, '快炼好了，去收卡吧！--' + new Date().Format("HH:MM:ss"), arr[1].split(",")[1]);
			}, timeOutSecond2);
		};
		console.log(new Date().Format("HH:MM:ss"));
	};
};

function showNofification(timer, msg, cardId) {
	if (needVoice())
		play();
	chrome.notifications.create("qq_card_helper_" + timer + "_" + cardId, {
		type: "basic",
		title: "魔法卡片-提示",
		message: msg,
		iconUrl: chrome.extension.getURL("images/icon_100.png"),
		eventTime: Date.now() + 24 * 3600 * 1000,
		priority: 2,
		buttons: [{
			title: "去收卡->"
		}]
	}, function(id) {});
}

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
	if (notificationId.indexOf("qq_card_helper") > -1 && buttonIndex === 0) {
		chrome.tabs.create({
			'url': 'http://appimg.qq.com/card/index_v3.html',
			'selected': true
		});
		chrome.notifications.clear(notificationId, function() {});
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
// urlreg.push("http://appimg2.qq.com/*");

function onBeforeRequestListener(details) {
	if (/all.js/i.test(details.url)) {
		return {
			redirectUrl: chrome.extension.getURL("js/hook/all.js")
		};
	}
	if(/appimg2/i.test(details.url)){
		return {
			redirectUrl: details.url.replace("appimg2", "appimg")
		};
	}
};

onStart();

function play() {
	var audio = new Audio(chrome.extension.getURL("js/xuexileifeng.ogg"));
	audio.play();
	setTimeout(function() {
		fadeOut(audio)
	}, 2000);
}

function fadeOut(audio) {
	if (audio.volume > 0) {
		audio.volume = audio.volume.toFixed(2);
		audio.volume = (audio.volume * 100 - 5) / 100;
		setTimeout(function() {
			fadeOut(audio)
		}, 100);
	}
}

function needVoice() {
	var now = new Date();
	if (now.getDay() > 0 && now.getDay() < 6) {
		if (now.getHours() < 9 || now.getHours() > 17)
			return true;
		else
			return false;
	} else {
		return true;
	}
}