H.box = {
	_timer_handle: "",
	init: function(reload) {
		if (reload) {
			H.user.load(function() {
				H.box.init();
			});
			return;
		};
	},
	showBox: function() {
		this.init();
		this.showRandomChance();
		this.showChangeBox();
		this.showStoreBox();
	},
	showChangeBox: function() {
		var div = jQuery("#exchange");
		if (div.children().length > 0) {
			div.empty();
		}
		div.append('<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all ui-state-hover"><span>我的换卡箱(' + H.user.getCardNum(0) + '/' + H.user.oMyData.exchangebox_cur + ')</span></h3>');
		var html = '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">';
		html += H.ui.showBox({
			box: H.user.mapExchangeBox,
			buttons: [{
				text: "放入保险箱",
				click: "H.box.moveCard"
			}, {
				text: "出售卡片",
				click: "H.box.showSellCard"
			}]
		});
		html += '</div>';
		div.append(html);
	},
	showStoreBox: function() {
		var div = jQuery("#coffer");
		if (div.children().length > 0) {
			div.empty();
		}
		div.append('<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all ui-state-hover"><span>我的保险箱(' + H.user.getCardNum(1) + '/' + H.user.oMyData.cofferbox_cur + ')</span></h3>');
		var html = '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">';
		html += H.ui.showBox({
			box: H.user.mapCofferBox,
			buttons: [{
				text: "放入换卡箱",
				click: "H.box.moveCard"
			}, {
				text: "出售卡片",
				click: "H.box.sellCardInStoreBox"
			}]
		});
		html += '</div>';
		div.append(html);
	},
	showRandomChance: function() {
		function refreshRemainTime(div) {
			clearTimeout(H.box._timer_handle);
			div.empty();
			var remain = 30 * 60 - (parseInt(new Date().getTime() / 1000) - H.user.oMyData.lastrandti)
			if (remain > 0) {
				var m = Math.floor(remain / 60);
				var s = remain % 60;
				div.append('还差' + m + '分钟' + s + '秒');
				H.box._timer_handle = setTimeout(function() {
					refreshRemainTime(div);
				}, 1000);
			} else {
				H.user.oMyData.randchance++;
				H.box.showRandomChance();
			}
		}

		var optionHtml = jQuery(".option");
		if (optionHtml.find("button").length == 0) {
			optionHtml.append('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.box.getRandomAllAndSell();" title="一键抽售"><span class="ui-button-text">一键抽售</span></button>');
			optionHtml.append('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.box.getRandomAll(true);" title="一键抽取"><span class="ui-button-text">一键抽取</span></button>');
			optionHtml.append('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.box.getRandom();" title="随机抽取"><span class="ui-button-text">随机抽取</span></button>');
			optionHtml.append('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.box.clearChangeBox();" title="一键清理"><span class="ui-button-text">一键清理</span></button>');
			optionHtml.append('<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="一键清空"><span class="ui-button-text">一键清空</span></button>');
		}
		var div = jQuery("#random");
		if (div.children().length > 0) {
			div.empty();
		}
		var n = H.user.oMyData.randchance || 0;
		if (n > 0) {
			div.append('可抽取卡片<strong class="important">' + n + '</strong>张');
		} else {
			refreshRemainTime(div);
		}
	},
	showSellCard: function(slotId) {
		var slot = H.user.mapExchangeBox[slotId];
		var c = CARD.data.mapCard[slot.id];
		if (c[3] <= 10) {
			this.sell(slotId);
			return;
		}

		var arg = {};
		arg.title = "出售";
		arg.msg = '确定以' + c[3] + '金币的价格出售这张卡片吗？<div class="card_big_img">' + H.ui.getImgItemWithBg(slot.id) + '</div>';
		arg.height = 260;
		arg.button_title = "确定";
		arg.button_func = function() {
			H.box.sell(slotId);
		};
		H.ui.showErrDlg(arg);
		return;
	},
	clearChangeBox: function(fnSucceed) {
		var slotId = -1;
		for (var index in H.user.mapExchangeBox) {
			var slot = H.user.mapExchangeBox[index];
			if (slot.id > 0 && CARD.data.mapCard[slot.id][3] == 10) {
				slotId = index;
				break;
			}
		}
		if (slotId < 0) {
			if (fnSucceed) fnSucceed();
			return;
		}
		setTimeout(H.box.sell(slotId, function() {
			H.box.clearChangeBox(fnSucceed);
		}), 1000);
	},
	getRandomAllAndSell: function() {
		this.getRandomAll(false, function() {
			H.box.clearChangeBox(function() {
				false, H.box.getRandomAllAndSell();
			});
		});
	},
	sellCardInStoreBox: function(slotId) {
		var cardId = H.user.mapCofferBox[slotId].id;
		var c = CARD.data.mapCard[cardId];
		if (c[3] <= 10) {
			this.moveCard(slotId, 1, function() {
				var slotId = H.user.getSlotIdByCardId(cardId, 0);
				H.box.sell(slotId);
			});
			return;
		}

		var arg = {};
		arg.title = "出售";
		arg.msg = '确定以' + c[3] + '金币的价格出售这张卡片吗？<div class="card_big_img">' + H.ui.getImgItemWithBg(cardId) + '</div>';
		arg.height = 260;
		arg.button_title = "确定";
		arg.button_func = function() {
			H.box.moveCard(slotId, 1, function() {
				var slotId = H.user.getSlotIdByCardId(cardId, 0);
				H.box.sell(slotId);
			});
		};
		H.ui.showErrDlg(arg);
		return;
	},
	moveCard: function(srcSlotId, srcSlotType, fnSucceed) {
		var dstSlotId = H.user.getEmptySlot(srcSlotType == 0 ? 1 : 0);
		if (dstSlotId < 0) {
			var msg = '';
			if (srcSlotType == 0) {
				msg = '尊敬的魔法师，您的保险箱已满，不能再放入新卡片。';
			} else {
				msg = '尊敬的魔法师，您的换卡箱已满，不能再放入新卡片。';
			}
			H.ui.showErrDlg({
				title: '放置失败',
				msg: msg,
				height: 200
			});
			return;
		}

		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			var iEndTime = obj.getAttribute("endTime") || 0;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode, obj.getAttribute("message"), iEndTime);
				return;
			}
			H.user.exchangeStorage(srcSlotType, srcSlotId, dstSlotId);
			H.box.showChangeBox();
			H.box.showStoreBox();
			if (fnSucceed) fnSucceed();
		}

		function callback_onOk(iVeryCode) {
			H.ui.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_storage_exchange?uin=' + H.user.getUin() + '&type=' + srcSlotType + '&src=' + srcSlotId + '&dest=' + dstSlotId + '&code=' + iVeryCode;
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		}

		function fnError(iCode, sMsg, iEndTime) {
			H.ui.waitEnd();
			// if (0 == CARD.handleVerifyPage(iCode, document.body, {
			// 	mask: true,
			// 	onOK: callback_onOk,
			// 	onClose: function() {}
			// }, iEndTime)) {
			// 	return;
			// }
			if (iCode == -1001) {
				try {
					if (!CARD.checkLogin()) {
						//closeDialog();
						CARD.showLogin();
					}
				} catch (e) {}
				return;
			} else if (iCode == -32002) {
				H.ui.showErrDlg({
					title: '放置失败',
					msg: sMsg,
					refresh: true
				});
				return;
			} else {
				H.ui.showErrDlg({
					title: '放置失败',
					msg: sMsg
				});
				return;
			}
		}
		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_storage_exchange?uin=' + H.user.getUin() + '&type=' + srcSlotType + '&src=' + srcSlotId + '&dest=' + dstSlotId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	sell: function(slotId, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			var iEndTime = obj.getAttribute("endTime") || 0;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode, obj.getAttribute("message"), iEndTime);
				return;
			}
			var money = parseInt(obj.getAttribute("money"));
			H.user.clearSlot(slotId, 0);
			H.user.oMyData.money = money;
			H.box.showChangeBox();
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode, sMsg) {
			H.ui.waitEnd();
			if (iCode == -1001) {
				try {
					if (!CARD.checkLogin()) {
						//closeDialog();
						CARD.showLogin();
					}
				} catch (e) {}
				return;
			} else {
				var refresh = false;
				if (iCode == -32002 || iCode == -32001) {
					refresh = true;
				}
				H.ui.showErrDlg({
					title: "出售失败",
					msg: sMsg,
					refresh: refresh
				});
				return;
			}
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_market_npc_sell?uin=' + H.user.getUin() + '&slot_no=' + slotId + '&type='+H.user.mapExchangeBox[slotId].type+'&cardid=' + H.user.mapExchangeBox[slotId].id;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	getRandom: function(fnSucceed) {
		var slotId = H.user.getEmptySlot(0);
		if (slotId < 0 || H.user.oMyData.randchance <= 0) {
			var msg = '';
			if (slotId < 0) {
				msg = '您的换卡箱已满，不能再抽取卡片，请先整理换卡箱。';
			} else if (H.user.oMyData.randchance <= 0) {
				msg = '您没有抽取机会了';
			}
			H.ui.showErrDlg({
				title: '抽取失败',
				msg: msg
			});
			return;
		}

		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			var iEndTime = obj.getAttribute("endTime") || 0;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode, obj.getAttribute("message"), iEndTime);
				return;
			}

			var lastrandti = obj.getAttribute("lastrandti") * 1;
			var card = obj.getElementsByTagName("card")[0];
			var now = parseInt(new Date().getTime() / 1000);
			var slot = {};
			slotId = card.getAttribute("slot") * 1;
			slot.slot = slotId;
			slot.status = card.getAttribute("status") * 1;
			slot.unlock = now + 300;
			slot.id = card.getAttribute("id") * 1;
			slot.type = card.getAttribute("type") * 1;
			slot.st = 0 * 1;
			slot.locate = 0;
			if (slot.id > 0) H.user.mapExchangeBox[slotId] = slot;
			H.user.oMyData.randchance -= 1;
			H.user.oMyData.lastrandti = lastrandti;
			H.box.showRandomChance();
			H.box.showChangeBox();
			if (fnSucceed) fnSucceed();
		}

		function callback_onOk(iVeryCode) {
			H.ui.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_random_get?type=1&iSlotNo=' + slotId + '&code=' + iVeryCode;
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		}

		function fnError(iCode, sMsg, iEndTime) {
			H.ui.waitEnd();
			if (0 == CARD.handleVerifyPage(iCode, document.body, {
				mask: true,
				onOK: callback_onOk,
				onClose: function() {}
			}, iEndTime)) {
				return;
			}
			if (iCode == -1001) {
				try {
					if (!CARD.checkLogin()) {
						//closeDialog();
						CARD.showLogin();
					}
				} catch (e) {}
				return;
			} else {
				var refresh = false;
				if (iCode == -33004) {
					refresh = true;
				}
				H.ui.showErrDlg({
					title: '抽卡失败',
					msg: sMsg,
					refresh: refresh
				});
				return;
			}
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_random_get?type=1&iSlotNo=' + slotId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	getRandomAll: function(showErr, fnSucceed) {
		var slotId = H.user.getEmptySlot(0);
		if (slotId < 0 || H.user.oMyData.randchance <= 0) {
			var msg = '';
			if (slotId < 0) {
				msg = '您的换卡箱已满，不能再抽取卡片，请先整理换卡箱。';
			} else if (H.user.oMyData.randchance <= 0) {
				msg = '您没有抽取机会了';
			}
			if (showErr) {
				H.ui.showErrDlg({
					title: '抽取失败',
					msg: msg
				});
			}
			return;
		}

		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			var iEndTime = obj.getAttribute("endTime") || 0;
			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode, obj.getAttribute("message"), iEndTime);
				return;
			}

			var lastrandti = obj.getAttribute("lastrandti") * 1;
			var num = obj.getAttribute("num") * 1;
			var remain = obj.getAttribute("remain") * 1;
			var cards = obj.getElementsByTagName("card");
			var now = parseInt(new Date().getTime() / 1000);
			for (var i = 0; i < cards.length; i++) {
				card = cards[i];
				slot = {};
				slotId = card.getAttribute("slot") * 1;
				slot.slot = slotId;
				slot.id = card.getAttribute("id") * 1;
				slot.type = card.getAttribute("type") * 1;
				slot.status = card.getAttribute("status") * 1;
				slot.unlock = now + 300;
				slot.st = 0 * 1;
				slot.locate = 0;
				if (slot.id > 0) H.user.mapExchangeBox[slotId] = slot;
			}

			H.user.oMyData.randchance = remain;
			H.user.oMyData.lastrandti = lastrandti;
			H.box.showRandomChance();
			H.box.showChangeBox();
			if (fnSucceed) fnSucceed();
		}

		function callback_onOk(iVeryCode) {
			H.ui.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_random_get?type=2&code=' + iVeryCode;
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		}

		function fnError(iCode, sMsg, iEndTime) {
			H.ui.waitEnd();
			if (0 == CARD.handleVerifyPage(iCode, document.body, {
				mask: true,
				onOK: callback_onOk,
				onClose: function() {}
			}, iEndTime)) {
				return;
			}
			if (iCode == -1001) {
				try {
					if (!CARD.checkLogin()) {
						//closeDialog();
						CARD.showLogin();
					}
				} catch (e) {}
				return;
			} else {
				var refresh = false;
				if (iCode == -33004) {
					refresh = true;
				}
				H.ui.showErrDlg({
					title: '抽卡失败',
					msg: sMsg
				});
				return;
			}
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_random_get?type=2';
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};