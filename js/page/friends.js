H.friends = {
	pall: 0,
	bInit: false,
	pageSize: 20,
	mapFriend: {},
	init: function(fnSucceed, reload) {
		if (reload) {
			H.friends.bInit = false;
			H.friends.init(fnSucceed);
			return;
		}
		if (fnSucceed) {
			if (!this.bInit) H.friends.load(function() {
				H.friends.bInit = true;
				fnSucceed();
			});
			else fnSucceed();
		} else {
			if (!this.bInit) H.friends.load(function() {
				H.friends.bInit = true;
			});
		}
	},
	showFriendList: function() {
		this.init(function() {
			H.friends.showFriends();
		});
		// this.showFriends();
	},
	showFriends: function(pageNo) {
		var extEvent = 'H.friends.showFriends(pageNo);';
		pageCnt = this.pall % this.pageSize > 0 ? Math.floor(this.pall / this.pageSize) + 1 : Math.floor(this.pall / this.pageSize);
		if (!pageNo) pageNo = 1;
		pageNo = pageNo <= 0 ? 1 : pageNo;
		pageNo = pageNo >= pageCnt ? pageCnt : pageNo;
		var div = jQuery("#friends");
		if (div.children().length > 0) {
			div.find("div").empty();
		}
		var html = '<ul>';
		for (var i = this.pageSize * (pageNo - 1); i < (this.pageSize * pageNo > this.pall ? this.pall : this.pageSize * pageNo); i++) {
			var user = this.mapFriend[i];
			html += '<li id="' + user.uin + '" class="width_100">';
			if (user.uin == H.user.getUin()) {
				html += (i * 1 + 1) + '\t[' + user.nick + '](' + user.uin + ')\t<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.stove.setStealUin(' + user.uin + ');"><span class="ui-button-text">炼卡</span></button><br />';
			} else {
				html += (i * 1 + 1) + '\t[' + user.nick + '](' + user.uin + ')\t<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.stove.setStealUin(' + user.uin + ');"><span class="ui-button-text">偷炉</span></button>\t<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.friends.onClick(' + user.uin + ');H.exchange.showBox(' + user.uin + ', ' + i + ', 0);"><span class="ui-button-text">换卡</span></button><br />';
			}
			html += '</li></ul>';
		}
		if (pageNo > 1) {
			tempEvent = extEvent.replace(/pageNo/g, "" + 1);
			html = html + '<a href="javascript:void(1);" onclick="' + tempEvent + '">&lt;&lt;</a>';
			tempEvent = extEvent.replace(/pageNo/g, "" + (pageNo - 1));
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&lt;</a>';
		} else {
			html = html + '<a href="javascript:void(0);" onclick="javascript:void(0);">&lt;&lt;</a>';
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&lt;</a>';
		}
		html = html + "&nbsp;" + pageNo + '/' + pageCnt;
		if (pageNo < pageCnt) {
			tempEvent = extEvent.replace(/pageNo/g, "" + (pageNo + 1));
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&gt;</a>';
			tempEvent = extEvent.replace(/pageNo/g, "" + pageCnt);
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&gt;&gt;</a>';
		} else {
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&gt;</a>';
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&gt;&gt;</a>';
		}
		div.find('div').append(html);
	},
	onClick: function(uin) {
		jQuery('#friends .selected').removeClass("selected");
		jQuery('#friends #' + uin).addClass("selected");
	},
	load: function(fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			code = qqhome.getAttribute("code");
			if (code != 0) {
				console.warn(oXml);
				fnError(code);
				return;
			}

			H.friends.pall = qqhome.getAttribute("pall") * 1;

			users = qqhome.getElementsByTagName("user");
			H.friends.mapFriend = {};
			for (var i = 0; i < users.length; i++) {
				var user = users[i];
				var _user = {};
				_user.uin = user.getAttribute("uin") * 1;
				_user.nick = user.getAttribute("nick");
				H.friends.mapFriend[i] = _user;
			}
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '加载好友列表失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_list?uin=' + H.user.getUin();
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};

H.cardFriends = {
	bInit: false,
	pageSize: 20,
	mapFriend: [],
	themeId: 0,
	init: function(fnSucceed, reload) {
		if (this.themeId === 0) {
			if (H.stove._my_theme_array.length > 0)
				this.themeId = H.stove._my_theme_array[0].tid;
			else
				this.themeId = 40;
		}
		if (reload) {
			H.cardFriends.bInit = false;
			H.cardFriends.init(fnSucceed);
			return;
		}
		if (fnSucceed) {
			if (!this.bInit) H.cardFriends.load(function() {
				H.cardFriends.bInit = true;
				fnSucceed();
			});
			else fnSucceed();
		} else {
			if (!this.bInit) H.cardFriends.load(function() {
				H.cardFriends.bInit = true;
			});
		}
	},
	showFriendList: function() {
		this.init(function() {
			H.cardFriends.showFriends();
		});
	},
	showFriends: function(pageNo) {
		var extEvent = 'H.cardFriends.showFriends(pageNo);';
		pageCnt = this.mapFriend.length % this.pageSize > 0 ? Math.floor(this.mapFriend.length / this.pageSize) + 1 : Math.floor(this.mapFriend.length / this.pageSize);
		if (!pageNo) pageNo = 1;
		pageNo = pageNo <= 0 ? 1 : pageNo;
		pageNo = pageNo >= pageCnt ? pageCnt : pageNo;
		var div = jQuery("#cardFriends");
		if (div.children().length > 0) {
			div.find('div').empty();
		}
		var html = '<ul>';
		for (var i = this.pageSize * (pageNo - 1); i < (this.pageSize * pageNo > this.mapFriend.length ? this.mapFriend.length : this.pageSize * pageNo); i++) {
			var uin = this.mapFriend[i];
			html += '<li id="' + uin + '" class="width_100">';
			html += (i * 1 + 1) + '\t[' + uin + ']\t<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.cardFriends.onClick(' + uin + ');H.exchange.showBox(' + uin + ', ' + i + ', 1);"><span class="ui-button-text">换卡</span></button><br />';
			html += '</li>';
		}
		html += '</ul>';
		if (pageNo > 1) {
			tempEvent = extEvent.replace(/pageNo/g, "" + 1);
			html = html + '<a href="javascript:void(1);" onclick="' + tempEvent + '">&lt;&lt;</a>';
			tempEvent = extEvent.replace(/pageNo/g, "" + (pageNo - 1));
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&lt;</a>';
		} else {
			html = html + '<a href="javascript:void(0);" onclick="javascript:void(0);">&lt;&lt;</a>';
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&lt;</a>';
		}
		html = html + "&nbsp;" + pageNo + '/' + pageCnt;
		if (pageNo < pageCnt) {
			tempEvent = extEvent.replace(/pageNo/g, "" + (pageNo + 1));
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&gt;</a>';
			tempEvent = extEvent.replace(/pageNo/g, "" + pageCnt);
			html = html + '&nbsp;<a href="javascript:void(1);" onclick="' + tempEvent + '">&gt;&gt;</a>';
		} else {
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&gt;</a>';
			html = html + '&nbsp;<a href="javascript:void(0);" onclick="javascript:void(0);">&gt;&gt;</a>';
		}
		div.find('div').append(html);
	},
	onClick: function(uin) {
		jQuery('#cardFriends .selected').removeClass("selected");
		jQuery('#cardFriends #' + uin).addClass("selected");
	},
	load: function(fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			code = qqhome.getAttribute("code");
			if (code != 0) {
				console.warn(qqhome);
				fnError(code);
				return;
			}
			nodes = qqhome.getElementsByTagName("node");
			H.cardFriends.mapFriend = [];
			for (var i = 0; i < nodes.length; i++) {
				var node = nodes[i];
				var uinStr = node.getAttribute("uin");
				var uinArr = uinStr.split("|");
				H.cardFriends.mapFriend = H.cardFriends.mapFriend.concat(uinArr.slice(0, uinArr.length - 1));
			}
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '加载卡友列表失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_theme_list?&uin=' + H.user.getUin() + '&tid=' + H.cardFriends.themeId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	showSelectTheme: function() {
		H.ui.showSelectTheme({
			handleTheme: function(tid) {
				H.cardFriends.themeId = tid;
				H.cardFriends.init(function() {
					H.cardFriends.showFriends();
				}, true);
			}
		});
	},
}