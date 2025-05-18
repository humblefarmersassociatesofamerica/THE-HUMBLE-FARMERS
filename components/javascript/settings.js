(function () {
  /**
   * Clears all local save data after confirmation.
   * Instead of using alert() to notify the user,
   * you could call console.log() if you prefer.
   */
  function clearLocalSave() {
    if (confirm("Are you sure you want to clear all local save data? This action cannot be undone.")) {
      localStorage.clear();
      console.log("Local save data has been cleared.");
      // Optionally, you could update the Settings tab area if needed
    }
  }

  /**
   * Returns HTML for the Settings tab.
   */
  function displaySettings() {
    return `
      <div id="settingsContent" style="padding:20px;">
        <h2>Settings</h2>
        <p>Manage your save and load options below.</p>
        <button id="clearSaveButton" style="padding:10px; font-size:16px;">Clear Local Save Data</button>
      </div>
    `;
  }

  window.settingsModule = {
    clearLocalSave: clearLocalSave,
    displaySettings: displaySettings
  };
})();
