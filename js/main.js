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
			deps: ['jqueryui','jtemplates', 'date', 'json','date_format'],
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
			deps: ['box', 'stove_box', 'stove_tree', 'collection', 'friends', 'exchange', 'dailytask', 'share', 'transform', 'market', 'submitCollection', 'notification'],
			exports: 'entrance'
		}
	}
});

require(['entrance'], function(entrance) {
	jQuery.noConflict();
	injectDiv();
});