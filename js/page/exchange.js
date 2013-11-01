H.exchange = {
	oMyData: {},
	mySelectCards: [],
	taSelectCards: [],
	mapExchangeBox: {},
	mapCofferBox: {},
	mapStoveBox: {},
	mapStove: {},
	fUin: 0,
	index: 0,
	isCardFriends: 0,
	showBox: function(fUin, index, isCardFriends) {
		this.fUin = fUin;
		this.index = index;
		this.isCardFriends = isCardFriends;
		this.mySelectCards = [];
		this.taSelectCards = [];
		this.load(fUin, function() {
			H.exchange.show();
		});
		// H.exchange.show();
	},
	show: function() {
		var dialog = jQuery('#exchange_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="exchange_dialog"></div>');
		}
		var html = '';
		html += '<div class="half_box">';
		html += '    <div id="exchange_dialog_my_tabs">';
		html += '        <ul>';
		html += '            <li><a href="#exchange_dialog_my_tabs-1" onclick="javascript:H.exchange.showExchangeBox();">我的换卡箱(' + H.user.getCardNum(0) + '/' + H.user.oMyData.exchangebox_cur + ')</a></li>';
		html += '            <li><a href="#exchange_dialog_my_tabs-2" onclick="javascript:H.exchange.showCofferBox();">我的保险箱(' + H.user.getCardNum(1) + '/' + H.user.oMyData.cofferbox_cur + ')</a></li>';
		html += '        </ul>';
		html += '        <div id="exchange_dialog_my_tabs-1">';
		html += '            <div id="exchange_dialog_exchange_box" class="width_100"></div>';
		html += '        </div>';
		html += '        <div id="exchange_dialog_my_tabs-2">';
		html += '            <div id="exchange_dialog_coffer_box" class="width_100"></div>';
		html += '        </div>';
		html += '    </div>';
		html += '    <div id="exchange_dialog_my_box_text" class="width_100"></div>';
		html += '</div>';
		html += '<div class="half_box">';
		html += '    <div id="exchange_dialog_ta_tabs">';
		html += '        <ul>';
		html += '            <li><a href="#exchange_dialog_ta_tabs-1" onclick="javascript:H.exchange.showFriendExchangeBox();">TA的换卡箱</a></li>';
		html += '            <li><a href="#exchange_dialog_ta_tabs-2" onclick="javascript:H.exchange.showFriendCofferBox();">TA的保险箱</a></li>';
		html += '            好友[' + this.oMyData.nick + '('+this.oMyData.uin+')]想交换到的卡片：';
		for (var i = 0; i < this.oMyData.exchangebox_exch.length; i++) {
			html += CARD.data.mapTheme[this.oMyData.exchangebox_exch[i]][1] + (i == this.oMyData.exchangebox_exch.length - 1 ? '' : ',');
		};
		html += '        </ul>';
		html += '        <div id="exchange_dialog_ta_tabs-1">';
		html += '            <div id="exchange_dialog_ta_exchange_box" class="width_100"></div>';
		html += '        </div>';
		html += '        <div id="exchange_dialog_ta_tabs-2">';
		html += '            <div id="exchange_dialog_ta_coffer_box" class="width_100"></div>';
		html += '        </div>';
		html += '    </div>';
		html += '    <div id="exchange_dialog_ta_box_text" class="width_100"></div>';
		html += '</div>';
		html += '<div class="clear"></div>';
		html += '<div id="exchange_dialog_exchange_button" class="width_100 text_align_center" style="display:none;">';
		html += '    <a href="javascript:void(1);" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="H.exchange.goExchange();"><span class="ui-button-text">交换</span></a>';
		html += '</div>';
		dialog.html(html);
		dialog.dialog({
			minWidth: 1250,
			title: "交换卡片（" + (H.exchange.index + 1) + "）",
			dialogClass: "dialogClass",
			position: "top",
			buttons: [{
				text: "向前",
				click: function() {
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
			}, {
				text: "向后",
				click: function() {
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
			}, {
				text: "刷新",
				click: function() {
					H.exchange.showBox(H.exchange.fUin, H.exchange.index, H.exchange.isCardFriends);
				}
			}]
		});
		H.exchange.showMyBox();
		H.exchange.showFriendBox();
		jQuery('#exchange_dialog_my_tabs').tabs({
			active: 0
		});
		jQuery('#exchange_dialog_ta_tabs').tabs({
			active: 0
		});
	},
	showMyBox: function() {
		H.exchange.showExchangeBox();
		// H.exchange.showCofferBox();
	},
	showFriendBox: function() {
		H.exchange.showFriendExchangeBox();
		// H.exchange.showFriendCofferBox();
	},
	checkCanSelect: function(slotId, locate) {
		locate == locate || 0;
		var cardId = locate == 0 ?H.user.mapExchangeBox[slotId].id : H.user.mapCofferBox[slotId].id;
		// data.mapTheme[12] type
		if (CARD.data.mapTheme[CARD.data.mapCard[cardId][1]][12] == 2 || (CARD.data.mapTheme[CARD.data.mapCard[cardId][1]][12] == 5 && CARD.data.mapCard[cardId][1] != 111)) {
			return true;
		}
		if (this.oMyData.exchangebox_exch.length == 0) return true;
		else {
			for (var j = 0; j < this.oMyData.exchangebox_exch.length; j++) {
				if (CARD.data.mapCard[cardId][1] == this.oMyData.exchangebox_exch[j]) {
					return true;
				}
				if (CARD.data.mapCard[cardId][3] > 30 && !CARD.data.mapCompose[cardId]) {
					return true;
				}
			}
		}
		return false;
	},
	showExchangeBox: function() {
		var div = jQuery('#exchange_dialog_exchange_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.user.mapExchangeBox,
			onClick: "H.exchange.mouseClickSlotItem",
			canOnClick:function(slotId, locate) {
				return H.exchange.checkCanSelect(slotId, locate);
			}
		});
		div.html(html);
	},
	showCofferBox: function() {
		var div = jQuery('#exchange_dialog_coffer_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.user.mapCofferBox,
			onClick: "H.exchange.mouseClickSlotItem",
			canOnClick:function(slotId, locate) {
				return H.exchange.checkCanSelect(slotId, locate);
			}
		});
		div.html(html);
	},
	showFriendExchangeBox: function() {
		var div = jQuery('#exchange_dialog_ta_exchange_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.exchange.mapExchangeBox,
			onClick: "H.exchange.mouseClickSlotItemFriend",
			canOnClick:function(slotId, locate) {
				return true;
			}
		});
		div.html(html);
	},
	showFriendCofferBox: function() {
		var div = jQuery('#exchange_dialog_ta_coffer_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.exchange.mapCofferBox
		});
		div.html(html);
	},
	mouseClickSlotItem: function(obj, slotId, locate) {
		this._mouseClickSlotItem(obj, slotId, locate, 0);
	},
	mouseClickSlotItemFriend: function(obj, slotId, locate) {
		this._mouseClickSlotItem(obj, slotId, locate, 1);
	},
	_mouseClickSlotItem: function(obj, slotId, locate, isFriendBox) {
		doc = jQuery(obj);
		var selected = true;
		if (doc.attr("class").indexOf("selected") > -1) {
			selected = false;
		}
		locate = locate || 0;
		if (selected) {
			if (this.taSelectCards.length == 5) return;
			if (isFriendBox) {
				var slot = {};
				srcSlot = this.mapExchangeBox[slotId];
				for (var name in srcSlot) {
					slot[name] = srcSlot[name];
				}
				this.taSelectCards.push(slot);
			} else {
				var slot = {};
				srcSlot = locate === 0 ? H.user.mapExchangeBox[slotId] : H.user.mapCofferBox[slotId];
				for (var name in srcSlot) {
					slot[name] = srcSlot[name];
				}
				this.mySelectCards.push(slot);
			}
			doc.addClass("selected");
		} else {
			if (isFriendBox) {
				var slot = {};
				srcSlot = this.mapExchangeBox[slotId];
				for (var name in srcSlot) {
					slot[name] = srcSlot[name];
				}
				this.taSelectCards.pop(slot);
			} else {
				var slot = {};
				srcSlot = locate === 0 ? H.user.mapExchangeBox[slotId] : H.user.mapCofferBox[slotId];
				for (var name in srcSlot) {
					slot[name] = srcSlot[name];
				}
				this.mySelectCards.pop(slot);
			}
			doc.removeClass("selected");
		}
		var canExchange = false;
		var exchangeCardNum = 0;
		var exchangePriceNum = 0;
		for (var index = 0; index < this.mySelectCards.length; index++) {
			var slot = this.mySelectCards[index];
			var price = CARD.data.mapCard[slot.id][3];
			this.mySelectCards[index].price = price;
			exchangePriceNum += price;
		}
		jQuery('#exchange_dialog_my_box_text').html('已选择' + this.mySelectCards.length + '张，共' + exchangePriceNum + '面值的卡片');
		exchangePriceNum = 0;
		for (var index = 0; index < this.taSelectCards.length; index++) {
			var slot = this.taSelectCards[index];
			var price = CARD.data.mapCard[slot.id][3];
			this.taSelectCards[index].price = price;
			exchangePriceNum += price;
		}
		jQuery('#exchange_dialog_ta_box_text').html('已选择' + this.taSelectCards.length + '张，共' + exchangePriceNum + '面值的卡片');
		if (this.mySelectCards.length === 0 || this.taSelectCards.length === 0) {
			canExchange = false;
		} else {
			canExchange = this.mySelectCards.length === this.taSelectCards.length ? true : false;
		}

		function sortFunc(a, b) {
			return b.price - a.price;
		}

		if (canExchange) {
			this.mySelectCards.sort(sortFunc);
			this.taSelectCards.sort(sortFunc);
			for (var index = 0; index < this.taSelectCards.length; index++) {
				if (this.taSelectCards[index].price != this.mySelectCards[index].price) {
					canExchange = false;
					break;
				}
			};
		}
		if (canExchange) {
			jQuery('#exchange_dialog_exchange_button').show();
		} else {
			jQuery('#exchange_dialog_exchange_button').hide();
		}
	},
	goExchange: function() {
		if (this.mySelectCards.length == 0 || this.taSelectCards.length == 0) return;
		var src = '';
		for (var index = 0; index < this.mySelectCards.length; index++) {
			var slot = this.mySelectCards[index];
			src += slot.id + '_' + slot.slot + '_' + slot.locate + (index === this.mySelectCards.length - 1 ? '' : '|');
		}
		var dst = '';
		for (var index = 0; index < this.taSelectCards.length; index++) {
			var slot = this.taSelectCards[index];
			dst += slot.id + '_' + slot.slot + '_' + slot.locate + (index === this.taSelectCards.length - 1 ? '' : '|');
		}
		this.exchange(src, dst);
	},
	exchange: function(src, dst, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			code = qqhome.getAttribute("code") * 1;
			if (code != 0) {
				fnError(code);
				console.error(oXml.text);
				return;
			}

			var now = parseInt(new Date().getTime() / 1000);
			now = now + 300;
			for (var index = 0; index < H.exchange.mySelectCards.length; index++) {
				var mySlot = H.exchange.mySelectCards[index];
				var taSlot = H.exchange.taSelectCards[index];
				var _taSlot = {};
				for (var name in taSlot) {
					_taSlot[name] = taSlot[name];
				}
				var _mySlot = {};
				for (var name in mySlot) {
					_mySlot[name] = mySlot[name];
				}
				if (mySlot.locate == 0) {
					_taSlot.locate = 0;
					_taSlot.slot = mySlot.slot;
					_taSlot.unlock = now;
					H.user.mapExchangeBox[mySlot.slot] = _taSlot;
				} else {
					_taSlot.locate = 1;
					_taSlot.slot = mySlot.slot;
					_taSlot.unlock = now;
					H.user.mapCofferBox[mySlot.slot] = _taSlot;
				}
				_mySlot.locate = 0;
				_mySlot.slot = taSlot.slot;
				_mySlot.unlock = now;
				H.exchange.mapExchangeBox[taSlot.slot] = _mySlot;
			}
			H.exchange.taSelectCards = [];
			H.exchange.mySelectCards = [];
			jQuery('#exchange_dialog_exchange_button').hide();
			H.ui.showErrDlg({
				title: '提示',
				msg: '卡片交换成功！'
			});
			setTimeout(function() {
				H.ui.removeErrDlg();
			}, 1000);

			H.exchange.showExchangeBox();
			H.exchange.showCofferBox();
			H.exchange.showFriendExchangeBox();
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '换卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_exchangecard?cmd=1&ifFriend=1&uin=' + H.user.getUin() + '&frnd=' + this.fUin + '&src=' + src + '&dst=' + dst;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	load: function(fUin, fnSucceed) {
		function fnSucc(oXml) {
			// console.debug(H.resChinese(oXml.text));
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
			H.exchange.oMyData = {};
			H.exchange.oMyData.nick = user.getAttribute("nick");
			H.exchange.oMyData.uin = user.getAttribute("uin") * 1;
			H.exchange.oMyData.money = user.getAttribute("money") * 1;
			H.exchange.oMyData.sex = user.getAttribute("sex") * 1;
			H.exchange.oMyData.exp = user.getAttribute("exp") * 1;
			H.exchange.oMyData.regti = user.getAttribute("regti") * 1;
			H.exchange.oMyData.lastloginti = user.getAttribute("lastloginti") * 1;
			H.exchange.oMyData.randchance = user.getAttribute("randchance") * 1;
			H.exchange.oMyData.lastrandti = user.getAttribute("lastrandti") * 1;
			H.exchange.oMyData.missionid = user.getAttribute("missionid") * 1;
			H.exchange.oMyData.missionstep = user.getAttribute("missionstep") * 1;
			H.exchange.oMyData.missionflag = user.getAttribute("missionflag") * 1;
			H.exchange.oMyData.lastgetmoneyti = user.getAttribute("lastgetmoneyti") * 1;
			H.exchange.oMyData.lv = user.getAttribute("lv") * 1;
			H.exchange.oMyData.lvupbonus = user.getAttribute("lvupbonus") * 1;
			H.exchange.oMyData.redvip = user.getAttribute("redvip") * 1;
			H.exchange.oMyData.missionv3 = user.getAttribute("missionv3") * 1;
			H.exchange.oMyData.hasmsg = user.getAttribute("hasmsg") * 1;
			H.exchange.oMyData.mana = user.getAttribute("mana") * 1;
			H.exchange.oMyData.redlv = user.getAttribute("redlv") * 1;
			H.exchange.oMyData.yearvip = user.getAttribute("yearvip") * 1;
			H.exchange.oMyData.elfname = user.getAttribute("elfname");

			changebox = qqhome.getElementsByTagName("changebox")[0];
			H.exchange.oMyData.exchangebox_cur = changebox.getAttribute("cur") * 1;
			H.exchange.oMyData.exchangebox_vipnum = changebox.getAttribute("vipnum") * 1;
			H.exchange.oMyData.exchangebox_max = changebox.getAttribute("max") * 1;
			exchArr = changebox.getAttribute("exch").split(",");
			H.exchange.oMyData.exchangebox_exch = [];
			for (var i = 0; i < exchArr.length; i++) {
				if (exchArr[i] * 1 > 0) {
					H.exchange.oMyData.exchangebox_exch.push(exchArr[i] * 1);
				}
			};
			changeboxcards = changebox.getElementsByTagName("card");
			H.exchange.mapExchangeBox = {};
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
				if (slot.id > 0) H.exchange.mapExchangeBox[slotId] = slot;
			}

			storebox = qqhome.getElementsByTagName("storebox")[0];
			H.exchange.oMyData.cofferbox_cur = storebox.getAttribute("cur") * 1;
			H.exchange.oMyData.cofferbox_max = storebox.getAttribute("max") * 1;
			H.exchange.oMyData.cofferbox_nor = storebox.getAttribute("nor") * 1;
			storeboxcards = storebox.getElementsByTagName("card");
			H.exchange.mapCofferBox = {};
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
				if (slot.id > 0) H.exchange.mapCofferBox[slotId] = slot;
			}

			stovebox = qqhome.getElementsByTagName("stovebox")[0];
			H.exchange.oMyData.stovebox_cur = stovebox.getAttribute("cur") * 1;
			H.exchange.oMyData.stovebox_max = stovebox.getAttribute("max") * 1;
			H.exchange.oMyData.stovebox_stovenum = stovebox.getAttribute("stovenum") * 1;
			stoveboxcards = stovebox.getElementsByTagName("card");
			H.exchange.mapStoveBox = {};
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
				H.exchange.mapStoveBox[slotId] = slot;
			}
			info = qqhome.getElementsByTagName("info")[0];
			runeback = info.getElementsByTagName("runeback")[0];
			H.exchange.oMyData.runeback_id = runeback.getAttribute("id") * 1;
			H.exchange.oMyData.runeback_expire = runeback.getAttribute("expire") * 1;
			stoves = info.getElementsByTagName("stove");
			H.exchange.mapStove = {};
			for (var i = 0; i < stoves.length; i++) {
				var stove = stoves[i];
				var id = stove.getAttribute("id") * 1;
				var endTime = stove.getAttribute("endtime") * 1;
				var level = stove.getAttribute("lv") * 1;
				var _map = {};
				_map.id = id;
				_map.endTime = endTime;
				_map.level = level;
				H.exchange.mapStove[id] = _map;
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
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_mainpage?&uin=' + H.user.getUin() + '&opuin=' + fUin;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};