window.onload = function () {
    let movies = localStorage.getItem("movies");
  
    let likeMovieList = document.querySelector("#like-movie-list");
    
    likeMovieList = document.getElementById("like-movie-list");

  
    if (movies === null) {
      likeMovieList.innerText = "아직 찜한 영화가 없습니다...";
    } else {
      movies = JSON.parse(movies);
  
      let likeMovieListHtml = document.createElement("ul");
      for (let i = 0; i < movies.length; i++) {
        likeMovieListHtml.innerHTML += `<li>${movies[i]["title"]} | ${movies[i]["genre"]} | ${movies[i]["director"]} | ${movies[i]["runningTime"]}</li>`;
      }
  
      likeMovieList.appendChild(likeMovieListHtml);
    }
  
    // ajax를 위한 객체 생성
    const xhr = new XMLHttpRequest();
    const method = "GET";
    // 데이터 경로 입력.
    const url = "js/movie.json";
  
    // 요청을 초기화 하기 위한 메서드
    xhr.open(method, url);
    // 헤더 정보 초기화 메서드
    xhr.setRequestHeader("Content-Type", "application/text");
  
    // 객체 상태 변화 이벤트 핸들러 함수 정의
    xhr.onreadystatechange = function () {
      // 데이터를 모두 수신하였다면
      if (xhr.readyState === 4) {
        // 상태코드가 성공일때
        if (xhr.status === 200) {
          const resJson = JSON.parse(xhr.responseText);
          const movieData = resJson.movies;
          console.log(movieData)
          let movieList = document.querySelector(".content-movie-list-ul");
          for (let i = 0; i < movieData.length; i++) {
            let movieItem = `
              <li>
                <div class="list-item">
                  <div>
                    <img src="${movieData[i]["img"]}" alt='' />
                  </div>
                  <div class="movie-info">
                    <div>
                      <div>${movieData[i]["title"]}</div>
                      <div>${movieData[i]["genre"]}</div>
                      <div>${movieData[i]["director"]}</div>
                      <div>${movieData[i]["runningTime"]}</div>
                    </div>
                    <button class="like-btn">찜</button>
                  </div>
                </div>
              </li>
              `;
            movieList.innerHTML += movieItem;
          }
        }
      }
    };
    // 요청 보내기
    xhr.send();
  
    // ES6 fetch를 사용한 비동기 통신
    // fetch("data/movie.json", {
    //   method: "get",
    // })
    //   .then((response) => {
    //     const responseJson = response.json();
    //     console.log(responseJson);
    //     return responseJson;
    //   })
    //   .then((data) => {
    //     let movieData = data.movies;
    //     let movieList = document.querySelector(".content-movie-list-ul");
    //     for (let i = 0; i < movieData.length; i++) {
    //       let movieItem = `
    //         <li>
    //           <div class="list-item">
    //             <div>
    //               <img src="${movieData[i]["img"]}" alt='' />
    //             </div>
    //             <div class="movie-info">
    //               <div>
    //                 <div>${movieData[i]["title"]}</div>
    //                 <div>${movieData[i]["genre"]}</div>
    //                 <div>${movieData[i]["director"]}</div>
    //                 <div>${movieData[i]["runningTime"]}</div>
    //               </div>
    //               <button class="like-btn">찜</button>
    //             </div>
    //           </div>
    //         </li>
    //         `;
    //       movieList.innerHTML += movieItem;
    //     }
    //   })
    //   .catch((exception) => {
    //     console.log(exception);
    //   });
  };
  // 동적으로 생성된 버튼에는 이벤트 등록이 안됨 (정확히 말하면 동적으로 생성하는 스코프 안에서 등록 해야함)
  // 부모 요소에 이벤트 리스터 등록 (버블링)
  const contentMovieList = document.querySelector(".content-movie-list-ul");
  
  // 긱 요소를 돌면서 해당 버튼에 클릭 이벤트 달기
  contentMovieList.addEventListener("click", function (event) {
    // 구조에 따라 달라질 수도 있음.
    // 찜하기 버튼이 아니라면 동작 X
    if (event.target.className !== "like-btn") return;
  
    const data = event.target.parentElement.innerText.split("\n");
  
    const movies = {
        title: data[0],
        genre: data[1],
        director: data[2],
        runningTime: data[3],
    };
  
    let localMovies = localStorage.getItem("movies");
  
    if (localMovies === null) {
      localMovies = [movies];
    } else {
      localMovies = JSON.parse(localMovies);
      localMovies.push(movies);
    }
  
    const moviesJson = JSON.stringify(localMovies);
    localStorage.setItem("movies", moviesJson);
  });
  