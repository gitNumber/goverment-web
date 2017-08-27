//JS document

// 导航下拉框效果
$(document).ready(function() {
	//nav
	$(".nav > ul > li").mouseover(function() {
		$(this).addClass("current").siblings().removeClass("current");
		if ($(this).hasClass("popup")) {
			$(".nav-sub").slideDown(200);
			$(".nav-sub > div").hide().eq($(".nav > ul > li.popup").index(this)).show();
		} else {
			$(".nav-sub").slideUp(100);
		}
	});
	$(".nav").mouseleave(function() {
		$(".nav > ul > li").removeClass("current");
		$(".nav-sub").slideUp(100);
	});
	//自定义下拉框
	$(".sel h3").each(function() {
		$(this).click(function(event) {
			$(this).parents(".sel").siblings().removeClass("sel-on");
			event.stopPropagation();
			$(this).parents(".sel").toggleClass("sel-on");
		});
	});
	$(".sel li a").each(function() {
		$(this).click(function() {
			$(this).parents(".sel").find("h3 b").text($(this).text());
			$(this).parents(".sel").removeClass("sel-on");
		});
	});
	$(document).click(function(event){
		var eo=$(event.target);
		if(eo.attr("class")!="sel-list" && !eo.parent(".sel-list").length)
			$(".sel").removeClass("sel-on");
	});

});