H.stoveBox = {
	sortFunction: function(a, b) {
		if (a.flag == 2) return -1;
		if (b.flag == 2) return 1;
		if (a.btime && b.btime) {
			if (a.btime <= b.btime) {
				return -1;
			} else {
				return 1;
			}
		}
		return 1;
	},
	showStoves: function() {
		var div = jQuery("#stoves");
		if (div.children().length > 0) {
			div.empty();
		}
		div.append('<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all ui-state-hover"><span>炼卡位</span></h3>');
		var html = '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"><ul class="overflow_auto">';

		function getDayStr(lockTime, now) {
			var day = parseInt((lockTime - parseInt(Date.today().getTime() / 1000)) / 86400);
			var time = new Date((lockTime) * 1000).toString("HH:mm:ss");
			var dayStr = '';
			if (day < 0) time = '&nbsp;';
			if (day == 0 && lockTime - now < 0) time = '&nbsp;';
			else if (day == 1) dayStr = '明天';
			else if (day == 2) dayStr = '后天';
			else if (day > 2) dayStr = day + '天后';
			return dayStr + "&nbsp;" + time;
		}
		stoveArr = [];
		stealStoveArr = [];
		stolenStoveArr = [];
		for (var index in H.user.mapStoveBox) {
			var slot = H.user.mapStoveBox[index];
			if (slot.slot < 5 && slot.id > 0) {
				stoveArr.push(slot);
			} else if (slot.slot == 5 && slot.id > 0) {
				stolenStoveArr.push(slot);
			} else if (slot.id > 0 || slot.id2 > 0) {
				stealStoveArr.push(slot);
			}
		}
		var now = Math.round(new Date().getTime() / 1000);
		stoveArr.sort(this.sortFunction);
		for (var i = 0; i < stoveArr.length; i++) {
			var slot = stoveArr[i];
			html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center"';
			if (i == stoveArr.length - 1) {
				html += ' onmouseover="javascript:H.ui.mouseOverSlotItem(this)" onmouseout="javascript:H.ui.mouseOutSlotItem(this)"';
			}
			html += '>';
			html += '<div class="card_big_img">';
			html += H.ui.getImgItemWithBg(slot.id);
			if (i == stoveArr.length - 1) {
				html += '<span class="position_absolute buttons" style="display:none;"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveBox.cancelStoveCard(' + slot.slot + ',' + slot.id + ');"><span class="ui-button-text">取消</span></button></span>';
			}
			html += '</div>';
			html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime, now) + '</div>';
			html += '<div id="timer_' + slot.slot + '" class="width_100 text_align_center clear" style="position:relative;height:30px;">';
			html += '</div>';
			html += '</li>';
		}
		if (stolenStoveArr.length > 0) {
			var slot = stolenStoveArr[0];
			html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center">';
			html += '<div class="card_big_img">';
			html += H.ui.getImgItemWithBg(slot.id);
			html += '</div>';
			html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
			html += '<div id="timer_' + slot.slot + '" class="width_100 text_align_center clear" style="position:relative;height:30px;"></div>';
			html += '</li>';
		}
		if (stealStoveArr.length > 0) {
			var slot = stealStoveArr[0];
			if (slot.id && slot.id > 0) {
				html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center">';
				html += '<div class="card_big_img">';
				html += H.ui.getImgItemWithBg(slot.id);
				html += '</div>';
				html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
				html += '<div id="timer_' + slot.slot + '" class="width_100 text_align_center clear" style="position:relative;height:30px;"></div>';
				html += '</li>';
			}
			if (slot.id2 && slot.id2 > 0) {
				html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center">';
				html += '<div class="card_big_img">';
				html += H.ui.getImgItemWithBg(slot.id2);
				html += '</div>';
				html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
				html += '<div id="timer_' + slot.slot + '_1" class="width_100 text_align_center clear" style="position:relative;height:30px;"></div>';
				html += '</li>';
			}
		}
		html += '</ul>';
		div.append(html);
		this._showStoves(stoveArr, now);
	},
	_showStoves: function() {
		function getTimeStr(time) {
			var hours = Math.floor(time / 3600);
			var minutes = Math.floor(time % 3600 / 60);
			var seconds = time % 60;
			var str = '';
			str = str + (hours < 10 ? "0" + hours : hours);
			str += ":";
			str = str + (minutes < 10 ? "0" + minutes : minutes);
			str += ":";
			str = str + (seconds < 10 ? "0" + seconds : seconds);
			return str;
		}
		stoveArr = [];
		stealStoveArr = [];
		stolenStoveArr = [];
		for (var index in H.user.mapStoveBox) {
			var slot = H.user.mapStoveBox[index];
			if (slot.slot < 5 && slot.id > 0) {
				stoveArr.push(slot);
			} else if (slot.slot == 5 && slot.id > 0) {
				stolenStoveArr.push(slot);
			} else if (slot.id > 0 || slot.id2 > 0) {
				stealStoveArr.push(slot);
			}
		}
		var now = Math.round(new Date().getTime() / 1000);
		stoveArr.sort(this.sortFunction);
		for (var i = 0; i < stoveArr.length; i++) {
			var slot = stoveArr[i];
			var html = '';
			if (slot.btime + slot.locktime - now > 0) {
				html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">&nbsp;</div>';
				if (slot.btime - now > 0) {
					html += '<div style="position: absolute;width: ' + Math.floor(94 * (CARD.data.mapCompose[slot.id][6] - slot.locktime) / CARD.data.mapCompose[slot.id][6]) + 'px;left: 6px;top:1px;background-color: #0f0;">&nbsp;</div>';
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;" name="等待中">' + getTimeStr(slot.locktime) + '</div>';
					if (jQuery('#timer_' + slot.slot).html().indexOf("等待中") < 0) {
						jQuery('#timer_' + slot.slot).html(html);
					}
				} else {
					html += '<div style="position: absolute;width: ' + Math.floor(94 * (now + CARD.data.mapCompose[slot.id][6] - slot.locktime - slot.btime) / CARD.data.mapCompose[slot.id][6]) + 'px;left: 6px;top:1px;background-color: #0f0;">&nbsp;</div>';
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">' + getTimeStr(slot.btime + slot.locktime - now) + '</div>';
					jQuery('#timer_' + slot.slot).html(html);
				}
			} else {
				html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveBox.getStoveCard(' + slot.slot + ',function(){H.stoveBox.showStoves();H.stoveTree.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
				if (jQuery('#timer_' + slot.slot).html().indexOf("取卡") < 0) {
					jQuery('#timer_' + slot.slot).html(html);
				}
			}
		}
		if (stolenStoveArr.length > 0) {
			var slot = stolenStoveArr[0];
			var html = '';
			html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center">';
			html += '<div class="card_big_img">';
			html += H.ui.getImgItemWithBg(slot.id);
			html += '</div>';
			html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
			if (slot.btime + slot.locktime - new Date().getTime() / 1000 > 0) {
				html += '<div class="width_100 text_align_center clear"><a class="bt4_tx2" href="javascript:void(0);" title="扣卡">' + slot.slot + '扣卡</a></div>';
			} else {
				html += '<div class="width_100 text_align_center clear"><a class="bt_tx2" href="javascript:void(1);" onclick="javascript:H.stoveBox.getStolenCard(' + slot.slot + ',function(){H.stoveBox.showStoves();H.stoveTree.showStoveTree(' + this._selected_theme_id + ');})" title="扣卡">' + slot.slot + '扣卡</a></div>';
			}
			html += '</li>';
		}
		if (stealStoveArr.length > 0) {
			var slot = stealStoveArr[0];
			if (slot.id && slot.id > 0) {
				var html = '';
				if (slot.btime + slot.locktime - now > 0) {
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">&nbsp;</div>';
					html += '<div style="position: absolute;width: ' + Math.floor(94 * (now + CARD.data.mapCompose[slot.id][6] - slot.locktime - slot.btime) / CARD.data.mapCompose[slot.id][6]) + 'px;left: 6px;top:1px;background-color: #0f0;">&nbsp;</div>';
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">' + getTimeStr(slot.btime + slot.locktime - now) + '</div>';
					jQuery('#timer_' + slot.slot).html(html);
				} else {
					html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveBox.getStealCard(0,' + slot.opuin + ',function(){H.stoveBox.showStoves();H.stoveTree.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
					if (jQuery('#timer_' + slot.slot).html().indexOf("取卡") < 0) {
						jQuery('#timer_' + slot.slot).html(html);
					}
				}
			}
			if (slot.id2 && slot.id2 > 0) {
				var html = '';
				if (slot.btime + slot.locktime - now > 0) {
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">&nbsp;</div>';
					html += '<div style="position: absolute;width: ' + Math.floor(94 * (now + CARD.data.mapCompose[slot.id2][6] - slot.locktime - slot.btime) / CARD.data.mapCompose[slot.id2][6]) + 'px;left: 6px;top:1px;background-color: #0f0;">&nbsp;</div>';
					html += '<div style="position: absolute;width: 94px;left: 5px;border: solid 1px #000;">' + getTimeStr(slot.btime + slot.locktime - now) + '</div>';
					jQuery('#timer_' + slot.slot + '_1').html(html);
				} else {
					html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveBox.getStealCard(1,' + slot.opuin2 + ',function(){H.stoveBox.showStoves();H.stoveTree.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
					if (jQuery('#timer_' + slot.slot + '_1').html().indexOf("取卡") < 0) {
						jQuery('#timer_' + slot.slot + '_1').html(html);
					}
				}

			}
		}

		this.timer = setTimeout(function() {
			H.stoveBox._showStoves();
		}, 1000);
	},
	cancelStoveCard: function(slotId, cardId) {
		if (H.user.oMyData.exchangebox_cur + H.user.oMyData.cofferbox_cur - H.user.getCardNum(0) - H.user.getCardNum(1) < 3) {
			H.ui.showErrDlg({
				title: '失败',
				msg: '你没有足够的卡箱来取消炼卡！'
			});
		}
		if (confirm("您确定要取消炼制卡片" + CARD.data.mapCard[cardId][2] + "吗?\n提示:取消后,已经炼制一段时间的卡片进度将不能保存。")) {
			this.cancelRefineCard(slotId, function() {
				H.stoveBox.showStoves();
				H.stoveTree.showStoveTree(H.stoveTree._selected_theme_id);
			});
		}
	},
	getStoveCard: function(slotId, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnFail(iCode);
				return;
			}
			money = obj.getAttribute("money") * 1;
			exp = obj.getAttribute("exp") * 1;
			capable = obj.getAttribute("capable") * 1;
			stovenum = obj.getAttribute("stovenum") * 1;
			rentstovenum = obj.getAttribute("rentstovenum") * 1;
			lv = obj.getAttribute("lv") * 1;
			lv_diff = obj.getAttribute("lv_diff") * 1;
			var card = obj.getElementsByTagName("card")[0];
			var slotType = card.getAttribute("location") * 1;
			var box = slotType == 0 ? H.user.mapExchangeBox : H.user.mapCofferBox;
			var _oCard = {
				slot: card.getAttribute("slot") * 1,
				id: card.getAttribute("id") * 1,
				status: card.getAttribute("status") * 1,
				type: card.getAttribute("type") * 1
			};
			box[_oCard.slot] = _oCard;
			H.user.clearStoveSlot(slotId);
			H.user.oMyData.money = money;
			H.user.oMyData.exp = exp;
			H.user.oMyData.lv = lv;
			//setTimeout("CARD.mission.checkMission(CARD.mission.BUY_CARD)", 0);
			if (fnSucceed) fnSucceed();
		}

		function fnFail(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '取卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var url = 'http://card.show.qq.com/cgi-bin/card_stove_refinedcard_get?uin=' + H.user.getUin() + '&slotid=' + slotId + '&slottype=1&ver=1&code=';
		var xhr = new CARD.XHR(url, fnSucc, null, fnFail);
		xhr.send();
	},
	getStealCard: function(type, opUin, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnFail(iCode);
				return;
			}
			money = obj.getAttribute("money") * 1;
			exp = obj.getAttribute("exp") * 1;
			capable = obj.getAttribute("capable") * 1;
			stovenum = obj.getAttribute("stovenum") * 1;
			rentstovenum = obj.getAttribute("rentstovenum") * 1;
			lv = obj.getAttribute("lv") * 1;
			lv_diff = obj.getAttribute("lv_diff") * 1;
			var card = obj.getElementsByTagName("card")[0];
			var slotType = card.getAttribute("location") * 1;
			var box = slotType == 0 ? H.user.mapExchangeBox : H.user.mapCofferBox;
			var _oCard = {
				slot: card.getAttribute("slot") * 1,
				id: card.getAttribute("id") * 1,
				status: card.getAttribute("status") * 1,
				type: card.getAttribute("type") * 1
			};
			box[_oCard.slot] = _oCard;
			if (type == 0) {
				H.user.mapStoveBox[6].id = 0;
				H.user.mapStoveBox[6].opuin = 0;
			} else {
				H.user.mapStoveBox[6].id2 = 0;
				H.user.mapStoveBox[6].opuin2 = 0;
			}
			H.user.oMyData.money = money;
			H.user.oMyData.exp = exp;
			H.user.oMyData.lv = lv;
			//setTimeout("CARD.mission.checkMission(CARD.mission.BUY_CARD)", 0);
			if (fnSucceed) fnSucceed();
		}

		function fnFail(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '取卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var url = 'http://card.show.qq.com/cgi-bin/card_stove_stealcard_get?uin=' + H.user.getUin() + '&opuin=' + opUin + '&slotid=5&slottype=1&ver=1&code=';
		var xhr = new CARD.XHR(url, fnSucc, null, fnFail);
		xhr.send();
	},
	getStolenCard: function(opUin, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnFail(iCode);
				return;
			}
			money = obj.getAttribute("money") * 1;
			exp = obj.getAttribute("exp") * 1;
			capable = obj.getAttribute("capable") * 1;
			stovenum = obj.getAttribute("stovenum") * 1;
			rentstovenum = obj.getAttribute("rentstovenum") * 1;
			lv = obj.getAttribute("lv") * 1;
			lv_diff = obj.getAttribute("lv_diff") * 1;
			var card = obj.getElementsByTagName("card")[0];
			var slotType = card.getAttribute("location") * 1;
			var box = slotType == 0 ? H.user.mapExchangeBox : H.user.mapCofferBox;
			var _oCard = {
				slot: card.getAttribute("slot") * 1,
				id: card.getAttribute("id") * 1,
				status: card.getAttribute("status") * 1,
				type: card.getAttribute("type") * 1
			};
			box[_oCard.slot] = _oCard;
			H.user.clearStoveSlot(5);
			H.user.oMyData.money = money;
			H.user.oMyData.exp = exp;
			H.user.oMyData.lv = lv;
			//setTimeout("CARD.mission.checkMission(CARD.mission.BUY_CARD)", 0);
			if (fnSucceed) fnSucceed();
		}

		function fnFail(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '扣卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var url = 'http://card.show.qq.com/cgi-bin/card_stove_pin?uin=' + H.user.getUin() + '&opuin=' + opUin + '&slotid=5&slottype=1&ver=1&code=';
		var xhr = new CARD.XHR(url, fnSucc, null, fnFail);
		xhr.send();
	},
	cancelRefineCard: function(slotId, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			// console.debug(H.resChinese(oXml.text));
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode);
				return;
			}
			var cards = obj.getElementsByTagName("card");
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				var slot = {};
				slot.id = card.getAttribute("id") * 1;
				slot.slot = card.getAttribute("slot") * 1;
				slot.locate = card.getAttribute("location") * 1;
				slot.type = card.getAttribute("type") * 1;
				slot.status = card.getAttribute("status") * 1;
				slot.locate == 0 ? H.user.mapExchangeBox[slot.slot] = slot : H.user.mapCofferBox[slot.slot] = slot;
			}
			H.user.mapStoveBox[slotId].id = 0;
			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode, sMsg, iEndTime) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '取消炼卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_stove_cancel?type=1&ver=1&slotid=' + slotId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};