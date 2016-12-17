
$(document).ready(function(){
	var pay = getCookie("pay");
	var bank = getCookie("bank");
	var host = getCookie("host"); 


	$("#invoice").html(pay);
	alert(document.cookie);
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
			}
			else if(response[0].message == "fail"){
				
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

