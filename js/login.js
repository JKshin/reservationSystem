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