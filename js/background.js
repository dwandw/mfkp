var onRequestListener = function(request, sender, sendResponse) {
    var arr = request.name.split("|");
    if (arr.length === 2) {
        if (timer1) {
            clearTimeout(timer1);
        };
        if (timer2) {
            clearTimeout(timer2);
        };
        var timeOutSecond1 = parseInt(arr[0]) - 5 * 1000;
        var timeOutSecond2 = parseInt(arr[1]) - 5 * 1000;
        if (timeOutSecond1 > 0) {
            timer1 = setTimeout(function() {
                showNofification('快炼好了，去收卡吧！--' + new Date().format("HH:MM:ss"));
            }, timeOutSecond1);
        };
        if (timeOutSecond2 > 0) {
            timer2 = setTimeout(function() {
                showNofification('快炼好了，去收卡吧！--' + new Date().format("HH:MM:ss"));
            }, timeOutSecond2);
        };
        console.log(new Date().format("HH:MM:ss"));
    };
};

function showNofification(msg) {
    chrome.notifications.create("qq_card_helper", {
        type: "basic",
        title: "魔法卡片-提示",
        message: msg,
        iconUrl: chrome.extension.getURL("images/icon_64.png"),
        eventTime: Date.now() + 24*3600*1000,
        priority: 2,
        buttons: [{
                title: "去收卡->"
            }
        ]
    }, function(id) {});
    //webkitNotifications.createNotification(chrome.extension.getURL("images/icon_32.png"), '提示', msg).show();
}

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    if(notificationId === "qq_card_helper" && buttonIndex === 0){
        chrome.tabs.create({'url':'http://appimg.qq.com/card/index_v3.html','selected':true});
        chrome.notifications.clear("qq_card_helper",function(){});
    }
});

var urlreg = [];
urlreg.push("http://*.qq.com/card/mk/card_info_v3.js*");

var onBeforeRequestListener = function(details) {
    if (/card_info_v3/i.test(details.url)) {
        return {
            redirectUrl: chrome.extension.getURL("bak/card_info_v3.js")
        };
    }
};

var onStart = function() {
    // chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, {urls: urlreg}, ['blocking']);
    chrome.extension.onRequest.addListener(onRequestListener);
};

var timer1, timer2;
onStart();