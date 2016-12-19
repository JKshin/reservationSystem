$(document).ready(function(){
	
	var isLogin = getCookie("isLogin");
	if(isLogin != "1"){
		alert("로그인을 해주세요.");
		location.href="http://52.78.4.120:8081/system/html/login.html";
	}
	var searchTime;
	var id = getCookie("id");
	$("#search").click(function(){
		searchTime = $("#searchdate").val();
		getlog(id, searchTime);
	});
});

function getlog(id, searchTime){
	var datalist;
	var table;
	var row;
	var col;
	var isput = "0";
	var count = getCookie("count");
	var seat;
	var detail;
	var bf;
	var win;
	var lot;
	var detailMerge = "";
	$.ajax({
		url : "/system/JSP/log.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			isput : isput,
			id : id,
			searchTime : searchTime,
		}),
		success : function (response){
			datalist = response;
			// datalist = list_align(datalist);
			table = $("#table_log > tbody")[0];

			$("#table_log > tbody > tr").remove();

			if(datalist.length > 0){
				for(var i = 0; i<datalist.length*2; i=i+2){
					detailMerge = "";
					seat = datalist[i/2].seatList.split(",");
					detail = datalist[i/2].detailList.split(",");
					row = table.insertRow(i);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].reserveNum;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].tname;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].seatList;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].count;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].dptime.substring(0,2)+":"+datalist[i/2].dptime.substring(2,4);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].resdate;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].pay;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = '<button type="button" id="detailbtn'+(i/2)+'" class="detailbtn" name ="detailbtn" onclick="detail('+i/2+')">상세정보</button>';

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = '<button type="button" id="cancelbtn'+(i/2)+'" class="cancelbtn" name ="cancelbtn" tnum="'+datalist[i/2].tnum+'" tname="'+datalist[i/2].tname+
						'" reserveNum="'+datalist[i/2].reserveNum+'" resdate="'+datalist[i/2].resdate+
						'" seatList="'+datalist[i/2].seatList+'" count="'+datalist[i/2].count+
						'" onclick="cancel('+i/2+')">예매 취소</button>';

					row = table.insertRow(i+1);
								//row.className = 'detailLayer';
								row.className = 'hide';
								row.id = "detail"+(i/2);
								$(row).css('background-color','#f2f2f2');


								col = row.insertCell(row.cells.length);
								col.colSpan = 9;
								$(col).css('padding', '10px 0px');
								$(col).css("border-bottom", "1px solid #DBDBDB");
								$(col).css("text-align","left");
								for(var k = 0; k < detail.length; k++){
									win = (detail[k].substring(0,1)==1) ? "O" : "X";
									bf = (detail[k].substring(1,2)==1) ? "O" : "X";
									lot = (detail[k].substring(2,3)==1) ? "O" : "X";
									detailMerge = detailMerge + "<tr height='38px'>"+
											"<td style='padding-left:25px; font-weight:bold;'>"+seat[k]+"</td>"+
											"<td>"+win+"</td>"+
											"<td>"+bf+"</td>"+
											"<td>"+lot+"</td>"+
										"</tr>";
								}


								col.innerHTML = 
									"<table border='0' style='width : 40%'>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td width='50px' style='padding-left:25px; font-weight:bold;'>출발일자</td>"+
											"<td colspan='3'>"+datalist[i/2].tdate+"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>출발역</td>"+
											"<td colspan='3'>"+datalist[i/2].tsrc+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>도착역</td>"+
											"<td colspan='3'>"+datalist[i/2].tdst+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>도착 시간</td>"+
											"<td colspan='3'>"+datalist[i/2].artime+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>호차번호</td>"+
											"<td colspan='3'>"+datalist[i/2].tnum+
											"</td>"+
										"</tr>"+
										"<tr height='38px'>"+
											"<td style='padding-left:25px; font-weight:bold;'>좌석 상세</td>"+
											"<td style='width : 20%'>창문 여부</td>"+
											"<td style='width : 20%'>대가족 좌석</td>"+
											"<td style='width : 20%'>회전 가능</td>"+
										"</tr>"+
										detailMerge+
									"</table>";


				}
			}
			else{

			}
		},
		error : function (error){
			alert("서버 오류");
		}

	});
}

function cancel(i){
	var searchTime = $("#searchdate").val();
	var reserveNum = $("#cancelbtn"+i).attr("reserveNum");
	var resdate = $("#cancelbtn"+i).attr("resdate");
	var tname = $("#cancelbtn"+i).attr("tname");
	var tnum = $("#cancelbtn"+i).attr("tnum");
	var seatList = $("#cancelbtn"+i).attr("seatList");
	var count = $("#cancelbtn"+i).attr("count");
	var id = id = getCookie("id");
	var isput = "2";
	$.ajax({
		url : "/system/JSP/log.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			isput : isput,
			id : id,
			reserveNum : reserveNum,
			resdate : resdate,
			tname : tname,
			tnum : tnum,
			seatList : seatList,
			count : count
		}),
		success : function (response){
			if(response[0].message == "success"){
				alert("예매를 취소했습니다.");
				getlog(id, searchTime);
			}
		},
		error : function(error){
			alert("예매 실패");
		}
	});

}

function detail(i){
	$("#detail"+i).toggleClass("hide");
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