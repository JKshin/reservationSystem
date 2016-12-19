
$(document).ready(function(){
	var isLogin = getCookie("isLogin");
	if(isLogin != "1"){
		alert("로그인을 해주세요.");
		location.href="http://52.78.4.120:8081/system/html/login.html";
	}
	var pay = getCookie("pay");
	var bank = getCookie("bank");
	var host = getCookie("host"); 


	$("#invoice").html(pay);
	$("#confirm").click(function(){
		nonaccountCheck(bank, host);
	});
});

function nonaccountCheck(bank, host){
	var datalist;
	var table;
	var row;
	var col;
	$.ajax({
		url : "/system/JSP/nonaccount.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			bank : bank,
			host : host
		}),
		success : function (response){
			if(response[0].message == "success"){
				alert("결제번호 : "+response[0].paynum+"\n은행 : "+response[0].bank+"\n입금주 : "+response[0].host+"\n입금 완료 되었습니다.");
				reservation();
			}
			else if(response[0].message == "fail"){
				
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

