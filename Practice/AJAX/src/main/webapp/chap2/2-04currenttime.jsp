<?xml version ="1.0" encoding="utf-8" ?>
<%@ page language="java" contentType="text/xml; charset=UTF-8"
    pageEncoding="UTF-8" import="java.text.*,java.util.*"%><%
DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String curTime = dateFormat.format(new Date());
System.out.println(curTime);
%>
<time>
<curtime><%= curTime %></curtime>
</time>





