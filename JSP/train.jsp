Class seat extend train{
	
	String time = request.getParameter("time"); //열차 시간
	String src = request.getParameter("src"); 	//출발 역
	String dst = request.getParameter("dst");	//도착 역
	//UI에서 보내온 데이터를 받아온다.


	DB db = new DB();							//DB 객체 생성
	db.access("root","1111");					//DB에 접속.
	String[] result = new String[100];

	result = db.query("							//db에 쿼리문을 넘겨 나온 결과를 받음.
		SELECT 	time, src, dst
		FROM 	trainTable
		WHERE 	trainTime > "+time+" &&
				source = "+src+" &&
				destination = "+dst+";"
	);

	JSONObject json;							
	JSONArray jArray = new JSONArray();			//json을 모아 UI에 보내줄 jArray객체 생성

	PrintWriter pw = response.getWriter();		//UI클레스에 반환할때 쓰일 PrinterWriter

	for(int i = 0; i< result.length; i++){		//반환 받은하는 열차 리스트 개수만큼 반복
		json = new JSONObject();				//UI에 넘겨줄 JSON객체 생성
		json.put("num", result[0]);				//열차 번호
		json.put("time", result[1]);			//열차 시간
		json.put("src", result[2]);				//출발역
		json.put("dst", result[3]);				//도착역
		json.put("market", result[4]);			//매점유무
		jArray.add(json);						//jArray에 json[i]에 해당하는 객체 저장.
		//즉, jArray에는 각 열차의 정보가 담긴 객체들이 n개 들어가는 것이고
		//그 안에 있는 n개의 json객체에는 한 열차에 관한 정보가 담긴다.
		//이렇게 jArray로 압축된 하나의 데이터를 반환해서 UI로 보낸다.
	}

	pw.print(jArray);							//UI클래스로 정보를 반환한다.
	pw.flush();
	pw.close();
}