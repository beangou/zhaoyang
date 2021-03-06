(function ($) {

    jQuery.fn.Accordion = function (options) { $(this).ExpandCollapse($.extend(options, { Mode: 'Accordion' })) };

    jQuery.fn.Tree = function (options) { $(this).ExpandCollapse($.extend(options, { Mode: 'Tree' })) };

    jQuery.fn.ExpandCollapse = function (options) {

        var defaults = {
            Mode: 'Accordion',
            AllowAllClosed: true,
            ExpandedSegments: [],            
            width: '100%'
        };

        $.extend(defaults, options);

        $(this).css('width', defaults.width);
        $(this).find('.CollapsedHeader').css('width', defaults.width);
        $(this).find('.CollapsedContent').css('width', defaults.width);    

        $(this).find('.CollapsedContent').hide();

        switch (defaults.Mode) {

            case 'Accordion':
                $(this).find('.CollapsedHeader').click(function () {
                    if (!$(this).hasClass('active')) {
                        $(this).parent().find('.CollapsedContent:visible').slideUp('fast').prev().removeClass('active');
                        $(this).addClass('active').next().slideDown('fast');
                    }
                    else {
                        if (defaults.AllowAllClosed == true)
                            $(this).removeClass('active').next().slideUp('fast');
                    }
                });

                if (defaults.ExpandedSegments.length > 0) {
                    //eq is zero based ....
                    var Selector = ".CollapsedHeader:eq(" + (defaults.ExpandedSegments[0] - 1) + ")";
                    $(this).find(Selector).addClass('active').next().show();

                }
                else {
                    if (defaults.AllowAllClosed == false) {
                        $(this).find('.CollapsedHeader:first').addClass('active').next().show();
                    }
                }

                break;


            case 'Tree':
                $(this).find('.CollapsedHeader').click(function () {
                    if ($(this).hasClass('active'))
                        $(this).removeClass('active').next().slideUp('fast');
                    else
                        $(this).addClass('active').next().slideDown('fast');
                });

                if (defaults.ExpandedSegments == 'All') {
                    $(this).find('.CollapsedHeader').addClass('active').next().show();
                }
                else {
                    for (var i = 0; i < defaults.ExpandedSegments.length; i++) {
                        var Selector = ".CollapsedHeader:eq(" + (defaults.ExpandedSegments[i] - 1) + ")";
                        $(this).find(Selector).addClass('active').next().show();
                    }
                }
                break;
        }


    };

})(jQuery);


function SwitchToAudience(newAudienceName, DefaultHeroImage) {

    var AudienceSelObj = $('ul.audiences li[data-audience="' + newAudienceName + '"]');
    if ((AudienceSelObj.length == 1) && (AudienceSelObj.hasClass("Selected") == false)) {
        $('ul.audiences li').removeClass("Selected");
        AudienceSelObj.addClass("Selected");

        if ($('ul.audiences').css('direction') == "ltr")
            $('ul.audiences').prepend(AudienceSelObj);
        else
            $('ul.audiences').append(AudienceSelObj);
 
        if (AudienceSelObj.attr('data-image') != undefined) {
            $('.hero').css('background-image', AudienceSelObj.attr('data-image'));
            $('.heroReduced').css('background-image', AudienceSelObj.attr('data-image'));
        }
        else {
            $('.hero').css('background-image', DefaultHeroImage);
            $('.heroReduced').css('background-image', DefaultHeroImage);
        }
            
        $('#RightNav .RightNavItem').hide();
        $('#RightNav .RightNavItem[data-audience *= "' + newAudienceName + '"]').show();

        $('#vChat').hide();
        $('#vChat[data-audience *= "' + newAudienceName + '"]').show();

        $(".CollapsedBox").hide();
        $(".CollapsedBox[data-audience = '" + newAudienceName + "']").slideDown("fast");
    }
}


function smc_getUrlVars() {
    var ParamArray = [], hash;

    var Parameters = window.location.search.substring(1).split('&');
    for (var iParam = 0; iParam < Parameters.length; iParam++) {
        hash = Parameters[iParam].split('=');
        ParamArray.push(hash[0]);
        ParamArray[hash[0]] = hash[1];
    }

    return ParamArray;
}
	
