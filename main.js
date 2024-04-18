// Import necessary modules
import { MapController } from "./js/controller/MapController";

// Function to initialize the application
function initializeApp() {
  // Create an instance of MapController
  const mapController = new MapController();

  // Initialize the controller
  mapController.init();
}

// Function to run when the DOM content is loaded
function onDOMContentLoaded() {
  // Call the initializeApp function to start the application
  initializeApp();
}

// Add event listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
