H.dailytask = {
	_uin: 0,
	mapMission: {},
	_mission: [],
	_lv: 0,
	_lv_diff: 0,
	_gift_type: 7,
	init: function() {
		var dialog = jQuery('#daily_task_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="daily_task_dialog"></div>');
		}
		var html = '';
		html += '<div class="popup_module1 popup_dailytask" id="DIV_MAIN" style="margin:0px;padding-top:0px;width:490px;">';
		html += '    <div class="mdl_c_c">';
		html += '        <div class="content_text">';
		html += '            <ol id="OL"></ol>';
		html += '        </div>';
		html += '        <p class="dailytask_tips">小提示：每天会有4个小任务，完成任务后记得回来领取奖励噢~（奖励请当日领取）</p>';
		html += '    </div>';
		html += '</div>';
		html += '<div class="popup_module1 card_vipexchange" id="DIV_ALERT" style="display:none;width:500px;">';
		html += '    <div class="title">';
		html += '        <h2>温馨提示</h2>';
		html += '    </div>';
		html += '    <!--mdl_c_c 开始-->';
		html += '    <div class="mdl_c_c">';
		html += '        <div class="content">';
		html += '        <center><h3><strong id="STRONG_INFO" style="font-size:14px;"></strong></h3></center>';
		html += '        <div class="btns">';
		html += '            <button class="bt2_tx4" type="button" onclick="jQuery(\'#daily_task_dialog #DIV_MAIN\').show();jQuery(\'#daily_task_dialog #DIV_ALERT\').hide();">确定</button>';
		html += '        </div>';
		html += '        </div>';
		html += '    </div>';
		html += '    <!--mdl_c_c 结束-->';
		html += '    <button class="close" type="button" title="关闭" onclick="H.dailytask.notSubmit();">关闭</button>';
		html += '</div>';

		dialog.html(html);
		dialog.dialog({
			minWidth: 510,
			title: "日常任务",
			dialogClass: "dialogClass",
			position: "top"
		});
		H.dailytask.initDailyMissionData();
		H.dailytask._uin = H.user.getUin();
		H.dailytask.getDailyMissionInfo();
	},

	initDailyMissionData: function() {
		if (!daily_mission_list)
			return;
		for (var i = 0, len = daily_mission_list.length; i < len; i++) {
			H.dailytask.mapMission[daily_mission_list[i][0]] = daily_mission_list[i];
		}
	},

	notSubmit: function() {
		jQuery('#daily_task_dialog').dialog("close");
	},

	//获取用户当日的日常任务信息
	getDailyMissionInfo: function() {
		function fnSucc(oXML) {
			var oElem = oXML.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = parseInt(oElem.getAttribute("code"));
			if (iCode != 0) {
				console.error(oXML.text);
				fnFail(iCode);
				return;
			}

			var mission = oXML.xmlDom.getElementsByTagName("mission");
			var count = 0;
			for (var i = 0, len = mission.length; i < len; i++) {
				var missionid = parseInt(mission[i].getAttribute("mid"));
				var j = i - count;
				//如果奖励为100魔力或者150经验以上，则应该为每日最难任务，将它放在最后，便于展示
				if (H.dailytask.mapMission[missionid][9] >= 100 || H.dailytask.mapMission[missionid][5] >= 150) {
					j = len - 1;
					count = 1;
				}
				H.dailytask._mission[j] = [missionid, mission[i].getAttribute("record") * 1, mission[i].getAttribute("gift") * 1];
			}
			H.dailytask.disPlayDailyMissionInfo(); //显示页面
		}

		function fnFail(iCode) {
			if (iCode == -1001) {
				CARD.closeDialog();
				CARD.showLogin();
			} else if (iCode == -1102) {
				sContent = "对不起，您操作的号码和登录的号码不一致，请重新登录。";
			} else {
				sContent = "对不起，目前查询任务信息的人较多，请您稍后再来。";
			}
			jQuery('#daily_task_dialog #DIV_MAIN').hide();
			jQuery('#daily_task_dialog #STRONG_INFO').html(sContent);
			jQuery('#daily_task_dialog #DIV_ALERT').show();
		}

		var url = 'http://card.show.qq.com/cgi-bin/card_mission_daily_info?uin=' + H.dailytask._uin;
		var xml_sender = new CARD.XHR(url, fnSucc, null, fnFail);
		xml_sender.send();
	},

	getGift: function(mid) {
		function fnSucc(oXML) {
			var oElem = oXML.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = parseInt(oElem.getAttribute("code"));
			if (iCode != 0) {
				console.error(oXml.text);
				fnFail(iCode);
				return;
			}

			H.dailytask._lv = oElem.getAttribute("lv") * 1;
			H.dailytask._lv_diff = oElem.getAttribute("lv_diff") * 1;
			H.dailytask._gift_type = oElem.getAttribute("gifttype") * 1;
			jQuery('#daily_task_dialog #DIV_STATE_' + mid).html('<strong>已领取</strong>');
			// parent.CARD.getFlashObj().showMonExp({
			// 	mon: H.dailytask.mapMission[mid][4],
			// 	exp: H.dailytask.mapMission[mid][5],
			// 	mana: H.dailytask.mapMission[mid][9]
			// });
			if (H.dailytask._lv != 0 && H.dailytask._lv_diff != 0) {
				CARD.flashCalls.showLevelUp(H.dailytask._lv, H.dailytask._gift_type);
			}
		}

		function fnFail(iCode) {
			var sContent;
			if (iCode == -1005) {
				CARD.closeDialog();
				QSFL.sns.getApplicationWindow().location.href = "http://appimg2.qq.com/card/register_v3.html";
				return;
			} else if (iCode == -1001) {
				CARD.closeDialog();
				CARD.showLogin();
				return;
			} else if (iCode == -33093) {
				sContent = "对不起， 已经获得该奖励，请刷新魔法屋后再查看";
			} else if (iCode == -33094) {
				sContent = '对不起，您还未完成相应任务，不能领取奖励';
			} else {
				sConetent = '对不起，目前领取奖励的人较多，请您稍后再来。';
			}
			jQuery('#daily_task_dialog #DIV_MAIN').hide();
			jQuery('#daily_task_dialog #STRONG_INFO').html(sContent); /**escNone**/
			jQuery('#daily_task_dialog #DIV_ALERT').show();
		}

		var url = 'http://card.show.qq.com/cgi-bin/card_mission_daily_get?uin=' + H.dailytask._uin + '&mid=' + mid;
		var xml_sender = new CARD.XHR(url, fnSucc, null, fnFail);
		xml_sender.send();
	},

	disPlayDailyMissionInfo: function() {
		var arrMission = [];
		for (var i = 0; i < 4; i++) {
			switch (i) {
				case 0:
					arrMission[arrMission.length] = '<li><h3><span class="dailytask_t1">任务一：</span>';
					break;
				case 1:
					arrMission[arrMission.length] = '<li><h3><span class="dailytask_t2">任务二：</span>';
					break;
				case 2:
					arrMission[arrMission.length] = '<li><h3><span class="dailytask_t3">任务三：</span>';
					break;
				case 3:
					arrMission[arrMission.length] = '<li><h3><span class="dailytask_t4">任务四：</span>';
					break;
					break;
			}
			var strGift = '';
			if (H.dailytask.mapMission[H.dailytask._mission[i][0]][9] > 0)
				strGift = '<span class="ico_magic"></span><span class="tx4">' + H.dailytask.mapMission[H.dailytask._mission[i][0]][9] + '魔力</span>'
			else
				strGift = '<span class="ico_gold2"></span><span class="tx4">' + H.dailytask.mapMission[H.dailytask._mission[i][0]][4] + '金币</span><span class="ico_experience2"></span><span class="tx4">' + H.dailytask.mapMission[H.dailytask._mission[i][0]][5] + '经验</span>'
			arrMission[arrMission.length] = '<strong>' + H.dailytask.mapMission[H.dailytask._mission[i][0]][2] /*任务名称*/ + '</strong></h3>' + '<ul><li><em>任务描述：</em>' + H.dailytask.mapMission[H.dailytask._mission[i][0]][3] + '</li><li><em>任务奖励：</em>' + strGift + '</li></ul><div class="dailytask_state dailytask_state_complete" id="DIV_STATE_' + H.dailytask._mission[i][0] + '">';
			if (H.dailytask._mission[i][1] < H.dailytask.mapMission[H.dailytask._mission[i][0]][6]) { //判读是否达到要求的操作数目
				arrMission[arrMission.length] = '<strong>待完成</strong><span>' + H.dailytask._mission[i][1] + '/' + H.dailytask.mapMission[H.dailytask._mission[i][0]][6] + '</span>';
			} else {
				CARD.sendPGV('ISD.QQshow.Card.DailyMission_Done_' + H.dailytask._mission[i][0]);
				if (H.dailytask._mission[i][2] == 1) { //判读是否已经领取奖励
					arrMission[arrMission.length] = '<strong>已领取</strong></div>';
				} else {
					arrMission[arrMission.length] = '<strong>已完成</strong><button class="bt_tx4" type="button" onclick="H.dailytask.getGift(' + H.dailytask._mission[i][0] + ')">领取奖励</button></div>';
				}
			}
			arrMission[arrMission.length] = '<span class="dtask_q"></span><span class="dtask_p"></span><span class="dtask_z"></span><span class="dtask_m"></span></li>'; //样式
		}
		jQuery('#daily_task_dialog #OL').html(arrMission.join('').escNone());
	}
};

