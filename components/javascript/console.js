document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("consoleCommand");
  const submitButton = document.getElementById("submitCommand");
  const consoleLog = document.getElementById("consoleLog");

  // Startup content for the content panel.
  const startupContent = "<p>Welcome to HFAA Generic Console Version 1.0.0! Type /? for help.</p>";

  function logMessage(message) {
    const p = document.createElement("p");
    p.textContent = "> " + message;
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  function submitCommand() {
    const command = commandInput.value.trim();
    if (command !== "") {
      logMessage(command);
      commandInput.value = "";
      if (command === "/?") {
        document.querySelector(".content-panel").innerHTML = `
          <p><strong>Help Menu</strong><br>
          - /? : Display help menu<br>
          - /quit : Return to startup content<br>
          - /drone : Load the Drone Control Center<br>
          - /shop : Load the Shop<br>
          - /storage : Load Storage tab<br>
          - /settings : Load Settings<br>
          - /debug : Load Debug tab<br>
          </p>`;
        logMessage("Help menu displayed.");
      } else if (command === "/quit") {
        document.querySelector(".content-panel").innerHTML = startupContent;
        logMessage("Returned to startup content.");
      } else if (command === "/drone") {
        // Ensure at least one default drone exists if none already.
        if (droneModule.getDrones().length === 0) {
          droneModule.addDefaultDrone();
        }
        document.querySelector(".content-panel").innerHTML = `
          <div id="droneContainer" style="width:100%; min-height:400px; padding:20px;"></div>`;
        logMessage("Drone Control Center activated.");
        droneModule.displayDrones();
      } else if (command === "/shop") {
        document.querySelector(".content-panel").innerHTML = shopModule.displayShop();
        logMessage("Shop tab activated.");
        shopModule.initShop();
      } else if (command === "/storage") {
        document.querySelector(".content-panel").innerHTML = `
          <div id="storageDisplay" style="width:100%; min-height:400px; padding:20px;">
            ${storageModule.displayStorage()}
          </div>`;
        logMessage("Storage tab activated.");
        storageModule.initStorage();
      } else if (command === "/settings") {
        document.querySelector(".content-panel").innerHTML = settingsModule.displaySettings();
        logMessage("Settings tab activated.");
        const clearBtn = document.getElementById("clearSaveButton");
        if (clearBtn) {
          clearBtn.addEventListener("click", function () {
            settingsModule.clearLocalSave();
            logMessage("Local save data cleared.");
          });
        }
      } else if (command === "/debug") {
        document.querySelector(".content-panel").innerHTML = debugModule.displayDebug();
        logMessage("Debug tab activated.");
        debugModule.initDebug();
      } else {
        logMessage("Command not recognized.");
      }
    }
  }

  submitButton.addEventListener("click", submitCommand);
  commandInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submitCommand();
    }
  });

  logMessage("Console online.");
});
