function pagable_show(content_div, page_div, data_format, datasrc_url) {
	var a = content_div.ajaxPage({
		url : datasrc_url, //后端 url, {page} 为当前页, 可以为伪静态如:  xl_{page}.html
		run : false, //是否开始加载
		pageId : page_div, //分页容器
		content : function() {
			return data_format;
		}
	});
	a.run();
	a.get("first");
}

function lable_show(width, height, color, imgPath, obj, font_color) {
	obj.css("width", width);
	obj.css("background", "url('" + imgPath + "')");
	obj.css('position', 'relative');
	obj.height(height);
	obj.find('a').css('color', font_color);
	var div = $('<div style="background:' + color + '"></div>');
	div.css("opacity", 0.8);
	div.css('width', '100%');
	div.css('height', '100%');
	div.css('z-index', '1');
	div.css('left', '0');
	div.css('top', '0');
	div.css('position', 'absolute');
	obj.prepend(div);
	var p = obj.find('p');
	p.css('position', 'absolute');
	p.css('z-index', '900');
	//p.css('width','100%');
	p.css('height', '100%');
	p.css('left', '0');
	p.css('top', '0');
}

$(function() {
	pagable_show($('#xl'), $('#page'), '<ul>[data]<li>[{datatime}]<a href="{url}">{title}</a></li>[/data]</ul>', 'js/news/datasrc_news.js');
	lable_show('240px', '175px', "#2B8CFF", 'image/news/notic_bg.jpg', $('#lables'), '#E47827');
	$("#text").fsrPMD({
		Event : 'mouseover', //事件
		Id : 'text', //容器ID
		Bq : 'div', //复制html标签
		Fx : "down", //方向
		Time : 40 //时间
	})
});
