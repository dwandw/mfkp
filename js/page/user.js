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
			if (code != 0) {
				fnError(code);
				console.error(H.resChinese(oXml.text));
				return;
			}
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
	getNick: function() {
		return H.user.oMyData.nick;
	},
	getRedVip: function() {
		return H.user.oMyData.redvip;
	},
	getYearVip: function() {
		return H.user.oMyData.yearvip;
	}
};