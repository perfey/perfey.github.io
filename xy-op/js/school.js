$(function() {
	//初始化每屏高度
	var screenHeight = $(window).height(),
	screenWidth = $(window).width(),
	hasInited = false,
	hasSetImg = false,
	isAndroid = false;
	if (screenHeight > screenWidth) {
		init();
	}

    //处理直接横屏浏览的情况
    window.addEventListener("orientationchange", function () {
        if (!hasInited) {
        	screenHeight = $(window).height(),
			screenWidth = $(window).width();
        	if (screenHeight > screenWidth) {
				init();
			}
        }
    }, false);

    function init() {
    	$(".content").height(screenHeight);
		$(".one-bg").height(screenHeight);
		$(".main-scr").height(screenHeight);
		$(".pjt-scr").height(screenHeight);
		$(".duty-scr").height(screenHeight);
		$(".skill-scr").height(screenHeight);
		$(".get-scr").height(screenHeight);
		$(".apply-scr").height(screenHeight);
		$(".apply-form").height(screenHeight);
		$(".last-two").height(screenHeight);
		$(".meet-scr").height(screenHeight);
		$(".welcome-scr").height(screenHeight);

		$(".duty-scr .duty-content").height(screenHeight - 38);
		$(".skill-scr .skill-content").height(screenHeight - 35);
		$(".get-scr .get-content").height(screenHeight - 37);
		$(".apply-scr .apply-content").height(screenHeight - 37);

		//首屏晃动效果
		$('#sceneOne').parallax();
		$('#sceneTwo').parallax({scalarY:false});
		var browser = navigator.userAgent;
	    if(browser.indexOf('Android') >= 0) {
			$('#sceneThree').addClass("android-scene-three");
			isAndroid = true;
	    } else {
	    	$('#sceneThree').parallax({scalarY:false});
	    }

		hasInited = true;
    }

    var $content = $(".content"),
    $applyForm = $(".apply-form"),
    $mainScr = $(".main-scr"),
    $pjtScr = $(".pjt-scr"),
    $meetScr = $(".meet-scr"),
    $welcomeScr = $(".welcome-scr"),
    $arrowUp = $(".arrow-up"),
    $applyScr = $(".apply-scr"),
    $lastTwo = $(".last-two"),
    $getScr = $(".get-scr"),
    $skillScr = $(".skill-scr"),
    $dutyScr = $(".duty-scr"),
    $formContent = $(".form-content"),
    $sceneThree = $("#sceneThree");

    function setImg() {
    	$sceneThree.find(".map-bg img").attr("src", staticUrlHead + "img/map.jpg");
    	$sceneThree.find(".cloud img").attr("src", staticUrlHead + "img/cloud.png");
    	$sceneThree.find(".city img").attr("src", staticUrlHead + "img/city.png");
    	$welcomeScr.find(".welcome-bg").attr("src", staticUrlHead + "img/welcome.jpg");
    }

    //传入y的像素  返回 transform对象
	function getTranslate3d(x,y) {
		return {
			'-webkit-transform': 'translate3d('+x+', '+y+', 0)',
			'-moz-transform': 'translate3d('+x+', '+y+', 0)',
			'-ms-transform': 'translate3d('+x+', '+y+', 0)',
			'-o-transform': 'translate3d('+x+', '+y+', 0)',
			'transform': 'translate3d('+x+', '+y+', 0)'
		}
	}


	$applyForm.on('touchmove', function(e) {
		e.preventDefault();
	});
	$content.on('touchmove', function(e) {
		e.preventDefault();
	});

	function showPjtScreen() {
		$mainScr.css("top", "-"+screenHeight+"px");
		$pjtScr.css("top", 0);
		setTimeout(function() {
			$pjtScr.addClass("show-pjt");
		}, 450);
		setTimeout(function() {
			if (!hasSetImg) {
				setImg();
				hasSetImg = true;
			}
		}, 1200);
	}

	$content.on("swipeUp", function() {
		if ($meetScr.hasClass("show-meet")) {
			$content.addClass("is-show-welcome");
			var meetTransform = getTranslate3d(0, '-'+screenHeight+'px');//展示第八屏
			$meetScr.css(meetTransform);
			if (!$welcomeScr.hasClass("show-welcome")) {
				/*setTimeout(function() {
					$(".welcome-scr .signature").css("display", "block").attr("src", staticUrlHead + "img/signature.gif");
				}, 2500);*/
				$arrowUp.addClass("hide");
			}
			$welcomeScr.addClass("show-welcome").addClass("is-show");
			return false;
		}
		if ($applyScr.hasClass("is-show")) {	//展示第七屏
			$content.addClass("is-show-meet");
			var applyTransform = getTranslate3d(0, '-'+screenHeight*2+'px');
			$applyScr.css(applyTransform);
			var lastTransform = getTranslate3d(0, '-'+screenHeight+'px');
			$lastTwo.css(lastTransform);
			$meetScr.addClass("show-meet");
			if (!isAndroid) {
				setTimeout(function() {
					$applyScr.removeClass("show-apply");
				}, 300);
			}
			return false;
		}
		if ($getScr.hasClass("show-get")) {	//展示第六屏
			$content.addClass("is-show-apply");
			var applyTransformObj = getTranslate3d(0, '-'+screenHeight+'px');
			$applyScr.css(applyTransformObj).addClass("is-show");
			setTimeout(function() {
				$applyScr.addClass("show-apply");
			}, 450);
			return false;
		}
		if ($skillScr.hasClass("show-skill")) {	//展示第五屏
			$content.addClass("is-show-get");
			$getScr.css("top", 0);
			$getScr.addClass("show-get");
			return false;
		}
		if ($dutyScr.hasClass("show-duty")) {	//展示第四屏
			$content.addClass("is-show-skill");
			$skillScr.css("top", 0);
			$skillScr.addClass("show-skill");
			return false;
		}
		if ($pjtScr.hasClass("show-pjt")) {
			$content.addClass("is-show-duty");
			$dutyScr.css("top", 0);
			$dutyScr.addClass("show-duty");
			return false;
		}
		showPjtScreen();
	});

	$content.on("swipeDown", function() {
		if ($welcomeScr.hasClass("is-show")) {	//显示第七屏
			$welcomeScr.removeClass("is-show");
			var meetTransform = getTranslate3d(0, 0);
			$meetScr.css(meetTransform);
			$content.removeClass("is-show-welcome");
			return false;
		}
		if ($meetScr.hasClass("show-meet")) {	//显示第六屏
			var applyTransform = getTranslate3d(0, '-'+screenHeight+'px');
			$applyScr.css(applyTransform);
			if (!isAndroid) {
				setTimeout(function() {
					$applyScr.addClass("show-apply");
				}, 300);
			}
			var lastTransform = getTranslate3d(0, 0);
			$lastTwo.css(lastTransform);
			$meetScr.removeClass("show-meet");
			$content.removeClass("is-show-meet");
			return false;
		}
		if ($applyScr.hasClass("is-show")) {	//显示第五屏
			var transformObj = getTranslate3d(0, 0);
			$applyScr.css(transformObj);
			setTimeout(function() {
				$applyScr.removeClass("is-show").removeClass("show-apply");
			}, 420);
			$content.removeClass("is-show-apply");
			return false;
		}
		if ($getScr.hasClass("show-get")) {	//显示第四屏
			$getScr.removeClass("show-get");
			$content.removeClass("is-show-get");
			return false;
		}
		if ($skillScr.hasClass("show-skill")) {	//显示第三屏
			$skillScr.removeClass("show-skill");
			$content.removeClass("is-show-skill");
			return false;
		}
		if ($dutyScr.hasClass("show-duty")) {	//显示第二屏
			$dutyScr.removeClass("show-duty");
			$content.removeClass("is-show-duty");
			return false;
		}
		//下滑第二屏 展示第一屏
		$mainScr.css("top", "0");
		$pjtScr.css("top", "100%");
		setTimeout(function() {
			$pjtScr.removeClass("show-pjt");
		}, 400);
	});


	//展示form表单
	$(".apply-scr .write-tips").on("tap", function() {
		$applyForm.css("left", "0");
		// var formTransform = getTranslate3d("-"+screenWidth+"px", 0);
		// $applyForm.css(formTransform);
		$arrowUp.addClass("short-hide");	//暂时隐藏滑动提示
		$applyScr.css("left", "-"+screenWidth+"px");
		// var applyTransform = getTranslate3d("-"+screenWidth+"px", '-'+screenHeight+'px');
		// $applyScr.css(applyTransform);
		$lastTwo.hide();
	});
	//展示报名流程
	$(".apply-form .back").on("tap", function() {
		$applyForm.css("left", "100%");
		// var formTransform = getTranslate3d(0, 0);
		// $applyForm.css(formTransform);
		$arrowUp.removeClass("short-hide");
		$applyScr.css("left", "0");
		// var applyTransform = getTranslate3d(0, '-'+screenHeight+'px');
		// $applyScr.css(applyTransform);
		$lastTwo.show();
	});

	$applyForm.on("swipeUp", function() {
		var height = $formContent.height();
		height = height - (screenHeight - 70);
		$formContent.css("top", '-'+height+'px');
		return false;
	});
	$applyForm.on("swipeDown", function() {
		$formContent.css("top", '0px');
		return false;
	});

	//是否为空
	function isEmpty(val) {
        if (!val || val.length === 0) {
            return true;
        }
        return false;
    }
    //是否是手机号
    function isMobile(val) {
        if (/^1(3|5|7|8)\d{9}$/g.test(val)) {
            return true;
        }
        return false;
    }
    //是否是邮箱
    function isEmail(val) {
        if (/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z]{2,6})$/.test(val)) {
            return true;
        }
        return false;
    }
    //是否是QQ号码
    function isQQ(val) {
    	if (/^[0-9]*[1-9][0-9]*$/.test(val)) {
    		return true;
    	}
    	return false;
    }

	//提交表单
	$(".apply-form .do-apply-btn").on("tap", function() {
		var name = $("#userName").val(),
		gender = $("input[name='genderRadios']:checked").val(),
		phone = $("#phone").val(),
		qq = $("#userQq").val(),
		email = $("#email").val(),
		schoolName = $("#schoolName").val(),
		profession = $("#profession").val(),
		grade = $("#userGrade").val(),
		work = $("#userWork").val();
		var errorMessage = "";
		if (isEmpty(name)) {
			errorMessage += "姓名"
		}
		if (isEmpty(gender)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "性别";
		}
		if (!isMobile(phone)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "手机";
		}
		if (isEmpty(qq) || !isQQ(qq)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "QQ";
		}
		if (!isEmail(email)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "邮箱";
		}
		if (isEmpty(schoolName)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "学校";
		}
		if (isEmpty(profession)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "专业";
		}
		if (isEmpty(grade)) {
			if (errorMessage) {
				errorMessage += "、";
			}
			errorMessage += "年级";
		}
		if (errorMessage) {
			alert("请输入正确的" + errorMessage);
			return false;
		}
		if (!isEmpty(work) && work.length > 200) {
			alert("在校担任职务限200字内");
			return false;
		}
	});


	//三个canvas
	var angleCanvas = document.getElementById("angleCanvas");
	var angleContext = angleCanvas.getContext("2d");
	angleContext.lineWidth = 4;
	angleContext.strokeStyle = "#f7b60c";
	angleContext.lineCap = "round";

	angleContext.moveTo(3, 3);
	angleContext.lineTo(11, 11);
	angleContext.lineTo(3, 19);
	angleContext.stroke();

	var backCanvas = document.getElementById("backCanvas");
	var backContext = backCanvas.getContext("2d");
	backContext.lineWidth = 2;
	backContext.strokeStyle = "#ffffff";
	backContext.lineCap = "round";

	backContext.moveTo(10, 2);
	backContext.lineTo(2, 10);
	backContext.lineTo(10, 18);
	backContext.stroke();

	backContext.beginPath();
	backContext.moveTo(2, 10);
	backContext.lineTo(20, 10);
	backContext.stroke();

	var rightCanvas = document.getElementById("rightCanvas");
	var rightContext = rightCanvas.getContext("2d");
	rightContext.lineWidth = 2;
	rightContext.strokeStyle = "#ffffff";
	rightContext.lineCap = "round";

	rightContext.moveTo(5, 12);
	rightContext.lineTo(9, 16);
	rightContext.lineTo(17, 8);
	rightContext.stroke();

});