<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String isput = request.getParameter("isput");
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

	String valid = "";

	Date d;
	String date;
	long miltime;
	SimpleDateFormat sdf;
	BufferedReader reader = null;
	BufferedWriter writer = null;
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	PrintWriter pw = response.getWriter();
 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/loginfo/"+id;
 	String temp = "0";
 	if(isput.equals(temp)){
 			searchTime = request.getParameter("searchTime");
 			directory = directory + "/"+searchTime;
			File tempFile;
			String tempFileName;
 			String filePath = "";
			File dirFile = new File(directory);		//폴더
			File []fileList=dirFile.listFiles();	//폴더 리스트 뽑기
			for(int i = 0; i< fileList.length; i++){
				tempFile = fileList[i];
 				tempFileName = tempFile.getName();
				filePath = directory + "/" + tempFileName;
 				json = new JSONObject();
				reader = new BufferedReader(new FileReader(filePath));
				
				/* [구현 2] JSON 객체 사용하여 값 삽입 */
				String[] s={"","","","","","","","","","","",""};
				int j=0;
				while ((temp= reader.readLine()) != null) {
				    s[j]=temp;
				    j++;
				}
				reserveNum = s[0];
				tname = s[1];
				tnum = s[2];
				seatList = s[3];
				count = s[4];
				tsrc = s[5];
				tdst = s[6];
				dptime = s[7];
				artime = s[8];
				resdate = s[9];
				tdate = s[10];
				pay = s[11];
				json.put("reserveNum", reserveNum);
				json.put("tname", tname);
				json.put("tnum", tnum);
				json.put("seatList", seatList);
				json.put("count", count);
				json.put("tsrc", tsrc);
				json.put("tdst", tdst);
				json.put("dptime", dptime);
				json.put("artime", artime);
				json.put("resdate", resdate);
				json.put("tdate", tdate);
				json.put("pay", pay);
				jArray.add(json);
				reader.close();
			}
			pw.print(jArray);
			pw.flush();
			pw.close();
		}
		else{
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
			pw.println(id);
			pw.println(tnum);
			pw.println(count);
			pw.println(pay);
			pw.println(tdate);
			pw.println(tname);
			pw.println(tsrc);
			pw.println(tdst);
			pw.println(dptime);
			pw.println(artime);
			pw.println(seatList);
			d = new Date();
			date = d.toString();
			sdf = new SimpleDateFormat("yyyy-mm-dd");
			writer = new BufferedWriter(new FileWriter(new File(directory+"/"+id+"/"+sdf+"/"+tname+tdate+".txt")));

			writer.write(tnum);
			writer.newLine();
			writer.write(count);
			writer.newLine();
			writer.write(pay);
			writer.newLine();
			writer.write(tdate);
			writer.newLine();
			writer.write(tname);
			writer.newLine();
			writer.write(tsrc);
			writer.newLine();
			writer.write(tdst);
			writer.newLine();
			writer.write(dptime);
			writer.newLine();
			writer.write(artime);
			writer.newLine();
			writer.write(seatList);
			json.put("message", "success");
			jArray.add(json);
			pw.print(jArray);
			pw.flush();
			pw.close();
			writer.close();
		}
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	
%>