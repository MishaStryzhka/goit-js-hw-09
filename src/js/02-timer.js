import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let dataSelected;

const refs = {
    inputText: document.getElementById("datetime-picker"),
    btnStart: document.querySelector('button[data-start]'),

    timerValue: document.querySelectorAll('.value'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        dataSelected = selectedDates[0];
        const data = new Date();

        if (data.getTime() > dataSelected.getTime()) {
            Notify.failure('"Please choose a date in the future"');
        } else {
            Notify.success('You can start a timer.');
            refs.btnStart.removeAttribute('disabled');
        }
    },
};

flatpickr(refs.inputText, options);

refs.btnStart.addEventListener('click', () => {
    refs.btnStart.setAttribute('disabled', '')

    setInterval(() => {
        const data = new Date();

        const ms = dataSelected - data
        if (ms >= 0) {
            const { days, hours, minutes, seconds } = convertMs(ms)

            refs.timerValue[0].textContent = `${days}`;
            refs.timerValue[1].textContent = addLeadingZero(`${hours}`);
            refs.timerValue[2].textContent = addLeadingZero(`${minutes}`);
            refs.timerValue[3].textContent = addLeadingZero(`${seconds}`);
        }
    }, 1000);

})

function addLeadingZero(value) {
    return value.padStart(2, '0');
}

function convertMs(ms) {
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