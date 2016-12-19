$(document).ready(function(){
    var isLogin = getCookie("isLogin");
    if(isLogin != "1"){
        alert("로그인을 해주세요.");
        location.href="http://52.78.4.120:8081/system/html/login.html";
    }
	var pay = getCookie("pay");
	var bank;
	var hostname;


	$("#invoice").html(pay);
	$("#next").click(function(){
		bank = $("#bank option:selected").val();
		host = $("#host").val();
		setCookie("bank", bank, 1);
		setCookie("host", host, 1);
		location.href="http://52.78.4.120:8081/system/html/nonaccountInfo.html";
	});
});

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