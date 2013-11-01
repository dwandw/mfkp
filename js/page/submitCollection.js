H.submitCollection = {
	_iUin: 0,
	_curGiftid: 0,
	_iThemeid: 0,
	_iJBCard: 0,
	_lv: 0,
	_lv_diff: 0,
	_vip: 0,
	_yearvip: 0,
	_gift_type: 7,
	_sendcard: 0,
	_iGotMeiBang: false,
	_iMeiBangID: 127,
	_iChristNum: 0, //当前圣诞套卡的数目。
	_iCollecNum: 0, //用户当前已经收集齐的套卡的数量，这个现在是用来判定用户是否已经完成集齐5套卡的新手任务。
	_mapThemeProp: {
		"205": {
			id: 23,
			num: 2,
			name: "黄土高原"
		},
		"208": {
			id: 24,
			num: 2,
			name: "草原风情"
		},
		"209": {
			id: 25,
			num: 1,
			name: "八闽古街"
		},
		"210": {
			id: 26,
			num: 1,
			name: "傣家风情"
		},
		"211": {
			id: 27,
			num: 1,
			name: "乔家大院"
		},
		"212": {
			id: 28,
			num: 1,
			name: "土家情怀"
		},
		"213": {
			id: 29,
			num: 2,
			name: "土楼文化"
		},
		"214": {
			id: 30,
			num: 1,
			name: "水色徽乡"
		}
	}, //月任务的套卡对映，id对应了道具卡的id，以及获取的数目
	init: function(themeId) {
		var dialog = jQuery('#submit_collection_dialog');
		if (dialog.children().length == 0) {
			dialog = jQuery('<div id="submit_collection_dialog"></div>');
		}
		var html = '';
		html += '<div id="DIV_CONTENT">';
		// html += '   <div class="title" id="DIV_TITLE"><h2>集卡册</h2></div>';
		// html += '   <div class="mdl_c_c">';
		html += '   <div class="content_text popup_gift">';
		html += '   <p class="live_intro" id="P_COL_DESC"></p>';
		html += '   <p class="live_prize" id="P_COL_PRIZE"></p>';
		html += '   <ul class="list" id="UL_SHOW_LIST">';
		html += '	</ul>';
		html += '	</div>';
		// html += '	   <div class="btns"><button type="button" class="bt2_tx4" onclick="H.submitCollection.submitCollect();">选好了</button><button type="button" class="bt2_tx8" onclick="H.submitCollection.notSubmit();">暂不放入集卡册</button></div>';
		// html += '   </div>';
		// html += '	<button class="close" type="button" title="关闭" onclick="H.submitCollection.notSubmit();"></button>';
		html += '</div>';

		html += '<!--窗口 开始-->';
		html += '<div style="display:none;width:400px;" class="popup_module1" id="DIV_ALERT">';
		html += '   <div class="title"><h2>温馨提示</h2></div>';
		html += '   <div class="mdl_c_c">';
		html += '   <div class="content_text align_center">';
		html += '	   <p><strong id="STRONG_CONTENT"></strong></p>';
		html += '	</div>';
		html += '	   <div class="btns"><button type="button" class="bt2_tx4" onclick="jQuery(\'#DIV_ALERT\')[0].style.display=\'none\';jQuery(\'#DIV_SUC_CONTENT\')[0].style.display=\'\';" id="BUT_USE">确定</button>';
		html += '	    <button type="button" class="bt2_tx4" onclick="H.submitCollection.closeFloatShow();" id="BUT_CANCEL" style="display:none">确定</button></div>';
		html += '   </div>';
		html += '	<button class="close" type="button" title="关闭" onclick="jQuery(\'#DIV_ALERT\')[0].style.display=\'none\';jQuery(\'#DIV_SUC_CONTENT\')[0].style.display=\'\';" id="BUT_ALERT_CLOSE"></button>';
		html += '</div>';
		html += '<!--窗口 结束-->';

		html += '<div class="popup_module1" style="display:none;width:360px;" id="DiV_GIFT">';
		html += '<div style="_display:inline;zoom:1;">';
		html += '	<div class="title">';
		html += '		<h2>温馨提示</h2>';
		html += '	</div>';
		html += '	<div class="mdl_c_c"> ';
		html += '		<!--内容 开始-->';
		html += '		<div class="exchange_setting">';
		html += '			<p class="tips align_center" id="P_GIFT_INFO"></p>';
		html += '			<div class="confirm_card" id="DIV_GIFT_PIC">';
		html += '				<p class="card_theme_item card_em_theme_item"> <strong class="title">酷帅打扮</strong> <img src="http://appimg2.qq.com/card/images/66.png" class="bg"> <img alt="替换文字" src="http://appimg2.qq.com/card/images/249.png" class="img"> <span class="text">10</span> </p>';
		html += '			</div>';
		html += '			<p style="text-align:center;" id="GIFT_DOWN_TIPS"></p>';
		html += '			<div class="btns">';
		html += '				<button type="button" class="bt2_tx6" id="BUT_GIFT_USE"></button>';
		html += '			</div>';
		html += '		</div>';
		html += '		<!--内容 结束--> ';
		html += '	</div>';
		html += '	<button class="close" type="button" title="关闭" onclick="jQuery(\'#DiV_GIFT\')[0].style.display=\'none\';jQuery(\'#DIV_SUC_CONTENT\')[0].style.display=\'\';"></button>';
		html += '	</div>';
		html += '</div>';
		dialog.html(html);
		dialog.dialog({
			minWidth: 680,
			title: "集卡册",
			dialogClass: "dialogClass",
			position: "top",
			buttons: [{
				text: '选好了',
				click: function() {
					H.submitCollection.submitCollect();
				}
			}, {
				text: '取消',
				click: function() {
					dialog.dialog('close');
				}
			}]
		});
		H.submitCollection._iUin = H.user.getUin();
		// QSFL.sns.getApplicationWindow().QSFL.dialog.messageBox.moveWindow.init(window, jQuery('#DIV_TITLE')[0]);
		// var themeid = CARD.getURLParam("themeid"); 
		H.submitCollection._iThemeid = themeId;
		H.submitCollection._vip = H.user.getRedVip();
		H.submitCollection._yearvip = H.user.getYearVip();
		if (H.user.bGotCollection) {
			H.submitCollection.showSnapList(themeId);
		} else {
			H.user.loadMyColletion(function() {
				H.submitCollection.showSnapList(themeId);
			});
		}

		//从市场买卡或交换卡后可能会直接跳转至提交集卡册页面，需要恢复下flash
		// CARD.getFlashObj().resume();

		//只有在美邦卡时才拉取集卡册查询是否需要展示美邦图片

		// if(H.submitCollection._iThemeid == H.submitCollection._iMeiBangID)
		// 	H.submitCollection.getMiniCol();
		// else{
		// 	H.submitCollection._iGotMeiBang = true;
		// }

	},
	useQqshow: function() {
		H.submitCollection.closeFloatShow();
		window.open('http://show.qq.com/live/vipact/newyear/index.html');
	},
	showSnapList: function(themeId) {
		var strGift = CARD.data.mapTheme[themeId][9];
		strGift = strGift.split('#');
		if (strGift[1]) {
			strGift[1] = strGift[1].split('_');
			H.submitCollection._iJBCard = strGift[1][1];
		}

		var str = '';
		var _cash = CARD.data.mapTheme[themeId][6];
		var _exp = CARD.data.mapTheme[themeId][7];
		var _cashadd = 0;
		var _expadd = 0;
		var sColDes = "";
		var sColPri = "";

		/*情人节活动期间集成的四套卡，有双倍奖励。*/
		var start = 1334232000; //开始时间
		var end = 1336665600; //结束时间
		var cur = parseInt(new Date().getTime() / 1000);
		// var cur =  CARD.getFlashObj().getServerTime().now;         //当前时间的秒数
		var temStr = ''; //这个是双倍的字符。
		if (cur <= end && cur >= start && (204 == H.submitCollection._iThemeid)) { //五一劳动节活动，在活动期间集成套卡就
			_cash *= 2;
			_exp *= 2;
			temStr = '<strong class="hightlight">双倍</strong>';
		}

		if (H.submitCollection._vip == 1 && H.submitCollection._yearvip == 1) {
			_cashadd = _cash;
			_expadd = _exp;
			sColDes = '<strong>《' + CARD.data.mapTheme[themeId][1] + '》套卡即将放入集卡册，先挑选一套你喜欢的QQ秀作为奖品吧！ </strong>';
			sColPri = '您还可获得' + temStr + '<span class="ico_gold"></span><strong class="important">金币：' + _cash + '+' + _cashadd + '(年费红钻奖励)</strong>' + '<span class="ico_experience"></span><strong class="important">经验：' + _exp + '+' + _expadd + '(年费红钻奖励)' + '</strong>&nbsp;&nbsp;<a href="http://show.qq.com/show_v3.html?MUrl=/mall/inc/vipportal_card_bonus.html" target="_blank">了解奖励详情</a><br>' + str;
		} else if (H.submitCollection._vip == 1) {
			_cashadd = Math.floor(_cash / 2);
			_expadd = Math.floor(_exp / 2);
			sColDes = '<strong>《' + CARD.data.mapTheme[themeId][1] + '》套卡即将放入集卡册，先挑选一套你喜欢的QQ秀作为奖品吧！ </strong>';
			sColPri = '您还可获得' + temStr + '<span class="ico_gold"></span><strong class="important">金币：' + _cash + '+' + _cashadd + '(红钻奖励)' + '</strong><span class="ico_experience"></span><strong class="important">经验：' + _exp + '+' + _expadd + '(红钻奖励)' + '</strong>&nbsp;&nbsp;<a href="http://show.qq.com/show_v3.html?MUrl=/mall/inc/vipportal_card_bonus.html" target="_blank">了解奖励详情</a><br>' + str;
		} else {
			sColDes = '<strong>《' + CARD.data.mapTheme[themeId][1] + '》套卡即将放入集卡册，先挑选一套你喜欢的QQ秀作为奖品吧！ </strong>';
			sColPri = '您还可获得' + temStr + '<span class="ico_gold"></span><strong class="important">金币：' + _cash + '</strong><span class="ico_experience"></span><strong class="important">经验：' + _exp + '</strong>' + str;
		}
		jQuery('#submit_collection_dialog #P_COL_DESC').html(sColDes);
		jQuery('#submit_collection_dialog #P_COL_PRIZE').html(sColPri);

		var strRecmd = strGift[0].split('|');
		var len = strRecmd.length;
		H.submitCollection._curGiftid = parseInt(strRecmd[0]);
		var arrData = [];
		for (var i = 0; i < len; i++) {
			if (CARD.data.mapGift[strRecmd[i]]) {
				arrData.push([i, parseInt(strRecmd[i]), parseInt(CARD.data.mapGift[strRecmd[i]][2])]);
			}
		}
		var html = '';
		for (var i = 0; i < arrData.length; i++) {
			var data = arrData[i];
			var imgUrl = 'http://imgcache.qq.com/qqshow_v3/htdocs/syndata/excel_snashot/' + Math.floor(data[2] % 1000 / 100) + '/' + (data[2] % 1000 % 100) + '/' + data[2] + '_0.gif';
			html += '<li onclick="H.submitCollection.chooseShow(' + data[1] + ');"><p class="pic"><img src="' + imgUrl + '" title="精美QQ秀"></p>';
			html += '<strong class="choose" style="display:' + (data[0] == 0 ? '' : 'none') + '" id="STRONG_' + data[1] + '">已选中</strong>';
			var num = 0;
			if (H.user.mapCollection[themeId] && H.user.mapCollection[themeId].gifts) {
				giftArr = H.user.mapCollection[themeId].gifts;
				for (var j = 0; j < giftArr.length; j++) {
					if (giftArr[j][0] == data[2]) num++;
				};
			}
			if (num > 0) {
				html += '<div class="received" title="' + num + '"></div>';
			}
			// html += '<p class="info" id="P_INFO_' + data[1] + '">' + (data[0] == 0 ? '已选中' : ('<a href="javascript:void(1);" onclick="H.submitCollection.chooseShow(' + data[1] + ')">选择这套</a>')) + '</p></li>';
			html += '</li>';
		};
		jQuery('#submit_collection_dialog #UL_SHOW_LIST').html(html);
		// var mapName = [
		// 	[0, '<%style%>', function(v){return (v==0)?"":"none";}],
		// 	[1, '<%giftid%>'],
		// 	[[0,1], '<%info%>', function(v){
		// 		var str = (v[0]==0)?"已选中":("<a href='#2' onclick='H.submitCollection.chooseShow("+v[1]+")'>选择这套</a>");
		// 		return str;}],
		// 	[2, '<%img%>', function(v){ var url='';
		// 		if(v){
		// 			var url = 'http://imgcache.qq.com/qqshow_v3/htdocs/syndata/excel_snashot/'
		// 			+Math.floor(v%1000/100)+'/'+(v%1000%100)+'/'+v+'_0.gif';}return url;}]
		// 	];

		// var tmplt = jQuery('#DIV_TPL_SHOW')[0].innerHTML.between("<!--TPL.SHOWLIST","TPL.SHOWLIST-->");

		// CARD.showCardData(arrData, jQuery('#UL_SHOW_LIST')[0], tmplt, mapName);
		// jQuery('#UL_SHOW_LIST')[0].innerHTML = '<p id="A_QQSHOW_FAQ" class="qqshow_received"><a target="_blank" href="http://service.qq.com/info/33490.html" class="qqshow_received_link">获得的QQ秀存放在哪？</a></p>' + jQuery('#UL_SHOW_LIST')[0].innerHTML; /**escNone**/
	},
	chooseShow: function(giftid) {
		var strStrong = "#submit_collection_dialog #STRONG_" + H.submitCollection._curGiftid;
		jQuery(strStrong)[0].style.display = "none";
		strStrong = "#submit_collection_dialog #STRONG_" + giftid;
		jQuery(strStrong)[0].style.display = "";

		// var strInfo = "#submit_collection_dialog #P_INFO_" + H.submitCollection._curGiftid;
		// jQuery(strInfo)[0].innerHTML = "<a href='#2' onclick='H.submitCollection.chooseShow(" + H.submitCollection._curGiftid + ")'>选择这套</a>";
		// strInfo = "#submit_collection_dialog #P_INFO_" + giftid;
		// jQuery(strInfo)[0].innerHTML = "已选中";
		H.submitCollection._curGiftid = giftid;
	},
	submitCollect: function() {
		function fnSucc(oXml) {
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");

			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode);
				return;
			}

			H.submitCollection._lv = obj.getAttribute("lv") * 1;
			H.submitCollection._lv_diff = obj.getAttribute("lv_diff") * 1;
			H.submitCollection._gift_type = obj.getAttribute("gifttype") * 1;
			H.submitCollection._sendcard = obj.getAttribute("sendcard") * 1;
			//2012年月任务，送道具卡
			H.submitCollection._monthProp = obj.getAttribute("subtype") || 0;
			H.submitCollection._monthPropNum = obj.getAttribute("count") || 0;
			//民居活动，补送的道具卡
			H.submitCollection._addProp = obj.getAttribute("subtype1") * 1 || 0;
			H.submitCollection._addPropNum = obj.getAttribute("count1") * 1 || 0;

			var recmdId = parseInt(CARD.data.mapGift[H.submitCollection._curGiftid][2]);
			H.submitCollection.showSucPage(H.submitCollection._iThemeid, recmdId);
			H.submitCollection.checkMission();

			//检查用户是否是集齐了圣诞套卡，如果是，并且处于触发的临界点。就提示用户去参加勋章活动。
			if (H.submitCollection._iThemeid == 187) {
				H.submitCollection.getMiniCol(1);
			}
		}

		function fnError(iCode) {
			H.ui.waitEnd();
			if (iCode == -32002) {
				H.ui.showErrDlg({
					title: '集齐卡片失败',
					msg: '对不起，您的套卡不全，不能放入集卡册哦！'
				});
				return;
			} else {
				H.ui.showErrDlg({
					title: '集齐卡片失败',
					msg: H.getMsgByCode(iCode)
				});
				return;
			}
		}

		var iCardType = 0;
		if (H.checkFlashCard(H.submitCollection._iThemeid))
			iCardType = 3; //闪卡
		else if (H.checkJbCard(H.submitCollection._iThemeid))
			iCardType = 2; //绝版卡
		else if (H.checkRP(H.submitCollection._iThemeid))
			iCardType = 1; //普卡抽卡
		else
			iCardType = 0; //普卡合成卡

		var sUrl = 'http://card.show.qq.com/cgi-bin/card_collection_add?theme=' + H.submitCollection._iThemeid + '&themetype=0&giftid=' + H.submitCollection._curGiftid + "&cardtype=" + iCardType;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},
	getColor: function(theme_id) {
		var color = '000';
		var mapTheme = CARD.data.mapTheme;
		if (mapTheme[theme_id] && mapTheme[theme_id][8] != 0)
			color = mapTheme[theme_id][8].toString(16);
		return color;
	},
	closeFloatShow: function() {
		if (CARD.data.mapCard[H.submitCollection._sendcard]) {
			var oCardImg = {
				cardName: CARD.data.mapCard[H.submitCollection._sendcard][2],
				price: CARD.data.mapCard[H.submitCollection._sendcard][3],
				themeColor: H.submitCollection.getColor(CARD.data.mapCard[H.submitCollection._sendcard][1]),
				backImg: '/card/img/theme/' + CARD.data.mapCard[H.submitCollection._sendcard][1] + '?ver=' + CARD.data.mapTheme[CARD.data.mapCard[H.submitCollection._sendcard][1]][13],
				Img: '/card/img/card/' + H.submitCollection._sendcard + '?ver=' + CARD.data.mapCard[H.submitCollection._sendcard][7],
				collThemeId: H.submitCollection._iThemeid
			};

			if (QSFL.userAgent.isSafari()) {
				CARD.getFlashObj().collectCard(CARD.obj2str(oCardImg));
			} else {
				CARD.getFlashObj().collectCard(oCardImg);
			}
		}

		CARD.closeDialog();
		if (CARD.mission._mission_lvup.lv_diff > 0) {
			parent.CARD.flashCalls.showLevelUp(CARD.mission._mission_lvup.lv, CARD.mission._mission_lvup.lv_gift);
		} else if (H.submitCollection._lv != 0 && H.submitCollection._lv_diff != 0) {
			parent.CARD.flashCalls.showLevelUp(H.submitCollection._lv, H.submitCollection._gift_type);
		}
	},
	/*这里集成套卡的新手奖励有两种，一种是集成新手引导套卡的，另外一种是集成任意套卡的。
	 *前者只能在完成新手引导的时候做。后者是只要在新手任务期间，收集成一套即可。
	 *这里有一些地方需要区别一下，
	 *对于新手引导 -2代表在做，-1代表完成；0代表当前的任务不是这个。
	 *对于新手任务 -1代表没有这个任务，0代表当前任务没有完成，1代表已经完成。而每个时刻flash都只有四个任务在哪里，一旦领取，这个就没有了。
	 */
	//type 有两个值，1：代表是提交成功，2.代表的是提交成功，但是qq秀没有送到。errmsg用来判断用户提交集卡册成功，并且QQ秀已经发放成功。
	//这样做的原因是：用户有可能提交了集卡册但是没有领取QQ秀成功，会引起投诉的。所以，这里做一个特殊处理。
	checkMission: function() {
		//这里是因为要判断是否当前合成的卡片是二星卡，就必须获取当前的theme数组。
		var cur = CARD.data.mapTheme[H.submitCollection._iThemeid];

		if (H.user.oMyData.missionid < CARD.mission.MISSION_LINE_1) { //只要用户集成了一套卡,而不需要判断用户是否正在做这个引导。
			QSFL.dialog.mask.end([top]);
			CARD.mission.checkMission(CARD.mission.SUBMIT_COLLECT_1, {
				lv_diff: H.submitCollection._lv_diff,
				lv: H.submitCollection._lv,
				lv_gift: H.submitCollection._gift_type
			});
		} else if (CARD.user.oMyData.missionid > CARD.mission.MISSION_LINE_1) { //现在前台在直接集成套卡的时候，会自动把新手任务前四个写入。所以这里需要确定已经是新手任务阶段才检查新手任务。
			if (CARD.mission.getMissionStatus(CARD.mission.M_SUBMIT_SELECT_COLL_1) == 0) { //集齐一套卡片。

				CARD.mission.checkMission(CARD.mission.M_SUBMIT_SELECT_COLL_1, {
					lv_diff: H.submitCollection._lv_diff,
					lv: H.submitCollection._lv,
					lv_gift: H.submitCollection._gift_type
				});
			}

			if (CARD.mission.getMissionStatus(CARD.mission.M_SUBMIT_STAR2_1) == 0 && cur[2] == 2) { //集齐一套二星卡。
				CARD.mission.checkMission(CARD.mission.M_SUBMIT_STAR2_1, {
					lv_diff: H.submitCollection._lv_diff,
					lv: H.submitCollection._lv,
					lv_gift: H.submitCollection._gift_type
				});
			}

			if (CARD.mission.getMissionStatus(CARD.mission.M_GET_TITLE_1) == 0) { //用户集齐一套五星级套卡。
				H.submitCollection.getMiniCol(2); //这里必须要判别用户是否已经集齐了四套卡，重新拉取一次集卡册信息。
			}
		}
	},
	showSucPage: function(themeId, recmdId) {
		H.user.loadMyColletion(function() {
			H.submitCollection.showSnapList(themeId);
		});
		H.user.load(function(){
			H.stove.init();
			H.stove.showStoveTree();
		});
		// CARD.getFlashObj().showShareMotion('1'); //显示主动分享魔女，分享撒礼特性添加了这个功能
		// QSFL.sns.getApplicationWindow().QSFL.dialog.messageBox.moveWindow.init(window, jQuery('#submit_collection_dialog #DIV_SUC_TITLE')[0]);
		var themeData = CARD.data.mapTheme[themeId];
		if (!themeData) return;
		// var oCard = CARD.data.mapCard[H.submitCollection._iJBCard];

		var _cash = CARD.data.mapTheme[themeId][6];
		var _exp = CARD.data.mapTheme[themeId][7];
		var _totaolcash = _cash;
		var _totalexp = _exp;
		if (H.submitCollection._vip == 1 && H.submitCollection._yearvip == 1) {
			_totaolcash *= 2;
			_totalexp *= 2;
		} else if (H.submitCollection._vip == 1) {
			_totaolcash += Math.floor(_cash / 2);
			_totalexp += Math.floor(_exp / 2);
		}

		var arr = [];
		arr.push('<div class="content_text popup_gift">');
		arr.push('<p class="tips"><strong>您已经将<img width="15" height="15" src="/card/img/theme/' + themeData[0] + '_logo?ver=' + themeData[13] + '"/>《' + themeData[1].escHtml() + '》放入集卡册。您获得了以下奖励：</strong></p>');
		arr.push('<ul class="list"><li class="popup_gift_qqshow"><strong class="">1.精美QQ秀</strong><div class="cont">');
		arr.push('<p class="pic"><img title="点击查看物品详情" src="http://imgcache.qq.com/qqshow_v3/htdocs/syndata/excel_snashot/' + Math.floor(recmdId % 1000 / 100) + '/' + (recmdId % 1000 % 100) + '/' + recmdId + '_0.gif"/>');
		arr.push('<a href="http://show.qq.com/show.html?MUrl=http%3A//imgcache.qq.com/qqshow_v3/htdocs/mall/inc/particular.html%3Ftype%3D10%26uin%3D0%26iID%3D' + recmdId + '" target="_blank" title="点击查看物品详情"></a></p>');
		arr.push('<p class="info_more_bg"></p>');
		arr.push('<p class="info_more">将保存在QQ秀商城<br/>"<a href="http://show.qq.com/show.html?MUrl=/my/inc/item.html" target="_blank" onclick="CARD.sendPGV(\'ISD.QQshow.Card.my_qqshow\');">我的QQ秀</a>"中</p></div>');
		arr.push('<p class="info"><button  class="bt_tx4" type="button" onclick="H.submitCollection.tryShow( ' + recmdId + ' );CARD.sendPGV(\'ISD.QQshow.Card.try\');" id="BUT_PUTON_SHOW">马上穿上</button>');
		arr.push('<span id="P_TEXT_SUC" style="display:none;">保存成功</span>');
		arr.push('<a target="_blank" onclick="CARD.sendPGV(\'ISD.QQshow.Card.check_particular\');"  href="http://show.qq.com/show.html?MUrl=http%3A//imgcache.qq.com/qqshow_v3/htdocs/mall/inc/particular.html%3Ftype%3D10%26uin%3D0%26iID%3D' + recmdId + '">查看物品详情</a></p>');

		// var cur = CARD.getFlashObj().getServerTime().now; //当前时间的秒数
		var cur = parseInt(new Date().getTime() / 1000);
		if ((204 == H.submitCollection._iThemeid) && cur <= end && cur >= start) { //五一劳动节活动
			arr.push('</li><li><strong class="">2.金币/经验</strong><div class="cont"><p class="pic"><img src="http://appimg2.qq.com/card/images/money_exp.jpg"></p></div><div class="gift_info" style="position:absolute;top:165px;left:0;width:100%;text-align:center;"><span class="experience_value">金币：' + _totaolcash + '</span><strong class="double">X2</strong></div><div class="gift_info" style="position:absolute;top:280px;left:0;width:100%;text-align:center;"><span class="experience_value">经验：' + _totalexp + '</span><strong class="double">X2</strong></div></li>');
		} else {
			arr.push('</li><li><strong class="">2.金币/经验</strong><div class="cont"><p class="pic"><img src="http://appimg2.qq.com/card/images/money_exp.jpg"></p></div><div class="gift_info" style="position:absolute;top:165px;left:0;width:100%;text-align:center;"><span class="experience_value">金币：' + _totaolcash + '</span></div><div class="gift_info" style="position:absolute;top:280px;left:0;width:100%;text-align:center;"><span class="experience_value">经验：' + _totalexp + '</span></div></li>');
		}
		var iNum = 3;

		if (H.submitCollection._monthProp > 0 && H.submitCollection._monthPropNum > 0) {
			var curMap = H.submitCollection._mapThemeProp[themeId];
			var activeDes = '';
			if (H.submitCollection._addProp > 0 && H.submitCollection._addPropNum > 0) { /*&& cur >= 1339488000 && cur <= 1340636400 */
				activeDes = '民居欢乐送活动再加送' + H.submitCollection._addPropNum + '张';
			}
			arr.push('<li><strong class="">' + iNum + '.集居民系列套卡奖励</strong><br/><br/><div class="cont"><img src="http://appimg2.qq.com/card/img/props/prop_month_exchange_' + curMap.id + '.png"></div><div class="gift_info_v2"><p>"' + curMap.name + '"道具卡' + H.submitCollection._monthPropNum + '张。' + activeDes + '</p></div><p class="info"><button class="bt_tx4" type="button" onclick="H.submitCollection.getPropCard(' + themeId + ');" id="BTN_MINGJU">马上领取</button></p></li>');
			iNum++;
		} else if (H.submitCollection._addProp > 0 && H.submitCollection._addPropNum > 0) { /*&& cur >= 1339488000 && cur <= 1340636400*/
			var tem = {};
			for (var i = 0; i < PropCard.length; i++) {
				if (H.submitCollection._addProp == PropCard[i][0]) {
					tem = PropCard[i];
					break;
				}
			}

			arr.push('<li><strong class="">' + iNum + '.民居欢乐送活动</strong><br/><br/><div class="cont"><img src="http://appimg2.qq.com/card/img/props/prop_month_exchange_' + tem[0] + '.png"></div><div class="gift_info_v2"><p>"' + tem[1] + '"道具卡' + H.submitCollection._addPropNum + '张</p></div><p class="info"><button class="bt_tx4" type="button" onclick="H.submitCollection.getPropCard(' + themeId + ');" id="BTN_MINGJU">马上领取</button></p></li>');
			iNum++;
		}

		//五一活动，活动期间集成套卡可以有双倍的奖励和经验
		var start = 0; //1340265600开始时间
		var end = 1342969200; //结束时间

		var star361 = 1340967600;
		var end361 = 1345046400;

		if (161 != themeId && 174 != themeId && 228 != themeId && cur > star361 && cur < end361) {
			arr.push('<li><strong class="">' + iNum + '.361°伦敦行动</strong><div class="cont"><img src="http://appimg2.qq.com/card/ac/img/ad_361_2.jpg"></div><div class="gift_info_v2"><br><br><p></p></div><p class="info"><button class="bt_tx4" type="button" onclick="H.submitCollection.goTo361();">马上参加</button></p></li>');
			iNum++;
		}

		if (233 == themeId) {
			arr.push('<li><strong class="">' + iNum + '.激情奥运抽奖资格1次</strong><div class="cont"><img src="http://appimg2.qq.com/card/ac/img/olp_cd.png"></div><div class="gift_info_v2"><br><br><p></p></div><p class="info">已在活动页面累加次数</p></li>');
			iNum++;
		}

		//结束
		// var strUrl = encodeURIComponent('http://rc.qzone.qq.com/myhome/365?collect=' + themeId);
		// var srePics = encodeURIComponent('http://appimg2.qq.com/card/img/theme/' + themeId + '_museum');
		// var strTitle = encodeURIComponent('轻松玩《魔法卡片》集卡游戏，免费拿精美QQ秀!');
		// var strReason = encodeURIComponent('我终于集齐《' + CARD.data.mapTheme[themeId][1] + '》套卡，可耗费我不少功夫，不过获得漂亮的QQ秀和惊喜奖励，还是很开心哦~');
		// if (card_collect_des[themeId]) {
		// 	strReason = encodeURIComponent(card_collect_des[themeId]);
		// }

		// var strFenXiang = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + strUrl + '&pics=' + srePics + '&title=' + strTitle + '&desc=' + strReason + '&summary=';
		// arr.push('</ul></div><div class="btns"><a href="' + strFenXiang + '" target="_blank" type="button" class="bt2_tx6" onclick="H.submitCollection.closeFloatShow();CARD.sendPGV(\'ISD.QQshow.Card.FenXiangCol\');">分享给好友</a></div>');
		arr.push('</ul></div>');

		// jQuery('#submit_collection_dialog #DIV_SUC_INFO')[0].innerHTML = arr.join(''); /**escNone**/
		// jQuery('#submit_collection_dialog #DIV_CONTENT')[0].style.display = 'none';
		// jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = '';
		//parent.jQuery('#SPAN_TIPS')[0].innerHTML = '';
		// parent.CARD.getFlashObj().refresh();
		H.ui.showErrDlg({
			title: '收集成功',
			msg: arr.join(''),
			width: 665,
			height: 450
		});
	},
	//NBA活动获取cdkey
	getCdkey: function() {
		function fnSucc(oXml) {
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");
			jQuery('#submit_collection_dialog #BTN_NBA_CDKEY')[0].style.display = "none";

			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode);
				return;
			}
			var cdkey = obj.getAttribute("cdkey");
			if (cdkey) {
				H.submitCollection.showCdkey(cdkey);
				return;
			} else {
				CARD.dialog.showMessage({
					cnt: "当前领取的人数过多，您可以稍候到博物馆去补领。",
					left: 40,
					top: 140
				});
			}
		}

		function fnError(iCode) {
			jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "none";
			var sContent;
			//用户未注册
			if (iCode == -1005) {
				CARD.closeDialog();
				QSFL.sns.getApplicationWindow().location.href = "http://appimg2.qq.com/card/register_v3.html";
				return;
			} else if (iCode == -1001) {
				CARD.closeDialog();
				CARD.showLogin();
				return;
			} else if (iCode == -1102) {
				sContent = "对不起，您操作的号码和登录的号码不一致，请重新登录。";
			} else if (iCode == -10001) {
				sContent = "感谢您的关注，本次活动已经结束，不能再领取CDK了。请期待后续活动。";
			} else if (iCode == -10003) {
				sContent = "感谢您的关注，本次活动500万CDK已经发放完毕，敬请关注下次活动。";
			} else {
				sContent = '对不起，当前领取的人数过多，请稍后补领。';
			}

			CARD.dialog.showMessage({
				cnt: sContent,
				left: 40,
				top: 140,
				callback: function() {
					jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "";
					CARD.dialog.closeMessage();
				}
			});
		}
		var uin = QSFL.sns.getLoginUin();
		if (!uin) {
			CARD.showLogin();
		}
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_get_nba_cdkey?uin=' + uin;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
		CARD.sendPGV('ISD.QQshow.Card.NABexchangeCdkey');
	},
	//展示领取成功的对话框
	cdkeyElem: null,
	showCdkey: function(cdkey) {
		jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "none";
		if (!H.submitCollection.cdkeyElem) {
			H.submitCollection.cdkeyElem = document.createElement("div");
		}
		H.submitCollection.cdkeyElem.className = "popup_module1";
		H.submitCollection.cdkeyElem.style.width = "400px";
		H.submitCollection.cdkeyElem.style.zIndex = 999;
		H.submitCollection.cdkeyElem.style.position = "absolute";
		H.submitCollection.cdkeyElem.style.left = "50px";
		H.submitCollection.cdkeyElem.style.top = "200px";

		var flash = ['<object codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="30" height="20" id="IE_CPY">',
			'	<param name="allowScriptAccess" value="always" />',
			'	<param name="allowFullScreen" value="false" />',
			'	<param name="movie" value="http://appimg2.qq.com/card/swf/CopyString.swf" />',
			'	<param name="quality" value="high" />',
			'	<param name="bgcolor" value="#ffffff" />',
			'	<param name="wmode" value="opaque" />',
			'	<param name="flashvars" value="content_string=' + cdkey + '" />',
			'	<embed src="http://appimg2.qq.com/card/swf/CopyString.swf" width="30" height="20" flashvars="content_string=' + cdkey + '" quality="high"  id="NON_IE_CPY" name="objCopyQzone" allowScriptAccess="always" allowFullScreen="false" wmode="opaque" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />',
			'</object>'
		].join('');
		H.submitCollection.cdkeyElem.innerHTML = ['<div class="title">',
			'		<h2>温馨提示</h2>',
			'	</div>',
			'	<div class="mdl_c_c">',
			'		<div class="content_text popup_cdkey">',
			'			<p class="intro">',
			'				您成功领取了CDKEY1个，可兑换“梦之队”送出的豪礼1份，多集多得！ <a href="http://appimg2.qq.com/card/museum/museum_228.html" target="_blank">了解活动详情&gt;&gt;</a>',
			'			</p>',
			'			<ul class="list">',
			'				<li>',
			'					<p>' + cdkey + '</p>',
			'					<a href="javascript:void(0);" style="width:30px;height:20px;" class="copy">' + flash + '</a>',
			'				</li>',
			'			</ul>',
			'		</div>',
			'		<div class="btns">',
			'			<button type="button" class="bt2_tx4" onclick="window.open(\'http://rc.qzone.qq.com/myhome/28238?via=magic#!app=28238\')" title="去兑换">去兑换</button>',
			'		</div>',
			'	</div>',
			'	<button class="close" type="button" onclick="H.submitCollection.closeCdkey();" title="关闭">关闭</button>',
			'	<!--样式结构 开始-->',
			'	<div class="mdl_t_l"></div>',
			'	<div class="mdl_t_c"><span></span></div>',
			'	<div class="mdl_t_r"></div>',
			'	<div class="mdl_c_l"><span></span></div>',
			'	<div class="mdl_c_r"><span></span></div>',
			'	<div class="mdl_b_l"></div>',
			'	<div class="mdl_b_c"><span></span></div>',
			'	<div class="mdl_b_r"></div>',
			'	<!--样式结构 结束 -->'
		].join('');

		document.body.appendChild(H.submitCollection.cdkeyElem);
	},
	closeCdkey: function() {
		if (H.submitCollection.cdkeyElem) {
			document.body.removeChild(H.submitCollection.cdkeyElem);
			H.submitCollection.cdkeyElem = null;
		}
		jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "";
	},
	//复制cdkey
	cpyCdkey: function(str) {
		var flashObj = {};
		if (QZFL.userAgent.ie) {
			flashObj = jQuery('#submit_collection_dialog #IE_CPY')[0];
		} else {
			flashObj = jQuery('#submit_collection_dialog #NON_IE_CPY')[0];
		}

		if (flashObj && flashObj.setContent) {
			flashObj.setContent(cnt);
		}
	},
	//领取月任务的套卡的奖励道具卡
	getPropCard: function(themeid) {
		themeid = themeid || 0;
		if (0 == themeid) {
			jQuery('#submit_collection_dialog #P_GIFT_INFO')[0].innerHTML = '<strong>非常抱歉，现在领取的人多，请稍候在活动页面补领。</strong>'; /**escNone**/
			jQuery('#submit_collection_dialog #BUT_GIFT_USE')[0].innerHTML = '确定'; /**escNone**/
			jQuery('#submit_collection_dialog #BUT_GIFT_USE')[0].onclick = function() {
				jQuery('#submit_collection_dialog #DiV_GIFT')[0].style.display = 'none';
				jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = '';
			};
			return;
		}

		function fnSucc(oXml) {
			var obj = oXml.xmlDom.getElementsByTagName("QQHOME")[0];
			var iCode = obj.getAttribute("code");

			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode);
				return;
			}

			var curMap = H.submitCollection._mapThemeProp[themeid];
			jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = "none";
			jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "none";

			if (curMap) {
				jQuery('#submit_collection_dialog #DIV_GIFT_PIC')[0].innerHTML = '<img src="http://appimg2.qq.com/card/img/props/prop_month_exchange_' + curMap.id + '.png">'; /**escNone**/
				jQuery('#submit_collection_dialog #P_GIFT_INFO')[0].innerHTML = '<strong>您已经成功领取了<span class="text_important" style="font-size:14px">民居系列套卡</span>奖励——' + (curMap.num * 1 + H.submitCollection._addPropNum * 1) + '张“' + curMap.name + '”道具卡，可进行兑换收集《民居》绝版卡!   <a href="http://sobar.soso.com/t/88521193" target="_blank">了解活动详情》</a></strong><br/>'; /**escNone**/
				cardName = curMap.name;
				jQuery('#submit_collection_dialog #GIFT_DOWN_TIPS')[0].innerHTML = '<br/><strong>"' + curMap.name + '"道具卡已经放到您的道具箱中去了.</strong>'
			} else {
				var cur = {};
				for (var i = 0; i < PropCard.length; i++) {
					if (H.submitCollection._addProp == PropCard[i][0]) {
						cur = PropCard[i];
						break;
					}
				}
				jQuery('#submit_collection_dialog #DIV_GIFT_PIC')[0].innerHTML = '<img src="http://appimg2.qq.com/card/img/props/prop_month_exchange_' + H.submitCollection._addProp + '.png">'; /**escNone**/
				jQuery('#submit_collection_dialog #P_GIFT_INFO')[0].innerHTML = '<strong>您已经成功领取<span class="text_important" style="font-size:14px">民居欢乐送活动</span>——' + H.submitCollection._addPropNum + '张“' + cur[1] + '”道具卡，可进行兑换收集《民居》绝版卡!   <a href="http://sobar.soso.com/t/88521193" target="_blank">了解活动详情》</a></strong><br/>'; /**escNone**/
				jQuery('#submit_collection_dialog #GIFT_DOWN_TIPS')[0].innerHTML = '<br/><strong>"' + cur[1] + '"道具卡已经放到您的道具箱中去了.</strong>'
			}

			jQuery('#submit_collection_dialog #BUT_GIFT_USE')[0].innerHTML = '确定'; /**escNone**/
			jQuery('#submit_collection_dialog #BUT_GIFT_USE')[0].onclick = function() {
				jQuery('#submit_collection_dialog #DiV_GIFT')[0].style.display = 'none';
				jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = '';
			};
			parent.CARD.getFlashObj().refresh();
			jQuery('#submit_collection_dialog #DiV_GIFT')[0].style.display = "";
			CARD.sendPGV('ISD.QQshow.Card.gotMonthCard' + themeid);
		}

		function fnError(iCode) {
			jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "none";
			var sContent;
			//用户未注册
			if (iCode == -1005) {
				CARD.closeDialog();
				QSFL.sns.getApplicationWindow().location.href = "http://appimg2.qq.com/card/register_v3.html";
				return;
			} else if (iCode == -1001) {
				CARD.closeDialog();
				CARD.showLogin();
				return;
			} else if (iCode == -1102) {
				sContent = "对不起，您操作的号码和登录的号码不一致，请重新登录。";
			} else if (iCode == -10001) {
				sContent = "对不起，您没有可以领取的奖励。";
			} else if (iCode == -1101) {
				sContent = "您当前的数据未更新，建议清理缓存或联系当地运营商协助处理。";
			} else {
				sContent = '对不起，当前领取的人数过多，请稍后补领。';
			}

			jQuery('#submit_collection_dialog #STRONG_CONTENT')[0].innerHTML = sContent; /**escNone**/
			jQuery('#submit_collection_dialog #BUT_ALERT_CLOSE')[0].onclick = function() {
				jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = 'none';
				jQuery('#DIV_SUC_CONTENT')[0].style.display = '';
			};
			jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = "";
		}
		var uin = H.user.getUin();
		if (!uin) {
			CARD.showLogin();
		}
		var sUrl = 'http://card.show.qq.com/cgi-bin/card_user_get_gift?uin=' + uin + '&type=5&themeid=' + themeid + '&subtype1=' + H.submitCollection._addProp + '&count1' + H.submitCollection._addPropNum;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
		jQuery('#submit_collection_dialog #BTN_MINGJU')[0].style.display = "none";
		CARD.sendPGV('ISD.QQshow.Card.clickgetMonthCard' + themeid);
	},
	reConfirm: function() {
		jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = "none";
		jQuery('#submit_collection_dialog #STRONG_CONTENT')[0].innerHTML = '您确定不领取春节礼包吗？'; /**escNone**/
		jQuery('#submit_collection_dialog #BUT_USE')[0].innerHTML = '返回领取';
		jQuery('#submit_collection_dialog #BUT_USE')[0].onclick = function() {
			jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = "none";
			jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = '';
		}
		jQuery('#submit_collection_dialog #BUT_CANCEL')[0].style.display = '';
		jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = "";
	},
	goMuseum: function(recmdId) {
		CARD.closeDialog();
		parent.window.location.href = "/card/museum/museum_81.html";
	},
	/**
	 * 用户点击"暂时不放入集卡册"
	 */
	notSubmit: function() {
		CARD.getFlashObj().writeThemeSo(H.submitCollection._iThemeid);
		CARD.closeDialog();
	},
	tryShow: function(recmdId) {
		function fnSucc(oXml) {
			var obj = oXml.xmlDom.getElementsByTagName("QQSHOW")[0];
			var iCode = obj.getAttribute("code");
			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode);
				return;
			}
			jQuery('#submit_collection_dialog #P_TEXT_SUC')[0].style.display = "";

		}

		function fnError(iCode) {
			var sContent;
			if (iCode == -1001) {
				CARD.closeDialog();
				CARD.showLogin();
				return;
			} else if (iCode == -10022) {
				sContent = "对不起，您的形象未改变。";
			} else if (iCode == -10018) {
				sContent = "形象中的部分物品未拥有,不能保存。";
			} else {
				sContent = "保存失败,您可以到物品栏查看,再穿上保存。";
			}

			jQuery('#submit_collection_dialog #STRONG_CONTENT')[0].innerHTML = sContent; /**escNone**/
			jQuery('#submit_collection_dialog #DIV_SUC_CONTENT')[0].style.display = 'none';
			jQuery('#submit_collection_dialog #DIV_ALERT')[0].style.display = '';
		}
		jQuery('#submit_collection_dialog #BUT_PUTON_SHOW')[0].style.display = "none";
		var sUrl = 'http://show.qq.com/cgi-bin/qqshow_sns_saveshow?from=0&recmd=' + recmdId;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();

	},
	/*************临时接口***********/
	goTo361: function() {
		window.open("http://361london.qq.com");
		CARD.sendPGV("ISD.QQshow.Card.click_go_to_361");
		var img = document.createElement("img");
		img.src = "http://jump.t.l.qq.com/ping?target=http%3A//361london.qq.com/%3Fapp%3Dmoka&cpid=641009734&type=53";
	}
};
// <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-cn" lang="zh-cn"><head>
// 	<meta http-equiv="X-UA-Compatible" content="IE=7">
// 	<meta name="Keywords" content="魔法卡片,免费QQ秀,QQ秀,红钻,QQ空间,App,QQ游戏,Qzone,游戏,卡片,魔法,card,magic,腾讯,QQ,Tencent">
// 	<meta name="Description" content="魔法卡片是一个集卡游戏。在游戏里面，您是一位万能的魔法师，和您的好友一起交换、炼制卡片，最后集成套卡，留作永久纪念！游戏中，魔法学院还会给您免费发放精美QQ秀，作为集卡的奖励~">
// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
// 	<meta http-equiv="Content-Language" content="UTF-8">
// 	<meta name="robots" content="all">
// 	<meta name="author" content="Tencent-ISRD">
// 	<meta name="Copyright" content="Tencent">
// 	<title>魔法卡片 - QQ秀</title>
// <link rel="stylesheet" href="http://appimg2.qq.com/card/ac/css/style_v2.css" type="text/css" media="screen">
// <link rel="stylesheet" href="http://appimg2.qq.com/card/ac/css/style_v3.css" type="text/css" media="screen">
// <link rel="stylesheet" href="http://appimg2.qq.com/card/ac/css/dialog.css" type="text/css" media="screen">
// 	<link rel="Shortcut Icon" href="http://show.qq.com/favicon.ico" type="image/x-icon">

