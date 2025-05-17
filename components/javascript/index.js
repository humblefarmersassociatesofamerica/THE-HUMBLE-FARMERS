/* =====================
   Game State Variables
   ===================== */
var cash = 0;              // Game currency
var MM = 0;                // Mystery Meat count
var MB = 0;                // Moldy Bread count

/* =====================
   Save System Functions
   ===================== */
/**
 * Save the current game state to localStorage.
 */
function save() {
  localStorage.setItem("cashCount", cash);
  localStorage.setItem("MysteryMeat", MM);
  localStorage.setItem("MoldyBread", MB);

  // Example data for demonstration.
  localStorage.setItem("lastname", "Smith");

  const resultElem = document.getElementById("result");
  if (resultElem) {
    resultElem.innerHTML = localStorage.getItem("lastname");
  }
}

// Save frequently (adjust the interval as needed).
setInterval(save, 20);

/**
 * Clear saved game data and reset game state variables.
 */
function clearSave() {
  localStorage.clear();
  cash = 0;
  MM = 0;
  MB = 0;
  logToConsole("Save successfully cleared");
}

/* =====================
   Load Save Data on Startup
   ===================== */
window.onload = function () {
  if (localStorage.getItem("cashCount") !== null) {
    cash = parseFloat(localStorage.getItem("cashCount")) || 0;
    MM   = parseFloat(localStorage.getItem("MysteryMeat")) || 0;
    MB   = parseFloat(localStorage.getItem("MoldyBread")) || 0;
    logToConsole("Save loaded");
  } else {
    logToConsole("No save found");
  }
};

/* =====================
   Game Mechanics Functions
   ===================== */
/**
 * Simulates scavenging with random outcomes.
 */
function scavenge() {
  const a = Math.floor(Math.random() * 101);
  if (a >= 50) {
    MM += 1;
    logToConsole("You gained 1 Mystery Meat");
  } else if (a >= 10) {
    MB += 1;
    logToConsole("You gained 1 Moldy Bun");
  } else if (a >= 1) {
    cash += 1;
    logToConsole("It's your lucky day! Gained 1 Cash");
  } else if (a >= 0) {
    cash -= 1;
    logToConsole("Your luck ran out :( Lose $1");
  }
}

/**
 * A simple function to update a tab’s content; for demonstration.
 */
function lul() {
  const coreTab4 = document.getElementById("coreTab4");
  if (coreTab4) {
    coreTab4.innerHTML = "<h1>NOBODY LOVES YOU</h1>";
    logToConsole("Storage updated");
  }
}
