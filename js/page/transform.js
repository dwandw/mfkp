H.transform = {
	selectedThemeId: 0,
	selectedSrcCard: 0,
	selectedDstCardId: 0,
	magicType: 2,
	init: function() {
		var dialog = jQuery('#transform_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="transform_dialog"></div>');
			var html = '';
			html += '<div class="width_40 float_left">';
			html += '    <div id="transform_dialog_src_tabs">';
			html += '        <ul>';
			html += '            <li><a href="#transform_dialog_src_tabs-0" onclick="javascript:H.transform.showMyExchangeBox();">我的换卡箱</a></li>';
			html += '            <li><a href="#transform_dialog_src_tabs-1" onclick="javascript:H.transform.showMyCofferBox();">我的保险箱</a></li>';
			html += '        </ul>';
			html += '        <div id="transform_dialog_src_tabs-0">';
			html += '            <div id="transform_dialog_exchange_box"></div>';
			html += '        </div>';
			html += '        <div id="transform_dialog_src_tabs-1">';
			html += '            <div id="transform_dialog_coffer_box"></div>';
			html += '        </div>';
			html += '    </div>';
			html += '</div>';
			html += '<div class="width_20 float_left">';
			html += '    <div id="transform_dialog_src_big_card" class="width_50 float_left">';
			html += '        <div class="card_big_img"><img class="theme_bg" src="' + H.extension_base_url + 'images/theme/111"></div>';
			html += '    </div>';
			html += '    <div id="transform_dialog_dst_big_card" class="width_50 float_left">';
			html += '        <div class="card_big_img"><img class="theme_bg" src="' + H.extension_base_url + 'images/theme/111"></div>';
			html += '    </div>';
			html += '    <div class="clear"></div>';
			html += '    <div id="transform_dialog_transform_percent" class="width_100 text_align_center">';
			html += '        <ul class="width_100 float_left">';
			html += '            <li class="width_25 float_left" id="50"><button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 2);"><span class="ui-button-text">50%</span></button></li>';
			html += '            <li class="width_25 float_left" id="75"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 3);"><span class="ui-button-text">75%</span></button></li>';
			html += '            <li class="width_25 float_left" id="100"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 4);"><span class="ui-button-text">100%</span></button></li>';
			html += '        </ul>';
			html += '    </div>';
			html += '    <div id="transform_dialog_transform_button" class="width_100 text_align_center" style="display:none;">';
			html += '        <a href="javascript:void(1);" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.transform.transformCard();"><span class="ui-button-text">开始</span></a>';
			html += '    </div>';
			html += '</div>';
			html += '<div class="width_40 float_left">';
			html += '    <div id="transform_dialog_dst_tabs">';
			html += '        <ul>';
			html += '            <li><a href="#transform_dialog_dst_tabs-0">请选择目标卡</a></li>';
			html += '        </ul>';
			html += '        <div id="transform_dialog_dst_tabs-0">';
			html += '            <div id="transform_dialog_theme_tree"></div>';
			html += '        </div>';
			html += '    </div>';
			html += '</div>';
			html += '<div class="clear"></div>';
			dialog.html(html);
		}
		dialog.dialog({
			minWidth: 1200,
			title: "变卡",
			dialogClass: "dialogClass",
			position: "top"
		});
		this.showMyBox();
		this.showTheme();
		jQuery('#transform_dialog_src_tabs').tabs({
			active: 0
		});
		jQuery('#transform_dialog_dst_tabs').tabs({
			active: 0
		});
	},
	showMyBox: function() {
		this.showMyExchangeBox();
		this.showMyCofferBox();
	},
	showMyExchangeBox: function() {
		var cardPrice = 0;
		var div = jQuery('#transform_dialog_exchange_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = '<ul class="overflow_auto">';
		var slotArr = [];
		for (var index in H.user.mapExchangeBox) {
			if (H.user.mapExchangeBox[index].id > 0) {
				slotArr.push(H.user.mapExchangeBox[index]);
			}
		}

		slotArr.sort(H.sortCardFunc);
		for (var i = 0; i < slotArr.length; i++) {
			var slot = slotArr[i];
			// var slot = H.user.mapExchangeBox[index];
			var locked = false;
			if (slot.id > 0) {
				if (this.selectedDstCardId) {
					cardPrice = CARD.data.mapCard[this.selectedDstCardId][3];
					if (H.checkFlashCard(this.selectedThemeId)) {
						locked = !((CARD.data.mapTheme[this.selectedThemeId][16] === CARD.data.mapCard[slot.id][1] && cardPrice <= CARD.data.mapCard[slot.id][3] * 3) || (this.selectedThemeId === CARD.data.mapCard[slot.id][1] && cardPrice <= CARD.data.mapCard[slot.id][3]));
					} else {
						locked = cardPrice > CARD.data.mapCard[slot.id][3];
					}
				} else {
					locked = false;
				}
				html += '<li id="' + slot.slot + '"';
				html += locked ? '' : ' onmouseout="javascript:H.transform.mouseOutItem(this);" onmouseover="javascript:H.transform.mouseOverItem(this);" onclick="javascript:H.transform.selectSrcItem(this, ' + slot.slot + ', ' + slot.id + ', ' + slot.locate + ');"';
				html += ' class="card_mini float_left text_align_center' + (this.selectedSrcCard && this.selectedSrcCard.locate === 0 && this.selectedSrcCard.slot === slot.slot ? ' selected' : '') + '">';
				html += '<div class="card_mini_img width_100">';
				html += H.ui.getCardMiniImg(slot.id);
				html += locked ? '<span class="bg"></span>' : '';
				html += '</div>';
				html += '</li>';
			}
		}
		// html += '</ul></div>';
		html += '</ul>';
		div.html(html);
	},
	showMyCofferBox: function() {
		var cardPrice = 0;
		var div = jQuery('#transform_dialog_coffer_box');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = '<ul class="overflow_auto">';
		var slotArr = [];
		for (var index in H.user.mapCofferBox) {
			if (H.user.mapCofferBox[index].id > 0) {
				slotArr.push(H.user.mapCofferBox[index]);
			}
		}

		slotArr.sort(H.sortCardFunc);
		for (var i = 0; i < slotArr.length; i++) {
			var slot = slotArr[i];
			// var slot = H.user.mapCofferBox[index];
			var locked = false;
			if (slot.id > 0) {
				if (this.selectedDstCardId) {
					cardPrice = CARD.data.mapCard[this.selectedDstCardId][3];
					if (H.checkFlashCard(this.selectedThemeId)) {
						locked = !((CARD.data.mapTheme[this.selectedThemeId][16] === CARD.data.mapCard[slot.id][1] && cardPrice <= CARD.data.mapCard[slot.id][3] * 3) || (this.selectedThemeId === CARD.data.mapCard[slot.id][1] && cardPrice <= CARD.data.mapCard[slot.id][3]));
					} else {
						locked = cardPrice > CARD.data.mapCard[slot.id][3];
					}
				} else {
					locked = false;
				}
				html += '<li id="' + slot.slot + '"';
				html += locked ? '' : ' onmouseout="javascript:H.transform.mouseOutItem(this);" onmouseover="javascript:H.transform.mouseOverItem(this);" onclick="javascript:H.transform.selectSrcItem(this, ' + slot.slot + ', ' + slot.id + ', ' + slot.locate + ');"';
				html += ' class="card_mini float_left text_align_center' + (this.selectedSrcCard && this.selectedSrcCard.locate === 1 && this.selectedSrcCard.slot === slot.slot ? ' selected' : '') + '">';
				html += '<div class="card_mini_img width_100">';
				html += H.ui.getCardMiniImg(slot.id);
				html += locked ? '<span class="bg"></span>' : '';
				html += '</div>';
				html += '</li>';
			}
		}
		html += '</ul>';
		div.html(html);
	},
	showTheme: function(themeId) {
		var cardPrice = 999999;
		H.stoveTree.init();
		themeId = themeId || (H.stoveTree._my_theme_array.length > 0 ? H.stoveTree._my_theme_array[0].tid : 40);
		this.selectedThemeId = themeId;
		var div = jQuery("#transform_dialog_theme_tree");
		if (div.children().length > 0) {
			div.empty();
		}
		var html = '';
		html += '<div id="transform_dialog_my_composing_themes">';
		for (var len = H.stoveTree._my_theme_array.length, i = 0, obj; i < len; i++) {
			obj = H.stoveTree._my_theme_array[i];
			html += '<a id="' + obj.tid + '" href="javascript:void(1);" onclick="H.stoveTree.init();H.transform.showTheme(' + obj.tid + ');H.transform.showMyBox();">' + H.ui.getThemeMiniLogo(obj.tid) + '</a>';
		}
		html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="H.transform.showSelectTheme();" title="选择主题"><span class="ui-button-text">选择主题</span></button>';
		html += '</div>';

		function getStat(cardId) {
			var tem = '';
			var num = H.stoveTree._my_box_card_map[cardId] || 0;
			// if (num == 0 || H.stoveTree._my_stove_card_map[cardId] > 0) {
			// 	tem += '<span class="bg"></span>';
			// }
			// if (H.stoveTree._my_stove_card_map[cardId] > 0) {
			// 	tem += '<span class="composing">合成中</span>';
			// }
			if (H.stoveTree._my_card_map[cardId] > 0) {
				tem += '<span class="num"><div></div><b>' + H.stoveTree._my_card_map[cardId] + '</b></span>';
			}
			if (H.stoveTree._need_num_map[cardId] != 0) {
				tem += '<span class="need_num"><div></div><b>' + H.stoveTree._need_num_map[cardId] + '</b></span>';
			}
			return tem;
		}

		H.stoveTree.initThemeMap(themeId);
		for (var j = 0; j < H.stoveTree._my_theme_map._time_temp_arr.length; j++) {
			html += '<h3>面值' + CARD.data.mapCard[H.stoveTree._my_theme_map._time_arr[H.stoveTree._my_theme_map._time_temp_arr[j]][0]][3] + '</h3>';
			html += '<ul class="overflow_auto">';
			for (i = 0, len = H.stoveTree._my_theme_map._time_arr[H.stoveTree._my_theme_map._time_temp_arr[j]].length; i < len; i++) {
				var card = CARD.data.mapCard[H.stoveTree._my_theme_map._time_arr[H.stoveTree._my_theme_map._time_temp_arr[j]][i]];
				var locked = true;
				if (this.selectedSrcCard) {
					cardPrice = CARD.data.mapCard[this.selectedSrcCard.id][3];
					if (H.checkFlashCard(this.selectedThemeId)) {
						if (CARD.data.mapTheme[this.selectedThemeId][16] == CARD.data.mapCard[this.selectedSrcCard.id][1] && CARD.data.mapCard[card[0]][3] <= cardPrice * 3) locked = false;
						if (this.selectedThemeId == CARD.data.mapCard[this.selectedSrcCard.id][1] && cardPrice >= CARD.data.mapCard[card[0]][3]) locked = false;
					} else {
						locked = cardPrice < CARD.data.mapCard[card[0]][3];
					}
				} else {
					locked = false;
				}
				html += '<li id="' + card[0] + '" title="' + card[2] + '" class="card_mini float_left' + (this.selectedDstCardId && this.selectedDstCardId === card[0] ? ' selected' : '') + '"';
				html += !locked ? ' onmouseout="javascript:H.transform.mouseOutItem(this);" onmouseover="javascript:H.transform.mouseOverItem(this);" onclick="javascript:H.transform.selectDstItem(this, ' + card[0] + ');"' : '';
				html += '><div class="card_mini_img width_100 text_align_center">';
				html += H.ui.getCardMiniImg(card[0]);
				html += !locked ? '' : '<span class="bg"></span>';
				html += getStat(card[0]);
				html += '</div></li>';
			}
			html += '</ul>';
		}
		html += '<h3>面值' + CARD.data.mapCard[H.stoveTree._my_theme_map._normal_card_arr[0]][3];
		html += '<ul class="overflow_auto">';
		for (var i = 0, len = H.stoveTree._my_theme_map._normal_card_arr.length; i < len; i++) {
			var card = CARD.data.mapCard[H.stoveTree._my_theme_map._normal_card_arr[i]];
			var locked = true;
			if (this.selectedSrcCard) {
				cardPrice = CARD.data.mapCard[this.selectedSrcCard.id][3];
				if (H.checkFlashCard(this.selectedThemeId)) {
					if (CARD.data.mapTheme[this.selectedThemeId][16] == CARD.data.mapCard[this.selectedSrcCard.id][1] && CARD.data.mapCard[card[0]][3] <= cardPrice * 3) locked = false;
					if (this.selectedThemeId == CARD.data.mapCard[this.selectedSrcCard.id][1] && cardPrice >= CARD.data.mapCard[card[0]][3]) locked = false;
				} else {
					locked = cardPrice < CARD.data.mapCard[card[0]][3];
				}
			} else {
				locked = false;
			}
			html += '<li id="' + card[0] + '" title="' + card[2] + '" class="card_mini float_left' + (this.selectedDstCardId && this.selectedDstCardId === card[0] ? ' selected' : '') + '"';
			html += !locked ? ' onmouseout="javascript:H.transform.mouseOutItem(this);" onmouseover="javascript:H.transform.mouseOverItem(this);" onclick="javascript:H.transform.selectDstItem(this, ' + card[0] + ');"' : '';
			html += '><div class="card_mini_img width_100 text_align_center">';
			html += H.ui.getCardMiniImg(card[0]);
			html += !locked ? '' : '<span class="bg"></span>';
			html += getStat(card[0]);
			html += '</div></li>';
		}
		html += '</ul>';
		div.html(html);
	},
	showSelectTheme: function() {
		H.ui.showSelectTheme({
			handleTheme: function(tid) {
				H.stoveTree.init();
				H.transform.showTheme(tid);
				H.transform.showMyBox();
			}
		});
	},
	mouseOutItem: function(doc) {
		jQuery(doc).removeClass("mouse_on");
	},
	mouseOverItem: function(doc) {
		jQuery(doc).addClass("mouse_on");
	},
	selectSrcItem: function(doc, slotId, cardId, locate) {
		doc = jQuery(doc);
		var selected = true;
		if (doc.attr("class").indexOf("selected") > -1) {
			selected = false;
		}
		jQuery('#transform_dialog_exchange_box .selected').removeClass("selected");
		jQuery('#transform_dialog_coffer_box .selected').removeClass("selected");
		if (selected) {
			doc.addClass("selected");
			this.showBigCard(1, cardId);
			this.selectedSrcCard = (locate === 0 ? H.user.mapExchangeBox[slotId] : H.user.mapCofferBox[slotId]);
		} else {
			doc.removeClass("selected");
			this.showEmpty(1);
			this.selectedSrcCard = 0;
		}
		this.showPercent();
		if (this.selectedDstCardId == 0) {
			this.showTheme(this.selectedThemeId);
		}
		this.showTransformButton();
	},
	selectDstItem: function(doc, cardId) {
		doc = jQuery(doc);
		var selected = true;
		if (doc.attr("class").indexOf("selected") > -1) {
			selected = false;
		}
		jQuery('#transform_dialog_theme_tree .selected').removeClass("selected");
		if (selected) {
			doc.addClass("selected");
			this.showBigCard(0, cardId);
			this.selectedDstCardId = cardId;
		} else {
			doc.removeClass("selected");
			this.showEmpty(0);
			this.selectedDstCardId = 0;
		}
		this.showPercent();
		if (this.selectedSrcCard == 0) {
			this.showMyBox();
		}
		this.showTransformButton();
	},
	showBigCard: function(isSrc, cardId) {
		var html = '';
		if (isSrc) {
			html += '<div class="card_big_img" onclick="javascript:H.transform.showEmpty(1);H.transform.selectedSrcCard=0;H.transform.showTheme(H.transform.selectedThemeId);">';
			html += H.ui.getImgItemWithBg(cardId);
			html += '</div>';
			jQuery('#transform_dialog_src_big_card').html(html);
		} else {
			html += '<div class="card_big_img" onclick="javascript:H.transform.showEmpty(0);H.transform.selectedDstCardId=0;H.transform.showMyBox();">';
			html += H.ui.getImgItemWithBg(cardId);
			html += '</div>';
			jQuery('#transform_dialog_dst_big_card').html(html);
		}
	},
	showEmpty: function(isSrc) {
		var html = '<div class="card_big_img"><img class="theme_bg" src="' + H.extension_base_url + 'images/theme/111"></div>';
		if (isSrc) {
			jQuery('#transform_dialog_src_big_card').html(html);
		} else {
			jQuery('#transform_dialog_dst_big_card').html(html);
		}
	},
	showPercent: function() {
		var html = '';
		if (this.selectedThemeId && CARD.data.mapTheme[this.selectedThemeId]) {
			var type = CARD.data.mapTheme[this.selectedThemeId][12];
			if (type === 0) {
				html += '            <li class="width_25 float_left" id="50"><button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 2);"><span class="ui-button-text">50%</span></button></li>';
				html += '            <li class="width_25 float_left" id="75"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 3);"><span class="ui-button-text">75%</span></button></li>';
				html += '            <li class="width_25 float_left" id="100"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 4);"><span class="ui-button-text">100%</span></button></li>';
				this.magicType = 2;
			} else if (type === 1) {
				html += '            <li class="width_25 float_left" id="20"><button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 1);"><span class="ui-button-text">20%</span></button></li>';
				html += '            <li class="width_25 float_left" id="50"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 2);"><span class="ui-button-text">50%</span></button></li>';
				html += '            <li class="width_25 float_left" id="75"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 3);"><span class="ui-button-text">75%</span></button></li>';
				html += '            <li class="width_25 float_left" id="100"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 4);"><span class="ui-button-text">100%</span></button></li>';
				this.magicType = 1;
			} else if (type === 9) {
				html += '            <li class="width_25 float_left" id="30"><button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 5);"><span class="ui-button-text">30%</span></button></li>';
				html += '            <li class="width_25 float_left" id="100"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.changeRatio(this, 6);"><span class="ui-button-text">100%</span></button></li>';
				this.magicType = 5;
			}
		}
		jQuery('#transform_dialog_transform_percent ul').html(html);
	},
	showTransformButton: function() {
		if (!this.selectedSrcCard || !this.selectedDstCardId) {
			jQuery('#transform_dialog_transform_button').hide();
		} else {
			jQuery('#transform_dialog_transform_button').show();
		}
	},
	changeRatio: function(doc, type) {
		doc = jQuery(doc);
		selected = true;
		if (doc.attr("class").indexOf("ui-state-active") > -1) {
			selected = false;
		}
		jQuery('#transform_dialog_transform_percent .ui-state-active').removeClass("ui-state-active").addClass("ui-state-default");
		if (selected) {
			doc.removeClass("ui-state-default").addClass("ui-state-active");
		}
		this.magicType = type;
		// if (H.trans._bTransd && !H.trans._bFlashd) {
		// 	H.trans._oFlash.clear();
		// 	H.trans._bTransd = false;
		// }
		// var mana;
		// if (H.trans._iDstCard == 0 || type == 0) {
		// 	mana = 0;
		// } else {
		// 	if (H.trans._bFlashd) {
		// 		if (type == 5) mana = 0;
		// 		else if (H.trans._iSrcCard == CARD.props.UNIVERSAL_CARD_ID && CARD.data.mapCard[H.trans._iDstCard][4] > 0) {
		// 			mana = CARD.data.mapCard[H.trans._iDstCard][10][4];
		// 		} else {
		// 			mana = 30;
		// 		}
		// 	} else {
		// 		mana = CARD.data.mapCard[H.trans._iDstCard][10][type - 1];
		// 	}
		// }
		// H.trans._curManaCost = mana;
		// H.trans._iType = type;
		// var oLI = jQuery('#UL_RATIO')[0].getElementsByTagName("LI");
		// if (H.trans._bFlashd) {
		// 	if (type == 0) {
		// 		oLI[2].className = "item_05 default";
		// 		jQuery('#P_MANA_COST3')[0].style.display = "none";
		// 		oLI[3].className = "item_04 default";
		// 		jQuery('#P_MANA_COST4')[0].style.display = "none";
		// 	} else if (type == 5) {
		// 		oLI[2].className = "item_05 active";
		// 		jQuery('#SPAN_MANA3')[0].innerHTML = '0';
		// 		jQuery('#P_MANA_COST3')[0].style.display = "";
		// 		oLI[3].className = "item_04";
		// 		jQuery('#P_MANA_COST4')[0].style.display = "none";
		// 	} else {
		// 		oLI[2].className = "item_05";
		// 		jQuery('#SPAN_MANA3')[0].innerHTML = '0';
		// 		oLI[3].className = "item_04 active";
		// 		jQuery('#SPAN_MANA4')[0].innerHTML = '' + mana;
		// 		jQuery('#P_MANA_COST4')[0].style.display = "";
		// 	}
		// }
		// else {
		// 	for (var i = 1, len = oLI.length; i <= len; i++) {
		// 		if (type != i) {
		// 			oLI[i - 1].className = "item_0" + i;
		// 			$("P_MANA_COST" + i).style.display = "none";
		// 		} else {
		// 			oLI[i - 1].className = "item_0" + i + " active";
		// 			$("SPAN_MANA" + i).innerHTML = mana;
		// 			$("P_MANA_COST" + i).style.display = "";
		// 		}
		// 	}
		// 	if ((type != 0) && !H.trans.checkJB(CARD.data.mapTheme[H.trans._curDstTheme])) {
		// 		jQuery('#LI_RATIO_1')[0].onclick = function () {};
		// 		jQuery('#LI_RATIO_1')[0].className = 'item_01 default';
		// 	}
		// }
		// var strFaq = (H.trans._bFlashd) ? 'http://service.qq.com/info/58987.html"><span style="color:#c00;font-weight:bold;font-size:14px;">点击了解变闪卡攻略<span>' : 'http://service.qq.com/info/49895.html">点击了解变卡攻略';
		// var strRatio;
		// switch (type) {
		// case 0:
		// 	jQuery('#P_MAGIC_BALL')[0].innerHTML = '';
		// 	break;
		// case 1:
		// 	strRatio = '20%';
		// 	break;
		// case 2:
		// 	strRatio = '50%';
		// 	break;
		// case 3:
		// 	strRatio = '75%';
		// 	break;
		// case 4:
		// 	strRatio = '100%';
		// 	break;
		// case 5:
		// 	strRatio = '30%';
		// 	break;
		// case 6:
		// 	strRatio = '100%';
		// 	break;
		// default:
		// 	jQuery('#P_MAGIC_BALL')[0].innerHTML = '万能的水晶球，通过它可以将您没用的卡片变成您希望获得的卡片！<br/>但是注意 —— 一但变卡失败，您用来变卡的那张卡片将烟消云散...' + '<br/><br/><span class="ico_examine"></span><a class="links" target="_blank" href="' + strFaq + '</a><br/><br/></p>';
		// }
		// if (!H.trans._bFlashd) {
		// 	if (mana != 0) {
		// 		if (type != 4) {
		// 			var str = (type == 1) ? ('您这张卡片的变卡成功率是') : ('您将这张卡的变卡成功率提升至');
		// 			jQuery('#P_MAGIC_BALL')[0].innerHTML = str + '<strong class="important">' + strRatio + '</strong><br>成功——获得目标卡<br>失败——消耗卡消失<br>变卡时将消耗<strong class="important">' + mana + '</strong>点魔力值<br>' + '<span class="ico_examine"></span><a class="links" target="_blank" href="' + strFaq + '</a><br/><br/><br/>';;
		// 		} else {
		// 			jQuery('#P_MAGIC_BALL')[0].innerHTML = '您这张卡片的变卡成功率已达到<br><strong class="important">' + strRatio + '</strong><br>您已经将目标卡放入囊中了...<br>' + '变卡时将消耗<strong class="important">' + mana + '</strong>点魔力值<br>' + '<span class="ico_examine"></span><a class="links" target="_blank" href="' + strFaq + '</a><br/><br/><br/>';
		// 		}
		// 	} else {
		// 		if (type != 0) {
		// 			jQuery('#P_MAGIC_BALL')[0].innerHTML = '您这张卡片的变卡成功率是<strong class="important">' + strRatio + '</strong><br>成功——获得目标卡<br>失败——消耗卡消失<br>' + '（使用魔力可以提升变卡成功率）<br>' + '<span class="ico_examine"></span><a class="links" target="_blank" href="' + strFaq + '</a><br/><br/><br/>';
		// 		}
		// 	}
		// }
	},
	transformCard: function() {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode);
				return;
			}

			result = obj.getAttribute("result") * 1;
			manaCost = obj.getAttribute("manacost") * 1;
			if (result === 1) {
				H.transform.showBigCard(1, H.transform.selectedDstCardId);
				H.transform.selectedSrcCard.id = H.transform.selectedDstCardId;
				H.transform.selectedSrcCard.unlock = parseInt(new Date().getTime() / 1000) + 300;
			} else {
				H.transform.showEmpty(1);
				H.user.clearSlot(H.transform.selectedSrcCard.slot, H.transform.selectedSrcCard.locate);
			}
			H.transform.selectedSrcCard = 0;
			H.transform.showMyBox();
			H.stoveTree.init();
			H.transform.showTheme(H.transform.selectedThemeId);
			if (manaCost > 0) {
				H.user.oMyData.mana -= manaCost;
				CARD.sendPGV('ISD.QQshow.Card.USE_MANA_TRANS_CARD_' + H.user.oMyData.redvip);
			}
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '变卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}
		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_transfer_card?type=' + H.transform.magicType + '&uin=' + H.user.getUin() + '&srcid=' + H.transform.selectedSrcCard.id + '&dstid=' + H.transform.selectedDstCardId + '&slottype=' + H.transform.selectedSrcCard.locate + '&slotid=' + H.transform.selectedSrcCard.slot;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};