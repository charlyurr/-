import "../../css/style.css";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import Modify from "ol/interaction/Modify";
import Link from "ol/interaction/Link";
import Snap from "ol/interaction/Snap"; //import the Snap interaction
import { Style, Fill, Stroke } from "ol/style";
import { MapModel } from "../model/MapModel";

/**
 * MapView(user-interface)(files responsible for rendering the UI 
 * elements and handling user interactions.)
      (define all the views)
        render geojson features
 */

/**
 * Class representing the view for the map.
 */
export class MapView {
  /**
   * Create a MapView instance.
   * @param {string} targetElement - The ID of the HTML element where the map will be rendered.
   */
  constructor(targetElement) {
    this.targetElement = targetElement;
    this.searchPopup = document.getElementById("search-popup");
    this.searchIcon = document.getElementById("search-icon");
    this.searchIcon.addEventListener(
      "click",
      this.toggleSearchPopup.bind(this)
    );
    // this.searchInput = searchInput;
    // this.searchButton = searchButton;
    this.searchButton = document.getElementById("searchButton");
    this.searchInput = document.getElementById("searchInput");
    // this.searchButton.addEventListener("click", this.searchPark.bind(this));
    this.tableView = document.getElementById("table-view");
    this.closeButton = document.getElementById("close-button");
    this.tableBody = this.tableView.querySelector("tbody");
    this.tableIcon = document.getElementById("table-icon");
    // Load more
    this.tableBody = document.getElementById("table-body");
    this.loadMoreButton = document.getElementById("load-more-button");
    this.bindEvents();
  }

  /**
   * Binds click and scroll events to the relevant DOM elements.
   */
  bindEvents() {
    this.tableIcon.addEventListener("click", () => this.handleTableIconClick());
    this.closeButton.addEventListener("click", () =>
      this.handleCloseButtonClick()
    );
    this.tableView.addEventListener("scroll", () =>
      this.handleTableViewScroll()
    );
  }

  bindDrawPolygon(handler) {
    const drawIcon = document.getElementById("draw-icon"); // Get the draw icon element
    drawIcon.addEventListener("click", handler); // Bind click event to the draw icon
  }

  /**
   * Handles the click event on the table icon.
   */
  handleTableIconClick() {
    this.tableView.style.display = "block";
    this.loadRecords();
  }

  /**
   * Handles the click event on the close button.
   */
  handleCloseButtonClick() {
    this.tableView.style.display = "none";
  }

  /**
   * Handles the scroll event on the table view.
   */
  handleTableViewScroll() {
    if (
      this.tableView.scrollTop + this.tableView.clientHeight >=
      this.tableView.scrollHeight
    ) {
      this.loadRecords();
    }
  }

  bindLoadMore(handler) {
    this.loadMoreButton.addEventListener("click", handler);
  }

  /**
   * Displays records in the table view.
   * @param {Array} records - An array of records.
   */
  displayRecords(records) {
    try {
      // Clear existing table rows
      this.tableBody.innerHTML = "";

      // Render each record in a table row
      records.forEach((record) => {
        const row = document.createElement("tr");

        // Iterate over the keys of the record object
        Object.keys(record).forEach((key) => {
          const cell = document.createElement("td");
          cell.textContent = record[key]; // Set cell content to the value of the current key
          row.appendChild(cell);
        });

        this.tableBody.appendChild(row);
      });
      this.highlightCurrentRowOnTable();
    } catch (error) {
      throw new Error(`Failed to display records`, error);
    }
  }

  /**
   * Append more records to the table view.
   * @param {Array} newRecords - An array of new records to append.
   */
  appendRecords(newRecords) {
    try {
      // Render each new record and append it to the table
      newRecords.forEach((record) => {
        const row = document.createElement("tr");

        // Iterate over the keys of the record object
        Object.keys(record).forEach((key) => {
          const cell = document.createElement("td");
          cell.textContent = record[key]; // Set cell content to the value of the current key
          row.appendChild(cell);
        });

        this.tableBody.appendChild(row);
      });
    } catch (error) {
      throw new Error(`Failed to append records`, error);
    }
  }

  // highlight current row
  highlightCurrentRowOnTable() {
    // Get all table rows
    const rows = this.tableBody.querySelectorAll("tr");

    // Add event listeners to each row
    rows.forEach((row) => {
      // Add event listener to handle mouse movement over the row
      row.addEventListener("mouseover", () => {
        // Remove highlighting from all rows
        rows.forEach((row) => {
          row.classList.remove("highlighted-row");
        });

        // Highlight the current row
        row.classList.add("highlighted-row");
      });

      // Add event listener to handle mouse leaving the row
      row.addEventListener("mouseleave", () => {
        // Remove highlighting from all rows
        rows.forEach((row) => {
          row.classList.remove("highlighted-row");
        });
      });
    });
  }

  /**
   * Loads records from the model.
   */
  loadRecords() {
    const event = new CustomEvent("loadMoreRecords");
    document.dispatchEvent(event);
  }

