import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

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
  }

  /**
   * Fetches data
   */
  async fetchData() {
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
    // console.log("features: ", features);
    return (this.data = features);
  }

  /**
   * Retrieves a subset of records based on the current page and page size.
   * @returns {Array} An array of records.
   */
  getRecords() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
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

// export class MapModel {
//   constructor() {
//     this.map = new Map({
//       layers: [
//         new TileLayer({
//           source: new OSM(), // loading
//         }),
//       ],
//       view: new View({
//         center: [18.511463450922804, -33.94418730405998],
//         zoom: 12,
//         projection: "EPSG:4326",
//         extent: [-2000, -2000, 2000, 2000],
//         rotation: 0,
//       }),
//     });
//     // Get data
//     this.vectorSource = new VectorSource({
//       format: new GeoJSON(),
//       url: "../../assets/Parks.geojson",
//     });
//   }

//   // Get park coodinates
//   // Model: The model will contain the park data and provide methods to search for parks by name.
//   // getParkCoordinates(parkName) {
//   //   // Function to retrieve park coordinates by name from the model
//   //   // You should implement this method according to your data source
//   //   // For demonstration purposes, let's assume we have a hard-coded dataset
//   //   const parkData = {
//   //     "Central Park": [-73.9708, 40.7851],
//   //     "Golden Gate Park": [-122.4757, 37.7694],
//   //     "Yosemite National Park": [-119.5383, 37.8651],
//   //   };

//   //   return parkData[parkName];
//   // }
//   searchParkByName(name) {
//     console.log("this.vectorSource: ", this.vectorSource);
//     console.log("name: ", name);
//     const park = this.vectorSource.features.find(
//       (park) => park.properties.PARK_NAME === name
//     );
//     return park ? park.geometry.coordinates : null;
//   }
// }
