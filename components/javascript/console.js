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
      }  else if (command === "/drone") {
  // Set the content panel's innerHTML to include a container for drones and a "Buy Drone" button.
  document.querySelector('.content-panel').innerHTML =
    `<div id="droneContainer" style="width:100%; min-height:400px;"></div>
     <button id="buyDroneButton" style="margin-top: 20px; padding: 10px; font-size:16px;">Buy Drone</button>`;
  logMessage("Drone control center activated.");
  
  // Immediately display any saved drones by calling the drone module's display function.
  droneModule.displayDrones();
  
  // Set up the "Buy Drone" button event listener to add a new drone and refresh the display.
  const buyBtn = document.getElementById("buyDroneButton");
  if (buyBtn) {
    buyBtn.addEventListener("click", function() {
      // Add a new default drone to the stored drones.
      droneModule.addDefaultDrone();
      // Refresh the drones display.
      document.getElementById("droneContainer").innerHTML = droneModule.displayDrones();
      logMessage("New drone purchased and added.");
    });
  }
}


        else {
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

