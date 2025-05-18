(function () {
  // Returns the HTML for the Debug tab.
  function displayDebug() {
    return `
      <div id="debugContent" class="debug-content" style="padding:20px;">
        <h2>Debug Tab</h2>
        <p>Enter debug command in the format: [item] [amount] (e.g., scrap 20).</p>
        <input type="text" id="debugCommand" placeholder="e.g., scrap 20" class="debug-input" style="width:50%; padding:8px;">
        <button id="submitDebugCommand" class="debug-submit" style="padding:8px 12px;">Submit</button>
        <div id="debugLog" class="debug-log" style="margin-top:20px; background:#eee; padding:10px; height:150px; overflow-y:auto;"></div>
      </div>
    `;
  }

  // Initializes the Debug tab by attaching the event listener to the submit button.
  function initDebug() {
    const btn = document.getElementById("submitDebugCommand");
    if (btn) {
      btn.addEventListener("click", () => {
        const command = document.getElementById("debugCommand")?.value.trim();
        if (command) {
          processDebugCommand(command);
        } else {
          logDebug("Please enter a command.");
        }
      });
    }
  }

  // Processes the debug command in the format: [item] [amount]
  function processDebugCommand(command) {
    const parts = command.split(" ");
    if (parts.length < 2) {
      logDebug("Invalid command format. Use: [item] [amount].");
      return;
    }
    const item = parts[0].toLowerCase();
    const amount = Number(parts[1]);
    if (!Number.isFinite(amount)) {
      logDebug("Amount must be a number.");
      return;
    }
    if (!["cash", "scrap", "stone"].includes(item)) {
      logDebug("Invalid item. Allowed items: cash, scrap, stone.");
      return;
    }
    storageModule.addMaterial(item, amount);
    logDebug(`Added ${amount} of ${item}.`);
  }

  // Logs debug messages into the debug log area.
  function logDebug(msg) {
    const debugLog = document.getElementById("debugLog");
    if (debugLog) {
      const p = document.createElement("p");
      p.textContent = msg;
      debugLog.appendChild(p);
      debugLog.scrollTop = debugLog.scrollHeight;
    }
  }

  window.debugModule = {
    displayDebug,
    initDebug
  };
})();
