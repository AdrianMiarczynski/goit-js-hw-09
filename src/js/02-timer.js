import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.getElementById('datetime-picker');
const btnEL = document.querySelector('button[type=button]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

btnEL.disabled = true;
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      // return window.alert('Please choose a date in the future');
      // return Notiflix.Notify.failure('Please choose a date in the future');
      return Notiflix.Report.failure(
        'Warning',
        'Please choose a date in the future',
        {
          width: '360px',
          svgSize: '120px',
        }
      );
    } else {
      btnEL.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};
// const date = () => {
//   clearInterval(interval);
//   daysSpan.textContent = '00';
//   hoursSpan.textContent = '00';
//   minutesSpan.textContent = '00';
//   secondsSpan.textContent = '00';
// };

const loadDate = () => {
  const date = inputEl.value;
  const SelectData = new Date(date).getTime();
  console.log(SelectData);
  const localData = new Date().getTime();
  const outputDate = convertMs(SelectData - localData);
  console.log(outputDate);
  daysSpan.textContent = addLeadingZero(outputDate.days);
  hoursSpan.textContent = addLeadingZero(outputDate.hours);
  minutesSpan.textContent = addLeadingZero(outputDate.minutes);
  secondsSpan.textContent = addLeadingZero(outputDate.seconds);
  console.log(secondsSpan.textContent);
  if (secondsSpan.textContent === 0) {
    clearInterval(interval);
    Notiflix.Report.success('Success', 'Your time is over', 'ok', {
      width: '360px',
      svgSize: '120px',
    });
  }
};

flatpickr(inputEl, options);

const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return value;
};

btnEL.addEventListener('click', () => {
  btnEL.disabled = true;
  interval = setInterval(() => loadDate(), 1000);
});