$(document).ready(function () {

	 $('ul.audiences li').each(function (index)
    {                
        var sAudience = $(this).attr('data-audience');
        var AudienceSegments = $('.AccordionSegment[data-audience *= "' + sAudience + '"]').clone();
        $('div.CollapsedBox[data-audience = "' + sAudience + '"]').append(AudienceSegments.children());

    });    
    
    var hash = smc_getUrlVars();
    
    if ($.inArray("SegNo", hash) != -1) {
        $(".CollapsedBox").Accordion({ AllowAllClosed: true, ExpandedSegments: [hash.SegNo] });
    }
    else {
        $(".CollapsedBox").Accordion({ AllowAllClosed: true });
    }
    
    
    
    /* report the data-featureId to the content block, if current block doesn't have any */
    $('.AccordionSegment ul.CollapsedContent').each(function (index) {
        if (!$(this).attr('data-featureId') && $(this).parent().attr('data-featureId'))
                $(this).attr('data-featureId', $(this).parent().attr('data-featureId'));
    });



});



var ensightenOptions = {
client: 'MSFTsupport',
clientId: 119,
ns: 'Bootstrapper',
nexus: "nexus.ensighten.com"
};
if ( ensightenOptions && !window[ensightenOptions.ns] ) {
window[ensightenOptions.ns]=function(h){var c={},b={};c.version="2.0.3";c.nexus=h.nexus||"nexus.ensighten.com";c.options={interval:h.interval||100,erLoc:h.errorLocation||c.nexus+"/error/e.gif",scLoc:h.serverComponentLocation||c.nexus+"/"+h.client+"/serverComponent.php",sjPath:h.staticJavscriptPath||c.nexus+"/"+h.client+"/code/",alLoc:h.alertLocation||c.nexus+"/alerts/a.gif",client:h.client,clientId:h.clientId};c.ruleList=[];c.exceptionList=[];c.ensightenVariables={};c.test=function(a){if(!a.executionData.hasRun){for(var d=
0;d<a.dependencies.length;d++)if(!1===a.dependencies[d]())return;a.execute()}};b.currentRuleId=-1;b.reportedErrors=[];b.reportedAlerts=[];b.getServerComponent=function(a){b.insertScript(window.location.protocol+"//"+c.options.scLoc,!1,a||!0)};b.setVariable=function(a,d){c.ensightenVariables[a]=d};b.getVariable=function(a){return a in c.ensightenVariables?c.ensightenVariables[a]:null};b.testAll=function(){for(var a=0;a<c.ruleList.length;a++)c.test(c.ruleList[a])};b.executionState={DOMParsed:!1,DOMLoaded:!1,
conditionalRules:!1};b.Rule=function(a){this.execute=function(){this.executionData.hasRun=!0;this.executionData.runTime.push(new Date);b.currentRuleId=this.id;try{this.code()}catch(a){window[ensightenOptions.ns].reportException(a)}finally{b.testAll()}};this.id=a.id;this.dependencies=a.dependencies||[];this.code=a.code;this.executionData={hasRun:!1,runTime:[]}};b.registerRule=function(a){if(b.getRule(a.id)&&-1!==a.id)return!1;c.ruleList.push(a);b.testAll();return!0};b.getRule=function(a){for(var d=
0;d<c.ruleList.length;d++)if(c.ruleList[d].id===a)return c.ruleList[d];return!1};b.hasRuleRun=function(a){return(a=b.getRule(a))?a.executionData.hasRun:!1};c.toTwoChar=function(a){return(2===a.toString().length?"":"0")+a};b.Alert=function(a){var d=new Date,d=d.getFullYear()+"-"+c.toTwoChar(d.getMonth())+"-"+c.toTwoChar(d.getDate())+" "+c.toTwoChar(d.getHours())+":"+c.toTwoChar(d.getMinutes())+":"+c.toTwoChar(d.getSeconds());this.severity=a.severity||1;this.date=d;this.subject=a.subject||"";this.type=
a.type||1;this.ruleId=a.ruleId||-1};b.generateAlert=function(a){a=b.imageRequest(window.location.protocol+"//"+c.options.alLoc+"?d="+a.date+"&su="+a.subject+"&se="+a.severity+"&t="+a.type+"&rid="+a.ruleId);a.timestamp=(new Date).getTime();this.reportedAlerts.push(a)};b.reportException=function(a){a.timestamp=(new Date).getTime();c.exceptionList.push(a);a=b.imageRequest(window.location.protocol+"//"+c.options.erLoc+"?msg="+a.message+"&lnn="+a.lineNumber+"&fn="+a.fileName+"&cid="+c.options.clientId+
"&rid="+b.currentRuleId);a.timestamp=(new Date).getTime();this.reportedErrors.push(a)};b.imageRequest=function(a){var d=new Image(0,0);d.src=a;return d};b.insertScript=function(a,d,b){var f=document.getElementsByTagName("script"),l;if(void 0!==d?d:1)for(l=0;l<f.length;l++)if(f[l].src===a&&f[l].readyState&&/loaded|complete/.test(f[l].readyState))return;if(b){b=!0==b&&"object"==typeof window._ensSCData?window._ensSCData:b;d=Math.random()*("1E"+(10*Math.random()).toFixed(0));f=window.location.href;if("object"===
typeof b)for(l in b){l=~f.indexOf("#")?f.slice(f.indexOf("#"),f.length):"";f=f.slice(0,l.length?f.length-l.length:f.length);f+=~f.indexOf("?")?"&":"?";for(k in b)f+=k+"="+b[k]+"&";f=f.slice(0,-1)+l;break}a+="?r="+d+"&ClientID="+c.options.clientId+"&PageID="+encodeURIComponent(f)}var e=document,h=a,j=e.head||e.getElementsByTagName("head");setTimeout(function(){if("item"in j){if(!j[0]){setTimeout(arguments.callee,25);return}j=j[0]}var a=e.createElement("script");a.src=h;a.onload=a.onerror=function(){this.addEventListener&&
(this.readyState="loaded")};j.insertBefore(a,j.firstChild)},0)};b.loadScriptCallback=function(a,b){var g=document.getElementsByTagName("script"),c,e=g[0];for(c=0;c<g.length;c++)if(g[c].src===a&&g[c].readyState&&/loaded|complete/.test(g[c].readyState))try{b()}catch(h){window[ensightenOptions.ns].reportException(h)}finally{return}g=document.createElement("script");g.type="text/javascript";g.async=!0;g.src=a;g.onerror=function(){this.addEventListener&&(this.readyState="loaded")};g.onload=g.onreadystatechange=
function(){if(!this.readyState||"complete"===this.readyState||"loaded"===this.readyState){this.onload=null;this.addEventListener&&(this.readyState="loaded");try{b.call(this)}catch(a){window[ensightenOptions.ns].reportException(a)}}};e.parentNode.insertBefore(g,e)};b.unobtrusiveAddEvent=function(a,b,c){try{var f=a[b]?a[b]:function(){};a[b]=function(){c.apply(this,arguments);return f.apply(this,arguments)}}catch(e){window[ensightenOptions.ns].reportException(e)}};b.anonymous=function(a,d){return function(){try{b.currentRuleId=
d?d:"anonymous",a()}catch(c){window[ensightenOptions.ns].reportException(c)}}};b.setCurrentRuleId=function(a){b.currentRuleId=a};b.bindImmediate=function(a,d){var c;if("function"===typeof a)c=new b.Rule({id:d||-1,dependencies:[],code:a});else if("object"===typeof a)c=a;else return!1;b.registerRule(c)};b.bindDOMParsed=function(a,c){var g;if("function"===typeof a)g=new b.Rule({id:c||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMParsed}],code:a});else if("object"===
typeof a)g=a;else return!1;b.registerRule(g)};b.bindDOMLoaded=function(a,c){var g;if("function"===typeof a)g=new b.Rule({id:c||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMLoaded}],code:a});else if("object"===typeof a)g=a;else return!1;b.registerRule(g)};b.bindPageSpecificCompletion=function(a,c){var g;if("function"===typeof a)g=new b.Rule({id:c||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.conditionalRules}],code:a});else if("object"===
typeof a)g=a;else return!1;b.registerRule(g)};b.callOnDOMParsed=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].testAll()};b.callOnDOMLoaded=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].executionState.DOMLoaded=!0;window[ensightenOptions.ns].testAll()};b.callOnPageSpecificCompletion=function(){for(var a=document.getElementsByTagName("script"),b=0,c=a.length;b<c;b++)if(a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i)&&
!("loaded"==a[b].readyState||"complete"==a[b].readyState)){setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion,50);return}setTimeout(function(){window[ensightenOptions.ns].executionState.conditionalRules=!0;window[ensightenOptions.ns].testAll()},1)};b.hasDOMParsed=function(){return window[ensightenOptions.ns].executionState.DOMParsed};b.hasDOMLoaded=function(){return window[ensightenOptions.ns].executionState.DOMLoaded};b.hasPageSpecificCompletion=function(){return window[ensightenOptions.ns].executionState.conditionalRules};
b.new_fArray=function(){var a=[],b=!1,c=!1;return{add:function(f){b&&!c?f():"function"==typeof f&&(a[a.length]=f)},exec:function(){c=!0;do{var f=a;a=[];b=!0;for(var e=0;e<f.length;e++)try{f[e].call(window)}catch(h){window[ensightenOptions.ns].reportException(h)}}while(0<a.length);c=!1},haveRun:function(){return b}}};c.timer=null;h=function(a,b){return function(){a.apply(b,arguments)}};window.console||(window.console={});var e=window.console;if(!e.log)if(window.log4javascript){var j=log4javascript.getDefaultLogger();
e.log=h(j.info,j);e.debug=h(j.debug,j);e.info=h(j.info,j);e.warn=h(j.warn,j);e.error=h(j.error,j)}else e.log=function(){};e.debug||(e.debug=e.log);e.info||(e.info=e.log);e.warn||(e.warn=e.log);e.error||(e.error=e.log);document.addEventListener?(-1<navigator.userAgent.indexOf("AppleWebKit/")?c.timer=window.setInterval(function(){/loaded|complete/.test(document.readyState)&&(clearInterval(c.timer),b.callOnDOMParsed())},50):document.addEventListener("DOMContentLoaded",b.callOnDOMParsed,!1),window.addEventListener("load",
b.callOnDOMLoaded,!1)):(setTimeout(function(){var a=window.document;(function(){try{if(!document.body)throw"continue";a.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,15);return}window[ensightenOptions.ns].callOnDOMParsed()})()},1),window.attachEvent("onload",function(){window[ensightenOptions.ns].callOnDOMLoaded()}));window.setInterval(b.testAll,c.options.interval);return b}(ensightenOptions);
callback8734=Bootstrapper.new_fArray();callback6628=Bootstrapper.new_fArray();callback6688=Bootstrapper.new_fArray();callback20603=Bootstrapper.new_fArray();callback11470=Bootstrapper.new_fArray();callback73276=Bootstrapper.new_fArray();callback74750=Bootstrapper.new_fArray();callback73345=Bootstrapper.new_fArray();callback73346=Bootstrapper.new_fArray();callback75415=Bootstrapper.new_fArray();callback73979=Bootstrapper.new_fArray();callback74196=Bootstrapper.new_fArray();callback74095=Bootstrapper.new_fArray();callback43849=Bootstrapper.new_fArray();try{Bootstrapper.setCurrentRuleId(8734);Bootstrapper.linkTracker=(function(){var _private={links:{},pushTrack:function(name,fn){if(typeof name!='string'){return false;}
this.links[name]=this.links[name]||[];if(typeof fn=='function'){this.links[name].push(fn);}
return true;},callTrack:function(name){if(typeof name!='string'){return false;}
var l=_private.links[name];if(typeof l=='object'&&l.length){for(var i=0;i<l.length;i++){l[i].call(this);}}}},_public={addLink:function(name,fn){return _private.pushTrack(name,fn);},addTracking:function(name,fn){return _private.pushTrack(name,fn);},getLink:function(name){return _private.links[name];},track:function(name){return _private.callTrack.call(this,name);}};return _public;})();Bootstrapper.attachLink=function(node,name,event){if(node==undefined||node==null||typeof name!='string'){return false;}
event=event||'onclick';Bootstrapper.unobtrusiveAddEvent(node,event,function(){Bootstrapper.linkTracker.track.call(this,name);});};;callback8734.exec();}catch(e){Bootstrapper.reportException(e);}try{Bootstrapper.setCurrentRuleId(6628);document._write=document.write;document.write=function(x){if(Bootstrapper.hasDOMParsed()&&document.getElementsByTagName('html').length&&document.getElementsByTagName('html')[0].innerHTML.match(/\<\/body/i)){var d=document.getElementById('jsPlaceHolder');if(d===null){d=document.createElement('div');d.style.display='none';d.style.height=0;d.style.width=0;d.id='jsPlaceHolder';}
x=x.split(/\<script/i);var scripts=[];var repSpans=[];var repScripts=[];if(x[0]==''){x.shift();}
for(var i=0;i<x.length;i++){x[i]=x[i].split(/\/script\>/i);if(x[i][0].indexOf('<')){scripts.push('<script'+x[i][0]+'/script>');x[i][0]="<span name='ensScript'></span>";}
x[i]=x[i].join('');}
x=x.join('');d.innerHTML=x;var spans=d.getElementsByTagName('span');for(var i=0;i<spans.length;i++){if(spans[i].getAttribute('name')=='ensScript'){var s=scripts.shift();s=s.replace(/\<\/script\>/i,'');s=s.replace(/\s"/g,'"');s=s.split('>');var attr=s[0].split(' ');var script=document.createElement('script');for(var j=1;j<attr.length;j++){attr[j]=attr[j].split('=');var attrName=attr[j].shift();attr[j]=attr[j].join('=');if(attr[j].match(/^(\'|\")/)){var wrapper=attr[j].slice(0,1);attr[j]=attr[j].slice(1,attr[j].length);attr[j]=attr[j].slice(0,attr[j].lastIndexOf(wrapper));}
script.setAttribute(attrName,attr[j]);script.text=s[1];}
repSpans.push(spans[i]);repScripts.push(script);}}
for(var i=repSpans.length-1;i>=0;i--){d.replaceChild(repScripts[i],repSpans[i]);}
document.body.appendChild(d);}
else{document._write(x);}}
Bootstrapper.linkTrack=function(e,fn){Bootstrapper.unobtrusiveAddEvent(e,'onclick',fn);};Bootstrapper.getElementsByClassName=function(d,c,f){x=arguments.length>1?arguments.length==2?typeof arguments[1]=="object"&&arguments[1]!=null?c:document:c:document;y=arguments.length>1?arguments.length==2?typeof arguments[1]=="boolean"?c:false:f:false;var e=[];x=typeof x=="object"?x:document;for(var b=x.getElementsByTagName("*"),a=0,g=b.length;a<g;a++){(!y&&b[a].className==d||y&&~b[a].className.indexOf(d))&&e.push(b[a]);}return e;};Bootstrapper.Cookies=new function(){this.defaultDomain='.'+window.location.hostname.match(/[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i)[0];this._cookies={};this.build=function(){for(var c=document.cookie.split("; "),a=0;a<c.length;a++)this._cookies[c[a].slice(0,c[a].indexOf("="))]=c[a].slice(c[a].indexOf("=")+1)};this.get=function(c,a,f){this.build();var g=this._cookies[c];if(arguments.length==1)return g;else for(var g=g.split(f||"&"),d=0,b=g.length;d<b;d++)if(g[d].indexOf(a+"=")==0)return g[d].slice((a+"=").length,g[d].length)};this.modCookie=function(c,a,f,g){document.cookie=c+"="+a+(f?";expires="+f:"")+";domain="+(g?g:this.defaultDomain)};this.set=function(c,a,f,g){if(arguments.length==4){for(var d="",b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d,f)}else{d="";for(b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a,f);else if(typeof a=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a)};this.addValue=function(c,a,f,g){this.build();var d=this._cookies[c]||"";if(arguments.length==4){for(var b="",e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b,f)}else{b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a,f);else if(typeof a=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a)};this.remove=function(c,a){this.build();if(this._cookies[c]){var f=(new Date).toGMTString();this.modCookie(c,"",f,a)}};this.check=function(c,a){this.build();return arguments.length==2?this.get(c).match(a+"=")?!0:!1:this._cookies[c]?!0:!1};this.build()};Bootstrapper.Cookies=new function(){this.defaultDomain='.'+window.location.hostname.match(/[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i)[0];this._cookies={};this.build=function(){for(var c=document.cookie.split("; "),a=0;a<c.length;a++)this._cookies[c[a].slice(0,c[a].indexOf("="))]=c[a].slice(c[a].indexOf("=")+1)};this.get=function(c,a,f){this.build();var g=this._cookies[c];if(arguments.length==1)return g;else for(var g=g.split(f||"&"),d=0,b=g.length;d<b;d++)if(g[d].indexOf(a+"=")==0)return g[d].slice((a+"=").length,g[d].length)};this.modCookie=function(c,a,f,g){document.cookie=c+"="+a+(f?";expires="+f:"")+";domain="+(g?g:this.defaultDomain)};this.set=function(c,a,f,g){if(arguments.length==4){for(var d="",b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d,f)}else{d="";for(b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a,f);else if(typeof a=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a)};this.addValue=function(c,a,f,g){this.build();var d=this._cookies[c]||"";if(arguments.length==4){for(var b="",e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b,f)}else{b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a,f);else if(typeof a=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a)};this.remove=function(c,a){this.build();if(this._cookies[c]){var f=(new Date).toGMTString();this.modCookie(c,"",f,a)}};this.check=function(c,a){this.build();return arguments.length==2?this.get(c).match(a+"=")?!0:!1:this._cookies[c]?!0:!1};this.build()};var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(b){for(var a=0;a<b.length;a++){var c=b[a].string,d=b[a].prop;this.versionSearchString=b[a].versionSearch||b[a].identity;if(c){if(-1!=c.indexOf(b[a].subString))return b[a].identity}else if(d)return b[a].identity}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);if(-1!=a)return parseFloat(b.substring(a+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();(function(){var BufferClass=typeof(Buffer)=='function'?Buffer:Array;var _buf=new BufferClass(16);var toString=[];var toNumber={};for(var i=0;i<256;i++){toString[i]=(i+0x100).toString(16).substr(1);toNumber[toString[i]]=i;}
function parse(s){var buf=new BufferClass(16);var i=0,ton=toNumber;s.toLowerCase().replace(/[0-9a-f][0-9a-f]/g,function(octet){buf[i++]=toNumber[octet];});return buf;}
function unparse(buf){var tos=toString,b=buf;return tos[b[0]]+tos[b[1]]+tos[b[2]]+tos[b[3]]+'-'+
tos[b[4]]+tos[b[5]]+'-'+
tos[b[6]]+tos[b[7]]+'-'+
tos[b[8]]+tos[b[9]]+'-'+
tos[b[10]]+tos[b[11]]+tos[b[12]]+
tos[b[13]]+tos[b[14]]+tos[b[15]];}
var b32=0x100000000,ff=0xff;function uuid(fmt,buf,offset){var b=fmt!='binary'?_buf:(buf?buf:new BufferClass(16));var i=buf&&offset||0;var r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&0x0f|0x40;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&0x3f|0x80;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;r=Math.random()*b32;b[i++]=r&ff;b[i++]=r>>>8&ff;b[i++]=r>>>16&ff;b[i++]=r>>>24&ff;return fmt===undefined?unparse(b):b;};uuid.parse=parse;uuid.unparse=unparse;uuid.BufferClass=BufferClass;if(typeof(module)!='undefined'){module.exports=uuid;}else{this.uuid=uuid;}}).call(window);var u=Bootstrapper.Cookies.get('_ensUUID');if(u==undefined||!u){u=window.uuid();var d=new Date();d.setTime(d.getTime()+1000*60*60*24*365.25*4);Bootstrapper.Cookies.set('_ensUUID',u,d);}else{var d=new Date();d.setTime(d.getTime()+1000*60*60*24*365.25*4);Bootstrapper.Cookies.set('_ensUUID',u,d);}
Bootstrapper.ajaxListener=(function(){var listeners={},listener=function(a,b){var detected=[],selector=a||function(){},attach=b||function(node){};return function(){if(typeof selector=='function'&&typeof attach=='function'){var n=selector();if(typeof n=='object'){if(n.length){for(var i=n.length-1;i>=0;i--){for(var j=0;j<detected.length;j++){if(n[i]==detected[j]){n.splice(i,1);}}}
for(var i=0;i<n.length;detected.push(n[i++]));for(var i=0;i<n.length;attach.call(n[i],n[i++]));}else{for(var i=0;i<detected.length;i++){if(n==detected[i]){return;}}
detected.push(n);attach.call(n,n);}}}}},_public={create:function(x,y){do{var a=parseInt(Math.random()*100000)+''}while(listeners[a]);listeners[a]=listener(x,y);}}
setInterval(function(){for(key in listeners){listeners[key]();}},500);return _public;})();;callback6628.exec();}catch(e){Bootstrapper.reportException(e);}try{Bootstrapper.setCurrentRuleId(6688);Bootstrapper.trackerFramework=(function(){cArray=function(){var funcs=[],hasRun=false;return{clear:function(){funcs=[];},add:function(f){if(hasRun){try{f();}catch(e){Bootstrapper.reportException(e);}
return;}
if(typeof f!=="function"){return;}
funcs[funcs.length]=f;},exec:function(){var toRun=funcs,i,len;hasRun=true;for(i=0,len=toRun.length;i<len;i++){try{toRun[i].call(window);}catch(e){Bootstrapper.reportException(e);}}},haveRun:function(){return hasRun;},getFuncs:function(){return funcs;}};};return{prePopulate:cArray(),postPopulate:cArray(),globalData:cArray(),localData:cArray(),globalEvents:cArray(),localEvents:cArray(),execute:function(){this.prePopulate.exec();this.events=this.getEvents();this.postPopulate.exec();this.target.t();},getData:function(){var retObj={};var localFuncs=this.localData.getFuncs();for(var i=0,l=localFuncs.length;i<l;i++){var tempObj=localFuncs[i].call(window);for(key in tempObj){if(tempObj[key]){retObj[key]=tempObj[key];}};}
this.localDataObj={};for(key in retObj){this.localDataObj[key]=retObj[key];}
var globalFuncs=this.globalData.getFuncs();for(var i=0,l=globalFuncs.length;i<l;i++){var tempObj=globalFuncs[i].call(window);for(key in tempObj){if(tempObj[key]){retObj[key]=tempObj[key];}};}
return retObj;},getEvents:function(){var retEvents='';var globalFuncs=this.globalEvents.getFuncs();for(var i=0,l=globalFuncs.length;i<l;i++){var temp=globalFuncs[i].call(window);retEvents+=retEvents!=''?','+temp:temp;}
var localFuncs=this.localEvents.getFuncs();for(var i=0,l=localFuncs.length;i<l;i++){var temp=localFuncs[i].call(window);retEvents+=retEvents!=''?','+temp:temp;}
return retEvents;},autoLaunch:function(){this.target=window.s;this.dataLayer=this.getData();this.execute();}}})();;callback6688.exec();}catch(e){Bootstrapper.reportException(e);}try{Bootstrapper.setCurrentRuleId(73502);Bootstrapper.TAG={_ns:"bi"};Bootstrapper.TAG.getMeta=function(mn){var m=document.getElementsByTagName('meta');for(var i in m){if(m[i].name==mn){return m[i].content;}}
return"";};Bootstrapper.TAG.appendCustomMeta=function(tn,tv){var meta;var appendTarget=document.getElementsByTagName('head').item(0);if(document.createElement&&(meta=document.createElement('meta'))){meta.name=tn;meta.content=tv;appendTarget.appendChild(meta);}}
Bootstrapper.TAG.removeMeta=function(mn){var m=document.getElementsByTagName('meta');var meta;for(var i in m){if(m[i].name==mn){meta=m[i];break;}}
if(meta&&typeof(meta)=="object"){var par=meta.parentElement||meta.parentNode;par.removeChild(meta);}}
Bootstrapper.TAG.getAttr=function(el,an){if($){return $(el).attr(an);}else{if(typeof(el)=="object"){return el.getAttribute(an);}else{return document.getElementById(el).getAttribute(an);}}
return"";};Bootstrapper.TAG.setAttr=function(el,an,av){try{if($){$(el).attr(an,av);}else{if(typeof(el)=="object"){el.setAttribute(an,av);}else{document.getElementById(el).setAttribute(an,av);}}
return true;}catch(err){return false;}}
Bootstrapper.TAG.getQueryValue=function(name,url){try{name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var results=regex.exec(url);return results==null?"":decodeURIComponent(results[1].replace(/\+/g," "));}catch(err){return"";}};}catch(e){Bootstrapper.reportException(e);}Bootstrapper.globalRuleList='8734;6628;6688;73502';
Bootstrapper.getServerComponent();
} 


(window.callback73346=window.callback73346||Bootstrapper.new_fArray()).add(function(){Bootstrapper.setCurrentRuleId(73346);Bootstrapper.bindDOMParsed(function(){try{Bootstrapper.setCurrentRuleId(73958);var searchphrase=$('#cuvChatQuery').val();$('.vChatButton').attr({'ms.cmpgrp':'body','ms.cmptyp':'button','ms.cmpnm':'askbtn','ms.title':'ask','ms.scn':'1.1','ms.scvalue':'modality','ms.scnct':'scnt','ms.searchtype':'filterSolution','ms.searchquery':searchphrase,'ms.interactiontype':'22'});var askButton=$('.vChatButton').get(0);if(navigator.appVersion.indexOf("MSIE")!=-1){Bootstrapper.unobtrusiveAddEvent(askButton,"onclick",function(){return function(){$('#vChatForm').attr({'ms.searchquery':$('#cuvChatQuery').val()});};}());}else{Bootstrapper.unobtrusiveAddEvent(askButton,'onmousedown',function(){return function(){$('#vChatForm').attr({'ms.searchquery':$('#cuvChatQuery').val()});};}());}
var topQA=$('.vChatTopIssues').get(0);if(navigator.appVersion.indexOf("MSIE")!=-1){Bootstrapper.unobtrusiveAddEvent(topQA,"onclick",function(){return function(){var qaselect=$(this).text();$(this).attr({"ms.cmpgrp":"body","ms.cmptyp":"dropdwn","ms.cmpnm":"topqa","ms.interactiontype":4,"ms.title":qaselect});};}(this));}else{Bootstrapper.unobtrusiveAddEvent(topQA,'onmousedown',function(){return function(){var prodname=$(this).text();$(this).attr({"ms.cmpgrp":"body","ms.cmptyp":"dropdwn","ms.cmpnm":"topqa","ms.interactiontype":4,"ms.index":selProductIndex,"ms.prod":selProductVal,"ms.title":qaselect});};}(this));}
$('div.TopIssues a').each(function(){if(navigator.appVersion.indexOf("MSIE")!=-1){Bootstrapper.unobtrusiveAddEvent(this,"onclick",function(){return function(){var qaselect=$(this).text();$(this).attr({"ms.cmpgrp":"body","ms.cmptyp":"list","ms.cmpnm":"qactg","ms.interactiontype":4,"ms.index":"1","ms.title":qaselect});};}(this));}else{Bootstrapper.unobtrusiveAddEvent(this,'onmousedown',function(){return function(){var prodname=$(this).text();$(this).attr({"ms.cmpgrp":"body","ms.cmptyp":"dropdwn","ms.cmpnm":"topqa","ms.interactiontype":4,"ms.index":"4","ms.title":prodname});};}(this));}});$('li[data-audience=Commercial] a').attr({'ms.cmptyp':'button','ms.cmpnm':'Commercial','ms.title':'Commercial','ms.interactiontype':'1'});$('li[data-audience=Consumer] a').attr({'ms.cmptyp':'button','ms.cmpnm':'Consumer','ms.title':'Consumer','ms.interactiontype':'1'});$(".CollapsedHeader a").click(function(){var ityp=14;if($(this).parent().hasClass('active')){ityp=15;}
var ti=$(this).text().trim();if(ti.length>30)
{ti=ti.substr(0,30)+"...";}
$(this).attr({"ms.cmpnm":$(".audiences li[class='Selected']").text().trim(),"ms.cmptyp":"expandcollapse","ms.interactiontype":ityp,"ms.title":ti,"ms.scn":"1.4","ms.scvalue":"topic"});});$(".CollapsedContent li a").each(function(){var t=$(this).text().trim();if(t.length>30)
{t=t.substr(0,30)+"...";}
$(this).attr({'ms.cmptyp':'link','ms.cmpnm':'acrdlnk','ms.interactiontype':'1','ms.scn':'1.5','ms.scvalue':'subtopic','ms.title':t});});$("#RightNav div").each(function(){var cmp=$("h3",$(this)).text().trim();if(cmp=="")
{cmp="rightnav";}
$(this).attr({"ms.cmpnm":cmp});$("ul li a",$("#RightNav div")).each(function(){$(this).attr({"ms.cmptyp":"link","ms.title":$(this).text().trim(),"ms.interactiontype":"1"});});});$(".RightNavAds a").each(function(){var adnm=$("img",$(this)).attr("alt");if(adnm.length>30)
{adnm=adnm.substr(0,30)+"...";}
$(this).attr({"ms.cmptyp":"ads","ms.interactiontype":"1","ms.title":adnm});});}catch(e){Bootstrapper.reportException(e);}});});;
	
