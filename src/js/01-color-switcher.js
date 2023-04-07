const btnElStart = document.querySelector('button[data-start]');
const btnElStop = document.querySelector('button[data-stop]');
btnElStop.disabled = true;

let interval;

const onClick = () => {
  if (!interval) {
    interval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
};
const removeinterval = () => {
  clearInterval(interval);
  interval = null;
};

btnElStart.addEventListener('click', () => {
  onClick();
  btnElStart.disabled = true;
  btnElStop.disabled = false;
});

btnElStop.addEventListener('click', () => {
  removeinterval();
  btnElStart.disabled = false;
  btnElStop.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
