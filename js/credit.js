$(document).ready(function(){
	var isLogin = getCookie("isLogin");
	if(isLogin != "1"){
		alert("로그인을 해주세요.");
		location.href="http://52.78.4.120:8081/system/html/login.html";
	}
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
	$("#next").click(function(){
		cardNum1 = $("#firstNumbers").val();
		cardNum2 = $("#secondNumbers").val();
		cardNum3 = $("#thirdNumbers").val();
		cardNum4 = $("#fourthNumbers").val();
		company = $("#company option:selected").val();
		validYear = $("#validYear").val();
		validMonth = $("#validMonth").val();
		pwd = $("#pwd").val();
		if(cardNum1.length < 4 || cardNum2.length < 4 || cardNum3.length < 4 || cardNum4.length < 4){
			alert("카드번호를 각각 4자리씩 입력해주세요.");
		}
		if(company.length == 0 || validYear.length ==0 || validMonth.length == 0){
				alert("항목을 모두 채워주세요.");
		}
		else{
			creditCheck(company, cardNum1, cardNum2, cardNum3, cardNum4, validYear, validMonth, pwd);
		}
		
	});
	$("#cancel").click(function(){
        alert("결제 취소 - 로그 화면으로 이동합니다.");
        location.href="http://52.78.4.120:8081/system/html/log.html";
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
				reservation();
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
	var id = getCookie("id");
	var tnum = getCookie("tnum");
	var count = getCookie("count");
	var pay = getCookie("pay");
	var tdate = getCookie("tdate");
	var tname = getCookie("tname");
	var tsrc = getCookie("tsrc");
	var tdst = getCookie("tdst");
	var dptime = getCookie("dptime");
	var artime = getCookie("artime");
	var seatList = "";
	var detailList = "";
	var isput = "1";
	for(var i = 0; i< count; i++){
		seatList += getCookie("seat"+i);
		detailList += getCookie("detail"+i);
		if(i<count-1){
			seatList += ",";
			detailList += ",";
		}
	}

	$.ajax({
		url : "/system/JSP/log.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			isput : isput,
			id : id,
			tnum : tnum,
			count : count,
			pay : pay,
			tdate : tdate,
			tname : tname,
			tsrc : tsrc,
			tdst : tdst,
			dptime : dptime,
			artime : artime,
			seatList : seatList,
			detailList : detailList
		}),
		success : function (response){
			if(response[0].message == "success"){
				alert("예약 완료되었습니다.");
				location.href="http://52.78.4.120:8081/system/html/log.html";
			}
			else if(response[0].message == "fail"){
				alert("예약 실패");
			}
		},
		error : function (error){
			alert("서버 오류");
		}

	});



}

function setCookie(cName, cValue, cDay){
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + encodeURIComponent(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
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
        return decodeURIComponent(cValue);
    }

function deleteCookie( cookieName )
 {
  var expireDate = new Date();
  
  //어제 날짜를 쿠키 소멸 날짜로 설정한다.
  expireDate.setDate( expireDate.getDate() - 1 );
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
 }