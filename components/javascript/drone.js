(function () {
  /**
   * Creates a default drone object with preset values.
   * @returns {Object} A drone object.
   */
  function createDefaultDrone() {
    return {
      id: "drone_" + new Date().getTime() + "_" + Math.floor(Math.random() * 10000),
      type: "jeff",
      description: "Your trusty companion drone, rusty and beat up, but a good start",
      scavangeTime: 30000, // in milliseconds (30 seconds)
      battery: "∞/∞"
    };
  }

  /**
   * Retrieves the drones array from local storage.
   * @returns {Array} Array of drone objects.
   */
  function getDrones() {
    const stored = localStorage.getItem("dronesData");
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Saves the drones array to local storage.
   * @param {Array} drones - Array of drone objects.
   */
  function saveDrones(drones) {
    localStorage.setItem("dronesData", JSON.stringify(drones));
  }

  /**
   * Adds a default drone to the storage.
   * @returns {Object} The new drone object.
   */
  function addDefaultDrone() {
    const drones = getDrones();
    const newDrone = createDefaultDrone();
    drones.push(newDrone);
    saveDrones(drones);
    return newDrone;
  }

  /**
   * Generates the HTML for a single drone card.
   * @param {Object} drone - The drone object.
   * @param {number} index - The index of the drone in the list.
   * @returns {string} HTML string.
   */
  function createDroneElement(drone, index) {
    return `
      <div class="drone-card">
        <div class="drone-info">
          <div class="drone-details">
            <span class="drone-name">Drone #${index + 1} - ${drone.type}</span><br>
            <span class="drone-description">${drone.description}</span>
          </div>
          <div class="drone-battery">
            <pre>${drone.battery}</pre>
          </div>
        </div>
        <div class="drone-controls">
          <div class="progress-bar">
            <div class="progress-fill" id="progress-${drone.id}" style="width:0%;"></div>
          </div>
          <button class="start-button" data-drone-id="${drone.id}" data-duration="${drone.scavangeTime}">Start</button>
        </div>
      </div>
    `;
  }

  /**
   * Renders all drones in the drone container. Must be placed inside an element with ID "droneContainer".
   */
  function displayDrones() {
    const droneContainer = document.getElementById("droneContainer");
    if (!droneContainer) return;
    const drones = getDrones();
    let html = "";
    drones.forEach((drone, index) => {
      html += createDroneElement(drone, index);
    });
    droneContainer.innerHTML = html;

    // Attach event listeners for all start buttons to start the drone task.
    const startButtons = droneContainer.querySelectorAll(".start-button");
    startButtons.forEach(button => {
      button.addEventListener("click", function() {
        const droneId = this.getAttribute("data-drone-id");
        const duration = parseInt(this.getAttribute("data-duration"));
        const progressElem = document.getElementById("progress-" + droneId);
        if (progressElem) {
          startDroneTask(droneId, progressElem, duration);
        }
      });
    });
  }

  /**
   * Starts a drone task, updates the progress bar over the given duration,
   * and logs a debug message when finished.
   * @param {string} droneId - The unique ID of the drone.
   * @param {HTMLElement} progressElem - The progress-fill element.
   * @param {number} duration - Duration of the task in milliseconds.
   */
  function startDroneTask(droneId, progressElem, duration) {
    let elapsed = 0;
    const intervalTime = 100; // update every 100ms
    progressElem.style.width = "0%";
    const intervalId = setInterval(() => {
      elapsed += intervalTime;
      let percent = Math.min((elapsed / duration) * 100, 100);
      progressElem.style.width = percent + "%";
      if (elapsed >= duration) {
        clearInterval(intervalId);
        console.log("Drone " + droneId + " finished its task (scavenge).");
      }
    }, intervalTime);
  }

  // Expose the drone module API.
  window.droneModule = {
    createDefaultDrone: createDefaultDrone,
    addDefaultDrone: addDefaultDrone,
    getDrones: getDrones,
    saveDrones: saveDrones,
    displayDrones: displayDrones,
    startDroneTask: startDroneTask
  };
})();
