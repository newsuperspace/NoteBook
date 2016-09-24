//导航高亮
jQuery(document).ready(function($){ 
var datatype=$(".header-nav").attr("data-type");
	$(".nav-menu>li ").each(function(){
		try{
			var myid=$(this).attr("id");
			if("index"==datatype){
				if(myid=="nvabar-item-index"){
					$("#nvabar-item-index a:first-child").addClass("current-menu-item");
				}
			}else if("category"==datatype){
				var infoid=$(".header-nav").attr("data-infoid");
				if(infoid!=null){
					var b=infoid.split(' ');
					for(var i=0;i<b.length;i++){
						if(myid=="navbar-category-"+b[i]){
							$("#navbar-category-"+b[i]+" a:first-child").addClass("current-menu-item");
						}
					}
				}
			}else if("article"==datatype){
				var infoid=$(".header-nav").attr("data-infoid");
				if(infoid!=null){
					var b=infoid.split(' ');
					for(var i=0;i<b.length;i++){
						if(myid=="navbar-category-"+b[i]){
							$("#navbar-category-"+b[i]+" a:first-child").addClass("current-menu-item");
						}
					}
				}
			}else if("page"==datatype){
				var infoid=$(".header-nav").attr("data-infoid");
				if(infoid!=null){
					if(myid=="navbar-page-"+infoid){
						$("#navbar-page-"+infoid+" a:first-child").addClass("current-menu-item");
					}
				}
			}else if("tag"==datatype){
				var infoid=$(".header-nav").attr("data-infoid");
				if(infoid!=null){
					if(myid=="navbar-tag-"+infoid){
						$("#navbar-tag-"+infoid+" a:first-child").addClass("current-menu-item");
					}
				}
			}
		}catch(E){}
	});
});
//top
$(document).ready(function(){
        $("#totop").hide()//隐藏go to top按钮
        $(function(){
            $(window).scroll(function(){
                if($(this).scrollTop()>1){//当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入
                    $("#totop").fadeIn();
					$("#totop").css("bottom","50px");
                } else {
                    $("#totop").fadeOut();
                }
            });
        });
     

        // 给go to top按钮一个点击事件
        $("#totop").click(function(){
            $("html,body").animate({scrollTop:0},800);//点击go to top按钮时，以800的速度回到顶部，这里的800可以根据你的需求修改
            return false;
        });
    });
//评论框光标定位
function tab(){
  document.getElementById("txaArticle").focus();
}

function RevertComment(i) {
	            $("#inpRevID").val(i);
                var p = $('#comment-'+i);
                var o = p.children(".comment-avatar").find("a").html();
                var q = p.find(".comment-connent").html();
                
                $("#reply-name").html(o);
                $("#reply-content").html(q);
                $("#reply-form").fadeIn("fast");
                $("#reply-text").html($('comment-reply-link').html());

                
	$("#reply-close").bind("click", function(){
	$("#inpRevID").val(0);
	$("#reply-name").html("");
    $("#reply-form").fadeOut("fast");
	window.location.hash="#comment";
	return false; });
 
}			
	

function CommentComplete(){
$("#reply-close").click();
}
//*enter+ctrl快捷键*********************
//快捷键
$(document).keypress(function(e){
      var s = $('.comment-submit-button');
      if( e.ctrlKey && e.which == 13 || e.which == 10 ){ 
        s.click();
        document.body.focus();
        return;
      }
      if( e.shiftKey && e.which==13 || e.which == 10 ) s.click();
    })
jQuery(document).ready(function(){
jQuery('.post-title a').click(function(){
    jQuery(this).text('页面载入中……');
    window.location = jQuery(this).attr('href');
    });
});
//*********************************************************
// 目的：    验证信息（小修）
// 输入：    无
// 返回：    无
//*********************************************************

function VerifyMessage() {

	var strFormAction=$("#inpId").parent("form").attr("action");
	var strName=$("#inpName").val();
	var strEmail=$("#inpEmail").val();
	var strHomePage=$("#inpHomePage").val();
	var strVerify=$("#inpVerify").val();
	var strArticle=$("#txaArticle").val();
	var intReplyID=$("#inpRevID").val();
	var intPostID=$("#inpId").val();
	var intMaxLen=1000;

	if(strName==""){
		alert(str01);
		return false;
	}
	else{
		re = new RegExp("^[\.\_A-Za-z0-9\u4e00-\u9fa5]+$");
		if (!re.test(strName)){
			alert(str02);
			return false;
		}
	}

	if(strEmail==""){
		//alert(str01);
		//return false;
	}
	else{
		re = new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
		if (!re.test(strEmail)){
			alert(str02);
			return false;
		}
	}

	if(typeof(strArticle)=="undefined"){
		alert(str03);
		return false;
	}

	if(typeof(strArticle)=="string"){
		if(strArticle==""){
			alert(str03);
			return false;
		}
		if(strArticle.length>intMaxLen)
		{
			alert(str03);
			return false;
		}
	}

	//ajax comment begin
	var strSubmit=$("#inpId").parent("form").find(":submit").val();
	$("#inpId").parent("form").find(":submit").val("sending...").attr("disabled","disabled").addClass("loading");

	$.post(strFormAction,
		{
		"isajax":true,
		"postid":intPostID,
		"verify":strVerify,
		"name":strName,		
		"email":strEmail,
		"content":strArticle,
		"homepage":strHomePage,
		"replyid":intReplyID
		},
		function(data){
		
			$("#inpId").parent("form").find(":submit").removeClass("loading");
			$("#inpId").parent("form").find(":submit").removeAttr("disabled");
			$("#inpId").parent("form").find(":submit").val(strSubmit);
		
			var s =data;
			if((s.search("faultCode")>0)&&(s.search("faultString")>0))
			{
				alert(s.match("<string>.+?</string>")[0].replace("<string>","").replace("</string>",""))
			}
			else{
				var s =data;
				var cmt=s.match(/cmt\d+/);
				if(intReplyID==0){
					$(s).insertAfter("#AjaxCommentBegin");
				}else{
					$(s).insertAfter("#comment-"+intReplyID+" .children");
				}
				window.location="#"+cmt;
				$("#txaArticle").val("");
				
				SaveRememberInfo();
				CommentComplete();
			}

		}
	);

	return false;
	//ajax comment end

}
jQuery(document).ready(function($){$("a[href$=jpg],a[href$=gif],a[href$=png],a[href$=jpeg],a[href$=bmp]").phzoom({});});