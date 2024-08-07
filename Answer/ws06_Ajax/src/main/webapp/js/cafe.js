//비동기 처리를 위한 XMLHttpRequest객체
var httpRequest1, httpRequest2;


//설문조사----------------------------------------------
window.onload = function () {
	
	//비동기 요청-------------------------------------
	httpRequest1=sendRequest("data/programming.xml", null, programmingBook, "GET");
	httpRequest2=sendRequest("data/essay.json", null, essayBook, "GET");
	//----------------------------------------------
	
    var poll = localStorage.getItem("poll");  //localStorage에 저장된 poll이름을 가져오기
    var pollDiv = document.querySelector("#vote");
    //localStorage.clear();

    if (poll) {
        //localStorage에서 얻은 문자열을 JSON객체로 변환
        var vote = JSON.parse(poll);
        console.log(vote);
        var sdate = vote.start_date;    //시작일
        var edate = vote.end_date;      //종료일
        var question = vote.question;   // 질문
        var answer = vote.answers;      // 답변

        console.log(sdate, edate)

        //투표 항목 구성
        var pollContents = "";

        pollContents += `<div class="vote_title">[당신의 선택]</div>
                         <div class="vote_question">${question}</div>
                         <div class="vote_answer">
                            <ul>`;
        for (var i = 0; i < answer.length; i++){
            pollContents += `<li>
                                <label>
                                    <input type="radio" name="vote_answer" value='${answer[i]}' />${answer[i]}
                                </label>
                            </li>`;
        }
        pollContents +=`   </ul>
                            </div>
                            <div class="vote_button">
                                <button class="button btn_primary" onclick="javascript:poll()">투표하기</button>
                                <button class="button">결과보기</button>
                            </div>
                            <div class="vote_date">투표기간 : ${dateFormat(sdate)} ~ ${dateFormat(edate)}`;
        pollDiv.innerHTML = pollContents;
    } else {
        pollDiv.innerHTML = `<div class="vote_title">진행중인 투표가 없습니다</div>`;
    }
}
//-----------------------------------------------------------
function programmingBook(){
	if(httpRequest1.readyState == 4){             // 서버로 부터 data를 전부 받은 상태(Completed)
		if(httpRequest1.status == 200){           // 응답상태(OK)
			var books=httpRequest1.responseXML;   //서버에서 온 data를 XML로 받음
			//console.log(books);
			
			var booklist=books.querySelectorAll("book");
			var len=booklist.length;
			var bookView="";
			
			for(var i=0; i<len; i++){
				var book=booklist[i];
				var isbn=book.querySelector("isbn").childNodes[0].nodeValue;
				var title=book.querySelector("title").childNodes[0].nodeValue;
				var price=book.querySelector("price").childNodes[0].nodeValue;
			
				//책의 갯수만큼 화면구성
				bookView += `<li>
		                        <div class="menu_item">
		                            <div class="menu_item_img"><img src="img/book/${isbn}.png" alt="" width="130"></div>
		                            <div class="menu_item_info">${title}</br>(${numberWithCommas(price)}원)</div>
		                        </div>
		                    </li>`;
			}
			document.querySelector("#plist").innerHTML = bookView;
		}
	}
}
//-----------------------------------------------------------
function essayBook(){
	if(httpRequest2.readyState == 4){               
		if(httpRequest2.status == 200){             
			var books = httpRequest2.responseText;  //서버에서 온 data를 JSON으로 받음
			
			var booklist = JSON.parse(books);
			//console.log(books);
			var len=booklist.length;
			var bookView = "";
			
			for(var i = 0; i < len; i++) {
	            var book = booklist[i];
	            bookView +=`<li>
		                        <div class="menu_item">
		                            <div class="menu_item_img"><img src="img/book/${book.isbn}.png" alt="" width="130"></div>
		                            <div class="menu_item_info">${book.title}</br>(${numberWithCommas(book.price)}원)</div>
		                        </div>
		                    </li>`;     
			}
			// 아이디가 elist인 div에 책화면을 html로 삽입.
            document.querySelector("#elist").innerHTML = bookView;	
		}
	}	
}
//투표 시작일과 종료일의 날짜 형식(yy.mm.dd)------------------------
function dateFormat(date) {
    console.log(date)
    console.log(typeof(date));
    var yymmdd = date.split("-");
    return yymmdd[0].substr(2, 2) + "." + yymmdd[1] + "." + yymmdd[2];
}
//정규표현식을 이용한 3자리마다 ,(comma) 찍기(가격)-----------------
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//로그인---------------------------------------------------------
function login() {
    var userid = prompt("아이디입력", "ssafy");
    if (userid.length == 0) {
        alert("아이디를 입력하시오");
        return;
    }

    var userpass = prompt("비밀번호입력", "1234");
    if (userpass.length == 0) {
        alert("비밀번호를 입력하시오");
        return;
    }

    if (userid == "ssafy" && userpass=="1234") {
        alert("로그인 성공");
        //id가 profile_img인 element의 src 속성의 값을 img/profile.png로 바꿈
        document.getElementById("profile_img").src = "img/profile.png"
        document.getElementById("header_nav_confirm_off").style.display = "none";
        document.getElementById("header_nav_confirm_on").style.display = "block";
    }else {
        alert("아이디 또는 비밀번호를 확인하시오");
    }
}
//로그아웃------------------------------------------------
function logout() {
    //document.getElementById("profile_img").src = "img/noimg.png"
    //document.getElementById("header_nav_confirm_on").style.display = "none";
    //document.getElementById("header_nav_confirm_off").style.display = "block";

    document.querySelector("#profile_img").setAttribute("src", "img/noimg.png");
    document.querySelector("#header_nav_confirm_on").setAttribute("style", "display:none");
    document.querySelector("#header_nav_confirm_off").setAttribute("style", "display:block");
}
//지역매장 펼치기/접기--------------------------------------------
cnt = 0;
function slideDown(areaid) {
    if (areaid.style.display == "none") {
        areaid.style.display = "block";
        cnt++;
    } else if (areaid.style.display == "block") {
        areaid.style.display = "none";
        cnt--;
    }

    if (cnt == 5) {  // 모든 메뉴가 펼쳐졌다면 전국매장접기 버튼 활성화
        document.getElementsByClassName("store_display_off")[0].style.display = "block";
        document.getElementsByClassName("store_display_on")[0].style.display = "none";
    } else {         // 모든 메뉴가 접혔다면 전국매장펼치기 버튼 활성화
        document.getElementsByClassName("store_display_off")[0].style.display = "none";
        document.getElementsByClassName("store_display_on")[0].style.display = "block";
    }
}
//전국매장 펼치기 / 접기------------------------------------------
function allSlide(onoff) {
    if (onoff == "on") {  //펼치기
        var subs = document.getElementsByClassName("store_item_sub");
        for (var i = 0; i < subs.length; i++){
            subs[i].style.display = "block";
        }
        document.getElementsByClassName("store_display_off")[0].style.display = "block";
        document.getElementsByClassName("store_display_on")[0].style.display = "none";
        cnt = 5;
    } else {              //접기
        var subs = document.getElementsByClassName("store_item_sub");
        for (var i = 0; i < subs.length; i++) {
            subs[i].style.display = "none";
        }
        document.getElementsByClassName("store_display_off")[0].style.display = "none";
        document.getElementsByClassName("store_display_on")[0].style.display = "block";
        cnt = 0;
    }
}
//투표하기--------------------------------------------------------
function poll() {
    var votes = document.getElementsByName("vote_answer");
    var sel_menu = "";

    for (var i = 0; i < votes.length; i++){
        if (votes[i].checked == true) {
            sel_menu = votes[i].value;
            break;
        }
    }
    alert(sel_menu + "(이)가 선택되었습니다");
}
//관리자(투표만들기)-----------------------------------------------
function pollMake() {
    // pollmake.html의 창아이디를 poll로 설정하고 가로 500, 세로 300인 창을 열기
    window.open("pollmake.html", "poll", "width=420,height=300,top=300,left=400"); 
}
//답변 항목 추가--------------------------------------------------
function addAnswer() {
    var listDiv = document.getElementById("poll_answer_list");

    var divEl = document.createElement("div");      // <div></div>
    divEl.setAttribute("class", "poll_answer_item");// <div class="poll_answer_item"></div>
    var inputEl = document.createElement("input")   // <input/>
    inputEl.setAttribute("type", "text");           // <input type="text" /> 
    inputEl.setAttribute("name", "answer");         // <input name="answer" /> 
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("type", "button");
    buttonEl.setAttribute("class", "button");    

    //버튼에 click 이벤트 리스너 등록
    buttonEl.addEventListener("click", function (e) {
        var parent = this.parentNode;
        listDiv.removeChild(parent);
    });

    buttonEl.appendChild(document.createTextNode("삭제"));

    divEl.appendChild(inputEl);
    divEl.appendChild(buttonEl);
    listDiv.appendChild(divEl);
}
//투표생성------------------------------------------------------
function makePoll() {
    var sdate = document.querySelector("#start_date").value;  //시작일
    var edate = document.querySelector("#end_date").value;  //종료일

    if (!sdate || !edate) {
        alert("설문기간을 입력하시오")
        return;
    }

    var quest = document.querySelector("#question").value; //질문
    if (!quest) {
        alert("질문 내용을 입력하시오");
        document.querySelector("#question").focus();
        return;
    }

    //var answers = document.getElementsByName("answer");  //답변항목
    var answerInput = document.querySelectorAll("input[name='answer']");
    for (var i = 0; i < answerInput.length; i++){
        if (!answerInput[i].value) {
            alert("답변 항목을 입력하시오")
            answerInput[i].focus();
            return;
        }
    }
    //----------------------------------------------------------------------
    var answers = [];
    for (var i = 0; i < answerInput.length; i++){
        answers.push(answerInput[i].value);  //답변 배열에 입력 data 추가 
    }

    // 입력 data를 이용해서 JSON 객체 생성
    var polljson = {
        start_date: sdate,
        end_date: edate,
        question: quest,
        answers: answers
    };
    var poll_json = JSON.stringify(polljson);
    localStorage.setItem("poll", poll_json);

    alert("투표를 생성합니다");
    opener.document.location.reload();  // 부모창 새로고침
    self.close();
}

