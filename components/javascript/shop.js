(function () {
  /**
   * Returns the HTML for the Shop tab.
   * This contains a header and a Buy Drone button.
   * @returns {string} HTML string for the shop tab.
   */
  function displayShop() {
    return `
      <div id="shopContainer" style="padding:20px;">
        <h2>Shop</h2>
        <p>Welcome to the shop! Purchase drones below.</p>
        <button id="buyDroneButtonShop" style="padding:10px; font-size:16px;">Buy Drone</button>
      </div>
    `;
  }

  /**
   * Initializes the shop tab.
   * Attaches an event listener to the Buy Drone button so that when clicked,
   * it calls the drone module to add a new default drone.
   */
  function initShop() {
    const buyBtn = document.getElementById("buyDroneButtonShop");
    if (buyBtn) {
      buyBtn.addEventListener("click", function () {
        // Call the drone module to add a new default drone.
        droneModule.addDefaultDrone();
      });
    }
  }

  // Expose the shop module API.
  window.shopModule = {
    displayShop: displayShop,
    initShop: initShop
  };
})();
