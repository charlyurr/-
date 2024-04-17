import { Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";

import { useGeographic } from "ol/proj";

// Call useGeographic() once before creating the map
useGeographic();

export class DragAndDropModel {
  constructor() {
    this.map = new Map({
      layers: [
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: [18.511463450922804, -33.94418730405998],
        zoom: 2,
      }),
    });
  }

  getSource() {
    return this.map.getLayers().item(0).getSource();
  }
}

// import { Map } from "ol";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import DragAndDrop from "ol/interaction/DragAndDrop";
// import { GeoJSON } from "ol/format";

// export class DragAndDropModel {
//   constructor() {
//     this.map = new Map({
//       // Configure your map options here
//     });

//     this.source = new VectorSource();
//     this.layer = new VectorLayer({
//       source: this.source,
//     });
//     this.map.addLayer(this.layer);

//     this.setupDragAndDrop();
//   }

//   setupDragAndDrop() {
//     const dragAndDropInteraction = new DragAndDrop({
//       source: this.source,
//       formatConstructors: [GeoJSON],
//     });
//     this.map.addInteraction(dragAndDropInteraction);
//   }
// }

// /**
//  * Model for Drag and Drop functionality.
//  */
// import { VectorLayer } from "ol/layer";
// import { VectorSource } from "ol/source";

// export class RenderGeoJSONModel {
//   // Initialize data related to drag and drop
//   constructor(map, geojsonData) {
//     const source = new VectorSource({
//       features: geojsonData,
//     });

//     // renderGeoJSON() {
//     // Methods for handling drag and drop logic
//     const layer = new VectorLayer({
//       source: source,
//     });

//     map.addLayer(layer);
//     // }
//   }
// }