var daily_mission_list = [
	[1, 0, '买卡', '到商店购买卡片5张', 30, 30, 5, 0, 1, 0],
	[2, 0, '偷炉', '偷好友炉子2次', 30, 30, 2, 0, 4, 0],
	[5, 1, '买卡', '到商店购买卡片8张', 50, 30, 8, 0, 1, 0],
	[9, 2, '交换卡', '到商店交换卡片5张', 30, 30, 5, 0, 2, 0],
	[10, 99, '偷炉', '偷好友炉子3次', 50, 30, 3, 0, 4, 0],
	[11, 99, '换卡', '与好友或卡友换10面值及以上的卡片5张', 30, 30, 5, 10, 3, 0],
	[12, 2, '集成套卡', '当天集成任意1套卡并放入集卡册', 250, 300, 1, 0, 7, 0],
	[13, 3, '交换卡', '到商店交换卡8张', 30, 30, 8, 0, 2, 0],
	[14, 99, '取卡', '从炼卡炉(非偷炉位)取出任意面值卡1张', 30, 30, 1, 0, 5, 0],
	[15, 99, '扣卡', '扣下好友来偷炉已合成的卡片3次', 40, 40, 3, 0, 6, 0],
	[16, 99, '变普卡', '成功变40面值及以上普卡1张', 250, 300, 1, 40, 8, 0],
	[17, 0, '变普卡', '变普卡2次', 30, 30, 2, 0, 8, 0],
	[18, 0, '换卡', '与好友或卡友换40面值及以上的卡片1张', 200, 250, 1, 40, 3, 0],
	[19, 1, '换卡', '与好友或卡友换卡片3张', 30, 50, 3, 0, 3, 0],
	[20, 1, '偷炉', '偷好友炉子2次', 30, 30, 2, 0, 4, 0],
	[21, 1, '取卡', '从炼卡炉取出80面值以上的卡片1张', 150, 200, 1, 80, 5, 0],
	[22, 2, '取偷炉卡', '取自己在好友家偷炉位合成的卡片1次', 40, 40, 1, 0, 10, 0],
	[23, 2, '换卡', '与好友或卡友换卡片5张', 30, 30, 5, 0, 3, 0],
	[24, 3, '取卡', '从炼卡炉(非偷炉位)取出任意面值卡2张', 30, 30, 2, 0, 5, 0],
	[25, 3, '变闪卡', '变闪卡1次', 40, 40, 1, 0, 9, 0],
	[26, 3, '一昧真火', '使用一昧真火1次', 0, 0, 1, 0, 11, 100]
];