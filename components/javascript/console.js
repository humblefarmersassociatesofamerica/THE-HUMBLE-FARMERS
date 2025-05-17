document.addEventListener('DOMContentLoaded', function () {
  const commandInput = document.getElementById('consoleCommand');
  const submitButton = document.getElementById('submitCommand');
  const consoleLog = document.getElementById('consoleLog');

  // Store the startup content for reuse.
  const startupContent = "<p>Welcome user to the HFAA Generic Console Version 1.0.0! Type /? into the console for help.</p>";

  /**
   * Append a new log line to the console log.
   * Each line is prefixed with ">".
   * @param {string} message - The message to log.
   */
  function logMessage(message) {
    const p = document.createElement('p');
    p.textContent = "> " + message;
    consoleLog.appendChild(p);
    // Auto-scroll to the bottom.
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  /**
   * Process the command input.
   * Implements the following commands:
   *   /?     - Show the help menu.
   *   /quit  - Return to startup content.
   *   /drone - Load the Drone Control Center.
   */
  function submitCommand() {
    const command = commandInput.value.trim();
    if (command !== "") {
      logMessage(command); // Log the entered command.
      commandInput.value = "";
      
      if (command === "/?") {
        document.querySelector('.content-panel').innerHTML =
          `<p><strong>Help Menu</strong><br>
           - /? : Display this help menu<br>
           - /quit : Return to startup content<br>
           - /drone : Load the Drone Control Center<br>
           - /save : Save game state<br>
           - /clear : Clear saved data<br>
           - /scavenge : Scavenge for resources<br>
           - /lul : Execute demo command<br>
           <!-- Additional commands can be added here. -->
           </p>`;
        logMessage("Help menu displayed.");
      } else if (command === "/quit") {
        document.querySelector('.content-panel').innerHTML = startupContent;
        logMessage("Returned to startup content.");
      // Inside your submitCommand() function in console.js:
      } else if (command === "/drone") {
  // Ensure at least one default drone is present before loading the tab
  if (droneModule.getDrones().length === 0) {
    droneModule.addDefaultDrone();
  }

  // Set the content panel's innerHTML to include the drone container and "Buy Drone" button.
  document.querySelector('.content-panel').innerHTML =
    `<div id="droneContainer" style="width:100%; min-height:400px;"></div>
     <button id="buyDroneButton" style="margin-top: 20px; padding: 10px; font-size:16px;">Buy Drone</button>`;
  logMessage("Drone control center activated.");
  
  // Immediately display saved drones.
  droneModule.displayDrones();
  
  // Set up the "Buy Drone" button event listener to add a new drone and refresh the display.
  const buyBtn = document.getElementById("buyDroneButton");
  if (buyBtn) {
    buyBtn.addEventListener("click", function() {
      droneModule.addDefaultDrone();
      droneModule.displayDrones();
      logMessage("New drone purchased and added.");
    });}} else if (command === "/settings") {
  // Load the Settings tab into the content panel.
  document.querySelector('.content-panel').innerHTML = settingsModule.displaySettings();
  logMessage("Settings tab activated.");
  
  // Attach an event listener to the Clear Save button.
  const clearBtn = document.getElementById("clearSaveButton");
  if (clearBtn) {
    clearBtn.addEventListener("click", function() {
      settingsModule.clearLocalSave();
      logMessage("Local save data cleared.");
    });}}  else if (command === "/shop") {
  // Load the Shop tab content
  document.querySelector('.content-panel').innerHTML = shopModule.displayShop();
  logMessage("Shop tab activated.");
  // Initialize the shop (attach event listener for Buy Drone button)
  shopModule.initShop();
  } else if (command === "/storage") {
  document.querySelector('.content-panel').innerHTML =
    `<div id="storageDisplay" style="width:100%; min-height:400px; padding:20px;">
       ${storageModule.displayStorage()}
     </div>`;
  logMessage("Storage tab activated.");
  storageModule.initStorage();
    }else {
        logMessage("Command not recognized.");
      }
    }
  }

  // Set up event listeners for command submission.
  submitButton.addEventListener('click', submitCommand);
  commandInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
      submitCommand();
    }
  });

  // Initial log message.
  logMessage("Console online.");

  /* 
    INSTRUCTIONS:
    - index.js handles game state, saving/loading, and game mechanics.
    - This console.js file manages the retro console interface.
    - The command "/?" displays a help menu.
    - The command "/quit" returns to the startup content.
    - The command "/drone" loads the Drone Control Center interface.
  */
});

