// index page 로딩 후 전국의 시도 설정.
let serviceKey = "--------- 본인의 Service Key를 넣으세요 ---------";
let areaUrl =
  "https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=" +
  serviceKey +
  "&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

// fetch(areaUrl, { method: "GET" }).then(function (response) { return response.json() }).then();
fetch(areaUrl, { method: "GET" })
  .then((response) => response.json())
  .then((data) => makeOption(data));
  
function makeOption(data) {
  let areas = data.response.body.items.item;
  // console.log(areas);
  let sel = document.getElementById("search-area");
  areas.forEach((area) => {
    let opt = document.createElement("option");
    opt.setAttribute("value", area.code);
    opt.appendChild(document.createTextNode(area.name));

    sel.appendChild(opt);
  });
}

// 검색 버튼을 누르면..
// 지역, 유형, 검색어 얻기.
// 위 데이터를 가지고 공공데이터에 요청.
// 받은 데이터를 이용하여 화면 구성.
document.getElementById("btn-search").addEventListener("click", () => {
  let searchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A`;

  let areaCode = document.getElementById("search-area").value;
  let contentTypeId = document.getElementById("search-content-id").value;
  let keyword = document.getElementById("search-keyword").value;

  if (parseInt(areaCode)) searchUrl += `&areaCode=${areaCode}`;
  if (parseInt(contentTypeId)) searchUrl += `&contentTypeId=${contentTypeId}`;
  if (!keyword) {
    alert("검색어 입력 필수!!!");
    return;
  } else searchUrl += `&keyword=${keyword}`;

  console.log(searchUrl);

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => makeList(data));
});

function makeList(data) {
  // console.log(data);
  let trips = data.response.body.items.item;
  let tripList = ``;
  trips.forEach((area) => {
    tripList += `
      <tr>
        <td><img src="${area.firstimage}" width="100px"></td>
        <td>${area.title}</td>
        <td>${area.addr1} ${area.addr2}</td>
        <td>${area.mapy}</td>
        <td>${area.mapx}</td>
      </tr>
    `;
  });
  document.getElementById("trip-list").innerHTML = tripList;
}
