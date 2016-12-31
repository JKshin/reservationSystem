<%@ page import="org.json.simple.JSONObject"%>
<%@ page import="org.json.simple.JSONArray"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% request.setCharacterEncoding("UTF-8");%>
<%
	String LINE_SEPARATOR = System.getProperty("line.separator");
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
	String detailList = "";
	String reserveNum = "";
	String resdate = "";
	String isMarket = "";

	

	String valid = "";
	int j;

	String date;
	long miltime;
	BufferedReader reader = null;
	FileWriter writer = null;
	JSONObject json = new JSONObject();
	JSONArray jArray = new JSONArray();
	PrintWriter pw = response.getWriter();
 	String directory = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/loginfo/"+id;
 	String temp;
 	String filePath = "";
 	if(Integer.parseInt(isput) == 0){
 			searchTime = request.getParameter("searchTime");
 			directory = directory + "/"+searchTime;
			File tempFile;
			String tempFileName;
 			
			File dirFile = new File(directory);		//폴더
			File []fileList=dirFile.listFiles();	//폴더 리스트 뽑기
			for(int i = 0; i< fileList.length; i++){
				tempFile = fileList[i];
 				tempFileName = tempFile.getName();
				filePath = directory + "/" + tempFileName;
 				json = new JSONObject();
				reader = new BufferedReader(new FileReader(filePath));
				
				/* [구현 2] JSON 객체 사용하여 값 삽입 */
				String[] s={"","","","","","","","","","","","","",""};
				j=0;
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
				detailList = s[12];
				isMarket = s[13];

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
				json.put("detailList", detailList);
				json.put("isMarket", isMarket);
				jArray.add(json);
				reader.close();
			}
			pw.print(jArray);
			pw.flush();
			pw.close();
		}
		else if(Integer.parseInt(isput) == 1){
			reserveNum = request.getParameter("reserveNum");
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
			detailList = request.getParameter("detailList");
			isMarket = request.getParameter("isMarket");
			Date d = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String dateformat=sdf.format(d);
			File file = new File(directory+"/"+dateformat);
			Random random = new Random();
			int randomNum = random.nextInt(1000);
			reserveNum = dateformat.substring(0,4)+dateformat.substring(5,7)+dateformat.substring(8,10)+randomNum;
			if(!file.exists()) file.mkdir();
			writer = new FileWriter(directory+"/"+dateformat+"/"+reserveNum+".txt");
			
			writer.write(reserveNum+LINE_SEPARATOR);
			writer.write(tname+LINE_SEPARATOR);
			writer.write(tnum+LINE_SEPARATOR);
			writer.write(seatList+LINE_SEPARATOR);
			writer.write(count+LINE_SEPARATOR);
			writer.write(tsrc+LINE_SEPARATOR);
			writer.write(tdst+LINE_SEPARATOR);
			writer.write(dptime+LINE_SEPARATOR);
			writer.write(artime+LINE_SEPARATOR);
			writer.write(dateformat+LINE_SEPARATOR);
			writer.write(tdate+LINE_SEPARATOR);
			writer.write(pay+LINE_SEPARATOR);
			writer.write(detailList+LINE_SEPARATOR);
			writer.write(isMarket);
			writer.flush();
			writer.close();

			valid = "0";

			String[] seat = seatList.split(",");
			String seatClass = "";
			String seatIdx = "";
			String expense = "";
			String isRotate = "";
			String isBigFam = "";
			String isWindow = "";
			String sj = "";
			for(int i = 0; i < Integer.parseInt(count); i++){
				try{
					Integer.parseInt(seat[i].substring(0,1));
				}
				catch(Exception e){
					seat[i] = seat[i].substring(1);
				}
				
				filePath = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/seatinfo/"+tname+"/"+tnum+"/"+seat[i]+".txt";
				reader = new BufferedReader(new FileReader(filePath));
				String[] s={"","","","","","","",""};
				j=0;
				while ((temp= reader.readLine()) != null) {
				    s[j]=temp;
				    j++;
				}
				seatClass = s[1];
				seatIdx = s[2];
				expense = s[3];
				isRotate = s[4];
				isBigFam = s[5];
				isWindow = s[6];

				writer = new FileWriter(filePath);
				writer.write(seat[i]+LINE_SEPARATOR);
				writer.write(seatClass+LINE_SEPARATOR);
				writer.write(seatIdx+LINE_SEPARATOR);
				writer.write(expense+LINE_SEPARATOR);
				writer.write(isRotate+LINE_SEPARATOR);
				writer.write(isBigFam+LINE_SEPARATOR);
				writer.write(isWindow+LINE_SEPARATOR);
				writer.write(valid);


				reader.close();
				writer.flush();
				writer.close();
			}
      	}
      	else if (Integer.parseInt(isput) == 2){
         	reserveNum = request.getParameter("reserveNum")+".txt";
        	resdate = request.getParameter("resdate");
        	tname = request.getParameter("tname");
        	tnum = request.getParameter("tnum");
        	seatList = request.getParameter("seatList");
        	count = request.getParameter("count");
        	valid = "1";
        	try{
					Integer.parseInt(reserveNum.substring(0,1));
				}
				catch(Exception e){
					reserveNum = reserveNum.substring(1);
				}
         	
        	File file = new File(directory+"/"+resdate+"/"+reserveNum);
        	if(file.exists()){
          		if(reserveNum.equals(file.getName())) file.delete();
        	}
			String[] seat = seatList.split(",");
			String seatClass = "";
			String seatIdx = "";
			String expense = "";
			String isRotate = "";
			String isBigFam = "";
			String isWindow = "";
			for(int i = 0; i < Integer.parseInt(count); i++){
				try{
					Integer.parseInt(seat[i].substring(0,1));
				}
				catch(Exception e){
					seat[i] = seat[i].substring(1);
				}
				filePath = "/home/ubuntu/apache-tomcat-8.0.35/webapps/db/seatinfo/"+tname+"/"+tnum+"/"+seat[i]+".txt";
				reader = new BufferedReader(new FileReader(filePath));
				String[] s={"","","","","","","",""};
				j=0;
				while ((temp= reader.readLine()) != null) {
				    s[j]=temp;
				    j++;
				}
				seatClass = s[1];
				seatIdx = s[2];
				expense = s[3];
				isRotate = s[4];
				isBigFam = s[5];
				isWindow = s[6];

				writer = new FileWriter(filePath);
				writer.write(seat[i]+LINE_SEPARATOR);
				writer.write(seatClass+LINE_SEPARATOR);
				writer.write(seatIdx+LINE_SEPARATOR);
				writer.write(expense+LINE_SEPARATOR);
				writer.write(isRotate+LINE_SEPARATOR);
				writer.write(isBigFam+LINE_SEPARATOR);
				writer.write(isWindow+LINE_SEPARATOR);
				writer.write(valid);


				reader.close();
				writer.flush();
				writer.close();
			}
       	}
		json.put("message", "success");
		jArray.add(json);
		pw.print(jArray);
		pw.flush();
		pw.close();
%>