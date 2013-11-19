var baseUrl = document.getElementById("extension_base_url").innerHTML;

require.config({
	baseUrl: baseUrl + "js/",
	paths: {
		"domReady": "lib/domReady",
		"jquery": "lib/jquery",
		"jtemplates": "lib/jquery.jtemplates",
		"jqueryui": "lib/jquery-ui",
		"json": "lib/json2",
		"date": "lib/date",
		"date_format": "lib/date.format",
		"local_storage": "page/local_storage",

		"base": "page/base",
		"ui": "page/ui",
		"download": "page/download",
		"notification": "page/notification",
		"user": "page/user",

		"box": "page/box",
		"stove_box": "page/stove_box",
		"stove_tree": "page/stove_tree",
		"collection": "page/collection",
		"submitCollection": "page/submitCollection",
		"friends": "page/friends",
		"exchange": "page/exchange",
		"transform": "page/transform",
		"dailytask": "page/dailytask",
		"share": "page/share",
		"market": "page/market",
		"entrance": "page/entrance"
	},
	shim: {
		'jqueryui': {
			deps: ['jquery'],
			exports: 'jqueryui'
		},
		'jtemplates': {
			deps: ['jquery'],
			exports: 'jtemplates'
		},
		'base': {
			deps: ['jqueryui', 'jtemplates', 'date', 'json', 'date_format'],
			exports: 'base'
		},
		'ui': {
			deps: ['base'],
			exports: 'ui'
		},
		'download': {
			deps: ['base'],
			exports: 'download'
		},
		'notification': {
			deps: ['base'],
			exports: 'notification'
		},
		'local_storage': {
			deps: ['base'],
			exports: 'local_storage'
		},
		'user': {
			deps: ['base', 'ui'],
			exports: 'user'
		},
		'stove_box': {
			deps: ['base', 'user'],
			exports: 'stove_box'
		},
		'stove_tree': {
			deps: ['base', 'user'],
			exports: 'stove_tree'
		},
		'box': {
			deps: ['base'],
			exports: 'box'
		},
		'collection': {
			deps: ['base'],
			exports: 'collection'
		},
		'friends': {
			deps: ['base'],
			exports: 'friends'
		},
		'exchange': {
			deps: ['base'],
			exports: 'exchange'
		},
		'transform': {
			deps: ['base'],
			exports: 'transform'
		},
		'dailytask': {
			deps: ['base'],
			exports: 'dailytask'
		},
		'share': {
			deps: ['base'],
			exports: 'share'
		},
		'market': {
			deps: ['base'],
			exports: 'market'
		},
		'submitCollection': {
			deps: ['base'],
			exports: 'submitCollection'
		},
		'entrance': {
			deps: ['box', 'stove_box', 'stove_tree', 'collection', 'friends', 'exchange', 'dailytask', 'share', 'transform', 'market', 'submitCollection', 'notification', 'local_storage', 'download'],
			exports: 'entrance'
		}
	}
});

require(['entrance'], function(entrance) {
	jQuery.noConflict();
	injectDiv();
	document.onkeydown = function() {
		shortcuts();
	};
});

var scMap = {
	"E": 69,
	"F": 70,
	"LEFT": 37,
	"RIGHT": 39
};

var shortcuts = function() {
	if (event.keyCode == scMap.LEFT) {
		if (H.exchange.index === 0) {
			alert("前面没有了");
			return;
		}
		var index = H.exchange.index - 1;
		var uin = 0;
		if (H.exchange.isCardFriends) {
			uin = H.cardFriends.mapFriend[index];
			if (Math.floor(index / H.cardFriends.pageSize) != Math.floor(index + 1 / H.cardFriends.pageSize)) {
				H.cardFriends.showFriends(Math.floor(index / H.cardFriends.pageSize) + 1);
			}
			H.cardFriends.onClick(uin);
		} else {
			uin = H.friends.mapFriend[index].uin;
			if (Math.floor(index / H.friends.pageSize) != Math.floor(index + 1 / H.friends.pageSize)) {
				H.friends.showFriends(Math.floor(index / H.friends.pageSize) + 1);
			}
			H.friends.onClick(uin);
		}
		H.exchange.showBox(uin, index, H.exchange.isCardFriends);
	}
	if (event.keyCode == scMap.RIGHT) {
		var uin = 0;
		var index = 0;
		if (H.exchange.isCardFriends) {
			if (H.cardFriends.mapFriend.length === H.exchange.index + 1) {
				alert("到头了，后面没有了");
				return;
			}
			index = H.exchange.index + 1;
			uin = H.cardFriends.mapFriend[index];
			if (Math.floor(index / H.cardFriends.pageSize) != Math.floor(index - 1 / H.cardFriends.pageSize)) {
				H.cardFriends.showFriends(Math.floor(index / H.cardFriends.pageSize) + 1);
			}
			H.cardFriends.onClick(uin);
		} else {
			if (H.friends.pall === H.exchange.index + 1) {
				alert("到头了，后面没有了");
				return;
			}
			index = H.exchange.index + 1;
			uin = H.friends.mapFriend[index].uin;
			if (Math.floor(index / H.friends.pageSize) != Math.floor(index - 1 / H.friends.pageSize)) {
				H.friends.showFriends(Math.floor(index / H.friends.pageSize) + 1);
			}
			H.friends.onClick(uin);
		}
		H.exchange.showBox(uin, index, H.exchange.isCardFriends);
	}
	if (event.keyCode == scMap.F) {
		H.user.load(function() {
			H.notification.getUnlockTimes();
		});
	}
	if (event.keyCode == scMap.E) {
		H.exchange.goExchange();
	}
}