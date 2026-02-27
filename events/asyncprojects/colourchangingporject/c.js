//generate a random color

const randomColor = function () {
  const hex = "0123456789ABCDEF";
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }

  return color;
};

let intervalId = null;

function changeBackground() {
  document.body.style.backgroundColor = randomColor();
}
const startChangingColor = function () {

  if (!intervalId) {   // multiple interval prevent
    intervalId = setInterval(changeBackground, 1000);
  }


};

const stopChangingColor = function () {
  clearInterval(intervalId);
  intervalId = null;  // reset important
};

document.querySelector("#start").addEventListener('click', startChangingColor);
document.querySelector("#stop").addEventListener('click', stopChangingColor);