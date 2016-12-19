<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
	<%
	String tname = request.getParameter("tname"); // 열차번호
	String tnum = request.getParameter("tnum"); // 호차번호
	String dptime = request.getParameter("dptime");
	String src = request.getParameter("src");

	BufferedReader reader = null;

 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/seatinfo/"+tname+"/"+tnum;
	File dirFile = new File(directory);		//폴더
	File []fileList=dirFile.listFiles();	//폴더 리스트 뽑기
	
	/* [구현1] JSONArray 및 JSONObject 선언 */
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	File tempFile;
	String tempFileName;
	String filePath;

	String seatNum;
	String seatClass;
	String seatIdx;
	String expense;
	String isLotate;
	String isBigFam;
	String isWindow;
	String isEmpty;

	PrintWriter pw = response.getWriter();
 	for(int i = 0; i< fileList.length; i++){
		tempFile = fileList[i];
 		tempFileName = tempFile.getName();
		filePath = directory + "/"+tempFileName;
 		json = new JSONObject();
		reader = new BufferedReader(new FileReader(filePath));
				
		/* [구현 2] JSON 객체 사용하여 값 삽입 */
		String[] s={"","","","","","","",""};
		String temp;
		int j=0;
		while ((temp= reader.readLine()) != null) {
		    s[j]=temp;
		    j++;
		}
		seatNum = s[0];
		seatClass = s[1];
		seatIdx = s[2];
		expense = s[3];
		isLotate = s[4];
		isBigFam = s[5];
		isWindow = s[6];
		isEmpty = s[7];
		json.put("seatNum", seatNum);
		json.put("seatClass", seatClass);
		json.put("seatIdx", seatIdx);
		json.put("expense", expense);
		json.put("isLotate", isLotate);
		json.put("isBigFam", isBigFam);
		json.put("isWindow", isWindow);
		json.put("isEmpty", isEmpty);
		jArray.add(json);
		reader.close();
	}
	pw.print(jArray);
	pw.flush();
	pw.close();
%>