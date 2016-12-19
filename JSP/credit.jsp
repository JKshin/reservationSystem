<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String company = request.getParameter("company");
	String cardNum1 = request.getParameter("cardNum1");
	String cardNum2 = request.getParameter("cardNum2");	
	String cardNum3 = request.getParameter("cardNum3");
	String cardNum4 = request.getParameter("cardNum4");
	int validYear = Integer.parseInt(request.getParameter("validYear"));
	int validMonth = Integer.parseInt(request.getParameter("validMonth"));
	String pwd = request.getParameter("pwd");
	String card = cardNum1+cardNum2+cardNum3+cardNum4;
	BufferedReader reader = null;

 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/cardinfo";
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	File tempFile;
	String tempFileName;
	String filePath;

	String c_cardNum;
	String c_company;
	int c_year;
	int c_month;
	String c_pwd;

	PrintWriter pw = response.getWriter();
	try{
		 	reader = new BufferedReader(new FileReader(directory+"/"+card+".txt"));	
		 	/* [구현 2] JSON 객체 사용하여 값 삽입 */
		 	String[] s={"","","","",""};
		 	String temp;
		 	int i=0;
		 	while ((temp= reader.readLine()) != null) {
		 	    s[i]=temp;
		 	    i++;
		 	}
		 	c_company=s[1];
		 	c_year=Integer.parseInt(s[2]);
		 	c_month=Integer.parseInt(s[3]);
		 	c_pwd=s[4];
		 	if(company.equals(c_company) && pwd.equals(c_pwd) && validYear==c_year && validMonth==c_month){
		 		json.put("message", "success");
		 	}
		 	else{
		 		json.put("message", "fail");
		 	}
		 	jArray.add(json);
 	 } catch( Exception e ){
 	 	json.put("message", "numbernotfound");
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