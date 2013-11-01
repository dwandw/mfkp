H.stoveTree = {
	_steal_uin: 0,
	_my_theme_array: [],
	_my_card_map: {},
	_my_box_card_map: {},
	_my_stove_card_map: {},
	_my_stove_num_map: {},
	_my_theme_map: {},
	_dst_card_id: 0,
	_item_selected: false,
	_selected_theme_id: 0,
	_need_num_map: {},
	_dst_trans_card_id: 0,
	init: function(reload) {
		if (reload) {
			H.user.load(function() {
				H.stoveTree.init();
			});
			return;
		};
		this.initMyThemesAndMyCard();
		this.initMyStoveNum();
	},
	setStealUin: function(uin) {
		if (uin && uin != H.user.getUin()) {
			this._steal_uin = uin;
		} else {
			this._steal_uin = 0;
		}
		this.showTree(this._selected_theme_id);
	},
	showTree: function(themeId, reload) {
		if (reload) this.init(reload);
		else this.init();
		this._item_selected = false;
		themeId = themeId || (this._my_theme_array.length > 0 ? this._my_theme_array[0].tid : 40);
		this._selected_theme_id = themeId;
		this.showThemes();
		this.showTheme(themeId);
	},
	initMyThemesAndMyCard: function() {
		this._my_theme_array = [];
		this._my_card_map = {};
		this._my_box_card_map = {};
		this._my_stove_card_map = {};
		var _my_themes_temp = {};
		for (var index in H.user.mapCofferBox) {
			var slot = H.user.mapCofferBox[index];
			if (slot.id && slot.id > 0) {
				var id = slot.id;
				this._my_card_map[id] = this._my_card_map[id] ? this._my_card_map[id] + 1 : 1;
				this._my_box_card_map[id] = this._my_box_card_map[id] ? this._my_box_card_map[id] + 1 : 1;

				var themeId = CARD.data.mapCard[id][1];
				if (themeId && themeId != 0) {
					_my_themes_temp[themeId] = _my_themes_temp[themeId] ? _my_themes_temp[themeId] + 1 : 1;
				}
			}
		}
		for (var index in H.user.mapExchangeBox) {
			var slot = H.user.mapExchangeBox[index];
			if (slot.id && slot.id > 0) {
				var id = slot.id;
				this._my_card_map[id] = this._my_card_map[id] ? this._my_card_map[id] + 1 : 1;
				this._my_box_card_map[id] = this._my_box_card_map[id] ? this._my_box_card_map[id] + 1 : 1;

				var themeId = CARD.data.mapCard[id][1];
				if (themeId && themeId != 0) {
					_my_themes_temp[themeId] = _my_themes_temp[themeId] ? _my_themes_temp[themeId] + 1 : 1;
				}
			}
		}
		for (var index in H.user.mapStoveBox) {
			var slot = H.user.mapStoveBox[index];
			if (slot.id && slot.id > 0) {
				var themeId = CARD.data.mapCard[slot.id][1];
				if (themeId && themeId != 0) {
					_my_themes_temp[themeId] = _my_themes_temp[themeId] ? _my_themes_temp[themeId] + 1 : 1;
				}
			}
			if (slot.id2 && slot.id2 > 0) {
				var themeId = CARD.data.mapCard[slot.id2][1];
				if (themeId && themeId != 0) {
					_my_themes_temp[themeId] = _my_themes_temp[themeId] ? _my_themes_temp[themeId] + 1 : 1;
				}
			}
			if (slot.slottype && slot.slottype == "steal") {
				if (slot.id && slot.id > 0) {
					var id = slot.id;
					this._my_card_map[id] = this._my_card_map[id] ? this._my_card_map[id] + 1 : 1;
					this._my_stove_card_map[id] = this._my_stove_card_map[id] ? this._my_stove_card_map[id] + 1 : 1;
				}
				if (slot.id2 && slot.id2 > 0) {
					var id2 = slot.id2;
					this._my_card_map[id2] = this._my_card_map[id2] ? this._my_card_map[id2] + 1 : 1;
					this._my_stove_card_map[id2] = this._my_stove_card_map[id2] ? this._my_stove_card_map[id2] + 1 : 1;
				}
			} else {
				if (slot.id && slot.id > 0) {
					var id = slot.id;
					this._my_card_map[id] = this._my_card_map[id] ? this._my_card_map[id] + 1 : 1;
					this._my_stove_card_map[id] = this._my_stove_card_map[id] ? this._my_stove_card_map[id] + 1 : 1;
				}
			}
		}
		for (var themeId in _my_themes_temp) {
			if (themeId == 111 || themeId == 81) continue;
			this._my_theme_array.push({
				tid: themeId,
				num: _my_themes_temp[themeId]
			});
		}

		function themeNumSort(a, b) {
			return b.num - a.num;
		}
		this._my_theme_array.sort(themeNumSort);
	},
	initMyStoveNum: function() {
		this._my_stove_num_map = {};
		var _total = 0,
			_steal = 1,
			_home = 0,
			_home_used = 0,
			_steal_used = 0,
			_used = 0,
			_unused = 0;
		for (var index in H.user.mapStoveBox) {
			var slot = H.user.mapStoveBox[index];
			if (slot.slottype && slot.slottype == "steal") {
				if (slot.id && slot.id > 0) {
					_steal_used++;
				}
				if (slot.id2 && slot.id2 > 0) {
					_steal_used++;
				}
			} else {
				if (slot.id && slot.id > 0) {
					_home_used++;
				}
				_home++;
			}
			_total++;
		}
		if (H.user.oMyData.redvip) {
			_total++;
			_steal++;
		}
		this._my_stove_num_map.total = _total;
		this._my_stove_num_map.home = _home;
		this._my_stove_num_map.steal = _steal;

		this._my_stove_num_map.used = _home_used + _steal_used;
		this._my_stove_num_map.home_used = _home_used;
		this._my_stove_num_map.steal_used = _steal_used;

		this._my_stove_num_map.empty = _total - _home_used - _steal_used;
		this._my_stove_num_map.home_empty = _home - _home_used;
		this._my_stove_num_map.steal_empty = _steal - _steal_used;
	},
	showSelectTheme: function() {
		H.ui.showSelectTheme({
			handleTheme: function(tid) {
				H.stoveTree.init();
				H.stoveTree.showTree(tid);
			}
		});
	},
	initThemeMap: function(themeId) {
		function sortDsc(a, b) {
			return b - a;
		}
		this._my_theme_map = {};
		this._my_theme_map._normal_card_arr = [];
		this._my_theme_map._time_temp_arr = [];
		this._my_theme_map._time_arr = {};
		this._need_num_map = {};
		var tempTime;
		var arr = CARD.data.mapTheme[themeId][11];
		for (var i = 0, len = arr.length, id; i < len; i++) {
			id = arr[i];
			if (!CARD.data.mapCompose[id]) {
				this._my_theme_map._normal_card_arr.push(id);
				continue;
			}
			tempTime = CARD.data.mapCompose[id][6];
			if (typeof this._my_theme_map._time_arr[tempTime] == 'undefined') this._my_theme_map._time_arr[tempTime] = [];
			this._my_theme_map._time_arr[tempTime].push(id);
		}
		for (var o in this._my_theme_map._time_arr) {
			this._my_theme_map._time_temp_arr.push(o);
		}
		this._my_theme_map._time_temp_arr = this._my_theme_map._time_temp_arr.sort(sortDsc);

		function getNeedCardNumMap(cardId, flag) {
			if (!H.stoveTree._need_num_map[cardId]) H.stoveTree._need_num_map[cardId] = 0;
			H.stoveTree._need_num_map[cardId] += flag;
			if (CARD.data.mapCompose[cardId]) {
				for (var m = 0; m < 3; m++) {
					getNeedCardNumMap(CARD.data.mapCompose[cardId][m + 3], flag);
				};
			}
		}
		//计算整套卡的需求情况
		for (var i = 0; i < this._my_theme_map._time_temp_arr.length; i++) {
			var arr = this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[i]];
			for (var j = 0; j < arr.length; j++) {
				var cardId = arr[j];
				getNeedCardNumMap(cardId, 1);
			};
		}
		//计算普通卡的需求情况
		for (var i = 0, len = this._my_theme_map._normal_card_arr.length; i < len; i++) {
			if (this._need_num_map[this._my_theme_map._normal_card_arr[i]]) this._need_num_map[this._my_theme_map._normal_card_arr[i]]++;
			else this._need_num_map[this._my_theme_map._normal_card_arr[i]] = 1;
		}
		//根据已有的卡计算套卡的需求情况
		for (var i = 0; i < this._my_theme_map._time_temp_arr.length; i++) {
			var arr = this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[i]];
			for (var j = 0; j < arr.length; j++) {
				var cardId = arr[j],
					need_num = 0;
				if (this._my_card_map[cardId] > 0) {
					if (this._my_card_map[cardId] - this._need_num_map[cardId] > 0) {
						need_num = this._need_num_map[cardId];
						this._need_num_map[cardId] -= this._my_card_map[cardId] - this._need_num_map[cardId];
					} else {
						need_num = this._my_card_map[cardId];
					}
				}
				getNeedCardNumMap(cardId, 0 - need_num);
			};
		}
		//根据普通卡计算套卡的需求情况
		for (var i = 0, len = this._my_theme_map._normal_card_arr.length; i < len; i++) {
			var cardId = this._my_theme_map._normal_card_arr[i],
				need_num = 0;
			if (this._my_card_map[cardId] > 0) {
				if (this._my_card_map[cardId] - this._need_num_map[cardId] > 0) {
					need_num = this._need_num_map[cardId];
					this._need_num_map[cardId] -= this._my_card_map[cardId] - this._need_num_map[cardId];
				} else {
					need_num = this._my_card_map[cardId];
				}
			}
			this._need_num_map[cardId] -= need_num;
		}
	},
	showThemes: function() {
		var div = jQuery("#my_composing_themes");
		if (div.children().length > 0) {
			div.empty();
		}
		// var template = '\
		// 	{#if $T.length == 0}\
		// 	<strong class="tips_title">您当前没有正在合成的卡片</strong>\
		// 	{#else}\
		// 	<strong>正在合成的卡：</strong>\
		// 	{#foreach $T as to}\
		// 	<a id="{$T.to.tid}" href="javascript:void(1);" onclick="H.stoveTree.init();H.stoveTree.showTree({$T.to.tid});">{H.ui.getThemeMiniLogo($T.to.tid)}</a>\
		// 	{#/for}\
		// 	<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="H.stoveTree.showSelectTheme();" title="选择主题"><span class="ui-button-text">选择主题</span></button>\
		// 	{#/if}\
		// ';
		// div.setTemplate(template).processTemplate(this._my_theme_array);

	},
	showTheme: function(themeId) {
		var dialog = jQuery('#stove_tree_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="stove_tree_dialog"></div>');
		}
		var html = '';
		html += '<div class="width_100">';
		html += this._my_theme_array.length == 0 ? '<strong class="tips_title">您当前没有正在合成的卡片</strong>' : '<strong>正在合成的卡：</strong>';
		for (var len = this._my_theme_array.length, i = 0, obj; i < len; i++) {
			obj = this._my_theme_array[i];
			html += '<a id="' + obj.tid + '" href="javascript:void(1);" onclick="H.stoveTree.init();H.stoveTree.showTree(' + obj.tid + ');"' + (themeId == obj.tid ? 'class="current"' : '') + '>' + H.ui.getThemeMiniLogo(obj.tid) + '</a>';
		}
		html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="H.stove.showSelectTheme();" title="选择主题"><span class="ui-button-text">选择主题</span></button>';
		html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.submitCollection.init(' + themeId + ');" title="已集齐"><span class="ui-button-text">已集齐</span></button>';
		html += '</div>';

		function getStat(cardId) {
			var tem = '';
			var num = H.stoveTree._my_box_card_map[cardId] || 0;
			if (num == 0 || H.stoveTree._my_stove_card_map[cardId] > 0) {
				tem += '<span class="bg"></span>';
			}
			if (H.stoveTree._my_stove_card_map[cardId] > 0) {
				tem += '<span class="composing">合成中</span>';
			}
			if (H.stoveTree._my_card_map[cardId] > 0) {
				tem += '<span class="num"><div></div><b>' + H.stoveTree._my_card_map[cardId] + '</b></span>';
			}
			if (H.stoveTree._need_num_map[cardId] != 0) {
				tem += '<span class="need_num"><div></div><b>' + H.stoveTree._need_num_map[cardId] + '</b></span>';
			}
			return tem;
		}

		function getComposeButton(o) {
			if (CARD.data.mapCompose[o[0]]) {
				var direct_compose = false;
				var can_buy_compose = false;
				var flag1 = false;
				var flag2 = false;
				var flag3 = false;
				var can_steal = false;
				var can_compose = false;
				var meny = o[3];
				if (H.stoveTree._my_box_card_map[CARD.data.mapCompose[o[0]][3]]) flag1 = true;
				if (H.stoveTree._my_box_card_map[CARD.data.mapCompose[o[0]][4]]) flag2 = true;
				if (H.stoveTree._my_box_card_map[CARD.data.mapCompose[o[0]][5]]) flag3 = true;
				if (!CARD.data.mapCompose[CARD.data.mapCompose[o[0]][3]] && CARD.data.mapCard[CARD.data.mapCompose[o[0]][3]][3] < 40) can_buy_compose = true;
				if (!CARD.data.mapCompose[CARD.data.mapCompose[o[0]][4]] && CARD.data.mapCard[CARD.data.mapCompose[o[0]][4]][3] < 40) can_buy_compose = true;
				if (!CARD.data.mapCompose[CARD.data.mapCompose[o[0]][5]] && CARD.data.mapCard[CARD.data.mapCompose[o[0]][5]][3] < 40) can_buy_compose = true;
				if (flag1 && flag2 && flag3) direct_compose = true;
				can_steal = H.stoveTree._my_stove_num_map.steal_empty > 0 ? true : false;
				can_compose = H.stoveTree._my_stove_num_map.home_empty > 0 ? true : false;
				var html = '';
				html += '<div class="width_100 text_align_center clear">';
				if (H.stoveTree._steal_uin > 0) {
					if (meny == 40) {
						if (can_steal) {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="偷"><span class="ui-button-text">偷</span></button>';
							} else {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="买偷"><span class="ui-button-text">买偷</span></button>';
							}
						} else {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="偷"><span class="ui-button-text">偷</span></button>';
							} else {
								html += '<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="买偷"><span class="ui-button-text">买偷</span></button>';
							}
						}
					}
				} else {
					if (can_buy_compose) {
						if (can_compose) {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="合成"><span class="ui-button-text">合成</span></button>';
							} else {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="购合"><span class="ui-button-text">购合</span></button>';
							}
						} else {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="合成"><span class="ui-button-text">合成</span></button>';
							}
						}
					} else {
						if (can_compose) {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="合成"><span class="ui-button-text">合成</span></button>';
							} else {
								html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.submitCompose(' + themeId + ',' + o[0] + ');" title="自动"><span class="ui-button-text">自动</span></button>';
							}
						} else {
							if (direct_compose) {
								html += '<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="合成"><span class="ui-button-text">合成</span></button>';
							} else {
								html += '<button type="button" class="ui-button ui-widget ui-state-active ui-corner-all ui-button-text-only" onclick="javascript:void(0);" title="自动"><span class="ui-button-text">自动</span></button>';
							}
						}
					}
				}
			}
			html += '</div>';
			return html;
		}

		this.initThemeMap(themeId);
		html += '<div class="width_100 overflow_auto" style="height: 600px;">'
		for (var j = 0; j < this._my_theme_map._time_temp_arr.length; j++) {
			var _o = CARD.data.mapCompose[this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[j]][0]];
			if (_o) {
				var time = _o[6] / 60;
				var hour = Math.floor(time / 60);
				var min = time % 60;
				min = min == 0 ? "00" : ("" + min);
			}
			html += '<div class="width_100">';
			html += '    <div class="float_left width_20">';
			html += '        <div class="width_100"><strong>面值 </strong>' + CARD.data.mapCard[this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[j]][0]][3] + '</div>';
			html += '        <div class="width_100"><strong>耗时 </strong>' + hour + ':' + min + ':00</div>';
			html += '    </div>';
			html += '    <div class="float_left width_80">';
			html += '        <ul class="text_align_center overflow_auto">';
			for (i = 0, len = this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[j]].length; i < len; i++) {
				var card = CARD.data.mapCard[this._my_theme_map._time_arr[this._my_theme_map._time_temp_arr[j]][i]];
				html += '<li id="' + card[0] + '" title="' + card[2] + '" onmouseout="javascript:H.stoveTree.mouseOutComposeItem(' + card[0] + ')" onmouseover="javascript:H.stoveTree.selectItem(this,' + card[0] + ',false)" onclick="javascript:H.stoveTree.selectItem(this,' + card[0] + ',true);" class="card_mini float_left text_align_center">' + '<div class="card_mini_img width_100">' + H.ui.getCardMiniImg(card[0]) + getStat(card[0]) + '</div>' + getComposeButton(card) + '</li>';
			}
			html += '        </ul>';
			html += '    </div>';
			html += '</div>';
		}
		html += '    <div class="width_100">';
		if (H.checkRP(themeId)) {
			html += '        <div class="float_left width_20"><strong class="width_100">免合成套卡只能通过抽卡和变卡获得！</strong></div>';
		} else if (H.checkFlashCard(themeId)) {
			html += '        <div class="float_left width_20"><strong class="width_100">闪卡素材卡通过变卡获得，详情参考 <a target="_blank"href="http://service.qq.com/info/59576.html">如何炼闪卡</a></strong></div>';
		} else if (H.checkJbCard(themeId)) {
			var str = (!H.checkCanTransfer(themeId) ? '' : '变卡或');
			html += '        <div class="float_left width_20"><strong class="width_100">已下架绝版卡无法购买，只能' + str + '与卡友交换！</strong></div>';
		} else {
			html += '        <div class="float_left width_20"><strong class="width_100">素材卡</strong><strong class="time">售价：20金币/张</strong></div>';
		}
		html += '    <div class="float_left width_80">';
		html += '        <ul class="text_align_center overflow_auto">';
		for (var i = 0, len = this._my_theme_map._normal_card_arr.length; i < len; i++) {
			var card = CARD.data.mapCard[this._my_theme_map._normal_card_arr[i]];
			html += '<li id="' + card[0] + '" title="' + card[2] + '"  class="card_mini float_left">' + '<div class="width_100 card_mini_img text_align_center">' + H.ui.getCardMiniImg(card[0]) + getStat(card[0]) + '</div>';
			if (!H.checkRP(themeId) && !H.checkFlashCard(themeId) && !H.checkJbCard(themeId)) {
				html += '<div class="width_100 text_align_center clear"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.buy(' + card[0] + ',function(){H.stoveTree.showTree(' + card[1] + ')});" title="购买"><span class="ui-button-text">购买</span></button></div></li>';
			} else if (H.checkFlashCard(themeId)) {
				html += '<div class="width_100 text_align_center clear"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree._dst_trans_card_id=' + card[1] + ';H.stoveTree.buyFlashCard(' + card[1] + ',' + card[0] + ');" title="购变"><span class="ui-button-text">购变</span></button></div></li>';
			}
		}
		if (H.checkRP(themeId)) {} else if (H.checkFlashCard(themeId)) {
			html += '<li class="float_left"><div class="width_100 card_mini_img text_align_center" style="height:62px;"></div><div class="width_100 text_align_center clear"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.oneKeyBuyAndTransfer();" title="一键购变"><span class="ui-button-text">一键购变</span></button></div></li>';
		} else if (H.checkJbCard(themeId)) {} else {
			html += '<li class="float_left"><div class="width_100 card_mini_img text_align_center" style="height:62px;"></div><div class="width_100 text_align_center clear"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:H.stoveTree.oneKeyBuy();" title="一键购买"><span class="ui-button-text">一键购买</span></button></div></li>';
		}
		html += '        </ul>';
		html += '    </div>';
		html += '</div>';
		html += '</div>';
		// div.append(html).show();
		dialog.html(html);
		dialog.dialog({
			minWidth: 900,
			title: "炼卡攻略",
			dialogClass: "dialogClass",
			position: "top"
		});
	},
	mouseOutComposeItem: function(id) {

	},
	oneKeyBuyAndTransfer: function() {
		for (var i = 0, len = this._my_theme_map._normal_card_arr.length; i < len; i++) {
			var card = CARD.data.mapCard[this._my_theme_map._normal_card_arr[i]];
			H.stoveTree._dst_trans_card_id = card[0];
			H.stoveTree.buyFlashCard(card[1], card[0]);
		}
	},
	oneKeyBuy: function() {
		for (var i = 0, len = this._my_theme_map._normal_card_arr.length; i < len; i++) {
			var card = CARD.data.mapCard[this._my_theme_map._normal_card_arr[i]];
			H.stoveTree.buy(card[0], function() {
				H.stoveTree.showTree(card[1]);
			});
		}
	},
	selectItem: function(o, id, selected) {
		if (this._item_selected && !selected) return;
		if (!this._item_selected && selected) this._item_selected = selected;
		jQuery("#stove_tree_dialog .card_mini.mouse_on").removeClass("mouse_on");
		jQuery("#stove_tree_dialog .card_mini.linked").removeClass("linked");
		var d = CARD.data.mapCompose[id];
		if (!d) return;
		jQuery("#stove_tree_dialog .card_mini#" + id).addClass("mouse_on");
		for (var i = 0; i < 3; i++) {
			jQuery("#stove_tree_dialog .card_mini#" + d[i + 3]).addClass("linked");
		}
	},
	submitCompose: function(themeId, cardId) {
		if (!CARD.data.mapCompose[cardId]) return;
		this._dst_card_id = cardId;
		var cardData = CARD.data.mapCompose[cardId];
		if (!this._my_card_map[cardData[3]]) {
			if (CARD.data.mapCard[cardData[3]][3] < 40) {
				this.buyCard(themeId, cardData[3]);
				return;
			} else {
				this.submitCompose(themeId, cardData[3]);
				return;
			}
		}
		if (!this._my_card_map[cardData[4]]) {
			if (CARD.data.mapCard[cardData[4]][3] < 40) {
				this.buyCard(themeId, cardData[4]);
				return;
			} else {
				this.submitCompose(themeId, cardData[4]);
				return;
			}
		}
		if (!this._my_card_map[cardData[5]]) {
			if (CARD.data.mapCard[cardData[5]][3] < 40) {
				this.buyCard(themeId, cardData[5]);
				return;
			} else {
				this.submitCompose(themeId, cardData[5]);
				return;
			}
		}
		var obj = {};
		var data = CARD.data.mapCompose[cardId];
		var flag1 = false,
			flag2 = false,
			flag3 = false;
		for (var i in H.user.mapExchangeBox) {
			if (!flag1 && data[3] == H.user.mapExchangeBox[i].id) {
				flag1 = true;
				obj['slot1'] = H.user.mapExchangeBox[i].slot;
				obj['slottype1'] = 0;
			}
			if (!flag2 && data[4] == H.user.mapExchangeBox[i].id) {
				flag2 = true;
				obj['slot2'] = H.user.mapExchangeBox[i].slot;
				obj['slottype2'] = 0;
			}
			if (!flag3 && data[5] == H.user.mapExchangeBox[i].id) {
				flag3 = true;
				obj['slot3'] = H.user.mapExchangeBox[i].slot;
				obj['slottype3'] = 0;
			}
		}
		if (!flag1 || !flag2 || !flag3) {
			for (var i in H.user.mapCofferBox) {
				if (!flag1 && data[3] == H.user.mapCofferBox[i].id) {
					flag1 = true;
					obj['slot1'] = H.user.mapCofferBox[i].slot;
					obj['slottype1'] = 1;
				}
				if (!flag2 && data[4] == H.user.mapCofferBox[i].id) {
					flag2 = true;
					obj['slot2'] = H.user.mapCofferBox[i].slot;
					obj['slottype2'] = 1;
				}
				if (!flag3 && data[5] == H.user.mapCofferBox[i].id) {
					flag3 = true;
					obj['slot3'] = H.user.mapCofferBox[i].slot;
					obj['slottype3'] = 1;
				}
			}
		}
		if (!flag1 || !flag2 || !flag3) {
			H.ui.showErrDlg({
				title: '炼卡失败',
				msg: "子卡正在合成中！"
			});
			return;
		}
		obj.themeid = themeId;
		obj.targetid = cardId;
		obj.targettype = 1;
		if (this._steal_uin > 0) {
			this.submitStealStove(obj, function() {
				H.stoveBox.showStoves();
				H.stoveTree.showTree(themeId);
			});
		} else {
			this.submitCardStove(obj, function() {
				H.stoveBox.showStoves();
				H.stoveTree.showTree(themeId);
			});
		}
	},
	buyCard: function(themeId, cardId) {
		var slotId = H.user.getEmptySlot(0);
		if (-1 == slotId) {
			H.ui.showErrDlg({
				title: '购买失败',
				msg: "换卡箱满了！"
			});
			return;
		}
		if (CARD.data.mapTheme[themeId][16] == 0) {
			this.buy(cardId, function() {
				H.stoveTree.showTree(themeId);
				if (H.stoveTree._dst_card_id) H.stoveTree.submitCompose(themeId, H.stoveTree._dst_card_id);
			});
		} else {
			this.buyFlashCard(themeId, cardId);
		}
	},
	buyFlashCard: function(themeId, cardId) {
		var srcThemeId = CARD.data.mapTheme[themeId][16];
		var arr = CARD.data.mapTheme[srcThemeId][11];
		var srcCardId = 0;
		var normalCarArr = [];
		for (var i = 0, len = arr.length, id; i < len; i++) {
			id = arr[i];
			if (!CARD.data.mapCompose[id]) {
				normalCarArr.push(id);
			}
		}
		var slotId = -1,
			slotType = 0;
		for (var i = 0, len = normalCarArr.length; i < len; i++) {
			srcCardId = normalCarArr[i];
			if (this._my_box_card_map[srcCardId] > 0) {
				slotId = H.user.getSlotIdByCardId(srcCardId, slotType);
				if (slotId == -1) {
					slotType = 1;
					slotId = H.user.getSlotIdByCardId(srcCardId, slotType);
				}
				setTimeout(function() {
					H.stoveTree.transCard(cardId, srcCardId, slotId, slotType, function() {
						H.stoveTree.showTree(themeId);
						if (H.stoveTree._dst_card_id) H.stoveTree.submitCompose(themeId, H.stoveTree._dst_card_id);
						if (H.stoveTree._dst_trans_card_id) H.stoveTree.buyFlashCard(themeId, cardId);
					});
				}, 2000);
				return;
			}
		}
		srcCardId = normalCarArr[parseInt(Math.random() * 100) % normalCarArr.length];
		this.buy(srcCardId, function() {
			var slotId = H.user.getSlotIdByCardId(srcCardId, 0);
			setTimeout(function() {
				H.stoveTree.transCard(cardId, srcCardId, slotId, 0, function() {
					H.stoveTree.showTree(themeId);
					if (H.stoveTree._dst_card_id) H.stoveTree.submitCompose(themeId, H.stoveTree._dst_card_id);
					if (H.stoveTree._dst_trans_card_id) H.stoveTree.buyFlashCard(themeId, cardId);
				});
			}, 2000);
		});
	},
	submitStealStove: function(o, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode, obj.getAttribute("message"), iEndTime);
				return;
			}
			var iEndTime = obj.getAttribute("endTime") || 0;
			var card = oXml.xmlDom.getElementsByTagName("card")[0];
			var slot = H.user.mapStoveBox[6];
			if (slot.id && slot.id > 0) {
				slot.id2 = card.getAttribute("id") * 1;
				slot.btime = card.getAttribute("btime") * 1;
				slot.locktime = card.getAttribute("times") * 1;
			} else {
				slot.id = card.getAttribute("id") * 1;
				slot.btime = card.getAttribute("btime") * 1;
				slot.locktime = card.getAttribute("times") * 1;
			}
			H.user.clearSlot(o.slot1, o.slottype1);
			H.user.clearSlot(o.slot2, o.slottype2);
			H.user.clearSlot(o.slot3, o.slottype3);
			setTimeout("CARD.mission.checkMission(CARD.mission.M_STOVE_STEAL_1)", 0);
			H.notification.getUnlockTimes();
			if (fnSucceed) fnSucceed();
		}

		function callback_onOk(iVeryCode) {
			H.ui.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_stove_steal?ver=1&opuin=' + H.stoveTree._steal_uin + '&slot1=' + o.slot1 + '&slot2=' + o.slot2 + '&slot3=' + o.slot3 + '&slottype1=' + o.slottype1 + '&slottype2=' + o.slottype2 + '&slottype3=' + o.slottype3 + '&themeid=' + o.themeid + '&targetid=' + o.targetid + '&targettype=' + o.targettype + '&code=' + iVeryCode;
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		}

		function fnError(iCode, sMsg, iEndTime) {
			H.ui.waitEnd();
			var onOK, onOKText;

			function GotoVipSteal2() {
				window.open("http://show.qq.com/show_v3.html?MUrl=/mall/inc/vipportal_card_vipsteal2.html", "_blank");
			}

			function OpenVip() {
				window.open("http://pay.qq.com/qqshow/index.shtml?ch=self&pageshow=bank&aid=show.show.card_vip.12.link2_0", "_blank");
			}

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
						CARD.showLogin();
					}
				} catch (e) {
					console.error(e);
				}
				return;
			} else {
				if (iCode == -32002) {
					alert("系统繁忙，请稍后再试!");
				} else if (iCode == -33031) {
					if (H.user.oMyData.redvip == 1) {
						sMsg = "红钻用户目前只可同时偷2个炉子。您可炼完现在的卡再继续偷炉。";
						onOK = GotoVipSteal2;
						onOKText = "了解详情";
					} else {
						sMsg = '非红钻用户只可同时偷1个炉子。红钻尊享同时偷<font color="red">2个</font>炉子特权！';
						onOK = OpenVip;
						onOKText = "开通红钻";
					}
				} else if (iCode == -33076) {
					sMsg = '对不起，您好友的专属精灵施展了"据守"技能，您无法偷他的炉！';
				}
				H.ui.showErrDlg({
					title: H.stoveTree._steal_uin > 0 ? '偷炉失败' : '炼卡失败',
					msg: sMsg,
					button_title: onOKText,
					button_func: onOK
				});
				return;
			}
		}

		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_stove_steal?ver=1&opuin=' + this._steal_uin + '&slot1=' + o.slot1 + '&slot2=' + o.slot2 + '&slot3=' + o.slot3 + '&slottype1=' + o.slottype1 + '&slottype2=' + o.slottype2 + '&slottype3=' + o.slottype3 + '&themeid=' + o.themeid + '&targetid=' + o.targetid + '&targettype=' + o.targettype;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	submitCardStove: function(o, fnSucceed) {
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
			var stoveNum = parseInt(obj.getAttribute("stovenum")) || 0;
			var card = oXml.xmlDom.getElementsByTagName("card")[0];
			var _oCard = {
				slot: card.getAttribute("slotid") * 1,
				stove: card.getAttribute("stoveid") * 1,
				btime: card.getAttribute("btime") * 1,
				locktime: card.getAttribute("times") * 1,
				id: card.getAttribute("id") * 1,
				type: card.getAttribute("type") * 1,
				flag: card.getAttribute("flag") * 1,
				prop: card.getAttribute("prop") * 1
			};
			H.user.mapStoveBox[_oCard.slot] = _oCard;
			H.user.clearSlot(o.slot1, o.slottype1);
			H.user.clearSlot(o.slot2, o.slottype2);
			H.user.clearSlot(o.slot3, o.slottype3);
			H.notification.getUnlockTimes();
			if (fnSucceed) fnSucceed();
		}

		function callback_onOk(iVeryCode) {
			var strBFlash1 = H.checkFlashCard(o.themeid) ? '&bflash=1' : '&bflash=0';
			H.ui.waitStart();
			var sUrl = 'http://card.show.qq.com/cgi-bin/card_stove_refine?ver=1&slot1=' + o.slot1 + '&slot2=' + o.slot2 + '&slot3=' + o.slot3 + '&slottype1=' + o.slottype1 + '&slottype2=' + o.slottype2 + '&slottype3=' + o.slottype3 + '&themeid=' + o.themeid + '&targetid=' + o.targetid + '&targettype=' + o.targettype + '&code=' + iVeryCode + strBFlash1;
			var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
			xhr.send();
		}

		function fnError(iCode, sMsg, iEndTime) {
			if (0 == CARD.handleVerifyPage(iCode, document.body, {
				mask: true,
				onOK: callback_onOk,
				onClose: function() {}
			}, iEndTime)) return;
			if (iCode == -1001) {
				try {
					if (!CARD.checkLogin()) {
						CARD.showLogin();
					}
				} catch (e) {
					console.error(e);
				}
				return;
			} else {
				var refresh = false;
				if (iCode == -32002) {
					refresh = true;
				}
				H.ui.showErrDlg({
					title: H.stoveTree._steal_uin > 0 ? '偷炉失败' : '炼卡失败',
					msg: sMsg
				});
				return;
			}
		}
		var strBFlash = H.checkFlashCard(o.themeid) ? '&bflash=1' : '&bflash=0';
		H.ui.waitStart();
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_stove_refine?ver=1&slot1=' + o.slot1 + '&slot2=' + o.slot2 + '&slot3=' + o.slot3 + '&slottype1=' + o.slottype1 + '&slottype2=' + o.slottype2 + '&slottype3=' + o.slottype3 + '&themeid=' + o.themeid + '&targetid=' + o.targetid + '&targettype=' + o.targettype + strBFlash;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	transCard: function(dstCardId, srcCardId, slotId, slotType, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnError(iCode);
				return;
			}
			var result = obj.getAttribute("result");
			if (result == 1) {
				if (slotType == 0) {
					H.user.mapExchangeBox[slotId].id = dstCardId;
					H.user.mapExchangeBox[slotId].unlock = parseInt(new Date().getTime() / 1000) + 300;
				} else {
					H.user.mapCofferBox[slotId].id = dstCardId;
				}
				setTimeout("CARD.mission.checkMission(CARD.mission.M_TRANS_CARD_1)", 0);
				H.stoveTree._dst_trans_card_id = 0;
			} else {
				H.user.clearSlot(slotId, slotType);
			}
			if (fnSucceed) fnSucceed();
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
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_transfer_card?type=5&uin=' + H.user.getUin() + '&srcid=' + srcCardId + '&dstid=' + dstCardId + '&slottype=' + slotType + '&slotid=' + slotId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	buy: function(cardId, fnSucceed) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = parseInt(obj.getAttribute("code"));
			if (iCode != 0) {
				console.error(H.resChinese(oXml.text));
				fnFail(iCode);
				return;
			}
			var card = obj.getElementsByTagName("card")[0];
			var _oCard = {
				slot: card.getAttribute("slot") * 1,
				status: card.getAttribute("status") * 1,
				unlock: card.getAttribute("unlock") * 1,
				id: card.getAttribute("id") * 1,
				type: card.getAttribute("type") * 1,
				st: card.getAttribute("st") * 1
			};
			H.user.mapExchangeBox[_oCard.slot] = _oCard;
			H.user.oMyData.money -= 20;
			setTimeout("CARD.mission.checkMission(CARD.mission.BUY_CARD)", 0);
			if (fnSucceed) fnSucceed();
		}

		function fnFail(iCode) {
			H.ui.waitEnd();
			H.ui.showErrDlg({
				title: '购买失败',
				msg: H.getMsgByCode(iCode)
			});
			return;
		}

		H.ui.waitStart();
		var url = 'http://card.show.qq.com/cgi-bin/card_market_npc_buy?theme_id=' + CARD.data.mapCard[cardId][1] + '&card_id=' + cardId;
		var xhr = new CARD.XHR(url, fnSucc, null, fnFail);
		xhr.send();
	}
};