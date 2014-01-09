H.share = {
	_uin: 0, //我的uin
	_MyshareList: [], //撒礼列表
	init: function() {
		var dialog = jQuery('#share_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="share_dialog"></div>');
		}
		var html = '';
		html += '<div class="popup_module1 popup_share" id="DIV_MAIN" style="margin:0px;padding-top:0px;width:490px;">';
		html += '    <div class="mdl_c_c">';
		html += '        <div class="content_text">';
		html += '            <div class="popup_share_list">';
		html += '                <ul class="list_module" id="UL_GIFT_LIST">';
		html += '                </ul>';
		html += '            </div>';
		html += '        </div>';
		html += '    </div>';
		html += '</div>';
		html += '<div class="popup_module1 card_vipexchange" id="DIV_ALERT" style="display:none;width:490px;">';
		html += '    <div class="title">';
		html += '        <h2>温馨提示</h2>';
		html += '    </div>';
		html += '    <!--mdl_c_c 开始-->';
		html += '    <div class="mdl_c_c">';
		html += '        <div class="content">';
		html += '        <center><h3><strong id="STRONG_INFO" style="font-size:14px;"></strong></h3></center>';
		html += '        <div class="btns">';
		html += '            <button class="bt2_tx4" type="button" onclick="jQuery(\'#share_dialog #DIV_MAIN\').show();jQuery(\'#share_dialog #DIV_ALERT\').hide();">确定</button>';
		html += '        </div>';
		html += '        </div>';
		html += '    </div>';
		html += '    <!--mdl_c_c 结束-->';
		html += '    <button class="close" type="button" title="关闭" onclick="H.share.closeDialog();">关闭</button>';
		html += '</div>';

		dialog.html(html);
		dialog.dialog({
			minWidth: 520,
			title: "好友分享(小提示：这里将记录近期的20条分享)",
			dialogClass: "dialogClass",
			position: "top"
		});
		H.share._uin = H.user.getUin(); //获取当前登录用户的UIN
		H.share._getMyGiftList(); //获取当前用户的20条分享
	},
	closeDialog: function() {
		jQuery('#share_dialog').dialog("close");
	},
	_getMyGiftList: function() {
		function fnSucc(oXML) {
			var oElem = oXML.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = parseInt(oElem.getAttribute("code"));
			if (iCode != 0) {
				console.error(oXML.text);
				fnFail(iCode);
				return;
			}
			var oColList = oXML.xmlDom.getElementsByTagName("Node");
			for (var i = 0; i < oColList.length; ++i) {
				var friendUin = parseInt(oColList[i].getAttribute("frienduin"));
				var userName = unescape(CARD.getFlashObj().getNickAtUin(friendUin));
				if (userName == '') {
					userName = friendUin + ''; //如果读不到用户的昵称，则显示QQ号码
				}
				var friendName = userName.replace(/\r\n/g, '').replace(/\r/g, '').replace(/\n/g, '').escHtml();
				H.share._MyshareList[H.share._MyshareList.length] = [friendName, parseInt(oColList[i].getAttribute("type")), parseInt(oColList[i].getAttribute("record")), parseInt(oColList[i].getAttribute("money")), parseInt(oColList[i].getAttribute("gift")), friendUin, parseInt(oColList[i].getAttribute("timestamp")), parseInt(oColList[i].getAttribute("data"))];
			}
			H.share._displayGiftInfo(); //开始显示好友分享的弹出框
		}

		function fnFail(iCode) {
			if (iCode == -1001) {
				closeDialog();
				CARD.showLogin();
				return;
			} else {
				sContent = "目前查看奖励的人太多了，请稍后再来";
			}

			jQuery('#share_dialog #DIV_MAIN').hide();
			jQuery('#share_dialog #STRONG_INFO').html(sContent); /**escNone**/
			jQuery('#share_dialog #DIV_ALERT').show();
		}

		var url = 'http://card.show.qq.com/cgi-bin/card_user_share_info?uin=' + H.share._uin + "&type=0";
		var xml_sender = new CARD.XHR(url, fnSucc, null, fnFail);
		xml_sender.send();
	},

	//显示好友分享的弹出框
	_displayGiftInfo: function() {
		var str = [];
		for (var i = H.share._MyshareList.length - 1; i >= 0; --i) {
			var _theme;
			var _card;
			if (H.share._MyshareList[i][1] == 1) {
				_theme = CARD.data.mapTheme[H.share._MyshareList[i][2]];
				if (_theme == undefined) {
					continue;
				}
			} else if (H.share._MyshareList[i][1] == 2) {} else if (H.share._MyshareList[i][1] == 3) {
				_card = CARD.data.mapCard[H.share._MyshareList[i][7]];
				if (_card == undefined) {
					continue;
				}
			} else { //兼容性处理，对于没有定义的类型就不显示。
				continue;
			}
			str[str.length] = '<li><span class="popup_share_list_h">';
			if (H.share._MyshareList[i][1] == 1) {
				str[str.length] = H.ui.getThemeBigLogo(_theme[0]) + '</span>';
				//str[str.length] = '<img src="http://appimg2.qq.com/card/img/theme/' + _theme[0] + '_big_logo"  alt="' + _theme[1] + '"/></span>';
			} else if (H.share._MyshareList[i][1] == 3) {
				str[str.length] = H.ui.getCardMiniImg(_card[0]) + '</span>';
				//str[str.length] = '<img src="/card/img/card/' + _card[0] + '_56?ver=0" alt="' + _card[2] + '"></span>';
			} else {
				str[str.length] = '<img src="http://appimg2.qq.com/card/ac/img/levelup.jpg" alt="" /></span>';
			}
			str[str.length] = '<div class="popup_share_list_c"><div class="popup_share_list_c_align"><span class="popup_share_list_c_align_sp">';
			str[str.length] = '<strong>' + H.share._MyshareList[i][0] + '</strong>';
			if (H.share._MyshareList[i][1] == 1) {
				str[str.length] = '集成了' + _theme[2] + '星套卡' + _theme[1] + '！';
				str[str.length] = '<br/>魔法学院奖励TA和好友们 <em>金币' + H.share._MyshareList[i][3] + '</em></span></div></div>';
			} else if (H.share._MyshareList[i][1] == 3) {
				str[str.length] = '和你换了' + H.share._MyshareList[i][2] + '张卡!';
				str[str.length] = '<br/>魔法学院奖励你 <em>金币' + H.share._MyshareList[i][3] + '</em></span></div></div>';
			} else {
				str[str.length] = '在魔法世界中升级到了Lv' + H.share._MyshareList[i][2] + '！';
				str[str.length] = '<br/>魔法学院奖励TA和好友们 <em>金币' + H.share._MyshareList[i][3] + '</em></span></div></div>';
			}
			str[str.length] = '<div class="popup_share_list_s" id="DIV_STATE_' + i + '"><span class="popup_share_icon_g"></span>';
			if (H.share._MyshareList[i][4] == 1)
				str[str.length] = '<em>领取成功！</em>';
			else
				str[str.length] = '<button class="bt_tx4" type="button" onclick="javascript:H.share._getShareGift(' + i + ')">领取奖励</button>';
			str[str.length] = '</div><span class="listm_q"></span><span class="listm_p"></span><span class="listm_z"></span><span class="listm_m"></span></li>';
		}
		jQuery('#share_dialog #UL_GIFT_LIST').html(str.join('').escNone());
	},

	//点击领取奖励按钮
	_getShareGift: function(target) {
		function fnSucc(oXml) {
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code") * 1;
			if (iCode != 0) {
				fnError(iCode);
				console.error(oXml.text);
				return;
			}
			jQuery('#share_dialog #DIV_STATE_' + target).html('<span class="popup_share_icon_g"></span><em>领取成功！</em>'); /**escNone**/
		}

		function fnError(iCode) {
			var sContent;
			if (iCode == -1001) {
				closeDialog();
				CARD.showLogin();
				return;
			} else if (iCode == -10001) {
				sContent = "待领取的分享不存在";
			} else if (iCode == -10002) {
				sContent = "待领取的分享已经领取";
			} else {
				sContent = "目前领取奖励的人太多了，请稍后再来";
			}
			jQuery('#share_dialog #DIV_MAIN').hide();
			jQuery('#share_dialog #STRONG_INFO').html(sContent); /**escNone**/
			jQuery('#share_dialog #DIV_ALERT').show();
		}
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_share_get?uin=' + H.share._uin + '&frienduin=' + H.share._MyshareList[target][5] + '&timestamp=' + H.share._MyshareList[target][6];
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};