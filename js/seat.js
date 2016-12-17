$(document).ready(function(){
	var tname = getCookie("tname");
	var dptime = getCookie("dptime");
	var src = getCookie("tsrc");
	alert(document.cookie);
	$("#trcode").innerHTML = "tname";
});

function seat(){

	$.ajax({
		url : "/system/JSP/seat.jsp",
		type : "POST",
		dataType: "json",
		data : ({
			date : date,
			time : time,
			src : src,
			dst : dst
		}),
		success : function (response){
			datalist = response;
			datalist = list_align(datalist);
			table = $("#table_train > tbody")[0];

			$("#table_train > tbody > tr").remove();

			if(datalist.length > 0){
				for(var i = 0; i<datalist.length; i++){
					row = table.insertRow(i);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i].tname;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i].src;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i].dst;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i].dptime.substring(0,2)+":"+datalist[i].dptime.substring(2,4);

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					col.innerHTML = datalist[i].artime;

					col = row.insertCell(row.cells.length);
					$(col).css("vertical-align", "middle");
					if(datalist[i].valid == "true"){
						col.innerHTML = '<button type="button" id="reservation'+i+'" class="reservationbtn" name ="reservationbtn" tname="'+datalist[i].tname+
						'" src="'+datalist[i].src+'" dst="'+datalist[i].dst+
						'" dptime="'+datalist[i].dptime+'" artime="'+datalist[i].artime+
						'" onclick="reservationbtn('+i+')">예매 가능</button>';
					}
					else if(datalist[i].valid == "false"){
						col.innerHTML = "매진";
					}
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}