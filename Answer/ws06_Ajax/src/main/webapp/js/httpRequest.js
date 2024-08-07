function sendRequest(url, params, callback, method){
	var httpRequest = new XMLHttpRequest;
	
	var httpMethod = method ? method : "GET";
	if (httpMethod != "GET" && httpMethod != "POST") {
        httpMethod = "GET";
    }
    
    var httpParams = params == null || params == "" ? null : params;  // id=abcd&pw=1234
    var httpUrl=url;                                                  //test.html
     if (httpMethod == "GET" && httpParams != null) {
        httpUrl = httpUrl + "?" + httpParams;
    }
    
    httpRequest.open(httpMethod, httpUrl, true);
    httpRequest.onreadystatechange = callback;
    httpRequest.send(httpMethod == "POST"? httpParams:null);
    return httpRequest;
}