// const buttons = document.querySelectorAll('button.movie_check');

// buttons.forEach((btn) => {
//     btn.addEventListener('click', handler);
// });
  
// function handler(event) {
//     const info = event.target.parentElement.parentElement;
//     const title = info.querySelector('.movie_title');
//     const genre = info.querySelector('.movie_genre');
//     const director = info.querySelector('.movie_director');
//     const time = info.querySelector('.movie_time');

//     console.log(`${title.textContent}
// ${genre.textContent}
// ${director.textContent}
// ${time.textContent}`);
// }

window.onload = function () {
    let movies = localStorage.getItem("movies");
  
    let likeMovieList = document.querySelector("#like-movie-list");
  
    if (movies === null) {
      likeMovieList.innerText = "아직 찜한 영화가 없습니다...";
    } else {
      // 데이터가 있다면 가져온 movies를 Json으로 변경하기
      movies = JSON.parse(movies);
  
      let likeMovieListHtml = document.createElement("ul");
      for (let i = 0; i < movies.length; i++) {
        likeMovieListHtml.innerHTML += `<li>${movies[i]["title"]} | ${movies[i]["genre"]} | ${movies[i]["director"]} | ${movies[i]["time"]}</li>`;
      }
  
      likeMovieList.appendChild(likeMovieListHtml);
    }
  };
  
  const btnList = document.querySelectorAll('button.movie_check');

  btnList.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const data = event.target.parentElement.parentElement.innerText.split('\n');
      
    
      const movies = {
        title: data[0],
        genre: data[1],
        director: data[2],
        time: data[3],
      };
      //console.log(data.innerText)
      //console.log(movies)
      // 로컬스토리지에 있는 cars 를 가져온다.
      let localMovies = localStorage.getItem("movies");
  
      if (localMovies === null) {
        localMovies = [movies];
      } else {
        // cars가 있다면 Json 으로 변경
        localMovies = JSON.parse(localMovies);
        localMovies.push(movies);
      }
  
      // 로컬스토리지에 저장하기 위해서는 문자열의 형태로만 저장할 수 있다.
      const moviesJson = JSON.stringify(localMovies);
      localStorage.setItem("movies", moviesJson);
    });
  });


  
  