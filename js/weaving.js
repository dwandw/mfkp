var theme_name = "excite-bike";

function injectStyle() {
	var type = "text/css";
	var s = document.createElement("link");
	s.type = type;
	s.rel = "stylesheet";
	s.href = chrome.extension.getURL("css/" + theme_name + "/jquery-ui-1.10.0.custom.css");
	document.head.appendChild(s);

	// var s2 = document.createElement("link");
	// s2.type = type;
	// s2.rel = "stylesheet";
	// s2.href = chrome.extension.getURL("css/qq/dialog.css");
	// document.head.appendChild(s2);

	var s1 = document.createElement("link");
	s1.type = type;
	s1.rel = "stylesheet";
	s1.href = chrome.extension.getURL("css/extend.css");
	document.head.appendChild(s1);
}

function injectHtml() {
	var d = document.createElement('div');
	d.id = "extension_base_url";
	d.style.cssText = "display:none;";
	d.innerHTML = chrome.extension.getURL("");
	document.body.appendChild(d);

	var d1 = document.createElement('div');
	d1.id = 'eventDiv';
	d1.style.cssText = "display:none;";
	document.body.appendChild(d1);
}

function sendMessage(value) {
	chrome.extension.sendRequest({
		"mapStove": value
	}, function(response) {
		if (response.status == "succeed") {
			// alert("succeed");
			console.log("success");
		} else {
			alert("fail");
		}
	});
}

function notification() {
	var d = document.getElementById("eventDiv");
	if (!d) {
		setTimeout("notification()", 1000);
	} else {
		document.getElementById("eventDiv").addEventListener('myCustomEvent', function() {
			var eventData = document.getElementById('eventDiv').innerText;
			sendMessage(eventData);
		});
	}
}

if ((location.host == "appimg.qq.com" || location.host == "appimg2.qq.com") && location.pathname == "/card/index_v3.html") {
	var js = document.createElement("script");
	//  <script src="/js/require.js" data-main="/js/main" defer async="true" ></script>
	js.type = "text/javascript";
	js.src = chrome.extension.getURL("js/lib/require.js");
	js.setAttribute("data-main", chrome.extension.getURL("/js/main"));
	js.setAttribute("async", true);
	document.head.appendChild(js);
	injectHtml();
	injectStyle();
	notification();
}