<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String bank = request.getParameter("bank");
	String host = request.getParameter("host");
	BufferedReader reader = null;

 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/accountinfo";
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	File tempFile;
	String tempFileName;
	String filePath;

	PrintWriter pw = response.getWriter();

	json.put("message", "success");
	json.put("bank", bank);
	json.put("host", host);
	json.put("paynum", "201612201830");
	jArray.add(json);
	pw.print(jArray);
	pw.flush();
	pw.close();
%>