function uScrol() {
	var uListUlDom = $(".u-list ul");
	var topPo = 0, minTop = -24 * (12 - 5); //从0开始  到行高*(总数量-默认数量)
	var timeRoll = setInterval(function () {
		uListUlDom.css('margin-top', topPo--);
		if (topPo <= minTop) {
			topPo = 0;
		}
	}, 50);
}
uScrol();

var sList = [{k: '1XXXX9', v: '中XXXX奖'},{k: '2XXXX8', v: '中XXXX奖'},{k: '3XXXX7', v: '中XXXX奖'},{k: '4XXXX6', v: '中XXXX奖'},{k: '5XXXX5', v: '中XXXX奖'},{k: '6XXXX4', v: '中XXXX奖'},{k: '7XXXX3', v: '中XXXX奖'},{k: '8XXXX2', v: '中XXXX奖'},{k: '9XXXX1', v: '中XXXX奖'},{k: '0XXXX0', v: '中XXXX奖'},{k: 'AXXXX0', v: '中XXXX奖'},{k: 'BXXXX0', v: '中XXXX奖'}];
function sScrol() {
	var list = "";
	for (var i in sList) {
		list += "<li><span>" + sList[i].k + "</span><span>" + sList[i].v + "</span></li>";
	}
	for (var j=0; j<5; j++) {		//增加首屏显示的数据
		list += "<li><span>" + sList[j].k + "</span><span>" + sList[j].v + "</span></li>";
	}
	var sListUlDom = $(".s-list ul");
	sListUlDom.append(list);
	var topPo = 0, minTop = -24 * 12; 
	var timeRoll = setInterval(function () {
		sListUlDom.css('margin-top', topPo--);
		if (topPo <= minTop) {
			topPo = 0;
		}
	}, 50);
}
sScrol();

var nListDom = $(".n-list");
var marLeft = 0;	//初始左侧偏移量
var boxWidth = -70;	//盒子宽度
var firstBoxId = 0;
$(".n-table").on("click", ".next-btn", function () {
	if (firstBoxId < 6) {
		firstBoxId++;
		marLeft = boxWidth * firstBoxId;
		nListDom.animate({
			"marginLeft": marLeft + "px"
		}, 200);
	}
});
$(".n-table").on("click", ".pre-btn", function () {
	if (firstBoxId > 0) {
		firstBoxId--;
		marLeft = boxWidth * firstBoxId;
		nListDom.animate({
			"marginLeft": marLeft + "px"
		}, 200);
	}
});

var tList = [{key: 0, value: 0},{key: 1, value: 1},{key: 2, value: 2},{key: 3, value: 3},{key: 4, value: 4},{key: 5, value: 5},{key: 6, value: 6},{key: 7, value: 7},{key: 8, value: 8},{key: 9, value: 9}];
function tScrol() {
	var list = "";
	for (var i in tList) {
		list += '<div class="box">' + tList[i].value + '</div>';
	}
	for (var j=0; j<4; j++) {
		list += '<div class="box">' + tList[j].value + '</div>';
	}
	var tListDom = $(".t-list");
	tListDom.append(list);
	var leftPo = 0, minLeft = -70 * 10; 
	var timeRoll = setInterval(function () {
		tListDom.css('margin-left', leftPo--);
		if (leftPo <= minLeft) {
			leftPo = 0;
		}
	}, 50);
}
tScrol();