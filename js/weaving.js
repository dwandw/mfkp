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
	var d = document.createElement('span');
	d.id = "extension_base_url";
	d.style = "display:none;";
	d.innerHTML = chrome.extension.getURL("");
	document.body.appendChild(d);

	var d1 = document.createElement('div');
	d1.id = 'eventDiv';
	var father = document.getElementsByClassName("live_header_main_v3")[0];
	var target = document.getElementById("P_LOGIN");
	father.insertBefore(d1, target);
	//jQuery("#P_LOGIN").after(d1);
	//document.body.appendChild(d1);
}

function sendMessage(name, value) {
	chrome.extension.sendRequest({
		name: value
	}, function(response) {
		console.log("success");
	});
}

function notification() {
	var d = document.getElementById("eventDiv");
	if (!d) {
		setTimeout("notification()", 1000);
	} else {
		document.getElementById("eventDiv").addEventListener('myCustomEvent', function() {
			var eventData = document.getElementById('eventDiv').innerText;
			sendMessage("mapStove", eventData);
		});
	}
}

if (location.host == "appimg.qq.com" || location.host == "appimg2.qq.com") {
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