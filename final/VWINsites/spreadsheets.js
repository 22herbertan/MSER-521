// retrieve data from Google Sheets:
const detailsElement = document.querySelector('#details');
async function getChartData() {
  const sheetName = 'BuncombeCountyVWINdata';
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbwwIq3vyxuznUsWDZ7IaUFjJGpXzi57HFKXOBfEIKWnlrTMgcFRXjuG1QCJ-O_eae2LKA/exec?sheet=${sheetName}`
  );
  const sites = await response.json();
  console.log('serverData: ', sites);
  return sites;
}