function injectDiv() {
	if (CARD.checkLogin()) {
		var html = '';
		html += '<div id="helper_min" onclick="javascript:jQuery(\'#helper\').show();jQuery(\'#helper_min\').hide();" style="display:none;">打<br />开<br />助<br />手</div>';
		html += '<div id="helper">';
		html += '    <div id="tabs">';
		html += '        <ul>';
		html += '            <li><a href="#tabs-1" onclick="javascript:H.stoveBox.showStoves();">炼卡</a></li>';
		html += '            <li><a href="#tabs-2" onclick="javascript:H.box.showBox();">卡箱</a></li>';
		html += '            <li><a href="#tabs-3" onclick="javascript:;">好友列表</a></li>';
		html += '            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:jQuery(\'#helper\').hide();jQuery(\'#helper_min\').show();"><span class="ui-button-text">关闭助手</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.user.load(function(){H.notification.getUnlockTimes();});"><span class="ui-button-text">更新</span></button>&nbsp;&nbsp;&nbsp;&nbsp;';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.stoveTree.showTree();"><span class="ui-button-text">炼卡攻略</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.market.show();"><span class="ui-button-text">卡片市场</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.transform.init();"><span class="ui-button-text">变卡</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.collection.init();"><span class="ui-button-text">我的集卡册</span></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.dailytask.init();"><span class="ui-button-text">日常任务</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.share.init();"><span class="ui-button-text">好友分享</span></button>';
		html += '            <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:CARD.flashCalls.showFreeGiftPage(1);"><span class="ui-button-text">免费礼物</span></button>';
		html += '        </ul>';
		html += '        <div id="tabs-1">';
		html += '            <div id="stoves" class="width_87 center"></div>';
		html += '            <div id="steal_friends" class="width_87 center">';
		html += '            </div>';
		html += '        </div>';
		html += '        <div id="tabs-2">';
		html += '            <div class="width_87 center"><div id="random"></div><div class="option"></div></div>';
		html += '            <div id="exchange" class="width_87 center"></div>';
		html += '            <div id="coffer" class="width_87 center"></div>';
		html += '        </div>';
		html += '        <div id="tabs-3">';
		html += '            <div id="friends" class="float_left width_50">';
		html += '                <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all ui-state-hover"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.friends.showFriendList();"><span class="ui-button-text">QQ好友</span></button></h3>';
		html += '                <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"></div>';
		html += '            </div>';
		html += '            <div id="cardFriends" class="float_left width_50">';
		html += '                <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all ui-state-hover"><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.cardFriends.showFriendList();"><span class="ui-button-text">卡友</span></button><button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" onclick="javascript:H.cardFriends.showSelectTheme();"><span class="ui-button-text">查看其他套卡卡友</span></button><input type="text" onkeyup="javascript:if(event.keyCode == 13){var fuid = this.value.match(/[0-9]{5,10}/i)[0];H.exchange.showBox(fuid);}" /></h3>';
		html += '                <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"></div>';
		html += '            </div>';
		html += '            <div class="clear"></div>';
		html += '        </div>';
		html += '    </div>';
		html += '</div>';
		jQuery("body").append(html);
		jQuery("#tabs").tabs({
			active: 0
		});
		H.init();
		H.user.load(function() {
			H.notification.getUnlockTimes();
			jQuery('#SPAN_NICK').html(H.user.oMyData.nick + '(' + H.user.oMyData.uin + ')');
			H.stoveBox.showStoves();
			var html = '';
			html += '                0[我]<a href="javascript:void(1);" onclick="javascript:H.stoveTree.setStealUin(' + H.user.oMyData.uin + ');" title="炼卡">炼卡</a>&nbsp;&nbsp;&nbsp;&nbsp;<br />';
			html += '                1[苏](20372815)<a href="javascript:void(1);" onclick="javascript:H.stoveTree.setStealUin(20372815);" title="偷炉">偷炉</a>&nbsp;&nbsp;&nbsp;&nbsp;<br />';
			html += '                2[小瓶子](404584976)<a href="javascript:void(1);" onclick="javascript:H.stoveTree.setStealUin(404584976);" title="偷炉">偷炉</a>&nbsp;&nbsp;&nbsp;&nbsp;<br />';
			jQuery('#steal_friends').html(html);
		});
	}
};