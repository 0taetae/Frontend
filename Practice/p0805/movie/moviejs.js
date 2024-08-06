// querySelectorAll() : 지정된 셀렉터 그룹에 일치하는 document의 element list를 NodeList로 반환
const buttons = document.querySelectorAll('button.movie_check');

buttons.forEach((button) => {
    //button.addEventListener('click', handler)
    console.log(button)
});

const info = document.querySelector('.movie_list_info_text');

function handler(e) {
    const parent = e.target.parentElement;
    const title = parent.querySelector('.movie_title');
    const genre = parent.querySelector('.movie_genre');
    const director = parent.querySelector('.movie_director');
    const time = parent.querySelector('.movie_time');

    console.log(`title: ${title.textContent}
genre: ${genre.textContent}
director: ${director.textContent}
time: ${time.textContent}`);
}



const buttons = document.querySelectorAll('button.favorite');

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    const title = parent.querySelector('.title');
    const genre = parent.querySelector('.genre');
    const director = parent.querySelector('.director');
    const time = parent.querySelector('.time');

    console.log(`title: ${title.textContent}
genre: ${genre.textContent}
director: ${director.textContent}
time: ${time.textContent}`);
  });
});