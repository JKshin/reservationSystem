$(document).ready(function(){
	var pay = getCookie("pay");
	var company;
	var cardNum1;
	var cardNum2;
	var cardNum3;
	var cardNum4;
	var validYear;
	var	validMonth;
	var	pwd;


	$("#invoice").html(pay);
	alert(document.cookie);
	$("#next").click(function(){
		company = $("#company option:selected").val();
		cardNum1 = $("#firstNumbers").val();
		cardNum2 = $("#secondNumbers").val();
		cardNum3 = $("#thirdNumbers").val();
		cardNum4 = $("#fourthNumbers").val();
		validYear = $("#validYear").val();
		validMonth = $("#validMonth").val();
		pwd = $("#pwd").val();
		creditCheck(company, cardNum1, cardNum2, cardNum3, cardNum4, validYear, validMonth, pwd);
	});
});

function creditCheck(company, cardNum1, cardNum2, cardNum3, cardNum4, validYear, validMonth, pwd){
	var datalist;
	var table;
	var row;
	var col;
	$.ajax({
		url : "/system/JSP/credit.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			company : company,
			cardNum1 : cardNum1,
			cardNum2 : cardNum2,
			cardNum3 : cardNum3,
			cardNum4 : cardNum4,
			validYear : validYear,
			validMonth : validMonth,
			pwd : pwd
		}),
		success : function (response){
			if(response[0].message == "success"){
				alert("결제에 성공했습니다.");
			}
			else if(response[0].message == "fail"){
				alert("결제 실패");
			}
			else if(response[0].message == "numbernotfound"){
				alert("카드번호가 유효하지 않습니다.");
			}
		},
		error : function (error){
			alert("서버 오류");
		}

	});
}

function reservation(){

}

function setCookie(cName, cValue, cDay){
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }

function getCookie(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

function deleteCookie( cookieName )
 {
  var expireDate = new Date();
  
  //어제 날짜를 쿠키 소멸 날짜로 설정한다.
  expireDate.setDate( expireDate.getDate() - 1 );
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
 }