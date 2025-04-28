import './style.css';
import {Feature, Graticule, Image, Map, View} from 'ol';
import { Point } from 'ol/geom';
import DragBox from 'ol/interaction/DragBox.js';
import Draw from 'ol/interaction/Draw.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import Heatmap from 'ol/layer/Heatmap';
import VectorLayer from 'ol/layer/Vector';
import { ImageStatic, ImageWMS, StadiaMaps, TileWMS, Vector } from 'ol/source';
import ImageSource from 'ol/source/Image';
import Static from 'ol/source/ImageStatic';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import proj4 from 'proj4';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

//Define a projection
//proj4.defs("EPSG:32643","+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs +type=crs");

// View
const myView = new View({
  projection: 'EPSG:4326',
  center: [-48.54753902044877, -26.208937930555944], //[-5412477.071980993, -3034238.308836612],
  zoom: 12
});

//Layer
// const myLayer = new TileLayer({
//   source: new OSM()
// });

// Steman
const waterSteman = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_watercolor',
    // apiKey: 'OPTIONAL'
  }),
});

const labelsSteman = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_terrain_labels',
    // apiKey: 'OPTIONAL'
  }),
});

const map = new Map({
  target: 'map',
  layers: [waterSteman, labelsSteman],
  view: myView
});

window.map = map;

// Image
var imageSource = new ImageStatic({
  attribution:'<b>Snapchat bitmoji</b>',
  url: 'aa.png',
  imageExtent: [-48.55756220718386, -26.230828495894027, -48.54328858168997, -26.189884579339715]
})

var imageLayer = new ImageLayer({
  source:imageSource
})

map.addLayer(imageLayer)

// Feature
var feature = new Feature({
  geometry: new Point([-48.630182304878325, -26.24580610488032])
})

var style = new Style({
  image: new Icon({
    src: 'aa.png',
    scale: 0.3
  })
})

feature.setStyle(style)

var vectorSource = new Vector({
  features: [feature]
})

var vectorLayer = new VectorLayer({
  source: vectorSource
})

map.addLayer(vectorLayer)

// WMS Layer

// Tile - Progressive load
var tileSource = new TileWMS({
  url: 'https://geoservicos.inde.gov.br/geoserver/MMA/ows?SERVICE=WMS&',
  params: { 'LAYERS': 'cnuc_04_2024', 'TILED': true },
  serverType: 'geoserver',
  crossOrigin: 'anonymous'
})

var tileLayer = new TileLayer({
  source: tileSource
})

map.addLayer(tileLayer)

// Image - Load all at once

var imageSource = new ImageWMS({
  url: 'https://www.snirh.gov.br/arcgis/services/INDE/Camadas/MapServer/WMSServer',
  params: { 'LAYERS': '8' },
  serverType: 'geoserver',
  crossOrigin: 'anonymous'
})

var imageLayer = new ImageLayer({
  source: imageSource
})

map.addLayer(imageLayer)

//GeoJSON

// Vector source
var vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: 'geom.geojson', //It can also be an external URL
  // features: (new GeoJSON().readFeatures(inputJSON)) // if variable
})

// Vector layer
var vectorLayer = new VectorLayer({
  source: vectorSource,
  // style: new Style({
  //   stroke: new Stroke({
  //     color: 'rgba(255,0,0,0.7)', //It can also be #ff0000
  //     width: 5,
  //     lineDash: [5,10]
  //   }),
  //   fill: new Fill({
  //     color: 'rgba(142,226,136,0.6)'
  //   })
  // })
  style : (feature) => {
    return new Style({
      stroke: new Stroke({
        color: feature.getProperties().prop === 'a' ? 
        'rgba(255,0,0,0.7)' : 'rgba(0,255,0,0.7)', //It can also be #ff0000
        width: 5,
        lineDash: [5,10]
      }),
      fill: new Fill({
        color: feature.getProperties().prop === 'a' ?
        'rgba(142,226,136,0.6)' : 'rgba(0,0,0,0.3)'
      })
    })
  }
})

map.addLayer(vectorLayer)

// Heatmap
var heatmapsource = new VectorSource({
  format: new GeoJSON(),
  url:'police.geojson'
})

var heatmapLayer = new Heatmap({
  source: heatmapsource
})

map.addLayer(heatmapLayer)

// Graticule
var graticule = new Graticule({
  map: map,
  showLabels: true
})

// -------------------- Intercations ------------------
var dragBox = new DragBox({})
dragBox.on('boxstart', (e) => {
  console.log("Box Ev")
})

dragBox.on('boxend', (e) => {
  map.getView().fit(dragBox.getGeometry().getExtent(), map.getSize())
})
map.addInteraction(dragBox)

//Drag and Drop
var dragSource = new VectorSource()
var dragLayer = new VectorLayer({
  source: dragSource
})
map.addLayer(dragLayer)

var dragDrop = new DragAndDrop({
  formatConstructors: [GeoJSON],
  source: dragSource
})

dragDrop.on('addfeatures', (e) => {
  console.log(e)
})
//map.addInteraction(dragDrop)

//Draw
var drawSource = new VectorSource();
var drawLayer = new VectorLayer({
  source: drawSource
})
map.addLayer(drawLayer)

var draw = new Draw({
  source: drawSource,
  type: 'Polygon'
})
draw.on('drawend', (e) => {
  drawSource.clear()
})
map.addInteraction(draw)