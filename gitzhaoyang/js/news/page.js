/*
# by xl;
# www.xuexb.com;
# jquery;
*/
;(function (a) {
	var ajaxPage = function (d) {
		var c=a.extend({
			page			: 1,		//当前页
			pageSize		: 10,		//每页多少个
			url				: null, //后端 url, {page} 为当前页, 可以为伪静态如:  xl_{page}.html
			run				: false,	//是否开始加载
			beforeSend		: false,	//请求前调用
			complete		: false,	//请求后调用
			pageId			: null, 	//分页容器
			noData			: "\u6CA1\u6709\u627E\u5230",	//没有数据时提示
			content			: null,		//处理内容的循环,如 function () { return [list]标签是:{title},内容:{content}[/list] }			
			/*
			以上为对外接口;
			return obj.run();//运行
			return obj.get(i);//跳页
			*/			
			pageCount		: null,		//总页
			recordCount		: null,		//总条数
			isLoad			: false,	//是否加载过
			mark			: true		//请求开关, true可请求, false不可
		},d||{});
		
		var self = this;
		
		if (!self.length || !c.url) {
			return self	
		}
		var b = {};
		
		b.r = function (obj,opt) {
			var str;
			function fun(str) {
				for(var name in opt) {
					if(typeof opt[name]=="object") {
						// 字符串截取出新字符串
						var getStr=str.substring(str.indexOf("["+name+"]")+2+name.length,str.lastIndexOf("[/"+name+"]"));
						var newStr="";
						for(var i=0;i<opt[name].length;i++) {
							var newStrP=getStr;
							for(var s in opt[name][i]) {
								newStrP=newStrP.replace(eval("/{"+s+"}/ig"),opt[name][i][s]);
							}
							newStr+=newStrP;
						}
						str=str.replace("["+name+"]"+getStr+"[/"+name+"]",newStr);
					} else {
						if(opt[name]==undefined) {
							opt[name]="";
						}
						str=str.replace(eval("/{"+name+"}/ig"),opt[name]);
					}
				}
				return str;
			}
			str=obj;
			str=fun(str);
			return str;
		}

		b.run = function () {
			if(c.isLoad) {
				return self;	
			}
			c.isLoad = true;
			b.ajax();
			return self;
		}
		
		b.initUrl = function () {
			return b.r(c.url,{
				page:c.page,
				pageSize: c.pageSize
			});
		}
		
		b.ajax = function ()　{
			if(!c.isLoad) {
				return self;	
			}
			c.mark = false;
			a.ajax({
				beforeSend:c.beforeSend,
				complete:c.complete,
				url:b.initUrl(),
				//type:c.type,
				dataType:"json",
				success: function (res) {
					//对字符逻辑分页
					//alert(res.data.length);
					//alert(c.page);
					//alert(c.pageSize);
					//算出当前页数据
					var start=(c.page-1)*c.pageSize;
					res.data=res.data.slice(start,start+c.pageSize); 
					//console.log(res.data);
					b.each(res);//返回值 {"code":1,"pageCount":12,"recordCount":120,"data":[]}
					
				}
			});
		}
		
		b.each = function (res) {
			if (res) {
				if (res.code === 1) {
					if (c.content) {
						c.pageCount = res.pageCount;
						c.recordCount = res.recordCount;
						var s = "";
						if ("function" === typeof c.content) {
							s = c.content.call(c,c);	
						} else {
							s = c.content;	
						}
						self.html(b.r(s,res));
					}
				} else {
					c.pageCount = 0;
					c.recordCount = 0;
					self.html(c.noData);	
				}
				if(c.pageId) {
					b.toPage();
					b.toPageBind();
				}
				c.mark = true;
			}
		}
		
		b.get = function (i) {
			if(!c.isLoad || !c.mark || c.pageCount < 1) {
				return b;	
			} 
			switch (i) {
				case "pre":
					c.page --;
					break;	
				case "next":
					c.page ++;
					break;	
				case "first":
					c.page = 1;
					break;
				case "last":
					c.page = c.pageCount;
					break;
				default :
					if (isNaN(i)) {
						break;	
					}
					i = parseInt(i);
					if (i > c.pageCount) {
						i = c.pageCount;	
					}
					if (i == c.page ){
						return false	
					};
					
					c.page = i;
					break;
			}
			b.ajax();
			return self;
		}
		
		b.toPageBind = function () {
			var pId = c.pageId;
			pId.find("a.a_pre").click(function () {
				b.get("pre");	
			});	
			pId.find("a.a_next").click(function () {
				b.get("next");	
			});	
			pId.find("a.a_first").click(function () {
				b.get("first");	
			});	
			pId.find("a.a_last").click(function () {
				b.get("last");	
			});	
			pId.find("a.a_href").click(function () {
				b.get($(this).attr("data-i"));	
			});	
			pId.find('input.a_text').keydown(function (e) {
				if (e.keyCode === 13){
				   b.get($.trim($(this).val()));
				};
			});
			pId.find("input.a_button").click(function () {
				b.get($.trim(pId.find('input.a_text').val()));
			});
		}
		
		b.toPage = function () {
			var str="";
			if(c.recordCount>c.pageSize) {//如果总共页大小每页多少条则,否则不出现分页码
				var page=c.page*1,
					pageSize=c.pageSize*1,
					i=1,
					pageCount=c.pageCount;

				if(page>1) {
					str += "<a href=\"javascript:;\" class=\"a_pre\">&lt; \u4E0A\u4E00\u9875</a>";
				} else {
					str += "<span class=\"disable\">&lt; \u4E0A\u4E00\u9875</span>";
				};

				if(pageCount<7) {
					for(i;i<=pageCount;i++) {
						if(page===i) {
							str += "<span class=\"on\">"+i+"</span>";
						} else {
							str += "<a href=\"javascript:;\" class=\"a_href\" data-i=\""+ i +"\">"+i+"</a>";
						}
					}
				} else {
					var start,end;
					if(page===1) {
						str += "<span class=\"on\">1</span>";
					} else {
						str += "<a href=\"javascript:;\" class=\"a_first\">1</a>";
					};
					if(page>5) {
						str += "<span class=\"dot\">...</span>";
					};
					if(page<6) {
						start=1;
					} else {
						start=page-3;
					};

					if(page>(pageCount-5)) {
						end=pageCount;
					} else {
						end=page+4;
					};
					for(var i2=start;i2<end;i2++) {
						if(i2!==1&&i2!==pageCount) {//避免重复输出1和最后一页
							if(i2===page) {
								str += "<span class=\"on\">"+i2+"</span>";
							} else {
								str += "<a href=\"javascript:;\" class=\"a_href\" data-i=\""+ i2 +"\">"+i2+"</a>";
							}
						}
					};
					if(page<(pageCount-5)) {
						str += "<span class=\"dot\">...</span>";
					};
					if(page===pageCount) {
						str += "<span class=\"on\">"+pageCount+"</span>";
					} else {
						str += "<a href=\"javascript:;\" class=\"a_last\">"+pageCount+"</a>";
					};
				};

				if(page>=pageCount) {
					str += "<span class=\"disable\">\u4E0B\u4E00\u9875 &gt;</span>";
				} else {
					str += "<a href=\"javascript:;\" class=\"a_next\">\u4E0B\u4E00\u9875 &gt;</a>";
				};
				str += '<span class="href"><label for="pageText">\u5230\u7B2C</label><input autocomplete="off" type="text" class="a_text" value="'+ page +'"><label for="pageText">\u9875</label><input type="button" value="\u8F6C\u5230" class="a_button"></span>';
			};
			
			c.pageId.html(str);
			return b;	
		}
		
		//对外暴露接口
		self.run = b.run;
		self.get = b.get;
		if (c.run) {
			self.run();
		}
		return self;
	}
	a.fn.extend({ajaxPage:ajaxPage});
})(jQuery);
