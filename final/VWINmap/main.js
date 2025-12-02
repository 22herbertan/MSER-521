// initialize the map:
const map = L.map('map');
map.setView([35.5362825, -82.5654144], 10);

// add the tile layer to the map:
const currentTileLayer = L.tileLayer(esriLightGrayBase, {
  attribution: '&copy; Open Street Map contributors',
}).addTo(map);

// retrieve coordinates from Google Sheets:
const detailsElement = document.querySelector('#details');
async function getChartData() {
  const sheetName = 'VWINCoordinates';
  const response = await fetch(
    `https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyKNAa0glXuL_enuIUsGIzQ_JzcxsCIvzGJsaE0z-MDJO2f-0PRYTmiOnGX47b448vV/exec?sheet=${sheetName}`
  );
  const landmarks = await response.json();
  console.log('serverData: ', landmarks);
  return landmarks;
}

const marker = L.marker([35.616988, -82.565401], {
    icon: getIcon('teal', '📚'),  // here is the place where you override the default marker with your own custom style
}).addTo(map);

function getIcon(color, icon) {
    return L.divIcon({
        html: `
            <div style="background-color: ${color}" class="map-marker">
                ${icon}
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
    });
}

async function generateMarkers() {
  const landmarks = await getChartData();

  // Add markers for each landmark
  for (const landmark of landmarks) {
    // Create marker:
    const marker = L.marker([landmark.lat, landmark.lng], {
    icon: getIcon(landmark.color, landmark.icon),  // here is the place where you override the default marker with your own custom style
}).addTo(map);

    marker.bindPopup(getPopupTemplate(landmark));
    marker.on('click', function (e) {
      detailsElement.innerHTML = getPanelTemplate(landmark);
    });
  }

  detailsElement.innerHTML = '';
}

function getPopupTemplate(landmark) {
  return `
        <div>
            ${landmark.icon} ${landmark.name}<br>
        </div>
    `;
}

function getPanelTemplate(landmark) {
  return `
      <div>
          <div class="emoji">${landmark.icon}</div>
          <h3>${landmark.name}</h3>
          <p class="tag">
            ${landmark.category.replace('_', ' ')}
          </p>
          <p>${landmark.description}</p>
          <img src=${landmark.online_image}/>
          <p>
            <strong>Coordinates:</strong> ${landmark.lat.toFixed(4)}, ${landmark.lng.toFixed(4)}
          </p>
      </div>
      `;
}

generateMarkers();
