let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('stopwatch');

function formatTime(ms) {
    let milliseconds = Math.floor(ms % 1000);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    // Padding with zeros for consistent width
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    let msDisplay = String(milliseconds).padStart(3, '0');

    return `${m}:${s}:${msDisplay}`;
}

function start() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10); // Update every 10ms for smooth display
    }
}

function stop() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function reset() {
    stop();
    elapsedTime = 0;
    display.textContent = "00:00:000";
}
document.getElementById('codigo').addEventListener('click', start);