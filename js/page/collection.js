H.collection = {
	_uin: 0, //查询UIN
	_nick: "", //查询昵称
	_myuin: 0, //我的uin
	_main: 0, //是否是主页调用,main=0表示由排行榜点击进入，main=1表示由主页进入
	_flash_theme_count: 0, //闪卡的数量
	_ordinary_theme_count: 0, //普卡的数量
	_curindex: 0, //当前左页码为2*curindex+1，右页码为2*curindex+2
	_myTheme: [], //分馆收集的套卡的数量，重复的也算
	_allcol: [], //全部标签包括所有的已经收集的套卡
	_allnotcol: [], //全部标签包括所有的未收集的套卡
	_themecol: {}, //分馆已收集
	_themenotcol: {}, //分馆未收集
	_curcount: 0, //当前显示到的套卡
	_isLoadCol: true, //当前是否正在显示已经收集的套卡
	_redvip: false, //是否是红钻
	_numPerPage: 6, //每一页要显示的套卡
	_isError: false, //未收集是否为空
	_mapGiftList: [],
	_myColListLen: 0, //我收集的套卡种类
	_curGift: {}, //当前显示的QQ秀礼物
	_themeNum: [], //每个馆所包含的主题
	_allNum: 0, //所有的主题数
	_tid: 0,
	init: function() {
		H.collection.mapGiftList(); //礼物id和实际ID做一个映射，在加载图片时需要实际ID而不是礼物ID

		H.collection._uin = H.user.getUin();
		H.collection._main = 1;
		H.collection._tid = CARD.getURLParam("tid");
		H.collection._myuin = H.user.getUin();

		if (H.collection._main == 1) {
			H.collection._nick = unescape(H.user.oMyData.nick);

			if (H.collection._nick == '') {
				H.collection._nick = H.collection._uin + '';
			}

			if (H.collection._uin == H.collection._myuin) {
				CARD.sendPGV('IDS.QQshow.Card.My_collection');
			} else {
				CARD.sendPGV('ISD.QQshow.Card.Friend_collection');
			}
		} else {
			H.collection._nick = unescape(parent.RANK.sCurNick + '');
		}

		//主页在自己的场景点击才需要红钻信息
		if (H.collection._main && (H.collection._myuin == H.collection._uin)) {
			var iRed = H.user.oMyData.redvip;
			if (iRed && (iRed == 1)) {
				H.collection._redvip = true;
			} else {
				H.collection._redvip = false;
			}
		}
		if (H.user.bGotCollection) {
			// jQuery('#collection').dialog("open");
			H.collection.getMyColList();
		} else {
			H.user.loadMyColletion(function() {
				H.collection.getMyColList(); //获取自己收集过的主题
			});
		}
	},

	mapGiftList: function() {
		for (var i = 0; i < gift_list.length; ++i) {
			H.collection._mapGiftList[gift_list[i][0]] = gift_list[i][2];
		}
	},

	getUserThemeInfo: function() {
		var dialog = jQuery("#collection");
		if (dialog.children().length == 0) {
			var allcard_count = H.collection._ordinary_theme_count + H.collection._flash_theme_count;

			H.collection._getThemeList();

			//卡册完整度
			var allcardlen = theme_card_list.length - 1; //减去百变卡
			var rate = H.collection._myColListLen / allcardlen;
			rate = Math.round(rate * 1000);
			rate = rate / 10;

			//名字的特殊处理，防止部分名字过长
			var username = H.collection._nick.replace(/\r\n/g, '').replace(/\r/g, '').replace(/\n/g, '').escHtml();
			var name;
			if (username.length > 10) {
				name = username.substring(0, 9);
				name = name + '...';
			} else {
				name = username;
			}

			//左侧信息显示
			var userinfostr = '<a style="text-decoration:none"><strong title="' + username + '">' + name + '<br/>的集卡册</strong></a><p>成功收集</p><p>普卡：' + H.collection._ordinary_theme_count + '</p><p>闪卡：' + H.collection._flash_theme_count + '</p><p>卡册完整度：' + rate + '%</p>';
			var cardbookmenu = '';
			cardbookmenu += '<ul>';
			cardbookmenu += '<li class="active" id="LI_ALL"><a href="javascript:H.collection.changeView(0)" title="" ><span class="cardbook_menu_tab">全部套卡<span>' + (allcard_count > 0 ? allcard_count : 0) + '/' + H.collection._allNum + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_LEVEL_1"><a href="javascript:H.collection.changeView(10)" title="" ><span class="cardbook_menu_tab">一星<span>' + (H.collection._myTheme[9] > 0 ? H.collection._myTheme[9] : 0) + '/' + H.collection._themeNum[9] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_LEVEL_2"><a href="javascript:H.collection.changeView(11)" title="" ><span class="cardbook_menu_tab">二星<span>' + (H.collection._myTheme[10] > 0 ? H.collection._myTheme[10] : 0) + '/' + H.collection._themeNum[10] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_LEVEL_3"><a href="javascript:H.collection.changeView(12)" title="" ><span class="cardbook_menu_tab">三星<span>' + (H.collection._myTheme[11] > 0 ? H.collection._myTheme[11] : 0) + '/' + H.collection._themeNum[11] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_LEVEL_4"><a href="javascript:H.collection.changeView(13)" title="" ><span class="cardbook_menu_tab">四星<span>' + (H.collection._myTheme[12] > 0 ? H.collection._myTheme[12] : 0) + '/' + H.collection._themeNum[12] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_LEVEL_5"><a href="javascript:H.collection.changeView(14)" title="" ><span class="cardbook_menu_tab">五星<span>' + (H.collection._myTheme[13] > 0 ? H.collection._myTheme[13] : 0) + '/' + H.collection._themeNum[13] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_FASHION"><a href="javascript:H.collection.changeView(1)" title="" ><span class="cardbook_menu_tab">Q秀时尚馆<span>' + (H.collection._myTheme[0] > 0 ? H.collection._myTheme[0] : 0) + '/' + H.collection._themeNum[0] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_COMIC"><a href="javascript:H.collection.changeView(2)" title="" ><span class="cardbook_menu_tab">动漫馆<span>' + (H.collection._myTheme[1] > 0 ? H.collection._myTheme[1] : 0) + '/' + H.collection._themeNum[1] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_PLANT"><a href="javascript:H.collection.changeView(3)" title="" ><span class="cardbook_menu_tab">动植物馆<span>' + (H.collection._myTheme[2] > 0 ? H.collection._myTheme[2] : 0) + '/' + H.collection._themeNum[2] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_CULTURE"><a href="javascript:H.collection.changeView(4)" title="" ><span class="cardbook_menu_tab">文化馆<span>' + (H.collection._myTheme[3] > 0 ? H.collection._myTheme[3] : 0) + '/' + H.collection._themeNum[3] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_SPORT"><a href="javascript:H.collection.changeView(5)" title="" ><span class="cardbook_menu_tab">运动馆<span>' + (H.collection._myTheme[4] > 0 ? H.collection._myTheme[4] : 0) + '/' + H.collection._themeNum[4] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_TRAVEL"><a href="javascript:H.collection.changeView(6)" title="" ><span class="cardbook_menu_tab">旅游馆<span>' + (H.collection._myTheme[5] > 0 ? H.collection._myTheme[5] : 0) + '/' + H.collection._themeNum[5] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_BRAND"><a href="javascript:H.collection.changeView(7)" title="" ><span class="cardbook_menu_tab">品牌馆<span>' + (H.collection._myTheme[6] > 0 ? H.collection._myTheme[6] : 0) + '/' + H.collection._themeNum[6] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_FLASH"><a href="javascript:H.collection.changeView(8)" title="" ><span class="cardbook_menu_tab">闪卡馆<span>' + (H.collection._myTheme[7] > 0 ? H.collection._myTheme[7] : 0) + '/' + H.collection._themeNum[7] + '</span></span></a></li>';
			cardbookmenu += '<li id="LI_GAME"><a href="javascript:H.collection.changeView(9)" title="" ><span class="cardbook_menu_tab">游戏馆<span>' + (H.collection._myTheme[8] > 0 ? H.collection._myTheme[8] : 0) + '/' + H.collection._themeNum[8] + '</span></span></a></li>';
			cardbookmenu += '</ul>';
			dialog = jQuery('<div id="collection"></div>');
			var html = '';
			html += '<div class="popup_cardbook">';
			html += '<div class="content">';
			html += '<div class="user_info" id="DIV_USER">' + userinfostr + '</div>';
			html += '<div class="cardbook_menu" id="DIV_MENU">' + cardbookmenu + '</div>';
			html += '<div class="cardbook_book" id="DIV_BOOK_ALL"></div>';
			html += '<div class="cardbook_book" id="DIV_BOOK_DETAIL" style="display:none"></div>';
			html += '</div>';
			html += '    <div class="popup_bg">';
			html += '<div class="bg_01"></div>';
			html += '<div class="bg_02"></div>';
			html += '<div class="bg_03"></div>';
			html += '</div>';
			html += '</div>';
			dialog.html(html);
		}
		dialog.dialog({
			minWidth: 900,
			title: "我的集卡册",
			dialogClass: "dialogClass"
		});
		H.collection.changeView(0);
	},

	changeView: function(target) {
		jQuery("#LI_ALL")[0].className = "";
		jQuery("#LI_FASHION")[0].className = "";
		jQuery("#LI_COMIC")[0].className = "";
		jQuery("#LI_PLANT")[0].className = "";
		jQuery("#LI_CULTURE")[0].className = "";
		jQuery("#LI_SPORT")[0].className = "";
		jQuery("#LI_TRAVEL")[0].className = "";
		jQuery("#LI_BRAND")[0].className = "";
		jQuery("#LI_FLASH")[0].className = "";
		jQuery("#LI_GAME")[0].className = "";
		jQuery("#LI_LEVEL_1")[0].className = "";
		jQuery("#LI_LEVEL_2")[0].className = "";
		jQuery("#LI_LEVEL_3")[0].className = "";
		jQuery("#LI_LEVEL_4")[0].className = "";
		jQuery("#LI_LEVEL_5")[0].className = "";

		/*重置状态*/
		H.collection._curindex = 0;
		H.collection._curcount = 0;
		H.collection._isLoadCol = true;
		H.collection._isError = false;

		switch (target) {
			case 0:
				jQuery("#LI_ALL")[0].className = "active";
				break;
			case 1:
				jQuery("#LI_FASHION")[0].className = "active";
				break;
			case 2:
				jQuery("#LI_COMIC")[0].className = "active";
				break;
			case 3:
				jQuery("#LI_PLANT")[0].className = "active";
				break;
			case 4:
				jQuery("#LI_CULTURE")[0].className = "active";
				break;
			case 5:
				jQuery("#LI_SPORT")[0].className = "active";
				break;
			case 6:
				jQuery("#LI_TRAVEL")[0].className = "active";
				break;
			case 7:
				jQuery("#LI_BRAND")[0].className = "active";
				break;
			case 8:
				jQuery("#LI_FLASH")[0].className = "active";
				break;
			case 9:
				jQuery("#LI_GAME")[0].className = "active";
				break;
			case 10:
				jQuery("#LI_LEVEL_1")[0].className = "active";
				break;
			case 11:
				jQuery("#LI_LEVEL_2")[0].className = "active";
				break;
			case 12:
				jQuery("#LI_LEVEL_3")[0].className = "active";
				break;
			case 13:
				jQuery("#LI_LEVEL_4")[0].className = "active";
				break;
			case 14:
				jQuery("#LI_LEVEL_5")[0].className = "active";
				break;
		}

		jQuery('#DIV_BOOK_DETAIL')[0].style.display = "none";
		jQuery('#DIV_BOOK_ALL')[0].style.display = "";

		H.collection.displayCardInfo(target);
	},

	displayCardInfo: function(target) {
		target = target || 0; //0为显示全部，1-9对应相应的馆
		var str = []; //内容数组
		var arr = []; //存储的主题
		var curleft = 2 * H.collection._curindex + 1; //左页码
		var curright = 2 * H.collection._curindex + 2; //右页码
		var precount = H.collection._curcount; //保存之前所显示的主题数目
		var count = 0; //统计显示的套卡数

		str[str.length] = '<div class="cardbook_page_l">';
		str[str.length] = '<ul class="cardbook_cardlist" id="cardbook_cardlist">';

		if (H.collection._isLoadCol) {
			arr = (target == 0) ? H.collection._allcol : H.collection._themecol[target - 1];
			if (typeof(arr) == 'undefined') {
				H.collection._isLoadCol = false; //如果相应馆没有已经收集的套卡，则开始显示未收集的套卡
				arr = (target == 0) ? H.collection._allnotcol : H.collection._themenotcol[target - 1];
			}
		} else {
			arr = (target == 0) ? H.collection._allnotcol : H.collection._themenotcol[target - 1];
			if (typeof(arr) == 'undefined') {
				H.collection._isError = true; //相应馆没有未收集的套卡
			}
		}

		if (!H.collection._isError) {
			for (var i = 0; i < H.collection._numPerPage; i++) {
				if (H.collection._curcount >= arr.length) {
					if (H.collection._isLoadCol) { //如果当前正在显示已经收集的主题，则开始显示未收集的主题，并修改此字段
						arr = (target == 0) ? H.collection._allnotcol : H.collection._themenotcol[target - 1];
						H.collection._curcount = 0; //从0开始
						H.collection._isLoadCol = false;

						if (typeof(arr) == 'undefined') {
							H.collection._isError = true;
							break;
						}
					} else {
						break; //显示完未收集的主题则不在显示
					}
				}

				count++;
				var _theme = arr[H.collection._curcount++];
				var num = H.collection._isLoadCol ? H.user.mapCollection[_theme[0]].num : 0;
				str[str.length] = '<li><div class="card_theme_item card_em_theme_item">';
				str[str.length] = '<a title="' + _theme[1] + '" class="link" href="javascript:H.collection.displayDetailCardInfo(' + _theme[0] + ')"></a><img src="http://appimg2.qq.com/card/img/theme/' + _theme[0] + '_museum" class="bg" />';

				if (num >= 1) {
					str[str.length] = '<sup class="quantity" title="已收集' + num + '套">' + num + '</sup>';

					var coltime = new Date(H.user.mapCollection[_theme[0]].gifts[0][1] * 1000); //显示最新收集时间
					var col = coltime.getFullYear() + '-' + (coltime.getMonth() + 1) + '-' + coltime.getDate();
					str[str.length] = '</div><p class="card_theme_info">' + col + '集齐</p></li>';
				} else {
					str[str.length] = '<span class="alpha"></span>';
					str[str.length] = '</div></li>';
				}
			}
		}

		str[str.length] = '</ul>';
		str[str.length] = '<span class="cardbook_page_num">' + curleft + '</span></div>';
		str[str.length] = '<div class="cardbook_page_r"><ul class="cardbook_cardlist">';

		if (!H.collection._isError) {
			for (var j = 0; j < H.collection._numPerPage; j++) {
				if (H.collection._curcount >= arr.length) {
					if (H.collection._isLoadCol) {
						arr = (target == 0) ? H.collection._allnotcol : H.collection._themenotcol[target - 1];
						H.collection._curcount = 0;
						H.collection._isLoadCol = false;
						if (typeof(arr) == 'undefined') {
							H.collection._isError = true;
							break;
						}
					} else {
						break;
					}
				}

				count++;
				var _theme = arr[H.collection._curcount++];
				var num = H.collection._isLoadCol ? H.user.mapCollection[_theme[0]].num : 0;
				str[str.length] = '<li><div class="card_theme_item card_em_theme_item">';
				str[str.length] = '<a title="' + _theme[1] + '" class="link" href="javascript:H.collection.displayDetailCardInfo(' + _theme[0] + ')"></a><img src="http://appimg2.qq.com/card/img/theme/' + _theme[0] + '_museum" class="bg" />';


				if (num >= 1) {
					str[str.length] = '<sup class="quantity" title="已收集' + num + '套">' + num + '</sup>';

					var coltime = new Date(H.user.mapCollection[_theme[0]].gifts[0][1] * 1000);
					var col = coltime.getFullYear() + '-' + (coltime.getMonth() + 1) + '-' + coltime.getDate();
					str[str.length] = '</div><p class="card_theme_info">' + col + '集齐</p></li>';
				} else {
					str[str.length] = '<span class="alpha"></span>';
					str[str.length] = '</div></li>';
				}
			}
		}


		str[str.length] = '</ul>';
		str[str.length] = '<span class="cardbook_page_num">' + curright + '</span></div>';


		if (H.collection._curindex == 0) {
			str[str.length] = '<a class="cardbook_prev_dis" href="javascript:void(0)">前一页</a>';
		} else {
			str[str.length] = '<a class="cardbook_prev" href="javascript: H.collection.showPreView(' + target + ',' + count + ');">前一页</a>';
		}

		if (!H.collection._isLoadCol) {
			if (H.collection._isError || (!H.collection._isError && H.collection._curcount >= arr.length)) {
				str[str.length] = '<a class="cardbook_next_dis" href="javascript:void(0)" >后一页</a>';
			} else {
				str[str.length] = '<a class="cardbook_next" href="javascript: H.collection._curindex++;H.collection.displayCardInfo(' + target + ')" >后一页</a>';
			}
		} else {
			str[str.length] = '<a class="cardbook_next" href="javascript: H.collection._curindex++;H.collection.displayCardInfo(' + target + ')" >后一页</a>';
		}

		if (count != 0) {
			jQuery('#DIV_BOOK_ALL').html(str.join('').escNone());
		}
	},

	showPreView: function(target, count) {
		var arr = (target == 0) ? H.collection._allcol : H.collection._themecol[target - 1];

		if (arr == undefined) {
			arr = (target == 0) ? H.collection._allnotcol : H.collection._themenotcol[target - 1];
			H.collection._curcount = 12 * (H.collection._curindex - 1); //没有收集任何套卡。直接从未收集开始显示，则以12为单位往后退
		} else {
			var tmp = Math.round(arr.length / 12 - 0.5); //确定已经收集套卡能够显示到的页面
			var left = arr.length - tmp * 12;

			if (tmp == H.collection._curindex - 1) //要显示的页面是已经收集套卡的最后一个页面
			{
				H.collection._isLoadCol = true;
				H.collection._curcount = tmp * 12;
			} else if (tmp < H.collection._curindex - 1) //要显示的页面是未收集的套卡的中间页面
			{
				H.collection._isLoadCol = false;
				H.collection._curcount = H.collection._curcount - 12 - count;
			} else {
				H.collection._isLoadCol = true; //要显示的页面是已经收集的套卡的中间页面
				H.collection._curcount = 12 * (H.collection._curindex - 1);

				if (H.collection._isError) {
					H.collection._isError = false; //重置该状态
				}
			}
		}

		H.collection._curindex--; //往后退
		H.collection.displayCardInfo(target);
	},

	displayDetailCardInfo: function(themeid) {
		var str = [];
		var _theme = CARD.data.mapTheme[themeid];

		str[str.length] = '<div class="cardbook_page_l"><div class="cardbook_cardsuit_info"><div class="card_theme_item card_em_theme_item">';
		str[str.length] = '<img src="http://appimg2.qq.com/card/img/theme/' + _theme[0] + '_museum" class="bg" />';

		var num = H.user.mapCollection[_theme[0]] == undefined ? 0 : H.user.mapCollection[_theme[0]].num;

		str[str.length] = '</div><div class="card_info">';
		str[str.length] = '<h3>' + _theme[1] + '</h3>';
		str[str.length] = '<p>共' + _theme[11].length + '张卡片</p>';
		str[str.length] = '<p><span>收集难度：</span><strong class="rank"><span class="grade card_lv' + _theme[2] + '">' + _theme[2] + '</span></strong></p>';
		str[str.length] = '<p>发行时间：' + CARD.getTimeString(_theme[3]) + '</p>';

		if (H.user.mapCollection[_theme[0]] != undefined) //是否已经收集
		{
			str[str.length] = '<p>首次集齐：' + CARD.getTimeString(H.user.mapCollection[_theme[0]].gifts[H.user.mapCollection[_theme[0]].num - 1][1]) + '</p>';
			str[str.length] = '<p>最近集齐：' + CARD.getTimeString(H.user.mapCollection[_theme[0]].gifts[0][1]) + '</p>';
		} else {
			str[str.length] = '<p>未集齐</p><a href="javascript:H.collection._gotoDetailMuseum(' + _theme[0] + ')">查看套卡详情</a>'; /*未集齐套卡时显示链接让用户链接到相应第四版博物馆具体主题页面*/
		}

		str[str.length] = '</div></div><div class="cardsuit_detail"><span class="cardsuit_detail_t"></span><div class="cardsuit_detail_bd"><ul>';

		for (var j = 0; j < _theme[11].length; ++j) //显示套卡的所有卡片信息
		{
			str[str.length] = '<li><div class="card_theme_item card_em_theme_item"><strong class="title" style="color:' + CARD.ui.getThemeFontColor(_theme[0]) + '">' + CARD.data.mapCard[_theme[11][j]][2] + '</strong>';
			str[str.length] = '<img src="' + H.ui.getThemeImgSrc(_theme[0]) + '" class="bg" />';
			str[str.length] = '<img alt="' + CARD.data.mapCard[_theme[11][j]][2] + '" src="' + H.ui.getCardBigImgSrc(_theme[11][j]) + '" class="img" />';
			str[str.length] = '<span class="text" style="color:' + H.ui.getThemeFontColor(_theme[0]) + '">' + CARD.data.mapCard[_theme[11][j]][3] + '</span></div></li>';
		}

		str[str.length] = '</ul></div><span class="cardsuit_detail_b"></span></div></div><div class="cardbook_page_r"><h3>QQ秀奖励<a href="http://service.qq.com/info/34588.html" target="_blank" class="helplink">QQ秀说明</a></h3><ul class="cardbook_showdemons_list">';
		var giftlst = _theme[9]; //开始显示QQ秀奖励
		giftlst = giftlst.split('|');

		var expireTime = 3600 * 24 * 15; //除了闪卡之外，其他QQ秀奖励为15天过期

		if (H.checkFlashCard(_theme[0])) {
			expireTime = 3600 * 24 * 31; //闪卡为31天过期
		}

		var now = parseInt(new Date() / 1000);
		H.collection._curGift = {}; //清空QQ秀礼物列表，该字段主要是为了记录用户是否选取了该QQ秀作为奖励，实现用户点击在QQ上显示按钮时，灵活的实现在QQ上显示以及已保存两个显示的切换

		for (var j = 0; j < giftlst.length; ++j) {
			var giftid;
			if (j == giftlst.length - 1) {
				if (_theme[0] == 71) {
					continue; //闪亮派对天使的卡上卡时有同学在后面多填了一个直杆，导致拉去图片出问题，容错处理
				}
				giftid = parseInt(giftlst[j].split('#')[0]); //有些特殊的套卡后面带有#
			} else {
				giftid = parseInt(giftlst[j]);
			}

			giftid = H.collection._mapGiftList[giftid];
			giftid = giftid.split(' ')[0]; //学生时代的卡上卡时有同学在后面多填了一个空格，导致拉去图片出问题，容错处理     

			var url = 'http://imgcache.qq.com/qqshow_v3/htdocs/syndata/excel_snashot/' + Math.floor(giftid % 1000 / 100) + '/' + (giftid % 1000 % 100) + '/' + giftid + '_0.gif';
			var strinfo = '';

			if (H.collection._uin == H.collection._myuin && num > 0) {
				if (H.collection._redvip || now - H.user.mapCollection[_theme[0]].gifts[0][1] <= expireTime) {
					strinfo = '在QQ上显示';
				} else {
					strinfo = '';
				}
			} else {
				strinfo = '';
			}

			str[str.length] = '<li>';
			str[str.length] = '<a href="http://show.qq.com/show.html?MUrl=http%3A//imgcache.qq.com/qqshow_v3/htdocs/mall/inc/particular.html%3Ftype%3D10%26uin%3D0%26iID%3D' + giftid + '" target="_blank">';
			str[str.length] = '<img width=140px height=226px src="' + url + '" title="点击查看物品详情"/></a>';
			str[str.length] = '<p class="cardbook_btn">';

			var hasGift = false;

			if (strinfo != '') {
				for (var i = 0; i < H.user.mapCollection[_theme[0]].num; ++i) {
					if (giftid == H.user.mapCollection[_theme[0]].gifts[i][0]) {
						str[str.length] = '<a ID="LI_GIFT_' + giftid + '" class="cardbook_demons" href="javascript:H.collection.saveShow(' + giftid + ',' + _theme[0] + ');">' + strinfo + '</a>';
						hasGift = true;
						break;
					}
				}
				if (!hasGift) {
					str[str.length] = '<a  ID="LI_GIFT_' + giftid + '"  class="cardbook_demons" style="display:none" href="#" onclick="H.collection.saveShow(' + giftid + ',' + _theme[0] + ');">' + strinfo + '</a>';
				}
			} else {
				str[str.length] = '<a ID="LI_GIFT_' + giftid + '"  class="cardbook_demons" style="display:none" href="javascript:H.collection.saveShow(' + giftid + ',' + _theme[0] + ');">' + strinfo + '</a>';
			}
			str[str.length] = '<span ID="SPAN_SAVE_' + giftid + '" style="display:none"">已保存</span></p>';

			//查找当前用户是否已经有过这套QQshow,添加已收集图标。
			var bCollected = 0; //表示用户是否已经收集过改QQ秀。
			if (H.user.mapCollection[_theme[0]]) {
				for (var i = 0; i < H.user.mapCollection[_theme[0]].num; i++) {
					if (giftid == H.user.mapCollection[_theme[0]].gifts[i][0]) {
						bCollected = 1;
						break;
					}
				}
			}
			if (bCollected == 1) {
				str[str.length] = '<div class="received">已获得该QQ秀</div>';
			}
			str[str.length] = '</li>';

			H.collection._curGift[giftid] = hasGift; //为true时表示用户已经选取了该QQ秀作为奖励
		}

		str[str.length] = '</ul></div><a class="cardbook_back" href="javascript:H.collection._backtoMain()" >返回</a>';
		jQuery('#DIV_BOOK_ALL')[0].style.display = 'none';
		jQuery('#DIV_BOOK_DETAIL')[0].innerHTML = str.join('').escNone();
		jQuery('#DIV_BOOK_DETAIL')[0].style.display = '';
	},

	_gotoDetailMuseum: function(themeid) {
		CARD.closeDialog();
		var _theme = CARD.data.mapTheme[themeid];
		if (_theme[17] != undefined) {
			var clsfyList = H.collection._getClassifyList(_theme[17]);
			var target = clsfyList[1] + 2;
			window.parent.location.href = "http://appimg2.qq.com/card/museum/museum_" + themeid + ".html?version=4&type=1&mu=" + target;
		}

	},

	_backtoMain: function() {
		jQuery('#DIV_BOOK_DETAIL')[0].style.display = "none";
		jQuery('#DIV_BOOK_ALL')[0].style.display = "";
	},

	saveShow: function(recmid, themeid) {
		function fnSucc(oXml) {

			var obj = oXml.xmlDom.getElementsByTagName("QQSHOW")[0];
			var iCode = obj.getAttribute("code");
			if (iCode != 0) {
				console.error(oXml.text);
				fnError(iCode);
				return;
			}
			/*实现在QQ上显示和已保存的灵活切换*/
			var _theme = CARD.data.mapTheme[themeid];
			var giftlst = _theme[9];
			giftlst = giftlst.split('|');

			for (var i = 0; i < giftlst.length; ++i) {
				var giftid;
				if (i == giftlst.length - 1) {
					giftid = parseInt(giftlst[i].split('#')[0]);
				} else {
					giftid = parseInt(giftlst[i]);
				}
				giftid = H.collection._mapGiftList[giftid];
				giftid = giftid.split(' ')[0]; //去掉空格
				if (H.collection._curGift[giftid] == true) {
					if (recmid == giftid) {
						jQuery('#LI_GIFT_' + giftid)[0].style.display = "none";
						jQuery('#SPAN_SAVE_' + giftid)[0].style.display = "";
					} else {
						jQuery('#LI_GIFT_' + giftid)[0].style.display = "";
						jQuery('#SPAN_SAVE_' + giftid)[0].style.display = "none";
					}
				} else {
					jQuery('#LI_GIFT_' + giftid)[0].style.display = "none";
					jQuery('#SPAN_SAVE_' + giftid)[0].style.display = "none";
				}
			}
		}

		function fnError(iCode) {
			var sContent;
			if (iCode == -1001) {
				closeDialog();
				parent.CARD.showLogin();
				return;
			} else if (iCode == -10022) {
				sContent = "您的形象未改变。";
			} else if (iCode == -10018) {
				sContent = "形象中的部分物品未拥有,不能保存。";
			} else {
				sContent = "保存失败,您可以到物品栏查看,再穿上保存。";
			}

			CARD.ui.showErrDlg(document.body, {
				msg: sContent,
				title: '保存失败'
			});
		}
		var sUrl = 'http://show.qq.com/cgi-bin/qqshow_sns_saveshow?from=0&recmd=' + recmid;
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	},

	getMyColList: function() {
		H.collection._myTheme = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //九个分馆各集齐多少套，重复的也算，如情侣红钻收集5套，其他的三套，则相应馆为8套
		for (var themeId in H.user.mapCollection) {
			// for (var i = 0, len = oColList.length; i < len; i++) {
			var collectionData = H.user.mapCollection[themeId];
			//var themeId = parseInt(oColList[i].getAttribute("theme_id"));

			// if (H.collection._myColList[themeId] == undefined) {
			// 	H.collection._myColList[themeId] = [];
			// }

			// H.collection._myColList[themeId].push([parseInt(oColList[i].getAttribute("completetime")), parseInt(oColList[i].getAttribute("gift"))]);

			if (H.checkFlashCard(themeId)) {
				H.collection._flash_theme_count++;
			} else {
				H.collection._ordinary_theme_count++;
			}

			var tmp = H.collection._getClassifyList(CARD.data.mapTheme[themeId][17]);

			for (var j = 1; j <= tmp[0]; j++) {
				H.collection._myTheme[tmp[j]]++;
			}
			var level = CARD.data.mapTheme[themeId][2] + 8;
			H.collection._myTheme[level]++;
		}
		H.collection._getThemeNum();
		H.collection.getUserThemeInfo();

		if (H.collection._tid > 0) {
			H.collection.displayDetailCardInfo(H.collection._tid);
		}
	},
	_getThemeNum: function() {
		for(var themeId in CARD.data.mapTheme){
			var themeData = CARD.data.mapTheme[themeId];
			if (themeId != H.props.PROPS_THEME_ID) {
				H.collection._allNum++; //统计主题数目
				var tem = 0;
				if (themeData[17] != undefined) {
					tem = themeData[17];
				}

				var clsfyList = H.collection._getClassifyList(tem);
				for (var j = 1; j <= clsfyList[0]; j++) {
					var oType = clsfyList[j];
					/*统计每个主题馆的主题数*/
					if (H.collection._themeNum[oType] == undefined) {
						H.collection._themeNum[oType] = 0;
					}
					H.collection._themeNum[oType]++;
				}
				var level = themeData[2] + 8;
				if (H.collection._themeNum[level] == undefined) {
					H.collection._themeNum[level] = 0;
				}
				H.collection._themeNum[level]++;
			}
		}
	},

	_getClassifyList: function(clasfy) {
		var mycla = {};
		clasfy = parseInt(clasfy) | 0;
		if (0 == clasfy) {
			return 0;
		}

		var count = clasfy & 15; //取低四位
		if (count < 0)
			return -1;

		mycla[0] = count;
		clasfy = clasfy >> 4;
		for (var i = 1; i <= count; i++) {
			var tem = 0;
			tem = clasfy & 15;
			clasfy = clasfy >> 4;
			mycla[i] = tem;
		}

		return mycla;
	},
	_getThemeList: function() {
		for (var themeId in CARD.data.mapTheme) {
			var themeData = CARD.data.mapTheme[themeId];
			if (themeId != H.props.PROPS_THEME_ID) {
				//对集齐的套卡记录按时间排序
				if (H.user.mapCollection[themeId] != undefined) {
					H.collection._myColListLen++;
				}

				var tem = 0;
				if (themeData[17] != undefined) {
					tem = themeData[17];
				}

				var clsfyList = H.collection._getClassifyList(tem);

				for (var j = 1; j <= clsfyList[0]; j++) {
					var oType = clsfyList[j];

					//根据分馆类别以及是否集齐将套卡分类
					if (H.user.mapCollection[themeId] != undefined) {
						if (typeof(H.collection._themecol[oType]) == 'undefined') {
							H.collection._themecol[oType] = [];
						}
						H.collection._themecol[oType].push(themeData);
					} else {
						if (typeof(H.collection._themenotcol[oType]) == 'undefined') {
							H.collection._themenotcol[oType] = [];
						}
						H.collection._themenotcol[oType].push(themeData);
					}
				}
				if (H.user.mapCollection[themeId] != undefined) {
					var level = themeData[2] + 8;
					if (typeof(H.collection._themecol[level]) == 'undefined') {
						H.collection._themecol[level] = [];
					}
					H.collection._themecol[level].push(themeData);
				} else {
					var level = themeData[2] + 8;
					if (typeof(H.collection._themenotcol[level]) == 'undefined') {
						H.collection._themenotcol[level] = [];
					}
					H.collection._themenotcol[level].push(themeData);
				}

				//根据是否集齐将套卡分类
				if (H.user.mapCollection[themeId] != undefined) {
					H.collection._allcol[H.collection._allcol.length] = themeData;
				} else {
					H.collection._allnotcol[H.collection._allnotcol.length] = themeData;
				}
			}
		}

		function mycolsort(a, b) {
			return (H.user.mapCollection[b[0]].gifts[0][1] - H.user.mapCollection[a[0]].gifts[0][1]); //按最新集齐时间排序
		}

		function mynotcolsort(a, b) {
			return (CARD.data.mapTheme[b[0]][3] - CARD.data.mapTheme[a[0]][3]); //按发行时间排序
		}

		for (var i = 0; i < 14; ++i) {
			if (H.collection._themecol[i])
				H.collection._themecol[i].sort(mycolsort);

			if (H.collection._themenotcol[i])
				H.collection._themenotcol[i].sort(mynotcolsort);
		}


		if (H.collection._allcol)
			H.collection._allcol.sort(mycolsort);
		if (H.collection._allnotcol)
			H.collection._allnotcol.sort(mynotcolsort);
	}
};