(function () {
  // Create a "Jeff" drone (scavenge drone)
  function createDefaultDrone() {
    return {
      id: "drone_" + new Date().getTime() + "_" + Math.floor(Math.random() * 10000),
      type: "jeff",
      description: "Your trusty companion drone, rusty and beat up, but a good start",
      scavangeTime: 30000, // 30 seconds (in ms)
      battery: "∞/∞",
      workType: "scavenge"
    };
  }

  // Create a Drill drone (drill type)
  function createDrillDrone() {
    return {
      id: "drone_" + new Date().getTime() + "_" + Math.floor(Math.random() * 10000),
      type: "drill",
      description: "A robust drill drone built to extract stone from the wastelands.",
      scavangeTime: 30000, // 30 seconds
      battery: "∞/∞",
      workType: "drill"
    };
  }

  // Retrieve drones from local storage
  function getDrones() {
    const stored = localStorage.getItem("dronesData");
    return stored ? JSON.parse(stored) : [];
  }

  // Save drones to local storage
  function saveDrones(drones) {
    localStorage.setItem("dronesData", JSON.stringify(drones));
  }

  // Add a default (Jeff) drone
  function addDefaultDrone() {
    const drones = getDrones();
    const newDrone = createDefaultDrone();
    drones.push(newDrone);
    saveDrones(drones);
    return newDrone;
  }

  // Add a drill drone (bought from the shop)
  function addDrillDrone() {
    const drones = getDrones();
    const newDrone = createDrillDrone();
    drones.push(newDrone);
    saveDrones(drones);
    return newDrone;
  }

  // Generate HTML for a drone card
  function createDroneElement(drone, index) {
    return `
      <div class="drone-card">
        <div class="drone-info">
          <span class="drone-name">Drone #${index + 1} - ${drone.type}</span><br>
          <span class="drone-description">${drone.description}</span>
        </div>
        <div class="drone-stats">
          <div class="stat-item"><strong>Battery:</strong> ${drone.battery}</div>
          <div class="stat-item"><strong>Time:</strong> ${drone.scavangeTime / 1000}s</div>
          <div class="stat-item"><strong>Work:</strong> ${drone.workType || "scavenge"}</div>
          <div class="stat-item"><strong>Timer:</strong> 
            <span class="drone-timer" id="timer-${drone.id}">0/${drone.scavangeTime / 1000}s</span>
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

  // Render all drones in the drone container
  function displayDrones() {
    const droneContainer = document.getElementById("droneContainer");
    if (!droneContainer) return;
    const drones = getDrones();
    let html = "";
    drones.forEach((drone, index) => {
      html += createDroneElement(drone, index);
    });
    droneContainer.innerHTML = html;

    // Attach event listeners to each start button
    const startButtons = droneContainer.querySelectorAll(".start-button");
    startButtons.forEach(button => {
      button.addEventListener("click", function () {
        const droneId = this.getAttribute("data-drone-id");
        const duration = parseInt(this.getAttribute("data-duration"));
        const progressElem = document.getElementById("progress-" + droneId);
        if (progressElem) {
          startDroneTask(droneId, progressElem, duration);
        }
      });
    });
  }

  // Start a drone task with a progress bar and timer
  function startDroneTask(droneId, progressElem, duration) {
    let elapsed = 0;
    const intervalTime = 100; // Update every 100ms
    progressElem.style.width = "0%";
    const timerElem = document.getElementById("timer-" + droneId);
    if (timerElem) {
      timerElem.textContent = `0/${duration / 1000}s`;
    }
    const intervalId = setInterval(() => {
      elapsed += intervalTime;
      let percent = Math.min((elapsed / duration) * 100, 100);
      progressElem.style.width = percent + "%";
      if (timerElem) {
        timerElem.textContent = `${Math.floor(elapsed / 1000)}/${duration / 1000}s`;
      }
      if (elapsed >= duration) {
        clearInterval(intervalId);
        const foundDrone = getDrones().find(d => d.id === droneId);
        const workType = foundDrone ? foundDrone.workType : "scavenge";
        if (workType === "drill") {
          // For drill drones, add stone (1-5)
          const stoneGain = Math.floor(Math.random() * 5) + 1;
          storageModule.addMaterial("stone", stoneGain);
          console.log("Drone " + droneId + " finished drilling. +" + stoneGain + " stone added.");
        } else {
          // For Jeff/scavenge drones, add scrap (1-7)
          const scrapGain = Math.floor(Math.random() * 7) + 1;
          storageModule.addMaterial("scrap", scrapGain);
          console.log("Drone " + droneId + " finished scavenging. +" + scrapGain + " scrap added.");
        }
      }
    }, intervalTime);
  }

  // Expose API
  window.droneModule = {
    createDefaultDrone: createDefaultDrone,
    createDrillDrone: createDrillDrone,
    addDefaultDrone: addDefaultDrone,
    addDrillDrone: addDrillDrone,
    getDrones: getDrones,
    saveDrones: saveDrones,
    displayDrones: displayDrones,
    startDroneTask: startDroneTask
  };
})();
