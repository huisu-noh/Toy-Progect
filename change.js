// // 홈화면에서 차트로 이동시
// const openChart = document.querySelector('.openChart');
// const closeChart = document.querySelector('.closeChart');

// function screenUp() {
//   openChart.classList.add('.screenUp');
// }

// openChart.addEventListener('click', screenUp);

// function screenDown() {
//   closeChart.classList.add('.screenDown');
// }

// closeChart.addEventListener('click', screenDown);

// 버튼 클릭시 리스트 업

const dragBtn = document.querySelector('.dragBtn');
const history = document.querySelector('.history');
const onDay = document.querySelector('.onDay');

function scrollup() {
  if (
    history.classList.contains('scrollup') &&
    onDay.classList.contains('onDayScrollUp')
  ) {
    history.classList.remove('scrollup');
    onDay.classList.remove('onDayScrollUp');
  } else {
    history.classList.add('scrollup');
    onDay.classList.add('onDayScrollUp');
  }
}

dragBtn.addEventListener('click', scrollup);
