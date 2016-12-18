$(document).ready(function(){
	var id = getCookie("id");
	var searchTime;

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
	$.ajax({
		url : "/system/JSP/log.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			isput : "0",
			id : id,
			searchTime : searchTime,
		}),
		success : function (response){
			datalist = response;
			// datalist = list_align(datalist);
			table = $("#table_log > tbody")[0];

			$("#table_log > tbody > tr").remove();

			if(datalist.length > 0){
				for(var i = 0; i<datalist.length; i=i+2){
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
					col.innerHTML = datalist[i/2].dptime.substring(0,2)+":"+datalist[i].dptime.substring(2,4);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].resdate;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i/2].pay;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = '<button type="button" id="detailbtn'+(i/2)+'" class="detailbtn" name ="detailbtn" tname="'+datalist[i/2].tname+
						'" src="'+datalist[i/2].src+'" dst="'+datalist[i/2].dst+
						'" dptime="'+datalist[i/2].dptime+'" artime="'+datalist[i/2].artime+
						'" onclick="reservationbtn('+i/2+')">상세정보</button>';

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = '<button type="button" id="cancelbtn'+(i/2)+'" class="cancelbtn" name ="cancelbtn" tname="'+datalist[i/2].tname+
						'" src="'+datalist[i/2].tsrc+'" dst="'+datalist[i/2].tdst+
						'" dptime="'+datalist[i/2].dptime+'" artime="'+datalist[i/2].artime+
						'" onclick="reservationbtn('+i/2+')">예매 취소</button>';

					row = table.insertRow(i+1);
								//row.className = 'detailLayer';
								row.className = 'hide';
								$(row).css('background-color','#f2f2f2');


								col = row.insertCell(row.cells.length);
								col.colSpan = 9;
								$(col).css('padding', '10px 0px');
								$(col).css("border-bottom", "1px solid #DBDBDB");
								$(col).css("text-align","left");


								col.innerHTML = 
									"<table border='0' width='100%'>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td width='130px' style='padding-left:25px; font-weight:bold;'>출발일자</td>"+
											"<td >"+datalist[i/2].tdate+"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>출발역</td>"+
											"<td>"+datalist[i/2].tsrc+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>도착역</td>"+
											"<td>"+datalist[i/2].tdst+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>도착 시간</td>"+
											"<td>"+datalist[i/2].artime+
											"</td>"+
										"</tr>"+
										"<tr height='38px' style='border-bottom : 1px dashed #ccc;'>"+
											"<td style='padding-left:25px; font-weight:bold;'>호차번호</td>"+
											"<td>"+datalist[i/2].tnum+
											"</td>"+
										"</tr>"+
										"<tr height='38px'>"+
											"<td style='padding-left:25px; font-weight:bold;'>비고</td>"+
											"<td></td>"+
										"</tr>"+
										"<tr>"+
											"<td colspan='2' style='text-align:right;padding-right:14px;'>"+ 
												"<button type='button' class='btn btn-default btn_default_dlp' style='background-color:transparent;width:65px;'	name='button_detail_close'>Close"+
											"</button>"+
											"</td>"+
										"</tr>"+
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