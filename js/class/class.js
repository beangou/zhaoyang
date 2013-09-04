
$(function() {
	$.getJSON("js/class/srclass.js", function(data) {
		deal_data(data);
	});
});

function deal_data(myData) {
	$('#allsortId').empty();
	$.each(myData, function(i) {
		$('#allsortId').append('<div class="mt">' + myData[i].schoolGrade  + '</div><div class="mc"></div>');
		var thisMc = $('#allsortId .mc').eq(i);
		var myDataI = myData[i];
		$.each(myDataI.schoolContent, function(j) {
			thisMc.append('<div class="left-name" style="color:#4a8221">' + myDataI.schoolContent[j].grade + '</div><div class="right-subject"></div>');
			var thisSubjectJ = thisMc.find('.right-subject:last');
			var schoolContent = myDataI.schoolContent[j];
			var myClassList = schoolContent.classList;
			$.each(myClassList, function(k) {
				var classK = myClassList[k]; 
				thisSubjectJ.append('<a href="javascript:void(0)" onclick="return goSearch(null, "' + myDataI.schoolGrade + '", "' + schoolContent.grade + '", "数学")" target="_blank">' +  classK.class + '</a>  ');
			});	
		});
		
	});
}

//搜索条件设置
function goSearch(name, stage, grade, subject)
{
    /*
    if(typeof name == 'undefined' || name === null) name = '全部课程';
    if(typeof stage == 'undefined' || stage === null) stage = '全部阶段';
    if(typeof grade == 'undefined' || grade === null) grade = '全部年级';
    if(typeof subject == 'undefined' || subject === null) subject = '全部学科';
    var course_term=0;
    switch(grade){
        case '高中①':grade = '高中1必修';course_term = 1;break;
        case '高中②':grade = '高中2必修';course_term = 2;break;
        case '高中③':grade = '高中3必修';course_term = 3;break;
        case '高中④':grade = '高中4必修';course_term = 4;break;
        case '高中⑤':grade = '高中5必修';course_term = 5;break;
        case '中考复习专区':name = '中考好帮手';grade = '全部年级';break;
        case '高考复习专区':name = '高考好帮手';grade = '全部年级';break;
    }
    */
    window.location.href = 'http://127.0.0.1:8020/gzhaoyang/class/' + escape(grade) + '_' + escape(subject) + '_result.html';
    //else window.location.href = 'http://127.0.0.1:8020/gzhaoyang/class/result.html?product_name=' + escape(name);

    return false;
}

