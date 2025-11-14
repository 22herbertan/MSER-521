const options = {
  chart: {
    type: 'bar',
  },
  plotOptions: {
    bar: {
        horizontal: true,
    },
  },
  colors: ['#546E7A', '#b4d9e2ff'],
  title: {
    text:"Snow days"
  },
  series: [{ name: 'Snow Days 2024', data: [4, 7, 3, 1] }, { name: 'Snow Days 2025', data: [3, 1, 9, 2] }
],
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr'] },
};

// code that actually creates the chart:
const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();

// Documentation: https://apexcharts.com/javascript-chart-demos/bar-charts/basic/