  /** --------------- **
   * Search for park
   */
  displayMap() {
    // Code to display the map using OpenLayers or any other mapping library
    // For example:
    // const map = new ol.Map({
    //   target: this.mapElement,
    //   layers: [...],
    //   view: new ol.View({...}),
    // });
  }

  getSearchInput() {
    return this.searchInput.value.trim();
  }

  bindSearchPark(handler) {
    this.searchButton.addEventListener("click", () => {
      const parkName = this.getSearchInput();
      handler(parkName);
    });
  }

  displayErrorMessage(message) {
    // Display error message to the user
    // For example:
    // alert(message);
  }

  zoomToPark(coordinates) {
    // Code to zoom to the specified park coordinates on the map
    // For example:
    // map.getView().setCenter(coordinates);
    // map.getView().setZoom(15);
  }
  // View: The view will display the map and search input interface.
  // It will also handle user interactions like clicking the search button.
  // open and close popup
  toggleSearchPopup() {
    this.searchPopup.classList.toggle("hidden");
    if (!this.searchPopup.classList.contains("hidden")) {
      this.searchInput.focus(); // Focus on the input field when the popup is opened
    }
  }

  zoomToPark(coordinates) {
    // FIXME: not working properly
    // map.getView().animate({ center: coordinates, zoom: 10 });
    console.log("zoomToPark>>coordinates: ", coordinates);
  }

  /**
   * Render the map with the provided map model.
   * @param {MapModel} mapModel - The map model containing map data.
   */
  renderMap(mapModel) {
    this.mapModel = mapModel; // Map model containing map data.
    /**
     * Target element for rendering the map.
     * @type {HTMLElement}
     */
    this.mapModel.map.setTarget(this.targetElement);

    // Register event listener for pointermove event on the map
    this.mapModel.map.on("pointermove", (event) => {
      const pixel = this.mapModel.map.getEventPixel(event.originalEvent);
      const feature = this.mapModel.map.forEachFeatureAtPixel(
        pixel,
        (feature) => feature
      );

      if (feature) {
        const name = feature.get("PARK_NAME"); // 'PARK_NAME' is the property containing the name of the polygon
        if (name) {
          const tooltip = document.getElementById("tooltip");
          tooltip.innerHTML = name;
          tooltip.style.left = `${event.originalEvent.clientX}px`;
          tooltip.style.top = `${event.originalEvent.clientY}px`;
          tooltip.style.display = "block";
        }
      } else {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      }
    });
  }

  /** FIXME: not working properly
   *
   * Popup with options for new feature e.g delete feature
   * @param {*} feature
   */
  renderPopup(feature) {
    console.log("feature: ", feature);
    const popup = document.createElement("div");
    popup.innerHTML = "Delete Feature";
    popup.className = "popup";

    popup.addEventListener("click", () => {
      // Call the controller method to delete the feature
      this.controller.handleDeleteFeature(feature);
    });

    // Add popup to the DOM or map container
    // You can use your preferred method to display the popup
    // For example, you can append it to the map container
    // this.mapElement.appendChild(popup);
    // this.targetElement.appendChild(popup); //FIXME: Uncaught TypeError: this.targetElement.appendChild is not a function
    console.log("popup: ", popup);
  }

  /**
   * Render geojson data with the provided map model.
   * @param {MapModel} mapModel - The map model containing map data.
   */
  renderGeoJSONFeatures(mapModel) {
    try {
      const vectorLayer = new VectorLayer({
        source: mapModel.vectorSource,
        // TODO: move styling to
        style: new Style({
          fill: new Fill({
            color: "rgb(86,160,192)",
          }),
          stroke: new Stroke({
            color: "white",
          }),
        }),
        // style: "vector-layer-style", // FIXME: not working
      });

      this.mapModel.map.addLayer(vectorLayer);

      const modify = new Modify({
        source: this.mapModel.vectorSource,
      });

      /**
       * Modify existing features
       */
      document.getElementById("edit-icon").addEventListener("click", () => {
        // Activate editing functionality
        this.mapModel.map.addInteraction(modify);
      });

      // Add Link interaction to the map
      this.mapModel.map.addInteraction(new Link());

      /**
       * Snap features
       */
      this.mapModel.map.addInteraction(
        new Snap({ source: this.mapModel.vectorSource })
      );

      // With the draw, modify, and snap interactions all active,
      // we can edit data while maintaining topology.

      /**
       * Download features
       */
      const clear = document.getElementById("clear");
      clear.addEventListener("click", function () {
        mapModel.vectorSource.clear();
      });

      // GeoJSON format To serialize our feature data for download
      const format = new GeoJSON({ featureProjection: "EPSG:3857" });
      const download = document.getElementById("download");
      this.mapModel.vectorSource.on("change", function () {
        const features = mapModel.vectorSource.getFeatures();
        const json = format.writeFeatures(features);
        download.href =
          "data:application/json;charset=utf-8," + encodeURIComponent(json);
      });
    } catch (error) {
      throw new Error();
    }
  }
}
