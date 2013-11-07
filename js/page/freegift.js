<html><head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>免费礼物</title>
<script type="text/javascript">window._timePoints = [new Date()];</script>
<script type="text/javascript">
//获取url参数
function getParam(name){
        var r = new RegExp("(\\?|#|&)"+name+"=([^&]*)(&|$)")
        var m = location.href.match(r)
        if(!m || m=="") m = top.location.href.match(r)
        return (!m?"":m[2]);
    };

function getCookie(name) {  
    var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
    return (!m ? "" : m[1]);
};
var _domain = /pengyou\.com$/.test(location.host)?"pengyou.com":"qq.com";
document.domain = _domain;
//ie背景图缓存
try {
  document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}

var _ptisp = getCookie("ptisp");
var baseUrl = _domain == "qq.com" ? ["http:\/\/", _ptisp?(_ptisp+"."):"", "qzs.qq.com"].join("") : "http:\/\/imgcache.pengyou.com";
var resDomain =  ["http:\/\/", _ptisp?(_ptisp+"."):"", "i.gtimg.cn"].join("");
var paramAppId   = parseInt( getParam("appid"));

var _v = 20130109;

window.platForm = isNaN( paramAppId )?353:paramAppId;
window.APPID    = isNaN( paramAppId )?353:paramAppId;

document.write('<base href="' + baseUrl +'/"></base>');
document.write('<link rel="stylesheet" href="' + resDomain +'/appimg/farm/css/v1/global_min.css?v='+_v+'" type="text/css" media="screen" />');
document.write('<link rel="stylesheet" href="' + resDomain +'/appimg/farm/css/v1/popup/pop_present.css?v='+_v+'" type="text/css" media="screen" />');
document.write('<link rel="stylesheet" href="' + resDomain +'/appimg/farm/css/v1/mod/friend_selector.css?v='+_v+'" type="text/css" media="screen" />');
</script>

<base href="http://cnc.qzs.qq.com/">
<link rel="stylesheet" href="http://cnc.i.gtimg.cn/appimg/farm/css/v1/global_min.css?v=20130109" type="text/css" media="screen">
<link rel="stylesheet" href="http://cnc.i.gtimg.cn/appimg/farm/css/v1/popup/pop_present.css?v=20130109" type="text/css" media="screen">
<link rel="stylesheet" href="http://cnc.i.gtimg.cn/appimg/farm/css/v1/mod/friend_selector.css?v=20130109" type="text/css" media="screen">



<style type="text/css">
    html{
        overflow:hidden;
    }
    
    .filter_blur{
        
    }
    
    .e_hide{
        display:none;
        
    }
    
</style>
</head>
<body class="filter_blur">

<script type="text/javascript">
    if( APPID == 353){
        document.write('<div class="g_pop_box pop_present" id="top_div"  >');
        document.write('<h1 class="date_pasture">活动时间：2月19日至3月19日</h1>');
    }else if( APPID == 358 ){
        document.write('<div class="g_pop_box pop_present" id="top_div"  >');
        document.write('<h1 class="date_pasture">活动时间：2月19日至3月19日</h1>');
    }else if( APPID == 365){
        document.write('<div class="g_pop_box pop_present pop_present_moka" id="top_div"  >');
        document.write('<h1>免费送礼</h1>');
    }else {
        document.write('<div class="g_pop_box pop_present" id="top_div"  >');
        document.write('<h1>免费送礼</h1>');
    }
