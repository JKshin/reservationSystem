$(document).ready(function(){
	var tname = getCookie("tname");
	var dptime = getCookie("dptime");
	var src = getCookie("tsrc");
	var tnum = $("#trainNum option:selected").val();
	seat(tname, dptime, src, tnum);
	$("#trcode").innerHTML = "tname";
	$("#search").click(function(){
		tnum = $("#trainNum option:selected").val();
		seat(tname, dptime, src, tnum);
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
					if(datalist[i].isEmpty == "0") $(col).css("background-color", "blue");
					col.innerHTML = datalist[idx++].seatNum;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[i].isEmpty == "0") $(col).css("background-color", "blue");
					col.innerHTML = datalist[idx++].seatNum;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = "↑";

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[i].isEmpty == "0") $(col).css("background-color", "blue");
					col.innerHTML = datalist[idx++].seatNum;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[i].isEmpty == "0") $(col).css("background-color", "blue");
					col.innerHTML = datalist[idx++].seatNum;
				}
			}
		},
		error : function (error){
			alert("서버 오류");
		}

	});
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