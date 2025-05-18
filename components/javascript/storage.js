(function () {
  /**
   * Retrieves stored materials from local storage.
   * Defaults: { cash: 0, scrap: 0, stone: 0 }
   * @returns {Object} The materials object.
   */
  function getStoredMaterials() {
    const stored = localStorage.getItem("storageMaterials");
    return stored ? JSON.parse(stored) : { cash: 0, scrap: 0, stone: 0 };
  }

  /**
   * Saves the materials object to local storage.
   * @param {Object} materials
   */
  function saveStoredMaterials(materials) {
    localStorage.setItem("storageMaterials", JSON.stringify(materials));
  }

  /**
   * Adds a specified amount to a material.
   * "scrap" and "stone" values are capped at 100; cash is uncapped.
   * @param {string} material - "cash", "scrap", or "stone".
   * @param {number} amount
   */
  function addMaterial(material, amount) {
    const materials = getStoredMaterials();
    if (material === "cash") {
      materials.cash += amount;
    } else if (material === "scrap" || material === "stone") {
      materials[material] = Math.min(materials[material] + amount, 100);
    }
    saveStoredMaterials(materials);
  }

  /**
   * Returns the HTML for the Storage tab displaying current materials.
   * @returns {string} HTML string for the Storage tab.
   */
  function displayStorage() {
    const { cash, scrap, stone } = getStoredMaterials();
    return `
      <div id="storageContainer" class="storage-container" style="padding:20px;">
        <h2>Storage</h2>
        <p>Current Materials:</p>
        <div class="storage-item"><strong>Cash:</strong> ${cash}</div>
        <div class="storage-item"><strong>Scrap:</strong> ${scrap}</div>
        <div class="storage-item"><strong>Stone:</strong> ${stone}</div>
      </div>
    `;
  }

  /**
   * Initializes the Storage tab. Placeholder for future dynamic behavior.
   */
  function initStorage() {
    // Future dynamic behavior or event listeners can be added here.
  }

  window.storageModule = {
    getStoredMaterials,
    saveStoredMaterials,
    addMaterial,
    displayStorage,
    initStorage
  };
})();
