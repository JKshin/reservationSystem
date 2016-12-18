$(document).ready(function(){
	var id;
	var pwd;
	$("#login").click(function(){
		id = $("#id").val();
		pwd = $("#pwd").val();
		if(id==""){
			alert("아이디를 입력해주세요.");
		}
		else if(pwd == ""){
			alert("비밀번호를 입력해주세요.");
		}
		else{
			login(id, pwd);
		}
	});
	
});

function login(id, pwd){
	$.ajax({
		url : "/system/JSP/member.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			id : id,
			pw : pwd
		}),
		success : function (response){
			if(response[0].message == "success"){
				alert("로그인 성공");
				setCookie("id", id, 1);
				location.href="http://52.78.4.120:8081/system/html/log.html";
			}
			else if(response[0].message == "fail"){
				alert("비밀번호가 틀렸습니다.");
			}
			else if(response[0].message == "idnotfound"){
				alert("등록된 아이디가 없습니다.")
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