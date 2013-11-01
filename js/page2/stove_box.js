require.config({
	paths: {
		"date": "lib/date",
	}
});
define(['date', 'HUi', 'HUser'], function(_, HUi, HUser) {
	var timer;
	return {
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
		showStoveBox: function() {
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
			var mapStoveBox = HUser.getMapStoveBox();
			for (var index in mapStoveBox) {
				var slot = mapStoveBox[index];
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
					html += ' onmouseover="javascript:HUi.mouseOverSlotItem(this)" onmouseout="javascript:HUi.mouseOutSlotItem(this)"';
				}
				html += '>';
				html += '<div class="card_big_img">';
				html += HUi.getImgItemWithBg(slot.id);
				if (i == stoveArr.length - 1) {
					html += '<span class="position_absolute buttons" style="display:none;"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:HStoveBox.cancelStoveCard(' + slot.slot + ',' + slot.id + ');"><span class="ui-button-text">取消</span></button></span>';
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
				html += HUi.getImgItemWithBg(slot.id);
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
					html += HUi.getImgItemWithBg(slot.id);
					html += '</div>';
					html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
					html += '<div id="timer_' + slot.slot + '" class="width_100 text_align_center clear" style="position:relative;height:30px;"></div>';
					html += '</li>';
				}
				if (slot.id2 && slot.id2 > 0) {
					html += '<li id="' + slot.slot + '" class="float_left card_big text_align_center">';
					html += '<div class="card_big_img">';
					html += HUi.getImgItemWithBg(slot.id2);
					html += '</div>';
					html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
					html += '<div id="timer_' + slot.slot + '_1" class="width_100 text_align_center clear" style="position:relative;height:30px;"></div>';
					html += '</li>';
				}
			}
			html += '</ul>';
			div.append(html);
			this._showStoveBox(stoveArr, now);
		},
		_showStoveBox: function() {
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
			for (var index in HUser.getMapStoveBox()) {
				var slot = HUser.getMapStoveBox()[index];
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
					html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:HStoveBox.getStoveCard(' + slot.slot + ',function(){HStoveBox.showStoveBox();HStoveBox.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
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
				html += HUi.getImgItemWithBg(slot.id);
				html += '</div>';
				html += '<div class="width_100 text_align_center clear">' + getDayStr(slot.btime + slot.locktime) + '</div>';
				if (slot.btime + slot.locktime - new Date().getTime() / 1000 > 0) {
					html += '<div class="width_100 text_align_center clear"><a class="bt4_tx2" href="javascript:void(0);" title="扣卡">' + slot.slot + '扣卡</a></div>';
				} else {
					html += '<div class="width_100 text_align_center clear"><a class="bt_tx2" href="javascript:void(1);" onclick="javascript:HStoveBox.getStolenCard(' + slot.slot + ',function(){HStoveBox.showStoveBox();HStoveTree.showStoveTree(' + this._selected_theme_id + ');})" title="扣卡">' + slot.slot + '扣卡</a></div>';
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
						html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:HStoveBox.getStealCard(0,' + slot.opuin + ',function(){HStoveBox.showStoveBox();HStoveTree.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
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
						html += '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="javascript:HStoveBox.getStealCard(1,' + slot.opuin2 + ',function(){HStoveBox.showStoveBox();HStoveTree.showStoveTree(' + this._selected_theme_id + ');});" title="取卡"><span class="ui-button-text">取卡</span></button>';
						if (jQuery('#timer_' + slot.slot + '_1').html().indexOf("取卡") < 0) {
							jQuery('#timer_' + slot.slot + '_1').html(html);
						}
					}

				}
			}

			timer = setTimeout(function() {
				this._showStoveBox();
			}, 1000);
		}
	};
});