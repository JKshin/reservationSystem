$(document).ready(function(){
	var date;
	var time;
	var src;
	var dst;
	var tname;
	$("#search").click(function(){
		date = $("#date").val();
		time = $("#time").val();
		src = $("#src").val();
		dst = $("#dst").val();

		train(date, time, src, dst);
	});	
});

function train(date, time, src, dst){
	var datalist;
	var table;
	var row;
	var col;
	$.ajax({
		url : "/system/JSP/train.jsp",
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

function reservationbtn(i){
	var tname = $("#reservation"+i).attr("tname");
	var src = $("#reservation"+i).attr("src");
	var dptime = $("#reservation"+i).attr("dptime");
	document.cookie = "tname = "+tname+";";
	document.cookie = "src = "+src+";";
	document.cookie = "dptime = "+dptime+";";
	var ca = document.cookie.split(";");
	for(var i = 0; i< ca.length; i++){
		alert(ca);
	}
}

function list_align(list){
	var templist;
	var i;
	var j;
	for(i = 1; i< list.length; i++){
		templist = list[i];
		for(j = i-1; j>=0; j--){
			if(list[j].dptime>templist.dptime){
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