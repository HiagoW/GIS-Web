import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import { StadiaMaps } from 'ol/source';
import OSM from 'ol/source/OSM';
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