</script>
    <div class="g_pop_box pop_present pop_present_moka" id="top_div"><h1>免费送礼</h1>
    
    <!-- 赠送礼物页签下pop_main的div追加类名present_send_show，收到礼物页签下追加present_receive_show -->
    <div class="pop_main present_send_show">
        <div class="pop_tab" id="menuCtrol">
            <h2 class="present_send_title"><a href="javascript:void(0);" onclick="return false;" _event="showPage" rel="send" title="">赠送礼物</a></h2>
            <h2 class="present_receive_title"><a href="javascript:void(0);" onclick="return false;" _event="showPage" rel="receive" title="" class="current">收到礼物</a></h2>
            <h2 class="present_old_title" style="display:none;" id="oldGiftMenu"><a href="javascript:void(0);" onclick="return false;" _event="showPage" rel="oldGift" title="">领旧版送礼的礼物</a></h2>
        </div>
        <div class="pop_content present_send_content" id="sendPage" style="display: none;">
            <div class="friend_selector_box">
                
                <div class="friend_selector" id="friendSelector">
                    <label>送给:</label>
                    <div class="friend_selector_search">
                    <ul class="friend_selector_list">
                    <li uin="81928669"><span class="friend_selector_name" title="~Sunflower~">~Sunflower~</span><span><i _event="remove">×</i></span></li>     <li uin="806550622"><span class="friend_selector_name" title="转角">转角</span><span><i _event="remove">×</i></span></li>     <li uin="978654166"><span class="friend_selector_name" title="雾雪">雾雪</span><span><i _event="remove">×</i></span></li>     <li uin="308707470"><span class="friend_selector_name" title="盈科而后进">盈科而后进</span><span><i _event="remove">×</i></span></li>     <li uin="37770272"><span class="friend_selector_name" title="pass">pass</span><span><i _event="remove">×</i></span></li>  </ul>    <input class="friend_selector_input" style="width: 20px;" value="" type="text">    <a href="javascript:void(0);" onclick="return false;" class="friend_selector_button g_btn_action g_btn_action_s g_btn_action_green" title=""><span>添加好友</span></a>    <span class="corner">     <span class="corner2_q corner_q"></span>     <span class="corner2_e corner_e"></span>     <span class="corner2_z corner_z"></span>     <span class="corner2_c corner_c"></span>    </span>   </div>   <!-- S 关键字过滤 -->   <div class="friend_selector_autocomplete" style="display:none;">       </div>   <!-- E 关键字过滤 -->           <!-- S 整组选择 -->   <div class="friend_selector_contacts" style="visibility:hidden;">              </div>   <!-- E 整组选择 -->  </div>
                <div class="friend_selector" id="friendSelectorHide" style="display:none;">
                    <label>送给:</label>
                    <div class="friend_selector_search">    
                        
                        <input class="friend_selector_input" readonly="readonly" style="width:300px;" value="" type="text">
                        <a href="javascript:void(0);" onclick="return false;" class="g_btn_action g_btn_action_s g_btn_action_green" style="display:none;" title=""><span>添加好友</span></a>
                        <span class="corner">
                            <span class="corner2_q corner_q"></span>
                            <span class="corner2_e corner_e"></span>
                            <span class="corner2_z corner_z"></span>
                            <span class="corner2_c corner_c"></span>
                        </span>
                    </div>
                    
                </div>
            </div>
            <p class="tips1" id="tips1">这些好友经常送你精美礼物，赶快也来赠送给他们吧！</p>
            <div class="present_box_wrap">
                <ul class="present_box g_md_img_list" id="sendGiftList">       <li _event="selectGift" gid="7">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_7_v_1.png" alt="" title="10点魔卡经验">         <span class="item_sup">经验</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="8">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_8_v_1.png" alt="" title="20魔法金币 ">         <span class="item_sup">金币</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="45">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_45_v_1.png" alt="" title="卡片镂刻">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="46">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_46_v_1.png" alt="" title="卡片敷彩">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="47">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_47_v_1.png" alt="" title="卡片画稿">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="48">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_48_v_1.png" alt="" title="卡片制皮">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="49">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_49_v_1.png" alt="" title="卡片缀结">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>                    <li _event="selectGift" gid="50">        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">         <img src="http://appimg.qq.com/freegift/365/freegift_50_v_1.png" alt="" title="卡片脱水">         <span class="item_sup">卡片</span>         <span class="corner">          <span class="corner4_q corner_q"></span>          <span class="corner4_e corner_e"></span>          <span class="corner4_z corner_z"></span>          <span class="corner4_c corner_c"></span>         </span>        </a>        <sup class="ico_selected"></sup>       </li>             </ul>
                <span class="corner">
                    <span class="corner2_q corner_q"></span>
                    <span class="corner2_e corner_e"></span>
                    <span class="corner2_z corner_z"></span>
                    <span class="corner2_c corner_c"></span>
                </span>
            </div>
            <a href="javascript:void(0);" id="sendBtn" onclick="return false;" class="g_btn_action g_btn_action_b g_btn_action_green" title=""><span>赠&nbsp;&nbsp;送</span></a>
            <p class="tips2" id="flashGiftDetail" style="display: block;"><a href="http://sobar.soso.com/t/92360964" title="详细说明" target="_blank">赠送/索要礼物说明</a></p>
            <span class="corner">
                <span class="corner1_q corner_q"></span>
                <span class="corner1_e corner_e"></span>
                <span class="corner1_z corner_z"></span>
                <span class="corner1_c corner_c"></span>
            </span>
        </div>
        <!-- 没礼物情况下加入no_present类名 -->
        <div class="pop_content present_receive_content" style="display: block;" id="receivePage">
            <div class="present_list_box">
                <ul class="present_list" id="receiveGiftList">       <li rid="4199" gid="7">        <div class="avatar_wrap">         <img src="http://qlogo1.store.qq.com/qzone/37770272/37770272/50" alt="">                 </div>        <div class="description_wrap">         <p class="tips1"><em>pass</em>11-05回赠您10点魔卡经验</p>                 </div>        <div class="present_img_wrap">         <div class="img" style=" background:url('http://appimg.qq.com/freegift/365/freegift_7_v_1.png') repeat-x 0 0; _background:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://appimg.qq.com/freegift/365/freegift_7_v_1.png' ,sizingMethod='crop')">         </div>                   <a href="javascript:void(0);" _event="onlyReceive" rid="4199" gid="7" onclick="return false;" class="g_btn_action g_btn_action_s g_btn_action_green" title=""><span>接&nbsp;受</span></a>                          </div>       </li>                    </ul>
            </div>
            <div class="no_present_box" id="noGiftShow">
                <script type="text/html" id="noGiftShowTemp">
                    <% if( hasReceive) { %>
                        <p class="tips1">礼物已经领完啦！</p>
                    <% } else { %>
                        <p class="tips1">目前你还没有收到任何礼物哦！</p>
                    <% } %>
                    
                    
                    <% if( friends && friends.length > 0) { %>
                        
                        <p class="tips2">送好友更多的礼物，会收到更多回馈哦！</p>
                        <ul class="friend_box g_md_img_list">
                            <% for( var i=0, _item; _item = friends[i]; i++) { %>
                                <li class="<%=selectClass%>" _event="selectFriend" fuin="<%=_item.uin%>">
                                    <div class="friend_img_wrap">
                                        <a class="g_md_img_wrap" href="javascript:void(0);" onclick="return false;" title="">
                                            <img src="<%=_item.img%>"  title="<%=_item.name%>" alt=""/>
                                            
                                        </a>
                                        <sup class="ico_selected"></sup>
                                        <span class="corner corner_s">
                                            <span class="corner3_q corner_q"></span>
                                            <span class="corner3_e corner_e"></span>
                                            <span class="corner3_z corner_z"></span>
                                            <span class="corner3_c corner_c"></span>
                                        </span>     
                                    </div>
                                    <p class="name_friend" title="<%=_item.name%>"><%=_item.name%></p>
                                </li>
                            <% } %>
                            
                            
                        </ul>
                        <a href="javascript:void(0);" _event="toSendPage"  onclick="return false;" class="g_btn_action g_btn_action_b g_btn_action_green" title=""><span>送他们礼物</span></a>
                        
                    <% } else { %>
                        <% if( quota) { %>
                            
                            <p class="tips2">添加更多好友互相赠送礼物吧！</p>
                            
                        <% }else{ %>
                            
                            <p class="tips2">今天送礼名额已经用完，明天再来吧！</p>
                            
                        <% } %>
                    <% } %>
                    
                </script>
                
            </div>
            <span class="corner">
                <span class="corner1_q corner_q"></span>
                <span class="corner1_e corner_e"></span>
                <span class="corner1_z corner_z"></span>
                <span class="corner1_c corner_c"></span>
            </span>
        </div>
        <div class="pop_content present_old_content" id="oldGiftPage" style="display: none;">
            <p class="greet">亲爱的农友：</p>
            <p><strong>我们的礼物系统更新了！</strong>您现在看到的是新版。</p>
            <p>虽然您在旧版送礼中还有若干礼物没有接收，</p>
            <p class="section_break"><strong>但是！我们全给您保留了————保质期至2012.11.30。</strong></p>
            <p><strong>您所有未接收的礼物都在这里，妥妥的，一件不落。</strong></p>
            <p>您可以点击<a href="javascript:void(0);" onclick="return false;" id="getOldGiftBtn" class="g_btn_action g_btn_action_s g_btn_action_green" title=""><span>一键接收旧版礼物</span></a>按钮来收取旧版未收的礼物哦~</p>
            <p class="section_break">新版送礼物增加智能推送好友功能，更体贴，更便捷。</p>
            <p>希望您一如既往地支持送礼系统！</p>
            <p class="signature">农场委员会</p>
            <span class="corner">
                <span class="corner1_q corner_q"></span>
                <span class="corner1_e corner_e"></span>
                <span class="corner1_z corner_z"></span>
                <span class="corner1_c corner_c"></span>
            </span>
        </div>
    </div>
    <a href="javascript:void(0);" class="pop_close" title="" onclick="parent.C.canvas.closeDialog();return false;">关闭</a>
    <div class="pop_present_bg" style="display:none;" id="bottom_bg_div"></div>
