const setupElement = document.getElementById("setup");
const punchlineElement = document.getElementById("punchline");
const generateBtn = document.getElementById("generateBtn");

async function getJoke() {
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setupElement.textContent = data.setup;
    punchlineElement.textContent = data.punchline;
  } catch (error) {
    setupElement.textContent = "Oops! Something went wrong.";
    punchlineElement.textContent = "";
    console.error("Error fetching joke:", error);
  }
}

generateBtn.addEventListener("click", getJoke);


