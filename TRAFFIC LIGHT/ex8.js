const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

const statusText = document.getElementById("statusText");
const timerText = document.getElementById("timer");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let intervalId = null;
let timeLeft = 0;
let currentLight = "red";

// Function to activate a light
function setLight(light, status, duration) {
  // Reset all lights
  red.classList.remove("active");
  yellow.classList.remove("active");
  green.classList.remove("active");

  // Activate chosen light
  document.getElementById(light).classList.add("active");
  statusText.textContent = status;
  timeLeft = duration;
  timerText.textContent = timeLeft;
}

// Countdown logic
function countdown() {
  timeLeft--;
  timerText.textContent = timeLeft;

  if (timeLeft <= 0) {
    if (currentLight === "red") {
      currentLight = "yellow";
      setLight("yellow", "WAIT", 2); // Yellow for 2 seconds
    } else if (currentLight === "yellow") {
      currentLight = "green";
      setLight("green", "GO", 5); // Green for 5 seconds
    } else if (currentLight === "green") {
      currentLight = "red";
      setLight("red", "STOP", 5); // Back to Red for 5 seconds
    }
  }
}

// Start button
startBtn.addEventListener("click", () => {
  if (!intervalId) {
    currentLight = "red";
    setLight("red", "STOP", 5); // Start with Red
    intervalId = setInterval(countdown, 1000);
  }
});

// Stop button
stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

// Reset button
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  currentLight = "red";
  setLight("red", "STOP", 5); // Reset to Red
});