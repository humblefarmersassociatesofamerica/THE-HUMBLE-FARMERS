(function () {
  // Retrieve the current storage cap from localStorage (default is 100)
  function getStorageCap() {
    const cap = localStorage.getItem("domeStorageCap");
    return cap ? parseInt(cap, 10) : 100;
  }
  
  // Retrieve the current upgrade cost from localStorage (default is 50)
  function getUpgradeCost() {
    const cost = localStorage.getItem("domeStorageUpgradeCost");
    return cost ? parseInt(cost, 10) : 50;
  }
  
  // Save the storage cap to localStorage
  function saveStorageCap(cap) {
    localStorage.setItem("domeStorageCap", cap);
  }
  
  // Save the upgrade cost to localStorage
  function saveUpgradeCost(cost) {
    localStorage.setItem("domeStorageUpgradeCost", cost);
  }
  
  /**
   * Upgrades storage:
   * - Checks if the user has enough cash (using storageModule.getStoredMaterials().cash).
   * - Deducts the upgrade cost from cash.
   * - Increases storage cap by 10.
   * - Increases the upgrade cost exponentially (multiplied by 2).
   * Instead of alerts, messages are logged to the console and updated in the Dome tab status.
   */
  function upgradeStorage() {
    const materials = storageModule.getStoredMaterials();
    const currentCash = materials.cash;
    const cost = getUpgradeCost();
    
    if (currentCash < cost) {
      const msg = "Not enough cash for upgrade! Required: $" + cost;
      console.log(msg);
      updateDomeStatus(msg);
      return;
    }
    
    // Deduct cost and update storageMaterial in local storage via storageModule.
    materials.cash = currentCash - cost;
    storageModule.saveStoredMaterials(materials);
    
    // Upgrade storage cap and cost.
    const newCap = getStorageCap() + 10;
    saveStorageCap(newCap);
    const newCost = cost * 2;
    saveUpgradeCost(newCost);
    
    // Log the upgrade result and update the dome status element.
    const msg = "Storage upgraded to " + newCap + ". New upgrade cost: $" + newCost;
    console.log(msg);
    updateDomeStatus(msg);
    
    // Refresh the Dome tab display.
    updateDomeDisplay();
  }
  
  // Updates the dome status area with a message (if present).
  function updateDomeStatus(msg) {
    const statusEl = document.getElementById("domeStatus");
    if (statusEl) {
      statusEl.textContent = msg;
    }
  }
  
  // Returns HTML for the Dome tab with a status area for upgrade messages.
  function displayDome() {
    return `
      <div id="domeContainer" style="padding:20px;">
        <h2>Biodome Upgrades</h2>
        <p>Upgrade your biodome storage, housing, and other systems.</p>
        <div>
          <strong>Storage Capacity:</strong> ${getStorageCap()}<br>
          <strong>Upgrade Cost:</strong> $${getUpgradeCost()}
        </div>
        <button id="upgradeStorageButton" style="margin-top:20px; padding:10px; font-size:16px;">Upgrade Storage</button>
        <div id="domeStatus" style="margin-top:10px; color:#333;"></div>
      </div>
    `;
  }
  
  // Attaches the event listener for the upgrade button.
  function initDome() {
    const btn = document.getElementById("upgradeStorageButton");
    if (btn) {
      btn.addEventListener("click", upgradeStorage);
    }
  }
  
  // Helper function that refreshes the Dome tab's display.
  function updateDomeDisplay() {
    const container = document.querySelector(".content-panel");
    if (container) {
      container.innerHTML = displayDome();
      initDome();
    }
  }
  
  // Expose the Dome module API.
  window.domeModule = {
    displayDome: displayDome,
    initDome: initDome,
    upgradeStorage: upgradeStorage
  };
})();
