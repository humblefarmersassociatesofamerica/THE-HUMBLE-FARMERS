(function () {
  /**
   * Retrieves stored materials from local storage.
   * Defaults: cash: 0, scrap: 0, stone: 0.
   */
  function getStoredMaterials() {
    const stored = localStorage.getItem("storageMaterials");
    return stored ? JSON.parse(stored) : { cash: 0, scrap: 0, stone: 0 };
  }

  /**
   * Saves material amounts to local storage.
   */
  function saveStoredMaterials(materials) {
    localStorage.setItem("storageMaterials", JSON.stringify(materials));
  }

  /**
   * Adds a specified amount of a material.
   * For scrap and stone, amounts are capped at 100 (debug cap).
   * Cash is uncapped.
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
   * Returns HTML for the Storage tab showing current materials.
   */
  function displayStorage() {
    const materials = getStoredMaterials();
    return `
      <div id="storageContainer" style="padding:20px;">
        <h2>Storage</h2>
        <p>Current Materials:</p>
        <div class="storage-item"><strong>Cash:</strong> ${materials.cash}</div>
        <div class="storage-item"><strong>Scrap:</strong> ${materials.scrap}</div>
        <div class="storage-item"><strong>Stone:</strong> ${materials.stone}</div>
      </div>
    `;
  }

  function initStorage() {
    // (If you add buttons or dynamic behavior later, initialize here.)
  }

  window.storageModule = {
    getStoredMaterials: getStoredMaterials,
    saveStoredMaterials: saveStoredMaterials,
    addMaterial: addMaterial,
    displayStorage: displayStorage,
    initStorage: initStorage
  };
})();
