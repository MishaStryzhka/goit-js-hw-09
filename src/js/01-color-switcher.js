const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.body,
}
let timerId = null;

refs.start.addEventListener('click', () => {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.start.setAttribute("disabled", "")
    refs.stop.removeAttribute("disabled")
})

refs.stop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.stop.setAttribute("disabled", "")
    refs.start.removeAttribute("disabled")
})

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
