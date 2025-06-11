var map = L.map('map').setView([51.505, -0.09], 13);

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