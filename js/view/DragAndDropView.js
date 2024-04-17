// // https://openlayers.org/workshop/en/vector/drag-n-drop.html

export class DragAndDropView {
  constructor(targetElement) {
    this.targetElement = targetElement;
  }

  renderMap(map) {
    map.setTarget(this.targetElement);
  }
}

// // Import the drag and drop interaction
// import DragAndDrop from "ol/interaction/DragAndDrop";
// import { Map } from "ol";
// import VectorSource from "ol/source/Vector";
// import VectorLayer from "ol/layer/Vector";
// import GeoJSON from "ol/format/GeoJSON";

// /**
//  * View for Drag and Drop functionality.
//  */

// export class DragAndDropView {
//   // constructor() {
//   //   // Initialize drag and drop related UI components
//   // }

//   // Add methods for rendering drag and drop UI if needed

//   map = new Map({
//     // target: "map", // map container
//     // layers: [
//     //   new TileLayer({
//     //     source: new OSM(),
//     //   }),
//     // ],
//     // view: new View({
//     //   // Zoom to Capetown
//     //   center: [18.511463450922804, -33.94418730405998], // longitude and latitude
//     //   zoom: 12,
//     //   projection: "EPSG:4326", // WGS 84 projection
//     //   extent: [-2000, -2000, 2000, 2000], // Restrict viewable area
//     //   rotation: 0, // No rotation
//     //   // resolutions: , // Example resolutions
//     //   // constrainRotation: false, // Allow rotation
//     //   // maxZoom: 10,
//     //   // minZoom: 3
//     // }),
//   });

//   // Method to render GeoJSON features on the map
//   dragAndDrop() {
//     // console.log("geojsonData :", geojsonData);
//     // const vectorLayer = new VectorLayer({
//     //   source: new VectorSource({
//     //     format: new GeoJSON(),
//     //     // url: geojsonData, // link to data
//     //     url: "../../assets/Parks.geojson", // link to data
//     //   }),
//     // });

//     // this.map.addLayer(vectorLayer);

//     // // And now we can add a new link interaction to our map:
//     // // This means that the map view will stay where we left it, and not reset when we reload
//     // this.map.addInteraction(new Link());

//     // Next, we'll create a vector source with no initial data. Instead of loading data from a remote location as in the previous example, this source will store features that the user drags and drops onto the map.
//     const source = new VectorSource();

//     // Now, remove the old layers list from the map, create a new
//     // layer with our empty vector source, and add it to the map.
//     const layer = new VectorLayer({
//       source: source,
//     });
//     this.map.addLayer(layer);

//     // Finally, we'll create a drag and drop interaction, configure it to
//     // work with our vector source, and add it to the map:
//     this.map.addInteraction(
//       new DragAndDrop({
//         source: source,
//         formatConstructors: [GeoJSON],
//       })
//     );
//   }
// }
