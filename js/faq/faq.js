var srs;
var t;
var notices;
var index = 0;
var curPage = 0;
$(function() {
	$.getJSON("js/faq/srfaq.js", function(data) {
		srs = data;
		change_page(0);
	});
});

function change_page(i) {
	$('#product-support-faq-ul').empty();
	for (var j = 0; j < 5; j++, i++) {

		$('#product-support-faq-ul').append('<li class="li-0"></li>');

		var this_li = $('#product-support-faq-ul li').eq(j);
		this_li.append('<div class="anchor"><a name="anchor-' + (i + 1) + '"></a></div>');

		this_li.append('<div onclick="expand_collapseData(this)" class="div-01 clearfix"><h2 class="p1 fl"><a class="a-1"><strong>' + srs[i].queNo + '.' + srs[i].question + '</strong></a></h2></div>');

		this_li.append('<div onclick="expandData(this)" class="div-02"><img width="104" height="14" src="image/faq/img_con_cn_faqs_01.jpg" class="expand_data"></div>');

		this_li.append('<div class="div-03 clearfix"><div class="left"><div class="left-01"><p>' + srs[i].answer + '</p></div></div></div>');

		this_li.append('<div onclick="collapseData(this)" class="div-04"><img width="109" height="14" src="image/faq/img_con_cn_faqs_02.jpg" class="collap_data"></div>');

	};
	if (i == 5) {
		curPage = 0;
		$('#page1').removeClass('a-2');
		$('#page2').removeClass('a-2');
		$('#page1').addClass('a-1');
		$('#page2').addClass('a-1');
		$('#page0').addClass('a-2');
		$('#page0').removeClass('a-1');
	} else if (i == 10) {
		curPage = 1;
		$('#page1').removeClass('a-1');
		$('#page2').removeClass('a-2');
		$('#page1').addClass('a-2');
		$('#page2').addClass('a-1');
		$('#page0').addClass('a-1');
		$('#page0').removeClass('a-2');
	} else if (i == 15) {
		curPage = 2;
		$('#page1').removeClass('a-2');
		$('#page2').removeClass('a-1');
		$('#page1').addClass('a-1');
		$('#page2').addClass('a-2');
		$('#page0').addClass('a-1');
		$('#page0').removeClass('a-2');
	}
}

//faq auto expand collapse Data
function expand_collapseData(obj) {
	if ($(obj).parent().find(".div-03").css("display") == "none") {
		$(obj).parent().find(".div-02").hide();
		$(obj).parent().find(".div-04").hide();
		$(obj).parent().find(".div-03").slideDown(1000);
		$(obj).parent().find(".div-04").show();
		$(obj).find(".p1 a").removeClass().addClass("a-2");
	} else {
		$(obj).parent().find(".div-03").hide(1000);
		$(obj).parent().find(".div-04").hide();
		$(obj).parent().find(".div-02").show(1000);
		$(obj).parent().find(".div-01 .p1 a").removeClass().addClass("a-1");
	}
}

//faq answer expand
function expandData(obj) {
	$(obj).parent().find(".div-02").hide();
	$(obj).parent().find(".div-03").slideDown(1000);
	$(obj).parent().find(".div-04").show();
}

//faq answer collapse
function collapseData(obj) {
	$(obj).parent().find(".div-02").show(1000);
	$(obj).parent().find(".div-01 .p1 a").removeClass().addClass("a-1");
	$(obj).parent().find(".div-03").hide(1000);
	$(obj).hide();
}

function changePage(obj) {
	$("#waite_all_product").show();
	$("#product-support-faq-ul,.page").empty();
	curPage = $(obj).attr("id");
	if (keyword) {
		_data = "{" + basedata + "'curPage':'" + curPage + "','keywords':'" + keyword + "'}";
	} else if (product) {
		_data = "{" + basedata + "'curPage':'" + curPage + "','productId':'" + product + "'}";
	} else {
		_data = "{" + basedata + "'curPage':'" + curPage + "','isTop':'1'}";
	}
	setTimeout("getFAQs(eval('('+_data+')'))", 600);
}

function startsMouseOut(obj) {
	var starts = $(obj).parents(".product-feedback").find(".ul .li-5 .scores").val();
	$(obj).parent(".big-start-wrap").find("span").each(function(index) {
		if (index < starts) {
			$(this).removeClass();
			$(this).addClass("big-star-2");
		} else {
			$(this).removeClass();
			$(this).addClass("big-star-1");
		}
	});
}

function startsMouseOver(obj) {
	$(obj).removeClass("big-star-1");
	$(obj).addClass("big-star-2");
	$(obj).prevAll("span").removeClass("big-star-1");
	$(obj).prevAll("span").addClass("big-star-2");
	$(obj).nextAll("span").removeClass("big-star-2");
	$(obj).nextAll("span").addClass("big-star-1");
}

//just for faq set starts
function setFaqScores(obj) {
	$(obj).removeClass("big-star-1");
	$(obj).addClass("big-star-2");
	$(obj).prevAll("span").removeClass("big-star-1");
	$(obj).prevAll("span").addClass("big-star-2");
	$(obj).nextAll("span").removeClass("big-star-2");
	$(obj).nextAll("span").addClass("big-star-1");
	var num = $(obj).parent(".big-start-wrap").find(".big-star-2").length;
	$(obj).parents(".product-feedback").find(".ul .li-5 .scores").val(num);
}

function txt_blur(mythis) {
	if ($(mythis).val() == "") {
		$(mythis).removeClass("txt-h24-3");
		$(mythis).removeClass("txt-h24-2");
		$(mythis).addClass("txt-h24");
		$(mythis).addClass("txt-h24-4");
	} else {
		$(mythis).removeClass("txt-h24");
		$(mythis).removeClass("txt-h24-4");
		$(mythis).addClass("txt-h24-3");
	}
}

function txt_focus(mythis) {
	$(mythis).removeClass("txt-h24");
	$(mythis).removeClass("txt-h24-4");
	$(mythis).addClass("txt-h24-2");
}

function sendFAQComment(obj) {
	var service = "faq";
	var user = getQueryString("UserAccount");
	if (user == "") {
		user = "anonymous";
	}
	var c = $(obj).parent().parent().find(".li-3 .p-2 .textarea-1").val().replace(/\s/g, "");
	var score = "{'score':'" + $(obj).parent().find(".scores").val() + "','recordId':'" + $(obj).parent().find(".faqid").val() + "','scoreUser':'" + user + "'}";
	var comment = "{'evaluateContent':'" + c + "','recordId':'" + $(obj).parent().find(".faqid").val() + "','evaluateUser':'" + user + "'}";
	var service = "faq";
	if (getLength(c) > 1000) {
		alert("鑷冲鑳借緭鍏�1000瀛楄瘎璁�");
	} else if (c.length == 0) {
		alert("璇勮涓嶈兘涓虹┖");
	} else {
		sendSupportScore(eval('(' + score + ')'), service);
		sendSupportComment(eval('(' + comment + ')'), service);
		$(obj).parent().parent().find(".li-3 .p-2 .textarea-1").val("");
	}
}

