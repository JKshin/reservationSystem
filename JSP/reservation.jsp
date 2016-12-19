<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*, java.sql.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	
	String searchTime = "";
	String id = request.getParameter("id");
	String tnum = "";
	String count = "";
	String pay = "";
	String tdate = "";
	String tname = "";
	String tsrc = "";
	String tdst = "";
	String dptime = "";
	String artime = "";
	String seatList = "";
	String reserveNum = "";
	String resdate = "";

	String date;
	FileWriter writer = null;
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	PrintWriter pw = response.getWriter();
 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/loginfo/"+id;
 	String temp;
 	
	reserveNum = request.getParameter("reserveNum");
	id = request.getParameter("id");
	tnum = request.getParameter("tnum");
	count = request.getParameter("count");
	pay = request.getParameter("pay");
	tdate = request.getParameter("tdate");
	tname = request.getParameter("tname");
	tsrc = request.getParameter("tsrc");
	tdst = request.getParameter("tdst");
	dptime = request.getParameter("dptime");
	artime = request.getParameter("artime");
	seatList = request.getParameter("seatList");

	String dateformat="2016-12-31";
	File file = new File(directory+"/"+dateformat);
	if(!file.exists()) file.mkdir();
	writer = new FileWriter(directory+"/"+dateformat+"/"+tname+"-"+dateformat+".txt");

	writer.write(tnum+LINE_SEPARATOR);
	writer.write(count+LINE_SEPARATOR);
	writer.write(pay+LINE_SEPARATOR);
	writer.write(tdate+LINE_SEPARATOR);
	writer.write(tname+LINE_SEPARATOR);
	writer.write(tsrc+LINE_SEPARATOR);
	writer.write(tdst+LINE_SEPARATOR);
	writer.write(dptime+LINE_SEPARATOR);
	writer.write(artime+LINE_SEPARATOR);
	writer.write(seatList+LINE_SEPARATOR);
	writer.flush();
	writer.close();
	
	json.put("message", "success");
	jArray.add(json);
	pw.print(jArray);
	pw.flush();
	pw.close();
	
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	
%>