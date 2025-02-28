// Real-Time Clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("real-time-clock").textContent = `${hours}:${minutes}:${seconds}`;
}

// Update clock every second
setInterval(updateClock, 1000);

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

// Format time for stopwatch display
function formatTime(timeInSeconds) {
  const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeInSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Start the stopwatch
function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      document.getElementById("stopwatch").textContent = formatTime(stopwatchTime);
    }, 1000);
  }
}

// Stop the stopwatch
function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  document.getElementById("stopwatch").textContent = formatTime(stopwatchTime);
}

// Event listeners for stopwatch buttons
document.getElementById("start-btn").addEventListener("click", startStopwatch);
document.getElementById("stop-btn").addEventListener("click", stopStopwatch);
document.getElementById("reset-btn").addEventListener("click", resetStopwatch);