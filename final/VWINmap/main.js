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
  const sites = await response.json();
  console.log('serverData: ', sites);
  return sites;
}

const marker = L.marker([35.616988, -82.565401], {
    icon: getIcon('teal', '📚'),  // here is the place where you override the default marker with your own custom style
}).addTo(map);

// function getIcon(color, icon) {
//     return L.divIcon({
//         html: `
//             <div style="background-color: ${color}" class="map-marker">
//                 ${icon}
//             </div>
//         `,
//         iconSize: [50, 50],
//         iconAnchor: [25, 25],
//     });
// }

async function generateMarkers() {
  const sites = await getChartData();

  // Add markers for each site
  for (const site of sites) {
    // Create marker:
    const marker = L.marker([site.LAT, site.LON], {
    icon: getIcon(site.color, site.icon),  // here is the place where you override the default marker with your own custom style
}).addTo(map);

    marker.bindPopup(getPopupTemplate(site));
    marker.on('click', function (e) {
      detailsElement.innerHTML = getPanelTemplate(site);
    });
  }

  detailsElement.innerHTML = '';
}

function getPopupTemplate(site) {
  return `
        <div>
            ${site.icon} ${site.Name}<br>
        </div>
    `;
}

function getPanelTemplate(site) {
  return `
      <div>
          <div class="emoji">${site.icon}</div>
          <h3>${site.Name}</h3>
          <p class="tag">
            ${site.County_Code.replace('_', ' ')}
          </p>
          <p>${site.Description}</p>
          <img src=${site.Image}/>
          <p>
            <strong>Coordinates:</strong> ${site.LAT.toFixed(4)}, ${site.LON.toFixed(4)}
          </p>
      </div>
      `;
}

generateMarkers();
