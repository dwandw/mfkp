require.config({
	paths: {
		"HUi": "page2/ui",
		"HNotification": "page2/notification"
	}
});
define(['HBase', 'HUi', 'HNotification'], function(HBase, HUi, HNotification) {
	var oMyData = {};
	var mapExchangeBox = {};
	var mapCofferBox = {};
	var mapStoveBox = {};
	var mapCollection = {};
	var hasGotCollection = false;
	return {
		getOMyData: function() {
			return oMyData;
		},
		getMapExchangeBox: function() {
			return mapExchangeBox;
		},
		getMapCofferBox: function() {
			return mapCofferBox;
		},
		getMapStoveBox: function() {
			return mapStoveBox;
		},
		getMapCollection: function() {
			return mapCollection;
		},
		getHasGotCollection: function() {
			return hasGotCollection;
		},
		load: function(fnSucceed) {
			function fnSucc(oXml) {
				HUi.waitEnd();
				qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
				code = qqhome.getAttribute("code") * 1;
				if (code != 0) {
					fnError(code);
					console.error(HBase.resChinese(oXml.text));
					return;
				}
				hello = qqhome.getElementsByTagName("hello")[0];
				time = hello.getAttribute("time");

				user = qqhome.getElementsByTagName("user")[0];
				oMyData.nick = user.getAttribute("nick");
				oMyData.uin = user.getAttribute("uin") * 1;
				oMyData.money = user.getAttribute("money") * 1;
				oMyData.sex = user.getAttribute("sex") * 1;
				oMyData.exp = user.getAttribute("exp") * 1;
				oMyData.regti = user.getAttribute("regti") * 1;
				oMyData.lastloginti = user.getAttribute("lastloginti") * 1;
				oMyData.randchance = user.getAttribute("randchance") * 1;
				oMyData.lastrandti = user.getAttribute("lastrandti") * 1;
				oMyData.missionid = user.getAttribute("missionid") * 1;
				oMyData.missionstep = user.getAttribute("missionstep") * 1;
				oMyData.missionflag = user.getAttribute("missionflag") * 1;
				oMyData.lastgetmoneyti = user.getAttribute("lastgetmoneyti") * 1;
				oMyData.lv = user.getAttribute("lv") * 1;
				oMyData.lvupbonus = user.getAttribute("lvupbonus") * 1;
				oMyData.redvip = user.getAttribute("redvip") * 1;
				oMyData.missionv3 = user.getAttribute("missionv3") * 1;
				oMyData.hasmsg = user.getAttribute("hasmsg") * 1;
				oMyData.mana = user.getAttribute("mana") * 1;
				oMyData.redlv = user.getAttribute("redlv") * 1;
				oMyData.yearvip = user.getAttribute("yearvip") * 1;
				oMyData.elfname = user.getAttribute("elfname");

				changebox = qqhome.getElementsByTagName("changebox")[0];
				oMyData.exchangebox_cur = changebox.getAttribute("cur") * 1;
				oMyData.exchangebox_vipnum = changebox.getAttribute("vipnum") * 1;
				oMyData.exchangebox_max = changebox.getAttribute("max") * 1;
				exchArr = changebox.getAttribute("exch").split(",");
				oMyData.exchangebox_exch = [];
				for (var i = 0; i < exchArr.length; i++) {
					if (exchArr[i] * 1 > 0) {
						oMyData.exchangebox_exch.push(exchArr[i] * 1);
					}
				};
				changeboxcards = changebox.getElementsByTagName("card");
				mapExchangeBox = {};
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
					if (slot.id > 0) mapExchangeBox[slotId] = slot;
				}

				storebox = qqhome.getElementsByTagName("storebox")[0];
				oMyData.cofferbox_cur = storebox.getAttribute("cur") * 1;
				oMyData.cofferbox_max = storebox.getAttribute("max") * 1;
				oMyData.cofferbox_nor = storebox.getAttribute("nor") * 1;
				storeboxcards = storebox.getElementsByTagName("card");
				mapCofferBox = {};
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
					if (slot.id > 0) mapCofferBox[slotId] = slot;
				}

				stovebox = qqhome.getElementsByTagName("stovebox")[0];
				oMyData.stovebox_cur = stovebox.getAttribute("cur") * 1;
				oMyData.stovebox_max = stovebox.getAttribute("max") * 1;
				oMyData.stovebox_stovenum = stovebox.getAttribute("stovenum") * 1;
				stoveboxcards = stovebox.getElementsByTagName("card");
				mapStoveBox = {};
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
					mapStoveBox[slotId] = slot;
				}
				info = qqhome.getElementsByTagName("info")[0];
				runeback = info.getElementsByTagName("runeback")[0];
				oMyData.runeback_id = runeback.getAttribute("id") * 1;
				oMyData.runeback_expire = runeback.getAttribute("expire") * 1;
				stoves = info.getElementsByTagName("stove");
				mapStove = {};
				for (var i = 0; i < stoves.length; i++) {
					var stove = stoves[i];
					var id = stove.getAttribute("id") * 1;
					var endTime = stove.getAttribute("endtime") * 1;
					var level = stove.getAttribute("lv") * 1;
					var _map = {};
					_map.id = id;
					_map.endTime = endTime;
					_map.level = level;
					mapStove[id] = _map;
				}
				HNotification.getUnlockTimes(mapStoveBox);
				if (fnSucceed) fnSucceed();
			}

			function fnError(iCode) {
				HUi.waitEnd();
				HUi.showErrDlg({
					title: '加载失败',
					msg: HBase.getMsgByCode(iCode)
				});
				return;
			}

			HUi.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_mainpage?g_tk=' + HBase.hash(CARD.getCookie("skey"));
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		},
		loadMyColletion: function(fnSucceed) {
			function fnSucc(oXML) {
				var oElem = oXML.xmlDom.getElementsByTagName("QQHOME")[0];
				var iCode = parseInt(oElem.getAttribute("code"));
				if (iCode != 0) {
					console.error(HBase.resChinese(oXml.text));
					fnFail(iCode);
					return;
				}
				hasGotCollection = true;
				mapCollection = {};
				var themeArr = oXML.xmlDom.getElementsByTagName("Node");
				for (var i = 0, len = themeArr.length; i < len; i++) {
					var themeId = parseInt(themeArr[i].getAttribute("theme_id"));
					var completeTime = parseInt(themeArr[i].getAttribute("completetime"));
					var giftId = parseInt(themeArr[i].getAttribute("gift"));

					if (mapCollection[themeId] == undefined) {
						mapCollection[themeId] = {};
					}
					if (mapCollection[themeId].num == undefined) {
						mapCollection[themeId].num = 1;
					} else {
						mapCollection[themeId].num += 1;
					}

					function completeTimeSort(a, b) {
						return (b[1] - a[1]); //按最新集齐时间排序
					}
					if (mapCollection[themeId].gifts == undefined) {
						mapCollection[themeId].gifts = [];
						mapCollection[themeId].gifts.push([giftId, completeTime]);
					} else {
						mapCollection[themeId].gifts.push([giftId, completeTime]);
						mapCollection[themeId].gifts.sort(completeTimeSort);
					}
				}
				if (fnSucceed) fnSucceed();
			}

			function fnFail(iCode) {
				HUi.showErrDlg({
					title: '集齐卡片失败',
					msg: HBase.getMsgByCode(iCode)
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
				box = mapExchangeBox;
				cur = oMyData.exchangebox_cur;
			} else {
				box = mapCofferBox;
				cur = oMyData.cofferbox_cur;
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
				box = mapExchangeBox;
			} else {
				box = mapCofferBox;
			}
			for (var index in box) {
				if (box[index].id < 1) continue;
				num++;
			}
			return num;
		},
		exchangeStorage: function(srcLocate, srcSlotId, dstSlotId) {
			if (srcLocate == 1) { // moveToChangeBox
				var slot = mapCofferBox[srcSlotId];
				var destSlot = {};
				destSlot.slot = dstSlotId;
				destSlot.status = slot.status;
				destSlot.id = slot.id;
				destSlot.type = slot.type;
				destSlot.st = slot.st;
				destSlot.unlock = 1;
				destSlot.locate = 0;
				mapExchangeBox[dstSlotId] = destSlot;
				clearSlot(srcSlotId, srcLocate);
			} else { // moveToStoreBox
				var slot = mapExchangeBox[srcSlotId];
				var destSlot = {};
				destSlot.slot = dstSlotId;
				destSlot.status = slot.status;
				destSlot.id = slot.id;
				destSlot.type = slot.type;
				destSlot.st = slot.st;
				destSlot.locate = 1;
				mapCofferBox[dstSlotId] = destSlot;
				clearSlot(srcSlotId, srcLocate);
			}
		},
		clearSlot: function(slotId, slotType, type) {
			if (typeof type == 'undefined') {
				type = 1;
			}
			var t;
			if (slotType == 0) t = mapExchangeBox[slotId];
			else t = mapCofferBox[slotId];
			t.id = 0;
		},
		clearStoveSlot: function(slotId) {
			var t = mapStoveBox[slotId];
			t.id = 0;
		},
		getSlotIdByCardId: function(cardId, slotType) {
			var t;
			if (slotType == 0) t = mapExchangeBox;
			else t = mapCofferBox;
			for (var index in t) {
				if (t[index].id == cardId) return t[index].slot;
			}
			return -1;
		},
		getUin: function() {
			return oMyData.uin;
		},
		getRedVip: function() {
			return oMyData.redvip;
		},
		getYearVip: function() {
			return oMyData.yearvip;
		}
	};
});