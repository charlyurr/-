import { MapController } from "./js/controller/MapController";

// const targetElement = document.getElementById("map");
const targetElement = "map"; // map container
const mapController = new MapController(targetElement);

// Initialize the application
mapController.init();
