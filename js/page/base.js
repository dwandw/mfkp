var H = {
	_root: '',
	extension_base_url: '',
	props: {
		PROPS_THEME_ID: 111,
		UNIVERSAL_CARD_ID: 1162
	},
	init: function() {
		H.extension_base_url = jQuery("#extension_base_url").text();
		H._root = jQuery("#helper");
	},
	checkFlashCard: function(themeId) { //闪卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x08);
	},
	checkJbCard: function(themeId) { //绝版卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x01);
	},
	checkRP: function(themeId) { //免合成卡
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return (theme[12] & 0x02);
	},
	checkCanTransfer: function(themeId) { //不能通过变卡得到
		if (!themeId) return false;
		theme = CARD.data.mapTheme[themeId];
		return !(theme[12] & 0x04);
	},
	hash: function(str) {
		var hash = 5381;
		for (var i = 0, len = str.length; i < len; ++i) {
			hash += (hash << 5) + str.charCodeAt(i);
		}
		return hash & 0x7fffffff;
	},
	getMsgByCode: function(code) {
		switch (code) {
			case -33076:
				return "对不起，您好友的专属精灵施展了“据守”技能，您无法偷他的炉！";
				break;
			case -33058:
				return "好友的卡片处于锁定状态,您不能交换哦!";
				break;
			case -1007:
				break;
			case -1008:
			case -1009:
			case -1103:
			case -1104:
			case -1105:
				return "要输入验证码！";
				break;
			case -32002:
				return "系统繁忙，请稍后再试!";
				break;
			case -10004:
				break;
			case -33004:
				return "箱子满了！";
				break;
			case -33033:
				return '您的卡片放入集卡册成功，但系统繁忙导致发放QQ秀奖励失败，我们会在24小时内补发，请注意查收。<br>（金币、经验、合成卡奖励已经成功发放）'
				break;
			case -33011:
				return "卡片尚未炼制完。";
				break;
			case -10005:
				break;
			case -2:
				break;
			case -33086:
				return "对不起，您没有集齐目标闪卡对应的普通套卡。";
			case -33084:
				return "您在此好友处偷炉的卡片尚未取出(查看自己场景下的偷炉位)，请先取卡后再偷炉~";
				break;
			case -304:
				return "<h>购买失败!</h><br><br>您的支付超出了单笔限额。去修改限制？";
			case -305:
				return "购买失败!<br>您的支付超出了单笔限额。";
				break;
			case -1002:
				return "系统繁忙，请稍后再试!";
				break;
			case -1005:
				return "未注册!，请稍后再试!";
				break;
			case -33007:
				break;
			case -1001:
				CARD.showLogin();
				return "请重新登陆！";
				break;
			case -11006:
				return "对不起，您可能不是Ta的好友!";
				break;
			case -410103:
				break;
			case -410104:
				break;
			case -410105:
				break;
			case -480001:
				break;
			case -310704:
				break;
			case -310502:
			case -3127006:
			case -1106:
				break;
			case -801:
				return "购买失败!<br />您的帐户余额不足";
				break;
			case -802:
				return "密保验证失败";
				break;
			case -1102:
				return "对不起，您操作的号码和登录的号码不一致，请重新登录！";
				break;
			case -10001:
				break;
			case -10002:
				return "很抱歉，租炉卡现在出于限量体验阶段。每小时限发售100张，请稍候再来购买。";
				break;
			case -10008:
				return "魔法学徒礼包每人只能购买一次，您已经购买过，不能再次购买。";
				break;
			case -310705:
			case -310707:
			case -310710:
				break;
			case -32001:
				return "对不起，您的消耗卡面值低于目标卡，请重新选择消耗卡。";
				break;
			case -32002:
				return "对不起，您的消耗卡可能已经被好友换走，请刷新\"我的魔法屋\"后再试。";
				break;
			case -33061:
				return "尊敬的魔法师，好友的卡片可能已被换走，请刷新查看后再试~";
				break;
			case -33064:
				return "对不起，您的魔力值不足，请补充魔力后再进行变卡。";
				break;
			case -33086:
				return "对不起，您没有选择对应主题的闪卡，请重新选择。";
				break;
			case -33087:
				return "对不起，您没有集齐目标闪卡对应的普通套卡。";
				break;
			case -50004:
				return "系统繁忙，请销后再试！";
			default:
				return "系统繁忙，请销后再试！";
		}
	},
	sortCardFunc: function(a, b) {
		if (b.id === 1162 && a.id === 1162) return 1;
		if (a.id === 1162) return 1;
		if (b.id === 1162) return -1;
		var themeIda = CARD.data.mapCard[a.id][1];
		var themeIdb = CARD.data.mapCard[b.id][1];
		if (themeIda === 81 && themeIdb === 81) return 1;
		if (themeIda === 81) return 1;
		if (themeIdb === 81) return -1;
		return b.id - a.id;
	},
	resChinese: function(str) {
		return unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
	},
	testUrl: function(url, arg) {
		function fnSucc(oXml) {
			H.ui.waitEnd();
			console.warn(H.resChinese(oXml.text));
		}

		function fnError(iCode) {
			console.error(iCode);
			H.ui.waitEnd();
		}
		H.ui.waitStart();
		var sUrl = "http://card.show.qq.com/cgi-bin/" + url + '?g_tk=' + this.hash(CARD.getCookie("skey"));
		for (var index in arg) {
			sUrl += '&' + index + '=' + arg[index];
		}
		var xhr = new CARD.XHR(sUrl, fnSucc, null, fnError);
		xhr.send();
	}
};