// 	<script>
// 	document.domain="qq.com";
// 	var oElem = top.document.getElementById("sideFrame");
// 	if(oElem)
// 	{
// 		oElem.parentNode.cols="0,*";
// 	}
// 	</script>
// <script type="text/javascript" src="/card/mk/card_info_v3.js" charset="UTF-8"></script>
// <script type="text/javascript" src="/card/js/card_collect_des.js" charset="UTF-8"></script>
// <script type="text/javascript" src="http://imgcache.qq.com/qqshow/qsfl/sh_core.js"></script><script type="text/javascript" charset="gb2312" src="http://imgcache.qq.com/ac/qqshow/qsfl/2_71/core.js"></script>
// <script type="text/javascript" src="http://imgcache.qq.com/qqshow/qsfl/expand/app_sns.js" charset="gb2312"></script> 
// <script type="text/javascript" src="/card/js/card_comm_v3.js?t=20120418" charset="UTF-8"></script>
// <script type="text/javascript" src="/card/js/prop_card_info.js?t=20120606" charset="UTF8"></script>
// </head>

function copyDone() {
	CARD.dialog.showMessage({
		cnt: "已经复制到剪贴板中",
		left: 90,
		top: 240
	});
	setTimeout(CARD.dialog.closeMessage, 1000);
};



