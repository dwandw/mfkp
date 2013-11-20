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
				var canOnClick = false;
				var needMask = false;
				if (arg.onClick) {
					canOnClick = arg.canOnClick(slot.slot, slot.locate);
					if (arg.needMask)
						needMask = arg.needMask(slot.slot, slot.locate);
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
					} else if (needMask) {
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
				if (now < slot.unlock && slot.locate == 0) {
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
			obj.moveArcColor = 'red';
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
				html += '            <h3 class="theme_difficult_lv"><span>难度系数</span><strong class="rank"><span class="card_lv' + (j + 1) + '"></span></strong></h3>';
				html += '            <ul class="overflow_auto">';
				tempArr[i][j].sort(function(a, b) {
					return b[0] - a[0];
				});
				for (var k = 0; k < tempArr[i][j].length; k++) {
					var theme = tempArr[i][j][k];
					html += '                <li onclick="javascript:H.ui.handleTheme(' + theme[0] + ')" class="float_left text_align_center width_23';
					var num = 0;
					if (H.user.mapCollection[theme[0]] && H.user.mapCollection[theme[0]].num) {
						num = H.user.mapCollection[theme[0]].num;
					}
					if (num > 0) {
						if (num < 4)
							html += ' background_color_red';
						else
							html += ' background_color_gray';
					} else {
						html += ' background_color_dark_red';
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