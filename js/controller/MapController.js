import { MapModel } from "../model/MapModel";
import { MapView } from "../view/mapView";

// Map instance is created only once and then passed from the
// controller to both the model and the view

export class MapController {
  /**
   * Creates an instance of MapController.
   * @param {MapModel} model - The model instance.
   * @param {MapView} view - The view instance.
   */
  constructor() {
    this.targetElement = document.getElementById("map");
    this.mapModel = new MapModel();
    this.mapView = new MapView(this.targetElement);
    // this.searchButton = document.getElementById("searchButton");
    // this.searchInput = document.getElementById("searchInput");
    // this.searchButton.addEventListener("click", this.searchPark.bind(this));
    this.mapView.bindSearchPark(this.handleSearchPark.bind(this));
    this.mapView.controller = this; // Set the controller reference in the view
    // this.drawIconElement = drawIconElement; //FIXME: doesn't seem to be used
    // FIXME: consider remove line below
    this.mapView.bindDrawPolygon(this.handleDrawPolygon.bind(this)); // Bind the draw polygon action
    // Register event handler in the model
    //this.mapView.renderPopup(this.mapModel.handleDrawnFeature.bind(this));
    this.mapModel.onFeatureDrawn = this.handleFeatureDrawn.bind(this);
    //
    this.mapView.bindLoadMore(this.handleLoadMoreRecords.bind(this));
    this.init();
  }

  // // Controller: The controller will handle user actions, interact with
  // // the model to search for parks, and instruct the view to update accordingly.
  // searchPark() {
  //   const parkName = this.searchInput.value;
  //   // Assuming there's a function to get park coordinates by name
  //   const coordinates = this.mapModel.getParkCoordinates(parkName);
  //   if (coordinates) {
  //     this.mapView.zoomToPark(coordinates);
  //   } else {
  //     alert("Park not found!");
  //   }
  // }

  /**
   * Method to initialize the controller
   */
  async init() {
    try {
      this.mapView.tableView.style.display = "none";
      this.bindEvents();
      this.mapModel.fetchData();
      this.mapView.renderMap(this.mapModel);
      // Render GeoJSON data on the map
      this.mapView.renderGeoJSONFeatures(this.mapModel);
      //
      // this.mapView.displayRecords(this.mapModel);
      console.log("view this.mapModel: ", this.mapModel); // FIXME: empty
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Handle draw polygon
   */
  handleDrawPolygon() {
    this.mapModel.drawPolygon();
    // this.mapModel.draw.setActive(true);
  }

  handleFeatureDrawn(feature) {
    this.mapView.renderPopup(feature);
  }

  handleDeleteFeature(feature) {
    // Call the model method to delete the feature
    this.mapModel.deleteFeature(feature);
  }

  /**
   * Binds events between the model and the view.
   */
  bindEvents() {
    document.addEventListener("loadMoreRecords", () =>
      this.handleLoadMoreRecords()
    );
  }

  /**
   * Handles the loadMoreRecords event.
   */
  handleLoadMoreRecords() {
    try {
      this.mapModel.loadMoreRecords();
      // this.mapView.displayRecords(this.mapModel.data[0]);
      this.mapView.displayRecords(this.mapModel.getRecords());
    } catch (error) {
      console.error("Failed to load more records:", error);
    }
  }

  /**
   * Search for a park
   */
  handleSearchPark(parkName) {
    const parkCoordinates = this.mapModel.searchParkByName(parkName);
    if (parkCoordinates) {
      this.mapView.zoomToPark(parkCoordinates);
    } else {
      this.mapView.displayErrorMessage("Park not found");
    }
  }
}