﻿
var card_collect_des = {
	"235": "我终于集齐了《七夕鹊桥相会》，牛郎织女因我而重逢，神话故事因我而圆满，这样的七夕太浪漫啦！",
	"209": "我终于集齐《三坊七巷》套卡了！这片坐落在福建福州的街区可是中国十大历史文化名街之一呢！听闻旧时多是官宦豪绅巨商士大夫聚居的地方，真是让人神往呀~",
	"233": "我终于集齐《奥运》啦！那一张张精美的卡片让我了解了一个个精彩的奥运项目，挥别北京奥运，让我们随着体育健儿向伦敦奥运出发吧！",
	"227": "我终于集齐《党在我心中》套卡啦！我们现在的美好生活都是党浴血奋战千锤百炼的努力结果哦，来一起向伟大的党敬礼，说声：生日快乐吧！",
	"226": "端午不只是粽子，更该被记住的是它那亘古绵长的历史足迹，《端午习俗》，民族的习俗！",
	"223": "我终于集齐《父亲节快乐》套卡啦！每一张卡片都让我想起从小到大与父亲相处的点点滴滴。父亲是高山，父亲是大海，父亲是我身后最温暖的港湾，真想马上回家抱抱父亲，告诉我有多么爱他！",
	"222": "我终于集齐《水浒》啦！水泊梁山的豪气冲天有如醍醐灌顶，一百单八将好汉的飒爽英姿更如画卷般在我眼前展现，每一个英雄有一个故事，水浒是一出演不完的史诗！",
	"220": "我终于集齐《鸟类之最》套卡，原来小小飞鸟世界竟有如此之多的奥秘实在令我大开眼界啊！爱护鸟类要从你我做起哦！",
	"219": "我已经把《竹楼丝语》集完了！傣家女子及膝的长发，悠远的葫芦丝，那着迷的蜡染，那拨动心玄的西双版纳风情，走进彩云之南，走进深深几许的竹楼。",
	"215": "那一年天崩地裂，那一年心碎心痛。我集齐了《守护汶川》套卡，愿朋友们与我一起点亮灾区的希望。灾难不可怕，携手并肩，汶川，由我们来守护！汶川重建，我心同在。",
	"211": "斗拱，照壁，挑檐与瓦当，晋派建筑散发着浓浓的乡土风情，毫不掩饰它们的娟秀与靓丽。我已经将《晋派建筑》套卡收入囊中啦！你见过绰约的晋派建筑吗？没有，那还等什么，快来收集吧！",
	"210": "我已经把《竹楼丝语》集完了！傣家女子及膝的长发，悠远的葫芦丝，那着迷的蜡染，那拨动心玄的西双版纳风情，走进彩云之南，走进深深几许的竹楼。",
	"208": "我终于集成了《牧民游歌》。在那＂天苍苍，野茫茫，风吹草低见牛羊＂的蒙古大草原上，坐在蒙古包里，呷一小口青稞酒，感受着牧民那纯朴的民俗民风…",
	"207": "中国民居的风情，真是数也数不清。江浙的婉约，内蒙的豪迈，陕北的独特，北京的古风。历时9个多月，我终于将《民居》套卡收入囊中啦！终于对中国各省的民居有了全面的了解，你呢你呢？",
	"205": "黄土高原上，有着中国陕北的独特民居建筑——窑洞。它们依山而建，冬暖夏凉，已经有数千年历史，是中国古人智慧的结晶。我已经集齐了《陕北民窑》套卡，陕北风情，谁比我更了解？！",
	"204": "你有绝版几十年的老海报吗？我有！我已经集齐了《光辉旧海报》套卡，那些生动的记忆，如同振奋人心的旧海报一样，永不褪色！你也有吗？拿出来“秀”一下~~",
	"202": "孝顺是中国古代传统美德之一。《二十四孝》讲述了中国古代二十四个孝子的感人故事。现在我已经集齐《孝心 、 孝道》套卡啦！你也是孝顺的好孩子吗？那就一起来学习《二十四孝》故事吧！",
	"201": "孝顺是中国古代传统美德之一。《二十四孝》讲述了中国古代二十四个孝子的感人故事。现在我已经集齐《孝心 、 孝道》套卡啦！你也是孝顺的好孩子吗？那就一起来学习《二十四孝》故事吧！",
	"198": "童年的上课铃声似乎还回响在耳畔，集齐了《老课本印象》印象套卡，仿佛时间都在倒转，翻回了那熟悉的一页页课本。如果你也怀念，就一起回顾，你印象最深的是哪一课吧！",
	"155": "《西游记》套卡哪里逃！看我轻轻松松将你收入囊中！有时，十几年的旅程只为一个梦想；有时，十几年的辛酸只为一个信仰。还记得那个大闹天宫、斩妖除魔的传奇冒险故事吗？快来痛快淋漓，杀妖怪！",
	"154": "他们是一道钢铁长城，守护我们的平安祥和；他们是一束明亮阳光，温暖生活中的阴暗寒冷。我集齐了《军魂》套卡！你也不要落后哦！",
	"134": "我终于集齐了《建党伟业》套卡！书本与电影中的一幕幕感动与高亢，变成一张张卡片，如同足迹一样忠实记录中国共产党的诞生和成长。一起来回顾吧，那些永不褪色的记忆！",
	"126": "通过我的辛勤劳动，终于将《劳动最光荣》套卡收入囊中啦！我们是勤劳的小魔法师，用劳动创造快乐，用劳动创造明天，《劳动最光荣》！",
	"125": "君不见历经百年的石阶、琉璃瓦与龙壁，历经沧桑，却依然绚丽，仿佛在讲述着当初那段辉煌。我已经将《梦回大清》套卡收入囊中啦！团扇、旗袍，带你穿越清宫，去经历那多彩的年代。",
	"98": "开辟鸿蒙，谁为情种？都只为风月情浓。趁着这奈何天，伤怀日，寂寥时，试遣愚衷。因此上，演出这怀金悼玉的“红楼梦”。我已经集齐了《红楼梦》套卡！是感慨？是感动？谁解其中味？",
	"56": "英雄齐聚，风云乍起。千古兴亡多少事，悠悠。不尽长江滚滚流。集齐了《三国风云》套卡，心情也随之豪迈起来。一时多少豪杰，可惜英雄气短，天下，也终究只是大梦一场。可历史的魔力啊，总会拉我们回到那场梦中。"
};


