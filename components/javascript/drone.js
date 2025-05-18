(function () {
  // ---- Drone Creation Functions ----

  // Create a "Jeff" drone (scavenge drone)
  function createDefaultDrone() {
    return {
      id: "drone_" + new Date().getTime() + "_" + Math.floor(Math.random() * 10000),
      type: "jeff",
      description: "Your trusty companion drone, rusty and beat up, but a good start",
      scavangeTime: 30000, // 30 seconds in ms
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
      scavangeTime: 30000, // 30 seconds in ms
      battery: "∞/∞",
      workType: "drill"
    };
  }

  // ---- Local Storage Functions ----

  // Retrieve drones from local storage
  function getDrones() {
    const stored = localStorage.getItem("dronesData");
    return stored ? JSON.parse(stored) : [];
  }

  // Save drones array to local storage
  function saveDrones(drones) {
    localStorage.setItem("dronesData", JSON.stringify(drones));
  }

  // ---- Drone Addition Functions ----

  // Add a default (Jeff) drone
  function addDefaultDrone() {
    const drones = getDrones();
    const newDrone = createDefaultDrone();
    drones.push(newDrone);
    saveDrones(drones);
    return newDrone;
  }

  // Add a drill drone (from shop purchase)
  function addDrillDrone() {
    const drones = getDrones();
    const newDrone = createDrillDrone();
    drones.push(newDrone);
    saveDrones(drones);
    return newDrone;
  }

  // ---- Drone Display Functions ----

  // Generate HTML for a single drone card
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
          <div class="stat-item">
            <strong>Timer:</strong>
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

  // Render all drones in the "droneContainer"
  function displayDrones() {
    const droneContainer = document.getElementById("droneContainer");
    if (!droneContainer) return;
    const drones = getDrones();
    let html = "";
    drones.forEach((drone, index) => {
      html += createDroneElement(drone, index);
    });
    droneContainer.innerHTML = html;

    // Attach event listeners for all start buttons
    const startButtons = droneContainer.querySelectorAll(".start-button");
    startButtons.forEach(button => {
      button.addEventListener("click", function () {
        const droneId = this.getAttribute("data-drone-id");
        const duration = parseInt(this.getAttribute("data-duration"), 10);
        const progressElem = document.getElementById("progress-" + droneId);
        if (progressElem) {
          startDroneTask(droneId, progressElem, duration);
        }
      });
    });
  }

  // ---- Drone Task Function ----

  // Start a drone task: update progress bar and timer; add material on completion.
  function startDroneTask(droneId, progressElem, duration) {
    let elapsed = 0;
    const intervalTime = 100; // update every 100ms
    if (progressElem) {
      progressElem.style.width = "0%";
    }
    const timerElem = document.getElementById("timer-" + droneId);
    if (timerElem) {
      timerElem.textContent = `0/${duration / 1000}s`;
    }
    const intervalId = setInterval(() => {
      elapsed += intervalTime;
      let percent = Math.min((elapsed / duration) * 100, 100);
      if (progressElem) {
        progressElem.style.width = percent + "%";
      }
      if (timerElem) {
        timerElem.textContent = `${Math.floor(elapsed / 1000)}/${duration / 1000}s`;
      }
      if (elapsed >= duration) {
        clearInterval(intervalId);
        const foundDrone = getDrones().find(d => d.id === droneId);
        const workType = foundDrone ? foundDrone.workType : "scavenge";
        if (workType === "drill") {
          // Drill drone collects stone (1-5)
          const stoneGain = Math.floor(Math.random() * 5) + 1;
          storageModule.addMaterial("stone", stoneGain);
          console.log(`Drone ${droneId} finished drilling. +${stoneGain} stone added.`);
        } else {
          // Jeff or other scavenge drone collects scrap (1-7)
          const scrapGain = Math.floor(Math.random() * 7) + 1;
          storageModule.addMaterial("scrap", scrapGain);
          console.log(`Drone ${droneId} finished scavenging. +${scrapGain} scrap added.`);
        }
      }
    }, intervalTime);
  }

  // ---- Expose API ----

  window.droneModule = {
    createDefaultDrone,
    createDrillDrone,
    addDefaultDrone,
    addDrillDrone,
    getDrones,
    saveDrones,
    displayDrones,
    startDroneTask
  };
})();
