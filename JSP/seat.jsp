<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String trainnum = request.getParameter("trainnum"); // 열차번호
	String trainnum = request.getParameter("hochanum"); // 호차번호

	BufferedReader reader = null;

 	String directory = application.getRealPath("db/traininfo/"+trainnum+"/");
	File dirFile = new File(directory);		//폴더
	File []fileList=dirFile.listFiles();	//폴더 리스트 뽑기
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	PrintWriter pw = response.getWriter();
 	try{
 		for(File tempFile : fileList){
 			if(tempFile.isFile() && tempFile.getName().endsWith(".txt")){
 				string tempFIleName = tempFile.getName();
 				json = new JSONObject();
			 	reader = new BufferedReader(new FileReader(directory+"/"+hochanum+"/"+tempFIleName));	
			 	

			 	/* [구현 2] JSON 객체 사용하여 값 삽입 */
			 	String[] s={"","","","","","",""};
			 	String temp;
			 	int i=0;
			 	while ((temp= reader.readLine()) != null) {
			 	    s[i]=temp;
			 	    i++;
			 	}
			 	if(pwd.equals(s[0])){
			 		json.put("message", "success");
			 	}
			 	else{
			 		json.put("message", "fail");
			 	}
			 	jArray.add(json);
			 	reader.close();
		 	}
		 }
		 
 	 } catch( Exception e ){
 	 	json.put("message", "idnotfound");
 	 	jArray.add(json);
 	 	e.printStackTrace();
 	 } finally{
 	 	try{
 	 		pw.print(jArray);
			pw.flush();
		 	pw.close();
 	 		if( reader != null ) reader.close();
 	 	}catch( Exception e1 ){
 	 		e1.printStackTrace();
 	 	}
 	}
%>