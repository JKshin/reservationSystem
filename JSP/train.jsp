<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String date = request.getParameter("date"); // 출발일시
	String time = request.getParameter("time"); // 출발시간
	String src = request.getParameter("src"); // 출발역
	String dst = request.getParameter("dst"); // 도착역
	PrintWriter pw = response.getWriter();

	int tptime = Integer.parseInt(time.substring(0, 2)+""+time.substring(3, 5));
	int dptime;
	String tname;
	String artime;
	String valid;
	String trsrc;
	String trdst;
	String[] tempstr;


 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/traininfo/"+date;
 	String filePath = "";
	File dirFile = new File(directory);		//폴더
	File []fileList=dirFile.listFiles();	//폴더 리스트 뽑기
	BufferedReader reader = null;
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	JSONArray jArray = new JSONArray();
	JSONObject json = null;
	File tempFile;
	String tempFileName;

	for(int i = 0; i< fileList.length; i++){
		tempFile = fileList[i];
 		tempFileName = tempFile.getName();
		filePath = directory + "/"+tempFileName;
 		json = new JSONObject();
		reader = new BufferedReader(new FileReader(filePath));
				
		/* [구현 2] JSON 객체 사용하여 값 삽입 */
		String[] s={"","","","","","",""};
		String temp;
		int j=0;
		while ((temp= reader.readLine()) != null) {
		    s[j]=temp;
		    j++;
		}
		dptime = Integer.parseInt(s[1]+""+s[2]);
		tname = tempFileName.split(".txt")[0];
		artime = s[3];
		valid = s[4];
		trsrc = s[5];
		trdst = s[6];
		if(tptime <= dptime && src.equals(trsrc) && dst.equals(trdst)){	
			json.put("tname", tname);
			json.put("src", trsrc);
			json.put("dst", trdst);
			json.put("dptime", s[1]+""+s[2]);
			json.put("artime", artime);
			json.put("valid", valid);
			jArray.add(json);
		}
		reader.close();
	}
	pw.print(jArray);
	pw.flush();
	pw.close();
	
%>