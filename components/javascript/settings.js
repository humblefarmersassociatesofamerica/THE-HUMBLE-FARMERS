(function () {
  /**
   * Clears all locally saved data.
   */
  function clearLocalSave() {
    localStorage.clear();
    alert("Local save data has been cleared.");
  }

  /**
   * Returns the HTML for the Settings tab.
   * This includes a header and a button to clear local save data.
   * @returns {string} HTML string for the Settings tab.
   */
  function displaySettings() {
    return `
      <div id="settingsContent" style="width:100%; padding:20px;">
        <h2>Settings</h2>
        <p>Manage your save and load options here.</p>
        <button id="clearSaveButton" style="padding: 10px; font-size:16px;">Clear Local Save Data</button>
      </div>
    `;
  }

  // Expose the settings module API.
  window.settingsModule = {
    clearLocalSave: clearLocalSave,
    displaySettings: displaySettings
  };
})();
