var map = L.map('map').setView([-26.23, -48.59], 13);

//https://leaflet-extras.github.io/leaflet-providers/preview/

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([51.5, -0.09], {
//     title: 'Marker title',
//     draggable: true
// }).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

// create a red polygon from an array of LatLng points
var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];

var polygon = L.polygon(latlngs, {color: 'red',fillColor:'yellow'}).addTo(map);

// zoom the map to the polygon
// map.fitBounds(polygon.getBounds());

var dragMarker = L.marker([-21.5, -75.09], {
    title: 'This is random location',
    opacity: 0.5,
    draggable: true
});

dragMarker.addTo(map);

dragMarker.on('dragstart', function(evt) {
    console.log('started dragging');
    console.log(evt);
})

dragMarker.on('dragend', function(evt) {
    console.log('finished dragging');
    console.log(evt);
})

var geoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "test1"
      },
      "geometry": {
        "coordinates": [
          -48.59184686563725,
          -26.237066038793436
        ],
        "type": "Point"
      },
      "id": 0
    },
    {
      "type": "Feature",
      "properties": {
        "name": "test2"
      },
      "geometry": {
        "coordinates": [
          -48.59451925919498,
          -26.30052910047091
        ],
        "type": "Point"
      }
    }
  ]
}

L.geoJSON(geoJSON).addTo(map);

var myIcon = L.icon({
    iconUrl: 'https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_960_720.png',
    iconSize: [60, 30],
    iconAnchor: [0, 0],
    popupAnchor: [30, 0],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var marker = L.marker([-26.31052910047091, -48.57451925919498], {icon: myIcon}).addTo(map);

marker.bindPopup('<h1>This is title</h1><br><p>This is a custom icon marker.</p>');
marker.bindTooltip('This is a tooltip');