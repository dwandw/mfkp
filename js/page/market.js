H.market = {
	tabArr: [],
	time: 0,
	showNow: 0,
	selectedDstCard: 0,
	selectedSrcCardArr: [],
	init: function(fnSucceed, reload) {
		var dialog = jQuery('#market_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="market_dialog"></div>');
		}
		var html = '';
		html += '<div class="width_50 float_left">';
		html += '    <div id="market_dialog_market_tabs">';
		html += '        <ul>';
		html += '            <li><a href="#market_dialog_market_tabs-0">全部</a></li>';
		html += '            <li><a href="#market_dialog_market_tabs-1">一星卡</a></li>';
		html += '            <li><a href="#market_dialog_market_tabs-2">二星卡</a></li>';
		html += '            <li><a href="#market_dialog_market_tabs-3">三星卡</a></li>';
		html += '            <li><a href="#market_dialog_market_tabs-4">四星卡</a></li>';
		html += '            <li><a href="#market_dialog_market_tabs-5">五星卡</a></li>';
		html += '            <span id="market_dialog_time_leave"></span>';
		html += '        </ul>';
		html += '        <div id="market_dialog_market_tabs-0">';
		html += '        </div>';
		html += '        <div id="market_dialog_market_tabs-1">';
		html += '        </div>';
		html += '        <div id="market_dialog_market_tabs-2">';
		html += '        </div>';
		html += '        <div id="market_dialog_market_tabs-3">';
		html += '        </div>';
		html += '        <div id="market_dialog_market_tabs-4">';
		html += '        </div>';
		html += '        <div id="market_dialog_market_tabs-5">';
		html += '        </div>';
		html += '    </div>';
		html += '</div>';
		html += '<div class="width_50 float_left">';
		html += '    <div id="market_dialog_my_box_tabs">';
		html += '        <ul>';
		html += '            <li><a href="#market_dialog_my_box_tabs-0" onclick="javascript:H.market.showMyExchangeBox();">我的换卡箱</a></li>';
		html += '            <li><a href="#market_dialog_my_box_tabs-1" onclick="javascript:H.market.showMyCofferBox();">我的保险箱</a></li>';
		html += '        </ul>';
		html += '        <div id="market_dialog_my_box_tabs-0">';
		html += '        </div>';
		html += '        <div id="market_dialog_my_box_tabs-1">';
		html += '        </div>';
		html += '    </div>';
		html += '</div>';
		html += '<div class="clear"></div>';
		html += '<div id="market_dialog_exchange_button" class="width_100 text_align_center">';
		html += '    <a href="javascript:void(1);" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="H.market.goExchange();"><span class="ui-button-text">交换</span></a>';
		html += '</div>';
		dialog.html(html);
		dialog.dialog({
			minWidth: 1030,
			title: "卡片市场",
			dialogClass: "dialogClass",
			position: "top"
		});
		jQuery('#market_dialog_market_tabs').tabs({
			active: 0
		});
		jQuery('#market_dialog_my_box_tabs').tabs({
			active: 0
		});
		if (this.tabArr.length == 0 || (this.showNow == 1 && this.time == 0)) {
			this.load();
		} else {
			this.showCards();
		}
	},
	updateTime: function() {
		this.time--;
		if (this.time > 0) {
			var html = '距离下次更新卡片还有' + Math.floor(this.time / 60) + "分" + this.time % 60 + "秒";
			jQuery('#market_dialog_time_leave').html(html);
			this.timer = setTimeout(function() {
				H.market.updateTime();
			}, 1000);
		} else {
			if (this.showNow == 0) {
				this.showNow = 1;
				this.showCards();
				this.time = 300;
				this.timer = setTimeout(function() {
					H.market.updateTime();
				}, 1000);
			} else {
				// this.load();
			}
		}
	},
	show: function() {
		this.init();
	},
	showCards: function() {
		for (var i = 0; i < this.tabArr[this.showNow].length; i++) {
			html = '<ul class="overflow_auto">';
			for (var j = 0; j < this.tabArr[this.showNow][i].length; j++) {
				var card = this.tabArr[this.showNow][i][j];
				html += '<li id="' + card[0] + '" onclick="javascript:H.market.onClick(this, ' + card[0] + ');" class="float_left card_big">';
				html += '<div class="card_big_img">';
				html += H.ui.getImgItemWithBg(card[0]);
				html += '</div>';
				html += '</li>';
			}
			html += '</ul>';
			jQuery('#market_dialog_market_tabs-' + i).html(html);
		};
		this.showMyExchangeBox();
	},
	showMyExchangeBox: function() {
		var div = jQuery('#market_dialog_my_box_tabs-0');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.user.mapExchangeBox,
			onClick: "H.market.mouseClickSlotItem",
			canOnClick: function(slotId, locate) {
				if (CARD.data.mapCard[H.user.mapExchangeBox[slotId].id][3] > 10) return false;
				return true;
			}
		});
		div.html(html);
	},
	showMyCofferBox: function() {
		var div = jQuery('#market_dialog_my_box_tabs-1');
		if (div.children().length > 0) {
			div.empty();
		}
		var html = H.ui.showBox({
			box: H.user.mapCofferBox,
			onClick: "H.market.mouseClickSlotItem",
			canOnClick: function(slotId, locate) {
				if (CARD.data.mapCard[H.user.mapCofferBox[slotId].id][3] > 10) return true;
				return false;
			}
		});
		div.html(html);
	},
	onClick: function(obj, cardId) {
		doc = jQuery(obj);
		var selected = true;
		if (doc.attr("class").indexOf("selected") > -1) selected = false;
		if (selected) {
			jQuery('#market_dialog_market_tabs .selected').removeClass("selected");
			doc.addClass("selected");
			this.selectedDstCard = CARD.data.mapCard[cardId];
		} else {
			doc.removeClass("selected");
			this.selectedDstCard = 0;
		}
	},
	mouseClickSlotItem: function(obj, slotId, locate) {
		if (!this.selectedDstCard) return;
		doc = jQuery(obj);
		var selected = true;
		if (doc.attr("class").indexOf("selected") > -1) selected = false;
		if (selected) {
			if (this.selectedSrcCardArr.length == 10) return;
			doc.addClass("selected");
			this.selectedSrcCardArr.push(locate ? H.user.mapCofferBox[slotId] : H.user.mapExchangeBox[slotId]);
		} else {
			doc.removeClass("selected");
			this.selectedSrcCardArr.pop(locate ? H.user.mapCofferBox[slotId] : H.user.mapExchangeBox[slotId]);
		}
	},
	goExchange: function() {
		if (!this.selectedDstCard || !this.selectedSrcCardArr.length) {
			alert("请选择卡片！");
			return;
		}
		var srcInfo = '';
		for (var i = 0; i < this.selectedSrcCardArr.length; i++) {
			var slot = this.selectedSrcCardArr[i];
			srcInfo += slot.id + '_' + slot.slot + '_' + slot.locate + (i === this.selectedSrcCardArr.length - 1 ? '' : '|');
		}
		this.exchange(srcInfo, function() {
			var now = parseInt(new Date().getTime() / 1000);
			now = now + 300;
			for (var i = 0; i < H.market.selectedSrcCardArr.length; i++) {
				var slot = H.market.selectedSrcCardArr[i];
				slot.id = H.market.selectedDstCard[0];
				slot.unlock = now;
			}
			H.ui.showErrDlg({
				title: '提示',
				msg: '和商店交换卡片成功！'
			});
			setTimeout(function() {
				H.ui.removeErrDlg();
			}, 1000);
			H.market.selectedDstCard = 0;
			H.market.selectedSrcCardArr = [];
			H.market.showMyExchangeBox();
			H.market.showMyCofferBox();
			H.market.showCards();
		});
	},
	load: function(fnSucceed) {
		// function fnSucc(oXml) {
		// 	H.ui.waitEnd();
		// 	console.debug(oXml.text);
		// 	var str = oXml.text;
		// 	str = str.substr(str.indexOf("("));
		// 	qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
		// 	code = qqhome.getAttribute("code");
		// 	if (code != 0) {
		// 		console.warn(oXml);
		// 		fnError(code);
		// 		return;
		// 	}
		// 	if (fnSucceed) fnSucceed();
		// }

		// function fnError(iCode) {
		// 	H.ui.waitEnd();
		// 	H.ui.showErrDlg({
		// 		title: '加载市场卡片失败',
		// 		msg: H.getMsgByCode(iCode)
		// 	});
		// 	return;
		// }

		H.ui.waitStart();
		// var sUrl = 'http://card.show.qq.com/cgi-bin/card_market_npc_exchange_read?type=0&step=1&timestamp=';
		// var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		// xhr.send();
		jQuery.ajax({
			type: "get",
			async: false,
			url: "http://card.show.qq.com/cgi-bin/card_market_npc_exchange_read?type=0&step=1&timestamp=",
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback: "MARKET._callback_exchange_read_",
			success: function(json) {
				console.debug(json);
			},
			error: function() {}
		});
	},
	exchange: function(srcInfo, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			qqhome = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			code = qqhome.getAttribute("code");
			if (code != 0) {
				console.error(oXml.text);
				fnError(code);
				return;
			}

			if (fnSucceed) fnSucceed();
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '和市场换卡失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}
		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_market_npc_exchange?destcard=' + this.selectedDstCard[0] + '&desttheme=' + this.selectedDstCard[1] + '&srcinfo=' + srcInfo;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};

var MARKET = {
	_callback_exchange_read_: function(code, data) {
		function fnError(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '加载市场卡片失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}
		code = code * 1;
		if (code != 0) {
			console.error(oXml.text);
			fnError(code);
			return;
		}
		H.ui.waitEnd();
		H.market.time = data.time;
		H.market.updateTime();
		H.market.tabArr = [
			[
				[],
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
				[],
				[]
			]
		];
		for (var i = 0; i < data.data.length; i++) {
			temp = data.data[i];
			for (var j = 0; j < temp.length; j++) {
				obj = temp[j];
				var card = CARD.data.mapCard[obj["id"]];
				if (card) {
					H.market.tabArr[i][CARD.data.mapTheme[obj["tid"]][2]].push(card);
					H.market.tabArr[i][0].push(card);
				}
			};
		};
		H.market.showCards();
	}
};