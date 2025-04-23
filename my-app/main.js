import './style.css';
import {Feature, Image, Map, View} from 'ol';
import { Point } from 'ol/geom';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { ImageStatic, ImageWMS, StadiaMaps, TileWMS, Vector } from 'ol/source';
import ImageSource from 'ol/source/Image';
import Static from 'ol/source/ImageStatic';
import OSM from 'ol/source/OSM';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import proj4 from 'proj4';

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