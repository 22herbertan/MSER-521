// take a look at the tilesets.js file to see the available tilesets:

const rhoadesRobinsonHall = [35.61572, -82.56562];

const map = L.map('map');
map.setView(rhoadesRobinsonHall, 20); // set zoom view & zoom level

const currentTileLayer = L.tileLayer(outdoors, { // outdoors = basemap
  attribution: '&copy; Open Street Map contributors',
}).addTo(map);

// add a marker to the map:
L.marker(rhoadesRobinsonHall).addTo(map).bindPopup('Rhoades Robinson Hall');
