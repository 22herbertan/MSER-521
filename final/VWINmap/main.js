// initialize the map:
const map = L.map('map');
map.setView([35.7362825, -82.5654144], 9);

// add the tile layer to the map:
const currentTileLayer = L.tileLayer(outdoors, {
  attribution: '&copy; Open Street Map contributors',
}).addTo(map);

// retrieve coordinates from Google Sheets:
const detailsElement = document.querySelector('#details');
async function getChartData() {
  const sheetName = 'VWINCoordinates';
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbyKNAa0glXuL_enuIUsGIzQ_JzcxsCIvzGJsaE0z-MDJO2f-0PRYTmiOnGX47b448vV/exec?sheet=${sheetName}`
  );
  const sites = await response.json();
  console.log('serverData: ', sites);
  return sites;
}

function getIcon() {
    return L.divIcon({
        html: `
            <div style="background-color: white" class="map-marker">
                <img class="customIcon" src="water-icon.png">
            </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [25, 25],
    });
}

async function generateMarkers() {
  const sites = await getChartData();

  // Add markers for each site
  for (const site of sites) {
    // Create marker:
    const marker = L.marker([site.LAT, site.LON], {
    icon: getIcon(),  // here is the place where you override the default marker with your own custom style
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
            <b>Site  ${site.VWIN_Site}</b>: ${site.Name}<br>
        </div>
    `;
}

function getPanelTemplate(site) {
  return `
      <div>
          <h3>${site.VWIN_Site}:  ${site.Name}</h3>
          <p class="tag">
            ${site.County.replace('_', ' ')} County
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
