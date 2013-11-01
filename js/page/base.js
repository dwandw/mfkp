var H = {
	_root: '',
	extension_base_url: '',
	props: {
		PROPS_THEME_ID: 111,
		UNIVERSAL_CARD_ID: 1162
	},
	init: function() {
		H.extension_base_url = jQuery("#extension_base_url").text();
		H._root = jQuery("#helper");
	},
	checkFlashCard: function(themeId) { //闪卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x08);
	},
	checkJbCard: function(themeId) { //绝版卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x01);
	},
	checkRP: function(themeId) { //免合成卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x02);
	},
	checkCanTransfer: function(themeId) { //不能通过变卡得到
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return !(theme[12] & 0x04);
	},
	hash: function(str) {
		var hash = 5381;
		for (var i = 0, len = str.length; i < len; ++i) {
			hash += (hash << 5) + str.charCodeAt(i);
		}
		return hash & 0x7fffffff;
	},
	getMsgByCode: function(code) {
		switch (code) {
			case -33076:
				return "对不起，您好友的专属精灵施展了“据守”技能，您无法偷他的炉！";
				break;
			case -33058:
				return "好友的卡片处于锁定状态,您不能交换哦!";
				break;
			case -1007:
				//Export.tipsPanel.show(String(x.@message));
				break;
			case -1008:
			case -1009:
			case -1103:
			case -1104:
			case -1105:
				//this.showVerifyPanel();
				return "要输入验证码！";
				break;
			case -32002:
				return "系统繁忙，请稍后再试!";
				break;
			case -10004:
				break;
			case -33004:
				return "箱子满了！";
				//pp = (Export.popup(ConfirmPanel, {msg:Lange.boxFull()}, true) as ConfirmPanel);
				//pp.addEventListener(Event.CLOSE, this.closeAlertHandler);
				break;
			case -33033:
				return '您的卡片放入集卡册成功，但系统繁忙导致发放QQ秀奖励失败，我们会在24小时内补发，请注意查收。<br>（金币、经验、合成卡奖励已经成功发放）'
				break;
			case -33011:
				return "卡片尚未炼制完。";
				//pp = (Export.popup(ConfirmPanel, {msg:Lange.boxFull()}, true) as ConfirmPanel);
				//pp.addEventListener(Event.CLOSE, this.closeAlertHandler);
				break;
			case -10005:
				break;
			case -2:
				break;
			case -33086:
				return "对不起，您没有集齐目标闪卡对应的普通套卡。";
			case -33084:
				return "您在此好友处偷炉的卡片尚未取出(查看自己场景下的偷炉位)，请先取卡后再偷炉~";
				break;
			case -304:
				return "<h>购买失败!</h><br><br>您的支付超出了单笔限额。去修改限制？";
			case -305:
				return "购买失败!<br>您的支付超出了单笔限额。";
				break;
			case -1002:
				return "系统繁忙，请稍后再试!";
				break;
			case -1005:
				return "未注册!，请稍后再试!";
				break;
			case -33007:
				break;
			case -1001:
				//Export.jsCaller.call("CARD.flashCalls.showLogin");
				CARD.showLogin();
				return "请重新登陆！";
				break;
			case -11006:
				return "对不起，您可能不是Ta的好友!";
				break;
			case -410103:
				break;
			case -410104:
				break;
			case -410105:
				break;
			case -480001:
				break;
			case -310704:
				break;
			case -310502:
			case -3127006:
			case -1106:
				// if (ExternalInterface.available){
				//     ExternalInterface.call("aq", String(x.@message));
				// };
				break;
			case -801:
				// param = {};
				// param.msg = "<h>购买失败!</h><br><br>您的帐户余额不足，去充值？";
				// basePanel = Export.popup(ConfirmPanel, param, true);
				// basePanel.addEventListener(Event.CLOSE, closeConfirmHandler);
				return "购买失败!<br />您的帐户余额不足";
				break;
			case -802:
				return "密保验证失败";
				break;
			case -1102:
				return "对不起，您操作的号码和登录的号码不一致，请重新登录！";
				break;
			case -10001:
				break;
			case -10002:
				return "很抱歉，租炉卡现在出于限量体验阶段。每小时限发售100张，请稍候再来购买。";
				break;
			case -10008:
				return "魔法学徒礼包每人只能购买一次，您已经购买过，不能再次购买。";
				break;
			case -310705:
			case -310707:
			case -310710:
				break;
			case -32001:
				// if (String(x.@message).length > 0){
				//     Export.tipsPanel.show(String(x.@message));
				// } else {
				//     Export.tipsPanel.show("对不起，您的消耗卡面值低于目标卡，请重新选择消耗卡。");
				// };
				return "对不起，您的消耗卡面值低于目标卡，请重新选择消耗卡。";
				break;
			case -32002:
				// if (String(x.@message).length > 0){
				//     Export.tipsPanel.show(String(x.@message));
				// } else {
				//     Export.tipsPanel.show("对不起，您的消耗卡可能已经被好友换走，请刷新\"我的魔法屋\"后再试。");
				// };
				return "对不起，您的消耗卡可能已经被好友换走，请刷新\"我的魔法屋\"后再试。";
				break;
			case -33061:
				return "尊敬的魔法师，好友的卡片可能已被换走，请刷新查看后再试~";
				break;
			case -33064:
				return "对不起，您的魔力值不足，请补充魔力后再进行变卡。";
				break;
			case -33086:
				return "对不起，您没有选择对应主题的闪卡，请重新选择。";
				break;
			case -33087:
				return "对不起，您没有集齐目标闪卡对应的普通套卡。";
				break;
			case -50004:
				return "系统繁忙，请销后再试！";
			default:
				return "系统繁忙，请销后再试！";
				// messStr = String(x.@message);
				// messStr = (((messStr.length > 0)) ? messStr : "系统繁忙,请稍后再试~");
				// return messStr);
		}
	},
	sortCardFunc: function(a, b) {
		if (b.id === 1162 && a.id === 1162) return 1;
		if (a.id === 1162) return 1;
		if (b.id === 1162) return -1;
		var themeIda = CARD.data.mapCard[a.id][1];
		var themeIdb = CARD.data.mapCard[b.id][1];
		if (themeIda === 81 && themeIdb === 81) return 1;
		if (themeIda === 81) return 1;
		if (themeIdb === 81) return -1;
		return b.id - a.id;
	},
	resChinese: function(str) {
		return unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
	},
	testUrl: function(url, arg) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			console.warn(H.resChinese(oXml.text));
		}

		function fnError(iCode) {
			console.error(iCode);
			H.ui.waitEnd();
		}
		H.ui.waitStart();
		// var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_mainpage?g_tk=' + _hash(CARD.getCookie("skey"));
		var sUrl = "http://card.show.qq.com/cgi-bin/" + url + '?g_tk=' + this.hash(CARD.getCookie("skey"));
		for (var index in arg) {
			sUrl += '&' + index + '=' + arg[index];
		}
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};
H.user = {
	oMyData: {},
	mapExchangeBox: {},
	mapCofferBox: {},
	mapStoveBox: {},
	mapStove: {},
	mapCollection: {},
	bGotCollection: false,
	load: function(fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			code = qqhome.getAttribute("code") * 1;
			// console.debug(H.resChinese(oXml.text));
			if (code != 0) {
				fnError(code);
				console.error(H.resChinese(oXml.text));
				return;
			}
			// console.debug(oXml.text);
			hello = qqhome.getElementsByTagName("hello")[0];
			time = hello.getAttribute("time");

			user = qqhome.getElementsByTagName("user")[0];
			H.user.oMyData.nick = user.getAttribute("nick");
			H.user.oMyData.uin = user.getAttribute("uin") * 1;
			H.user.oMyData.money = user.getAttribute("money") * 1;
			H.user.oMyData.sex = user.getAttribute("sex") * 1;
			H.user.oMyData.exp = user.getAttribute("exp") * 1;
			H.user.oMyData.regti = user.getAttribute("regti") * 1;
			H.user.oMyData.lastloginti = user.getAttribute("lastloginti") * 1;
			H.user.oMyData.randchance = user.getAttribute("randchance") * 1;
			H.user.oMyData.lastrandti = user.getAttribute("lastrandti") * 1;
			H.user.oMyData.missionid = user.getAttribute("missionid") * 1;
			H.user.oMyData.missionstep = user.getAttribute("missionstep") * 1;
			H.user.oMyData.missionflag = user.getAttribute("missionflag") * 1;
			H.user.oMyData.lastgetmoneyti = user.getAttribute("lastgetmoneyti") * 1;
			H.user.oMyData.lv = user.getAttribute("lv") * 1;
			H.user.oMyData.lvupbonus = user.getAttribute("lvupbonus") * 1;
			H.user.oMyData.redvip = user.getAttribute("redvip") * 1;
			H.user.oMyData.missionv3 = user.getAttribute("missionv3") * 1;
			H.user.oMyData.hasmsg = user.getAttribute("hasmsg") * 1;
			H.user.oMyData.mana = user.getAttribute("mana") * 1;
			H.user.oMyData.redlv = user.getAttribute("redlv") * 1;
			H.user.oMyData.yearvip = user.getAttribute("yearvip") * 1;
			H.user.oMyData.elfname = user.getAttribute("elfname");

			changebox = qqhome.getElementsByTagName("changebox")[0];
			H.user.oMyData.exchangebox_cur = changebox.getAttribute("cur") * 1;
			H.user.oMyData.exchangebox_vipnum = changebox.getAttribute("vipnum") * 1;
			H.user.oMyData.exchangebox_max = changebox.getAttribute("max") * 1;
			exchArr = changebox.getAttribute("exch").split(",");
			H.user.oMyData.exchangebox_exch = [];
			for (var i = 0; i < exchArr.length; i++) {
				if (exchArr[i] * 1 > 0) {
					H.user.oMyData.exchangebox_exch.push(exchArr[i] * 1);
				}
			};
			changeboxcards = changebox.getElementsByTagName("card");
			H.user.mapExchangeBox = {};
			for (var i = 0; i < changeboxcards.length; i++) {
				card = changeboxcards[i];
				slot = {};
				slotId = card.getAttribute("slot") * 1;
				slot.slot = slotId;
				slot.status = card.getAttribute("status") * 1;
				slot.unlock = card.getAttribute("unlock") * 1;
				slot.id = card.getAttribute("id") * 1;
				slot.type = card.getAttribute("type") * 1;
				slot.st = card.getAttribute("st") * 1;
				slot.locate = 0;
				if (slot.id > 0) H.user.mapExchangeBox[slotId] = slot;
			}

			storebox = qqhome.getElementsByTagName("storebox")[0];
			H.user.oMyData.cofferbox_cur = storebox.getAttribute("cur") * 1;
			H.user.oMyData.cofferbox_max = storebox.getAttribute("max") * 1;
			H.user.oMyData.cofferbox_nor = storebox.getAttribute("nor") * 1;
			storeboxcards = storebox.getElementsByTagName("card");
			H.user.mapCofferBox = {};
			for (var i = 0; i < storeboxcards.length; i++) {
				card = storeboxcards[i];
				slot = {};
				slotId = card.getAttribute("slot") * 1;
				slot.slot = slotId;
				slot.status = card.getAttribute("status") * 1;
				slot.id = card.getAttribute("id") * 1;
				slot.type = card.getAttribute("type") * 1;
				slot.st = card.getAttribute("st") * 1;
				slot.locate = 1;
				if (slot.id > 0) H.user.mapCofferBox[slotId] = slot;
			}

			stovebox = qqhome.getElementsByTagName("stovebox")[0];
			H.user.oMyData.stovebox_cur = stovebox.getAttribute("cur") * 1;
			H.user.oMyData.stovebox_max = stovebox.getAttribute("max") * 1;
			H.user.oMyData.stovebox_stovenum = stovebox.getAttribute("stovenum") * 1;
			stoveboxcards = stovebox.getElementsByTagName("card");
			H.user.mapStoveBox = {};
			for (var i = 0; i < stoveboxcards.length; i++) {
				card = stoveboxcards[i];
				slot = {};
				slotId = card.getAttribute("slot") * 1;
				slot.slot = slotId;
				slot.stove = card.getAttribute("stove") * 1;
				slot.btime = card.getAttribute("btime") * 1;
				slot.locktime = card.getAttribute("locktime") * 1;
				slot.id = card.getAttribute("id") * 1;
				slot.type = card.getAttribute("type") * 1;
				slot.prop = card.getAttribute("prop") * 1;
				slot.flag = card.getAttribute("flag") * 1;
				if (card.getAttribute("slottype")) {
					slot.slottype = card.getAttribute("slottype");
					slot.opuin = card.getAttribute("opuin") * 1;
					slot.opuin2 = card.getAttribute("opuin2") * 1;
					slot.id2 = card.getAttribute("id2") * 1;
				}
				H.user.mapStoveBox[slotId] = slot;
			}
			info = qqhome.getElementsByTagName("info")[0];
			runeback = info.getElementsByTagName("runeback")[0];
			H.user.oMyData.runeback_id = runeback.getAttribute("id") * 1;
			H.user.oMyData.runeback_expire = runeback.getAttribute("expire") * 1;
			stoves = info.getElementsByTagName("stove");
			H.user.mapStove = {};
			for (var i = 0; i < stoves.length; i++) {
				var stove = stoves[i];
				var id = stove.getAttribute("id") * 1;
				var endTime = stove.getAttribute("endtime") * 1;
				var level = stove.getAttribute("lv") * 1;
				var _map = {};
				_map.id = id;
				_map.endTime = endTime;
				_map.level = level;
				H.user.mapStove[id] = _map;
			}
			H.notification.getUnlockTimes();
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '加载失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_mainpage?g_tk=' + H.hash(CARD.getCookie("skey"));
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	loadMyColletion: function(fnSucceed) {
		function fnSucc(oXML) {
			var oElem = oXML.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = parseInt(oElem.getAttribute("code"));
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnFail(iCode);
				return;
			}
			H.user.bGotCollection = true;
			H.user.mapCollection = {};
			var themeArr = oXML.xmlDom.getElementsByTagName("Node");
			for (var i = 0, len = themeArr.length; i < len; i++) {
				var themeId = parseInt(themeArr[i].getAttribute("theme_id"));
				var completeTime = parseInt(themeArr[i].getAttribute("completetime"));
				var giftId = parseInt(themeArr[i].getAttribute("gift"));

				if (H.user.mapCollection[themeId] == undefined) {
					H.user.mapCollection[themeId] = {};
				}
				if (H.user.mapCollection[themeId].num == undefined) {
					H.user.mapCollection[themeId].num = 1;
				} else {
					H.user.mapCollection[themeId].num += 1;
				}

				function completeTimeSort(a, b) {
					return (b[1] - a[1]); //按最新集齐时间排序
				}
				if (H.user.mapCollection[themeId].gifts == undefined) {
					H.user.mapCollection[themeId].gifts = [];
					H.user.mapCollection[themeId].gifts.push([giftId, completeTime]);
				} else {
					H.user.mapCollection[themeId].gifts.push([giftId, completeTime]);
					H.user.mapCollection[themeId].gifts.sort(completeTimeSort);
				}
			}
			if (fnSucceed) fnSucceed();
		}

		function fnFail(iCode) {
			H.ui.showErrDlg({
				title: '集齐卡片失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		var url = 'http://card.show.qq.com/cgi-bin/card_collection_get?uin=' + this.getUin();
		var xml_sender = new CARD.XHR(url, fnSucc, null, fnFail);
		xml_sender.send();
	},
	getEmptySlot: function(slotType) {
		var box, cur;
		slotType = slotType || 0;
		if (slotType == 0) {
			box = H.user.mapExchangeBox;
			cur = H.user.oMyData.exchangebox_cur;
		} else {
			box = H.user.mapCofferBox;
			cur = H.user.oMyData.cofferbox_cur;
		}
		for (var i = 0; i < cur; i++) {
			if (!box[i]) return i;
			if (box[i].id < 1) return i;
		};
		return -1;
	},
	getCardNum: function(slotType) {
		var box, num = 0;
		if (slotType == 0) {
			box = H.user.mapExchangeBox;
		} else {
			box = H.user.mapCofferBox;
		}
		for (var index in box) {
			if (box[index].id < 1) continue;
			num++;
		}
		return num;
	},
	exchangeStorage: function(srcLocate, srcSlotId, dstSlotId) {
		if (srcLocate == 1) { // moveToChangeBox
			var slot = H.user.mapCofferBox[srcSlotId];
			var destSlot = {};
			destSlot.slot = dstSlotId;
			destSlot.status = slot.status;
			destSlot.id = slot.id;
			destSlot.type = slot.type;
			destSlot.st = slot.st;
			destSlot.unlock = 1;
			destSlot.locate = 0;
			H.user.mapExchangeBox[dstSlotId] = destSlot;
			H.user.clearSlot(srcSlotId, srcLocate);
		} else { // moveToStoreBox
			var slot = H.user.mapExchangeBox[srcSlotId];
			var destSlot = {};
			destSlot.slot = dstSlotId;
			destSlot.status = slot.status;
			destSlot.id = slot.id;
			destSlot.type = slot.type;
			destSlot.st = slot.st;
			destSlot.locate = 1;
			H.user.mapCofferBox[dstSlotId] = destSlot;
			H.user.clearSlot(srcSlotId, srcLocate);
		}
	},
	clearSlot: function(slotId, slotType, type) {
		if (typeof type == 'undefined') {
			type = 1;
		}
		var t;
		if (slotType == 0) t = H.user.mapExchangeBox[slotId];
		else t = H.user.mapCofferBox[slotId];
		t.id = 0;
	},
	clearStoveSlot: function(slotId) {
		var t = H.user.mapStoveBox[slotId];
		t.id = 0;
	},
	getSlotIdByCardId: function(cardId, slotType) {
		var t;
		if (slotType == 0) t = H.user.mapExchangeBox;
		else t = H.user.mapCofferBox;
		for (var index in t) {
			if (t[index].id == cardId) return t[index].slot;
		}
		return -1;
	},
	getUin: function() {
		return H.user.oMyData.uin;
	},
	getRedVip: function() {
		return H.user.oMyData.redvip;
	},
	getYearVip: function() {
		return H.user.oMyData.yearvip;
	}
};
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
		//save_link.download = H.extension_base_url + 'images/qq/' + filename;
		// save_link.download = 'file:///D:/home/' + filename;

		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
		webkitURL.revokeObjectURL(url);
	}
};
H.ui = {
	getThemeMiniLogo: function(themeId) {
		var theme = CARD.data.mapTheme[themeId];
		if (!theme) return '<img/>';
		return '<img src="' + H.extension_base_url + 'images/theme/' + themeId + '_logo" title="' + theme[1] + '"/>';
	},
	getThemeBigLogo: function(themeId) {
		var theme = CARD.data.mapTheme[themeId];
		if (!theme) return '<img/>';
		return '<img src="' + H.extension_base_url + 'images/theme/' + themeId + '_big_logo" title="' + theme[1] + '"/>';
	},
	getCardMiniImg: function(cardId) {
		var card = CARD.data.mapCard[cardId];
		if (!card) return '<img/>';
		return '<img title="' + card[2].escHtml() + '" src="' + H.extension_base_url + 'images/card/' + card[0] + '_56" />';
	},
	getCardBigImg: function(cardId) {
		var card = CARD.data.mapCard[cardId];
		if (!card) return '<img/>';
		return '<img title="' + card[2].escHtml() + '" src="' + H.extension_base_url + 'images/card/' + card[0] + '" />';
	},
	getCardBigImgSrc: function(cardId) {
		return H.extension_base_url + 'images/card/' + cardId;
	},
	getThemeImgSrc: function(themeId) {
		return H.extension_base_url + 'images/theme/' + themeId;
	},
	getImgItemWithBg: function(cardId) {
		var card = CARD.data.mapCard[cardId];
		if (!card) return '';
		var html = '';
		html += '<img class="position_absolute theme" src="' + H.extension_base_url + 'images/theme/' + card[1] + '" />';
		html += '<img class="position_absolute card" title="' + card[2] + '" src="' + H.extension_base_url + 'images/card/' + card[0] + '"/>';
		html += '<span class="position_absolute name" style="color:' + H.ui.getThemeFontColor(card[1]) + ';"><strong>' + card[2] + '</strong></span>';
		html += '<span class="position_absolute meny" style="color:' + H.ui.getThemeFontColor(card[1]) + ';"><font style="padding-right:9px;">' + card[3] + '</font></span>';
		html += '<span class="position_absolute mask"></span>';
		html += '<span class="position_absolute checked"></span>';
		return html;
	},
	showBox: function(arg) {
		slotArr = [];
		for (var index in arg.box) {
			if (arg.box[index].id > 0) {
				slotArr.push(arg.box[index]);
			}
		}
		slotArr.sort(H.sortCardFunc);
		var html = '';
		html += '<ul class="overflow_auto">';
		for (var i = 0; i < slotArr.length; i++) {
			var slot = slotArr[i];
			if (slot.id > 0) {
				if (arg.onClick) {
					var canOnClick = arg.canOnClick(slot.slot, slot.locate);
				}
				html += '<li id=' + slot.slot;
				if (arg.buttons && arg.buttons.length > 0) {
					html += ' onmouseover="javascript:H.ui.mouseOverSlotItem(this)" onmouseout="javascript:H.ui.mouseOutSlotItem(this)"';
				}
				if (arg.onClick) {
					if (canOnClick) {
						html += ' onclick="javascript:' + arg.onClick + '(this, ' + slot.slot + ', ' + slot.locate + ');"';
					}
				}
				html += ' class="float_left card_big text_align_center';
				if (arg.onClick) {
					if (!canOnClick) {
						html += ' not_click';
					}
				}
				html += '">';
				html += '<div class="card_big_img">';
				// html += H.ui.getImgItemWithBg(slot.id);
				var card = CARD.data.mapCard[slot.id];
				html += '<img class="position_absolute theme" src="' + H.extension_base_url + 'images/theme/' + card[1] + '" />';
				html += '<img class="position_absolute card" title="' + card[2] + '" src="' + H.extension_base_url + 'images/card/' + card[0] + '"/>';
				html += '<span class="position_absolute name" style="color:' + H.ui.getThemeFontColor(card[1]) + ';"><strong>' + card[2] + '</strong></span>';
				html += '<span class="position_absolute meny" style="color:' + H.ui.getThemeFontColor(card[1]) + ';"><font style="padding-right:9px;">' + card[3] + '</font></span>';
				html += '<span class="position_absolute mask"></span>';
				html += '<span class="position_absolute checked"></span>';
				var now = parseInt(new Date().getTime() / 1000);
				if (now < slot.unlock) {
					html += '<span class="position_absolute lock"></span>';
				}
				html += '<span class="position_absolute buttons" style="display:none;">';
				if (arg.buttons && arg.buttons.length > 0) {
					for (var j = 0; j < arg.buttons.length; j++) {
						var button = arg.buttons[j];
						html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:' + button.click + '(' + slot.slot + ',' + slot.locate + ');"><span class="ui-button-text">' + button.text + '</span></button>';
					};
				}
				html += '</span>';
				html += '</div>';
				html += '</li>';
			}
		}
		html += '</ul>';
		return html;
	},
	mouseOverSlotItem: function(doc) {
		jQuery(doc).find(".buttons").show();
		jQuery(doc).addClass("need_mask");
	},
	mouseOutSlotItem: function(doc) {
		jQuery(doc).find(".buttons").hide();
		jQuery(doc).removeClass("need_mask");
	},
	getThemeFontColor: function(themeId) {
		var theme = CARD.data.mapTheme[themeId];
		if (!theme)
			return '#000';
		return theme[8] == 0 ? '#000' : ('#' + theme[8].toString(16));
	},
	waitStart: function(options) {
		var dialog = jQuery('#wait_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="wait_dialog"></div>');
			dialog.html('<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;background-color:#000;opacity:0.7;"></div><div style="position:fixed;top:50%;left:50%;width:55px;margin-left:-22px;z-index:10001;"><canvas id="wait_dialog_wait_effect" width="54" height="54">您的浏览器不支持html5哟</canvas><br /><span style="color:#fff;">加载中...</span></div>');
			jQuery('body').append(dialog);
		}
		var obj = {};
		if (options) {
			obj.radius = options.radius || 25;
			obj.circleLineWidth = options.circleLineWidth || 4;
			obj.circleColor = options.circleColor || 'lightgray';
			obj.moveArcColor = options.moveArcColor || 'gray';
		} else {
			obj.radius = 25;
			obj.circleLineWidth = 4;
			obj.circleColor = 'lightgray';
			obj.moveArcColor = 'gray';
		}
		var canvas = jQuery('#wait_dialog_wait_effect')[0];
		if (!canvas.getContext) return;
		if (canvas.__loading) {
			jQuery('#wait_dialog').show();
			return;
		}
		canvas.__loading = true;
		var ctx = canvas.getContext('2d');
		var radius = obj.radius;
		var rotatorAngle = Math.PI * 0.5;
		var step = Math.PI / 6;
		canvas.loadingInterval = setInterval(function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var center = {
				x: canvas.width / 2,
				y: canvas.height / 2
			};
			ctx.beginPath();
			ctx.lineWidth = obj.circleLineWidth;
			ctx.strokeStyle = obj.circleColor;
			ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath(); //在圆圈上面画小圆
			ctx.strokeStyle = obj.moveArcColor;
			ctx.arc(center.x, center.y, radius, rotatorAngle, rotatorAngle + Math.PI * .25);
			ctx.stroke();
			rotatorAngle += step;
		}, 50);
		jQuery('#wait_dialog').show();
	},
	waitEnd: function() {
		var canvas = jQuery('#wait_dialog_wait_effect')[0];
		if (!canvas.__loading) {
			jQuery('#wait_dialog').hide();
			return;
		}
		canvas.__loading = false;
		if (canvas.loadingInterval) {
			window.clearInterval(canvas.loadingInterval);
		}
		var ctx = canvas.getContext('2d');
		if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
		jQuery('#wait_dialog').hide();
	},
	showErrDlg: function(arg) {
		var dialog = jQuery('#error_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="error_dialog"></div>');
		} else {
			dialog.empty();
		}
		dialog.append('<p>' + arg.msg + '</p>');
		var buttons = {};
		if (arg.button_title) {
			buttons[arg.button_title] = function() {
				dialog.dialog("close");
				arg.button_func();
			};
		}
		buttons["关闭"] = function() {
			dialog.dialog("close");
		};
		dialog.dialog({
			title: arg.title,
			height: arg.height || 200,
			width: arg.width || 400,
			modal: true,
			buttons: buttons,
			dialogClass: "dialogClass"
		});
		dialog.dialog("moveToTop");
	},
	removeErrDlg: function() {
		var dialog = jQuery('#error_dialog');
		dialog.dialog("destroy");
	},
	showSelectTheme: function(arg) {
		arg.FlashNum = 0;
		arg.NorNum = 0;
		arg.JbNum = 0;
		arg.FlashTotal = 0;
		arg.NorTotal = 0;
		arg.JbTotal = 0;
		for (var themeId in CARD.data.mapTheme) {
			if (H.checkFlashCard(themeId)) {
				arg.FlashTotal++;
			} else if (H.checkJbCard(themeId)) {
				arg.JbTotal++;
			} else {
				arg.NorTotal++;
			}
		}
		if (H.user.bGotCollection) {
			H.ui.showSelectThemeDetail(arg);
		} else {
			H.ui.waitStart();
			H.user.loadMyColletion(function() {
				H.ui.showSelectThemeDetail(arg);
				H.ui.waitEnd();
			})
		}
	},
	showSelectThemeDetail: function(arg) {
		arg.handleTheme = arg.handleTheme || function() {
			return alert("需要设置选择主题后的回调");
		};
		arg.type = arg.type || 0;
		H.ui.handleTheme = function(themeid) {
			H.ui.hideSelectTheme();
			arg.handleTheme(themeid);
		};
		var dialog = jQuery('#choose_theme_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="choose_theme_dialog"></div>');
		}

		for (var themeId in H.user.mapCollection) {
			if (H.checkFlashCard(themeId)) {
				arg.FlashNum++;
			} else if (H.checkJbCard(themeId)) {
				arg.JbNum++;
			} else {
				arg.NorNum++;
			}
		}

		var tempArr = [
			[
				[],
				[],
				[],
				[],
				[]
			],
			[
				[],
				[],
				[],
				[],
				[]
			],
			[
				[],
				[],
				[],
				[],
				[]
			]
		];
		for (var themeId in CARD.data.mapTheme) {
			var theme = CARD.data.mapTheme[themeId];
			if (themeId == H.props.PROPS_THEME_ID) {
				continue;
			}
			var index = 0;
			if (H.checkJbCard(themeId) != 1) {
				index = 0;
			} else if (H.checkJbCard(themeId) && !H.checkFlashCard(themeId)) {
				index = 1;
			} else if (H.checkFlashCard(themeId)) {
				index = 2;
			}
			tempArr[index][theme[2] - 1].push(theme);
		}

		var html = '';
		html += '<div id="choose_theme_dialog_tabs" class="overflow_auto">';
		html += '    <ul>';
		html += '        <li><a href="#choose_theme_dialog_tabs-0" class="tab2"><span class="tab2_bg">发行套卡' + arg.NorNum + '/' + arg.NorTotal + '</span></a></li>';
		html += '        <li><a href="#choose_theme_dialog_tabs-1" class="tab2_sel"><span class="tab2_bg_sel">绝版套卡' + arg.JbNum + '/' + (arg.JbTotal - 1) + '</span></a></li>';
		html += '        <li><a href="#choose_theme_dialog_tabs-2" class="tab2_sel"><span class="tab2_bg_sel">闪卡' + arg.FlashNum + '/' + arg.FlashTotal + '</span></a></li>';
		html += '    </ul>';
		for (var i = 0; i < tempArr.length; i++) {
			html += '    <div id="choose_theme_dialog_tabs-' + i + '">';
			html += '        <div class="choose_theme_dialog_tabs_content">';
			for (var j = 0; j < tempArr[i].length; j++) {
				html += '            <h3 class="theme_choose"><span>难度系数</span><strong class="rank"><span class="card_lv' + (j + 1) + '"></span></strong></h3>';
				html += '            <ul class="overflow_auto">';

				function sortFunc(a, b) {
					return b[0] - a[0];
				}
				tempArr[i][j].sort(sortFunc);
				for (var k = 0; k < tempArr[i][j].length; k++) {
					var theme = tempArr[i][j][k];
					html += '                <li onclick="javascript:H.ui.handleTheme(' + theme[0] + ')" class="float_left text_align_center width_23';
					var num = 0;
					if (H.user.mapCollection[theme[0]] && H.user.mapCollection[theme[0]].num) {
						num = H.user.mapCollection[theme[0]].num;
					}
					if (num > 0) {
						html += ' collected';
					}
					html += '" style="margin: 2px 1%; cursor: pointer;">';
					html += '<span>' + theme[1] + '</span>';
					if (num > 0) {
						html += '(' + num + ')';
					}
					html += '                </li>';
				}
				html += '            </ul>';
			}
			html += '        </div>';
			html += '    </div>';
		}
		dialog.html(html);
		dialog.dialog({
			minWidth: 500,
			modal: true,
			title: "请选择",
			dialogClass: "dialogClass"
		});
		jQuery("#choose_theme_dialog #choose_theme_dialog_tabs").tabs({
			active: 0
		});
	},
	hideSelectTheme: function() {
		if (jQuery('#choose_theme_dialog').length > 0) {
			jQuery('#choose_theme_dialog').dialog("close");
		}
	}
};

H.notification = {
	getUnlockTimes: function() {
		function sortAsc(a, b) {
			return a - b;
		}
		var stoves = H.user.mapStoveBox;
		var unlockTimes = [0, 0];
		var arr = [];
		for (index in stoves) {
			var stove = stoves[index];
			var millsecend = parseInt(stove.btime) * 1000 + parseInt(stove.locktime) * 1000 - new Date().getTime();
			if (millsecend > 0) {
				arr[arr.length] = millsecend;
			}
		}
		arr.sort(sortAsc)
		if (arr.length > 0) {
			unlockTimes[0] = arr[0];
			if (arr[1] && arr[1] > 0) {
				unlockTimes[1] = arr[1];
			}
		};
		var customEvent = document.createEvent('Event');
		customEvent.initEvent('myCustomEvent', true, true);

		function fireCustomEvent(data) {
			hiddenDiv = document.getElementById("eventDiv");
			var html = '<a href="javascript:void(1);" onclick="H.notification.getUnlockTimes();" class="exit">' + data + '</a>';
			hiddenDiv.innerHTML = html;
			hiddenDiv.dispatchEvent(customEvent);
		}
		fireCustomEvent(unlockTimes.join('|').escNone());
	}
};