﻿
var PropCard = [
	[2, '升炉卡', "http://appimg2.qq.com/card/img/props/prop_stove_upgrade.jpg", '达到升炉等级要求后，可代替金币升级炉子', 0, 199, '炉子最多可以升级到9级', "", 1, 1],
	[3, '开箱卡', "http://appimg2.qq.com/card/img/props/prop_open_slot.jpg", '使用后增加保险箱卡位1个，增加卡位上限55个', 0, 89, '最多可以开启55个卡箱', "", 105, 1],
	[4, '小魔瓶', "http://appimg2.qq.com/card/img/props/prop_little_bottle.png", '补充魔力值100点，魔力可以缩短炼卡时间、增加变卡概率', 0, 10, '', "http://appimg2.qq.com/card/img/props/prop_little_bottle_s.jpg", 2, 1],
	[5, '中魔瓶', "http://appimg2.qq.com/card/img/props/prop_middle_bottle.png", '补充魔力值550点，魔力可以缩短炼卡时间、增加变卡概率', 0, 50, '', "http://appimg2.qq.com/card/img/props/prop_middle_bottle_s.jpg", 3, 1],
	[6, '大魔瓶', "http://appimg2.qq.com/card/img/props/prop_big_bottle.png", '补充魔力值1200点，魔力可以缩短炼卡时间、增加变卡概率', 0, 100, '', "http://appimg2.qq.com/card/img/props/prop_big_bottle_s.jpg", 4, 1],
	[7, '100面值卡', "http://appimg2.qq.com/card/img/props/prop_100_card.png", '通过变卡可以变成任何面值在100以下的卡，包括闪卡', 0, 15, '', "http://appimg2.qq.com/card/img/props/prop_100_card_s.jpg", 5, 1],
	[8, '200面值卡', "http://appimg2.qq.com/card/img/props/prop_200_card.png", '通过变卡可以变成任何面值在200以下的卡，包括闪卡', 0, 25, '', "http://appimg2.qq.com/card/img/props/prop_200_card_s.jpg", 6, 1],
	[9, '抽卡包', "http://appimg2.qq.com/card/img/props/prop_card_pack.png", '使用后可抽取卡片补充至16张', 0, 29, '', "http://appimg2.qq.com/card/img/props/prop_card_pack_s.jpg", 7, 1],
	[10, "600面值卡", "http://appimg2.qq.com/card/img/props/prop_600_card.png", '通过变卡可以变成任何面值低于600的卡，包括闪卡', 0, 49, '', "http://appimg2.qq.com/card/img/props/prop_600_card_s.jpg", 8, 1],
	[12, "租炉卡", "http://appimg2.qq.com/card/img/props/prop_rent_stove_card.png", "使用后租用一个炼卡炉7天，经验加成与已有炉子相同", 0, 99, '', '', 11, 1],
	[13, "租炉体验卡", "http://appimg2.qq.com/card/img/props/prop_mini_rent_stove_card.png", "使用后租用一个炼卡炉3天，经验加成与已有炉子相同", 0, 59, '', '', 10, 1],
	[23, "黄土高原", "http://appimg2.qq.com/card/img/props/prop_month_exchange_23.png", "可随机兑换《民居》绝版套卡中的：陕北民居、青海民居、宁夏民居其中1张", 0, 999, '', '', 10, 0],
	[24, "草原风情", "http://appimg2.qq.com/card/img/props/prop_month_exchange_24.png", "可随机兑换《民居》绝版套卡中的：内蒙民居、东北民居、江西民居其中1张", 0, 999, '', '', 10, 0],
	[25, "八闽古街", "http://appimg2.qq.com/card/img/props/prop_month_exchange_25.png", "可随机兑换《民居》绝版套卡中的：上海民居、江苏民居其中1张", 0, 9999, '', '', 10, 0],
	[26, "傣族风情", "http://appimg2.qq.com/card/img/props/prop_month_exchange_26.png", "可随机兑换《民居》绝版套卡中的：云南民居、四川民居、贵州民居其中1张", 0, 999, '', '', 10, 0],
	[27, "乔家大院", "http://appimg2.qq.com/card/img/props/prop_month_exchange_27.png", "可随机兑换《民居》绝版套卡中的：山西民居、北京民居其中1张", 0, 999, '', '', 10, 0],
	[28, "土家情怀", "http://appimg2.qq.com/card/img/props/prop_month_exchange_28.png", "可随机兑换《民居》绝版套卡中的：湖南民居、广西民居、西藏民居其中1张", 0, 999, '', '', 10, 0],
	[29, "土楼文化", "http://appimg2.qq.com/card/img/props/prop_month_exchange_29.png", "可随机兑换《民居》绝版套卡中的：浙江民居、福建民居、山东民居其中1张", 0, 999, '', '', 10, 0],
	[30, "水色徽乡", "http://appimg2.qq.com/card/img/props/prop_month_exchange_30.png", "可随机兑换《民居》绝版套卡中的：安徽民居、台湾民居其中1张", 0, 999, '', '', 10, 0],
	[106, '大魔瓶', "http://appimg2.qq.com/card/img/props/prop_big_bottle.png", '补充魔力值4800点，魔力可以缩短炼卡时间、增加变卡概率', 0, 300, '', "http://appimg2.qq.com/card/img/props/prop_big_bottle_s.jpg", 106, 1],
	[109, '抽卡包', "http://appimg2.qq.com/card/img/props/prop_card_pack.png", '使用一次,可将抽取卡片补充至16张', 0, 87, '', "http://appimg2.qq.com/card/img/props/prop_card_pack_s.jpg", 109, 1]
];