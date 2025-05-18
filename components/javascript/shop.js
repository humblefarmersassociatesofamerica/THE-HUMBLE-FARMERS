(function () {
  /**
   * Returns the HTML for the Shop tab with a table layout.
   */
  function displayShop() {
    return `
      <div id="shopContainer" class="shop-container" style="padding:20px;">
        <h2>Shop</h2>
        <table class="shop-table" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom:1px solid var(--border-color); text-align:left;">Item</th>
              <th style="border-bottom:1px solid var(--border-color); text-align:left;">Description</th>
              <th style="border-bottom:1px solid var(--border-color); text-align:left;">Cost</th>
              <th style="border-bottom:1px solid var(--border-color); text-align:left;">Buy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Drill Drone</td>
              <td>A robust drill drone built to extract stone from the wastelands.</td>
              <td>$1000</td>
              <td>
                <button id="buyDrillDroneButton" class="shop-button" style="padding:8px 12px;">
                  Buy Drill Drone
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Initializes the Shop tab by attaching the event listener.
   */
  function initShop() {
    const btn = document.getElementById("buyDrillDroneButton");
    if (btn) {
      btn.addEventListener("click", () => {
        droneModule.addDrillDrone();
        console.log("Drill Drone purchased.");
      });
    }
  }

  window.shopModule = {
    displayShop,
    initShop
  };
})();
