(function () {
  /**
   * Retrieves stored materials from local storage.
   * Returns an object containing material amounts (cash, scrap).
   */
  function getStoredMaterials() {
    const stored = localStorage.getItem("storageMaterials");
    return stored ? JSON.parse(stored) : { cash: 0, scrap: 0 };
  }

  /**
   * Saves updated material amounts to local storage.
   * @param {Object} materials - The materials object.
   */
  function saveStoredMaterials(materials) {
    localStorage.setItem("storageMaterials", JSON.stringify(materials));
  }

  /**
   * Adds a specified amount of cash or scrap.
   * @param {string} material - "cash" or "scrap".
   * @param {number} amount - Amount to add.
   */
  function addMaterial(material, amount) {
    const materials = getStoredMaterials();
    if (materials.hasOwnProperty(material)) {
      materials[material] += amount;
      saveStoredMaterials(materials);
    }
  }

  /**
   * Returns the HTML for the Storage tab.
   * This displays current material amounts and includes a debug button.
   * @returns {string} HTML content for the Storage tab.
   */
  function displayStorage() {
    const materials = getStoredMaterials();
    return `
      <div id="storageContainer" style="padding:20px;">
        <h2>Storage</h2>
        <p>Here are your current materials:</p>
        <div class="storage-item">
          <strong>Cash:</strong> ${materials.cash}
        </div>
        <div class="storage-item">
          <strong>Scrap:</strong> ${materials.scrap}
        </div>
        <button id="debugAddScrap" style="margin-top:20px; padding:10px; font-size:16px;">Add Scrap (Debug)</button>
      </div>
    `;
  }

  /**
   * Initializes the Storage tab.
   * Attaches an event listener to the debug button (adds scrap).
   */
  function initStorage() {
    const debugBtn = document.getElementById("debugAddScrap");
    if (debugBtn) {
      debugBtn.addEventListener("click", function () {
        addMaterial("scrap", 5);
        document.getElementById("storageContainer").innerHTML = displayStorage();
        initStorage(); // Re-attach listener after refresh
      });
    }
  }

  // Expose the storage module API.
  window.storageModule = {
    getStoredMaterials: getStoredMaterials,
    saveStoredMaterials: saveStoredMaterials,
    addMaterial: addMaterial,
    displayStorage: displayStorage,
    initStorage: initStorage
  };
})();
