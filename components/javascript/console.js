document.addEventListener("DOMContentLoaded", function () {
  const commandInput = document.getElementById("consoleCommand");
  const submitButton = document.getElementById("submitCommand");
  const consoleLog = document.getElementById("consoleLog");

  // Startup content for the content panel.
  const startupContent = "<p>Welcome to HFAA Generic Console Version 1.0.0! Type /? for help.</p>";

  // Logs a new message in the console log area.
  function logMessage(message) {
    const p = document.createElement("p");
    p.textContent = "> " + message;
    consoleLog.appendChild(p);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  // --- Tab display functions ---

  function showStartupTab() {
    document.querySelector(".content-panel").innerHTML = startupContent;
    logMessage("Returned to startup content.");
  }

  function showHelpTab() {
    const helpHtml = `
      <p><strong>Help Menu</strong><br>
        - /? : Display help menu<br>
        - /quit : Return to startup content<br>
        - /drone : Load the Drone Control Center<br>
        - /shop : Load the Shop<br>
        - /storage : Load Storage tab<br>
        - /settings : Load Settings<br>
        - /debug : Load Debug tab<br>
        - /dome : Load Dome tab<br>
      </p>`;
    document.querySelector(".content-panel").innerHTML = helpHtml;
    logMessage("Help menu displayed.");
  }

  function showDroneTab() {
    if (droneModule.getDrones().length === 0) {
      droneModule.addDefaultDrone();
    }
    document.querySelector(".content-panel").innerHTML = `
      <div id="droneContainer" style="width:100%; min-height:400px; padding:20px;"></div>`;
    logMessage("Drone Control Center activated.");
    droneModule.displayDrones();
  }

  function showShopTab() {
    document.querySelector(".content-panel").innerHTML = shopModule.displayShop();
    logMessage("Shop tab activated.");
    shopModule.initShop();
  }

  function showStorageTab() {
    document.querySelector(".content-panel").innerHTML = `
      <div id="storageDisplay" style="width:100%; min-height:400px; padding:20px;">
        ${storageModule.displayStorage()}
      </div>`;
    logMessage("Storage tab activated.");
    storageModule.initStorage();
  }

  function showSettingsTab() {
    document.querySelector(".content-panel").innerHTML = settingsModule.displaySettings();
    logMessage("Settings tab activated.");
    const clearBtn = document.getElementById("clearSaveButton");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        settingsModule.clearLocalSave();
        logMessage("Local save data cleared.");
      });
    }
  }

  function showDebugTab() {
    document.querySelector(".content-panel").innerHTML = debugModule.displayDebug();
    logMessage("Debug tab activated.");
    debugModule.initDebug();
  }

  function showDomeTab() {
    document.querySelector(".content-panel").innerHTML = domeModule.displayDome();
    logMessage("Dome tab activated.");
    domeModule.initDome();
  }

  // --- Command Processing ---
  
  function processCommand(command) {
    switch (command) {
      case "/?":
        showHelpTab();
        break;
      case "/quit":
        showStartupTab();
        break;
      case "/drone":
        showDroneTab();
        break;
      case "/shop":
        showShopTab();
        break;
      case "/storage":
        showStorageTab();
        break;
      case "/settings":
        showSettingsTab();
        break;
      case "/debug":
        showDebugTab();
        break;
      case "/dome":
        showDomeTab();
        break;
      default:
        logMessage("Command not recognized.");
        break;
    }
  }

  function submitCommand() {
    const command = commandInput.value.trim();
    if (command) {
      logMessage(command);
      commandInput.value = "";
      processCommand(command);
    }
  }

  // Attach event listeners.
  submitButton.addEventListener("click", submitCommand);
  commandInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submitCommand();
    }
  });

  logMessage("Console online.");
});
