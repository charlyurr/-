import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Draw from "ol/interaction/Draw"; // import the Draw interaction

/**
 * MapModel[data](application's data and business logic)
	(define all the data handling)
		-- fetch
          local
          remote
		-- parse
		-- get specific rows or columns
	handle GeoJSON data
 */
export class MapModel {
  constructor() {
    // Initialize model properties
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(), // loading
        }),
      ],
      view: new View({
        center: [18.511463450922804, -33.94418730405998],
        zoom: 12,
        projection: "EPSG:4326",
        extent: [-2000, -2000, 2000, 2000],
        rotation: 0,
      }),
    });
    // Get data
    this.vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: "../../assets/Parks.geojson",
    });
    this.data = []; // Store fetched data
    this.pageSize = 25; // Maximum records per page
    this.currentPage = 1; // Current page number
    this.onFeatureDrawn = null; // Callback function when a feature is drawn
  }

  /**
   * Draw polygon
   */
  drawPolygon() {
    const draw = new Draw({
      type: "Polygon",
      source: this.vectorSource,
    });

    draw.on("drawend", (event) => {
      // const drawnFeature = event.feature;
      // //this.view.renderPopup(drawnFeature); // DOnt access the view directly, trigger an event as below
      // this.handleDrawnFeature(drawnFeature);
      if (this.onFeatureDrawn) {
        this.onFeatureDrawn(event.feature); // Instead of directly interacting with the view, trigger an event
      }
    });

    this.map.addInteraction(draw);
  }

  /**
   * Delete feature
   */
  deleteFeature(feature) {
    // Delete the specified feature from the vector source
    this.vectorSource.removeFeature(feature);
  }

  /**
   * Fetches data
   */
  async fetchData() {
    try {
      // Load features from the vector source
      const features = await new Promise((resolve, reject) => {
        this.vectorSource.once("change", (event) => {
          if (this.vectorSource.getState() === "ready") {
            resolve(this.vectorSource.getFeatures());
          } else {
            reject("Error loading features");
          }
        });
      });

      const result = features.map((feature) => ({
        "Park Name": feature.values_.PARK_NAME,
        "Park Type": feature.values_.LU_PARK_TYPE,
        "Access Address": feature.values_.ACS_ADR,
        "Play Equip": feature.values_.PLAY_EQPM,
        "Sub Area": feature.values_.SUB_AREA,
      }));

      this.data.push(result);

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return empty array if an error occurs
    }
  }

  /**
   * Retrieves a subset of records based on the current page and page size.
   * @returns {Array} An array of records.
   */
  getRecords() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    console.log("this.data", this.data); // available
    return this.data.slice(startIndex, endIndex);
  }

  /**
   * Loads more records by incrementing the current page.
   */
  loadMoreRecords() {
    this.currentPage++;
    // Optionally, fetch more data from the server and append it to this.data
    // Example: Fetch additional data using fetch API or any other method
  }

  // the is for the search logic, it may not work
  getView() {
    return this.map.getView();
  }

  async searchParkByName(name) {
    try {
      // Load features from the vector source
      const features = await new Promise((resolve, reject) => {
        this.vectorSource.once("change", (event) => {
          if (this.vectorSource.getState() === "ready") {
            resolve(this.vectorSource.getFeatures());
          } else {
            reject("Error loading features");
          }
        });
      });

      // Search for the park by name
      const park = features.find(
        (feature) => feature.getProperties().PARK_NAME === name
      );

      return park ? park.getGeometry().getCoordinates() : null;
    } catch (error) {
      console.error("Error searching for park:", error);
      return null;
    }
  }
}
