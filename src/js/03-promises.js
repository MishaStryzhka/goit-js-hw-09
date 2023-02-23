import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form')
}

refs.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const {
    elements: { delay, step, amount }
  } = e.currentTarget;
  let position = 1;
  let totalDelay = delay.value;

  setInterval(() => {
    if (amount.value >= position) {
      createPromise(position, totalDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      totalDelay = +delay.value + +step.value * (position);
      position += 1;
    };
  }, 0);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}
