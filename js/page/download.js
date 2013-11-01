H.download = {
	getImgByThemeId: function(themeId) {
		var theme = CARD.data.mapTheme[themeId];
		var urls = [];
		urls.push({
			url: 'http://appimg.qq.com/card/img/theme/' + theme[0] + '?ver=' + theme[13],
			filename: theme[0]
		});
		urls.push({
			url: 'http://appimg.qq.com/card/img/theme/' + theme[0] + '_logo?ver=' + theme[13],
			filename: theme[0] + '_logo'
		});
		urls.push({
			url: 'http://appimg.qq.com/card/img/theme/' + theme[0] + '_big_logo?ver=' + theme[13],
			filename: theme[0] + '_big_logo'
		});
		var arr = CARD.data.mapTheme[themeId][11];
		for (var i = 0, len = arr.length; i < len; i++) {
			var card = CARD.data.mapCard[arr[i]];
			urls.push({
				url: 'http://appimg.qq.com/card/img/card/' + card[0] + '?ver=' + card[7],
				filename: card[0]
			});
			urls.push({
				url: 'http://appimg.qq.com/card/img/card/' + card[0] + '_56?ver=' + card[7],
				filename: card[0] + '_56'
			});
		}
		for (var i = 0; i < urls.length; i++) {
			this.saveAs(urls[i]["url"], urls[i]["filename"]);
		};
	},
	saveAs: function(url, filename) {
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = url;
		save_link.download = filename;

		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
		webkitURL.revokeObjectURL(url);
	}
};