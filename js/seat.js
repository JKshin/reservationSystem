var count = 0;
var pay = 0;
var seatList = "";
$(document).ready(function(){
	var isLogin = getCookie("isLogin");
	if(isLogin != "1"){
		alert("로그인을 해주세요.");
		location.href="http://52.78.4.120:8081/system/html/login.html";
	}
	var tname = getCookie("tname");
	var dptime = getCookie("dptime");
	var src = getCookie("tsrc");
	var tnum = $("#trainNum option:selected").val();
	seat(tname, dptime, src, tnum);
	$("#trcode").html(tname);
	$("#search").click(function(){
		tnum = $("#trainNum option:selected").val();
		seat(tname, dptime, src, tnum);
	});
	$("#paymentbtn").click(function(){
		setCookie("tnum", tnum, 1);
		location.href="http://52.78.4.120:8081/system/html/pay.html";
	});
});

function seat(tname, dptime, src, tnum){
	var datalist;
	var table;
	var row;
	var col;
	$.ajax({
		url : "/system/JSP/seat.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			tname : tname,
			tnum : tnum,
			dptime : dptime,
			src : src
		}),
		success : function (response){
			datalist = list_align(response);
			table = $("#table_seat > tbody")[0];
			var idx = 0;

			$("#table_seat > tbody > tr").remove();

			if(datalist.length > 0){
				for(var i = 0; i<datalist.length/4; i++){
					row = table.insertRow(i);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[idx].isEmpty == "0"){
						$(col).css("background-color", "blue");
						col.innerHTML = '<div id="seat'+idx+'" pay = "'+datalist[idx].expense+'">'+datalist[idx++].seatNum+'</div>';
					}
					else{
						col.innerHTML = '<div id="seat'+idx+'" class="seatbtn" pay = "'+datalist[idx].expense+'" onclick="selectseat('+idx+')" onmouseover="detail('+idx+')" isBigFam="'+datalist[idx].isBigFam+'" isLotate="'+datalist[idx].isLotate+'" isWindow="'+datalist[idx].isWindow+'">'+datalist[idx++].seatNum+'</div>';
					}

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[idx].isEmpty == "0"){
						$(col).css("background-color", "blue");
						col.innerHTML = '<div id="seat'+idx+'" pay = "'+datalist[idx].expense+'">'+datalist[idx++].seatNum+'</div>';
					}
					else{
						col.innerHTML = '<div id="seat'+idx+'" class="seatbtn" pay = "'+datalist[idx].expense+'" onclick="selectseat('+idx+')" onmouseover="detail('+idx+')" isBigFam="'+datalist[idx].isBigFam+'" isLotate="'+datalist[idx].isLotate+'" isWindow="'+datalist[idx].isWindow+'">'+datalist[idx++].seatNum+'</div>';
					}

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = "↑";

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[idx].isEmpty == "0"){
						$(col).css("background-color", "blue");
						col.innerHTML = '<div id="seat'+idx+'" pay = "'+datalist[idx].expense+'">'+datalist[idx++].seatNum+'</div>';
					}
					else{
						col.innerHTML = '<div id="seat'+idx+'" class="seatbtn" pay = "'+datalist[idx].expense+'" onclick="selectseat('+idx+')" onmouseover="detail('+idx+')" isBigFam="'+datalist[idx].isBigFam+'" isLotate="'+datalist[idx].isLotate+'" isWindow="'+datalist[idx].isWindow+'">'+datalist[idx++].seatNum+'</div>';
					}

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[idx].isEmpty == "0"){
						$(col).css("background-color", "blue");
						col.innerHTML = '<div id="seat'+idx+'" pay = "'+datalist[idx].expense+'">'+datalist[idx++].seatNum+'</div>';
					}
					else{
						col.innerHTML = '<div id="seat'+idx+'" class="seatbtn" pay = "'+datalist[idx].expense+'" onclick="selectseat('+idx+')" onmouseover="detail('+idx+')" isBigFam="'+datalist[idx].isBigFam+'" isLotate="'+datalist[idx].isLotate+'" isWindow="'+datalist[idx].isWindow+'">'+datalist[idx++].seatNum+'</div>';
					}
				}
			}
		},
		error : function (error){
			alert("서버 오류");
		}

	});
}

function detail(i){
	var isWindow = $("#seat"+i).attr("isWindow");
	var isLotate = $("#seat"+i).attr("isLotate");
	var isBigFam = $("#seat"+i).attr("isBigFam");
	if(isWindow == "1"){
		$("#win").html("O");
	}
	else{
		$("#win").html("X");
	}

	if(isLotate == "1"){
		$("#lot").html("O");
	}
	else{
		$("#lot").html("X");
	}

	if(isBigFam == "1"){
		$("#bf").html("O");
	}
	else{
		$("#bf").html("X");
	}
}

function selectseat(i){
	var expense = parseInt($("#seat"+i).attr("pay"));
	var isWindow = $("#seat"+i).attr("isWindow");
	var isLotate = $("#seat"+i).attr("isLotate");
	var isBigFam = $("#seat"+i).attr("isBigFam");
	var seat;
	var detail = "";
	if(isWindow == "1"){
		detail+="1";
	}
	else{
		detail+="0";
	}

	if(isBigFam == "1"){
		detail+="1";
	}
	else{
		detail+="0";
	}

	if(isLotate == "1"){
		detail+="1";
	}
	else{
		detail+="0";
	}

	if($("#seat"+i).hasClass("selectingseat")){
		 deleteCookie("seat"+count);
		 deleteCookie("detail"+count);
		 count--;
		 pay-=expense;
		 
	}
	else{
		setCookie("seat"+count, $("#seat"+i).html(), 1);
		setCookie("detail"+count, detail, 1);
		count++;
		pay+=expense;
	}
	setCookie("count", count, 1);
	setCookie("pay", pay, 1);

	$("#seat"+i).toggleClass('selectingseat');
	$("#count").html(count);
	$("#payment").html(pay);
}

function list_align(list){
	var templist;
	var i;
	var j;
	for(i = 1; i< list.length; i++){
		templist = list[i];
		for(j = i-1; j>=0; j--){
			if(parseInt(list[j].seatIdx)>parseInt(templist.seatIdx)){
				list[j+1]=list[j];
				if(j==0) list[j] = templist;
			}
			else{
				list[j+1]=templist;
				break;
			}
		}
	}
	return list;
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