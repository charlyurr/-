import { DragAndDropModel } from "../model/DragAndDropModel";
import { DragAndDropView } from "../view/DragAndDropView";
import GeoJSON from "ol/format/GeoJSON";
import DragAndDrop from "ol/interaction/DragAndDrop";

export class DragAndDropController {
  constructor(targetElement) {
    this.model = new DragAndDropModel();
    this.view = new DragAndDropView(targetElement);
    this.init();
  }

  init() {
    this.view.renderMap(this.model.map);

    const source = this.model.getSource();

    // Add Drag and Drop interaction
    this.model.map.addInteraction(
      new DragAndDrop({
        source: source,
        formatConstructors: [GeoJSON],
      })
    );
  }
}

// /**
//  * Controller for Drag and Drop functionality.
//  */
// export class DragAndDropController {
//   constructor(dragDropModel, dragDropView) {
//     this.dragDropModel = dragDropModel;
//     this.dragDropView = dragDropView;
//   }

//   // Add methods for controlling drag and drop interactions
//   // Method to initialize the controller
//   async init() {
//     // console.log("getting here 1");
//     try {
//       // console.log("getting here 2");
//       // // Fetch GeoJSON data
//       // const url = "../../assets/Parks.geojson";
//       // // console.log("getting here 3");
//       // // console.log(`url: ${url}`);
//       // const geojsonData = await this.model.fetchGeoJSONData(url.toString());
//       // // console.log("getting here 4");
//       // // console.log("geojsonData");
//       this.dragDropModel;

//       // Render GeoJSON data on the map
//       this.dragDropView.dragAndDrop();
//     } catch (error) {
//       //   console.error(error); //SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
//       throw error;
//     }
//   }
// }
