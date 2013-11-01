var baseUrl = document.getElementById("extension_base_url").innerHTML;

require.config({
	baseUrl: baseUrl + "js/",
	paths: {
		"domReady": "lib/domReady",
		"jquery": "lib/jquery",
		"jqueryui": "lib/jquery-ui",
		"json": "lib/json2",
		"date": "lib/date",
		"base": "page/base",
		"box": "page/box",
		"stove": "page/stove",
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
		'base': {
			deps: ['jqueryui', 'date', 'json'],
			exports: 'base'
		},
		'box': {
			deps: ['base'],
			exports: 'box'
		},
		'stove': {
			deps: ['base'],
			exports: 'stove'
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
			deps: ['box', 'stove', 'collection', 'friends', 'exchange', 'dailytask', 'share', 'transform', 'market', 'submitCollection'],
			exports: 'entrance'
		}
	}
});

require(['entrance'], function(entrance) {
	jQuery.noConflict();
	injectDiv();
});