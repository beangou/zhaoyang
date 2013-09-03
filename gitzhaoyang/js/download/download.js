var srs;
var t;
var notices;
var index = 0;
$(function() {
	$.getJSON("js/download/srdownload.js", function(data) {
		srs = data;
		$.each(srs, function(i) {
			$('#downloadmenu').prepend('<li><a href="#"><span>' + srs[i].title + '</span>&nbsp;&nbsp;<img src="image/download/sub_bt.png"/></a></li>');
		});
		var divwidth = 500 - data.length * 58;
		$('#downloadmenu').append('<div style="height: ' + divwidth + 'px;border-right: 1px solid #ccc"></div>');
		$.each(srs[0].list, function(i) {
			$('#downloaddetail').append('<li class="clearfix"><span class="desc">' + srs[0].list[i].datetime + '</span><span class="downloadarea"><a href="' + srs[0].list[i].href + '"><img src="image/download/d_bt2.jpg" title="下载"/></a></span>' + srs[0].list[i].name + '</li>');
		});
		var li_01 = $('#downloadmenu li').eq(0);
		li_01.css("background", 'url("image/download/sub_chosen.png")');
		$('#downloadmenu li').click(function() {
			$(this).siblings("li").each(function(i) {
				$(this).css("background", 'url("image/download/sub_bg.png")');
			}).mouseenter(function() {
				$(this).css("background", 'url("image/download/sub_chosen.png")');
			}).mouseleave(function() {
				$(this).css("background", 'url("image/download/sub_bg.png")');
			});
			$(this).css("background", 'url("image/download/sub_chosen.png")');
			$(this).unbind("mouseleave");
			$(this).unbind("mouseenter");
			var j = $(this).index();
			$('#downloaddetail').empty();
			$.each(srs[j].list, function(i) {
				$('#downloaddetail').append('<li class="clearfix"><span class="desc">' + srs[j].list[i].datetime + '</span><span class="downloadarea"><a href="' + srs[j].list[i].href + '"><img src="image/download/d_bt2.jpg" title="下载"/></a></span>' + srs[j].list[i].name + '</li>');
			});
			refreshDownloadBt();
			return false;
		});
		refreshDownloadBt();
	});
	$.getJSON("js/download/notice.js", function(data) {
		notices = data;
		$('#notice').text(data[index].content);
		index++;
		t = setTimeout("changeNotice()", 3000);
	});

});
function changeNotice() {
	if (index == notices.length) {
		index = 0;
	}
	$('#notice').text(notices[index].content);
	index++;
	t = setTimeout("changeNotice()", 3000);
}

function refreshDownloadBt() {
	$('.downloadarea').css("display", "none");
	$('#downloaddetail li').mouseenter(function() {
		$(this).find(".downloadarea").css("display", "block");
	}).mouseleave(function() {
		$(this).find(".downloadarea").css("display", "none");
	});
}