</div>

<div id="msgTip" style="display:none;height:0px;">
    <div class="g_pop_tips" style="float:left;position:absolute;">
        赠送成功
    </div>
</div>
<div class="g_pop_tips pop_tips_with_img" id="rewardTip" style="display:none;">
    <script type="text/html" id="rewardTipTemp">
        <p><%=msg%><%=gift.msg%></p>
        <div class="present_img_wrap">
            <div class="img" style=" background:url('<%=gift.asset_url_freegift%>') repeat-x 0 0; _background:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='<%=gift.asset_url_freegift%>' ,sizingMethod='crop')">
            </div>
        </div>
    </script>
</div>

<div id="sendMsgTip" style="display:none;">
    <div class="g_pop_tips" style="float:left;position:absolute;">
        <span rel="msg"></span>
        <a href="javascript:void(0);" _event="newFriends" onclick="return false;" class="g_btn_action g_btn_action_s g_btn_action_green" title=""><span>换批好友继续赠送</span></a>
        <a href="javascript:void(0);" _event="cancel" onclick="return false;" class="close" title="">x</a>
    </div>
    
</div>




<script type="text/javascript"> 
    
    window._timePoints[1] = new Date(); 
    var _constructQZFL = parent.constructQZFL || top.constructQZFL;
    if (_constructQZFL && (APPID != 365)) {
        eval('('+_constructQZFL+')();');
    }else{
        document.write('<script type="text/javascript" src="/ac/qzfl/release/qzfl_for_qzone.js?"><\/script>');
    }
    
    //这两个是图鉴的配置，这样每次就只需要修改页面即可以。不需要每次都发js出去
    window.giftSerialName = {
        "353" : "酷爽夏日",
        "358" : "可爱萌"
    }
    window.giftSerialId = {
        "353" : 22,
        "358" : 13
    }
    document.write('<script src="/snsapp/app/free_gift/js/friend_selector_all.js?v=' + _v +'&max_age=19851030" ><\/script>');
    //document.write('<script src="/snsapp/app/free_gift/js/freegift.js?v=' + _v + '&max_age=19851030" ><\/script>');
    document.write('<script src="/appimg/free_gift/' + window.platForm + '/config.js?v=' + Math.random() + '"><\/script>');
    document.write('<script src="/snsapp/app/free_gift/js/all.js?v=' + _v +'&max_age=19851030" ><\/script>');
</script>
<script type="text/javascript" src="/ac/qzfl/release/qzfl_for_qzone.js?"></script>
<script src="/snsapp/app/free_gift/js/friend_selector_all.js?v=20130109&amp;max_age=19851030"></script>
<script src="/appimg/free_gift/365/config.js?v=0.08802244393154979"></script>
<script src="/snsapp/app/free_gift/js/all.js?v=20130109&amp;max_age=19851030"></script>



<!--[if !IE]>|xGv00|978bb43e81e994dd7d2d213dc340983b<![endif]--></body></html>