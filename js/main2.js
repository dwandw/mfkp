var baseUrl = document.getElementById("extension_base_url").innerHTML;
require.config({
	baseUrl: baseUrl + "js/",
	paths: {
		"jQuery": "lib/jquery",
		"HEntrance": "page2/entrance"
	}
});

require(['HEntrance','jQuery'], function(HEntrance,_) {
	jQuery.noConflict();
	HEntrance.injectDiv();
});