let globalTeller = 0;
let globalCellCounter = 0;

let globalRegion = '';
let globalSubRegion = '';
let globalCountryName = '';
let globalRegionCounter = 0;
let globalSubRegionCounter = 0;
let globalCountryCounter = 0;
let globalWorldPopulation = 0;
let showGraph = false;
let chart;

const calculatePopulationSubRegion = function (jsonObject) {
  globalSubRegionCounter = 0;
  for (let land of jsonObject) {
    globalSubRegionCounter = globalSubRegionCounter + land.population;
  }
  console.log(globalSubRegionCounter);
};

const calculatePopulationRegion = function (jsonObject, region) {
  globalRegionCounter = 0;
  for (let land of jsonObject) {
    globalRegionCounter = globalRegionCounter + land.population;
  }
  console.log(globalRegionCounter);
  showGraph = true;
  if (showGraph == true) {
    drawChart();
  }
};

const showCounter = function () {
  let htmlCounter = document.querySelector('.js-counter');
  htmlCounter.innerHTML = `Countries: <b>${globalCellCounter}</b>`;
};

const showFilteredLanden = function (jsonObject) {
  try {
    globalCellCounter = 0;
    let htmlLand = document.querySelector('.js-canvas');
    let htmlCell = document.querySelector('.js-cell');

    // console.log(test);
    let html = '';
    let htmlPng = '';
    let teller = 1;

    // Sort alfabetisch
    jsonObject.sort(function (a, b) {
      return a.ccn3 - b.ccn3;
    });

    for (let land of jsonObject) {
      if (land.subregion == null) {
        land.subregion = 'No subregion';
      }
      html += `<button class="c-btn-cell"><div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"><p class="c-cellText--sub">${land.subregion}</p></div></button>`;
      htmlPng = `url('${land.flags.png}')">`;
      globalCellCounter = globalCellCounter + 1;
      teller += 1;
    }
    htmlLand.innerHTML = html;
    globalTeller = 0;
    listenToClick();
    showCounter();

    //Filters aanpassen
    let htmlFilters = document.querySelectorAll('.js-filter');
    for (let htmlFilter of htmlFilters) {
      htmlFilter.classList.remove('u-is-selected');
    }
  } catch (err) {
    console.error(err);
  }
};

const showError = function (message) {
  globalTeller = globalTeller + 1;
  if (globalTeller == 3) {
    alert('Kan niets vinden');
    globalTeller = 0;
  }
};

const showFilterChange = function (filter) {
  let htmlFilters = document.querySelectorAll('.js-filter');
  for (let htmlFilter of htmlFilters) {
    htmlFilter.classList.remove('u-is-selected');
    if (htmlFilter.getAttribute('filter') == filter) {
      htmlFilter.classList.add('u-is-selected');
    }
  }
};
const showFilteredLandenByContinent = function (jsonObject) {
  try {
    globalCellCounter = 0;
    let htmlLand = document.querySelector('.js-canvas');
    let htmlCell = document.querySelector('.js-cell');
    let html = '';
    let htmlPng = '';
    let teller = 1;

    // Sort alfabetisch
    jsonObject.sort(function (a, b) {
      return a.ccn3 - b.ccn3;
    });

    for (let land of jsonObject) {
      if (land.subregion == null) {
        land.subregion = 'No subregion';
      }
      html += `<button class="c-btn-cell"><div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"><p class="c-cellText--sub">${land.subregion}</p></div></button>`;
      htmlPng = `url('${land.flags.png}')">`;
      teller += 1;
      globalCellCounter = globalCellCounter + 1;
    }
    htmlLand.innerHTML = html;
    listenToClick();
    showCounter();
    //Talen ophalen
    for (const [key, value] of Object.entries(jsonObject[25].languages)) {
      // console.log(value);
    }
  } catch (err) {
    console.error(err);
  }
};

const showLand = function (jsonObject) {
  if (jsonObject[0].subregion != null) {
    getPopulationSubRegion(jsonObject[0].subregion);
  }
  getPopulationRegion(jsonObject[0].region);
  htmlPopup = document.querySelector('.js-popup');
  htmlPopupContent = document.querySelector('.js-popup-content');
  htmlPopup.style.display = 'flex';
  window.setTimeout(function () {
    htmlPopupContent.style.opacity = 1;
    htmlPopupContent.style.transform = 'scale(1)';
  }, 100);
  let html = '';
  let languages = '';
  let currencies = '';

  if (jsonObject[0].languages == null) {
    languages = 'No languages found';
  } else {
    for (const [key, value] of Object.entries(jsonObject[0].languages)) {
      languages += `${value} / `;
      // console.log(languages);
    }
  }
  if (jsonObject[0].currencies == null) {
    currencies = 'No currencies found';
  } else {
    for (const [key, value] of Object.entries(jsonObject[0].currencies)) {
      // console.log(value);
      currencies += `${value.name} (${value.symbol}) `;
    }
  }

  globalCountryName = jsonObject[0].name.common;
  globalRegion = jsonObject[0].region;
  globalSubRegion = jsonObject[0].subregion;

  // globalRegionCounter = 0;
  // globalSubRegionCounter = 0;
  globalCountryCounter = jsonObject[0].population;

  var h = window.innerWidth;
  if (h >= 1200) {
    console.log('GROOOOOOOOOOOOOOOOT');
    html += `<div class="c-popupTitle u-x-span-2 c-content"><div class="c-line-title"></div><p class="c-land-name"><b>${jsonObject[0].name.common}</b></p><div class="c-line-title"></div></div>`;
    if (jsonObject[0].capital == null) {
      jsonObject[0].capital = 'No capital';
    }
    html += `<div class="c-content-cell"><div class="c-line-right"></div><p class="u-textParagraphStart">Capital: <b>${jsonObject[0].capital}</b></p></div>`;
    html += `<div class="c-content-cell u-y-span-5 js-chartText"><canvas class="myChart"></canvas></div></div>`;
    html += `<div class="c-content-cell"><div class="c-line-right"></div><p class="u-textParagraphStart">Population: <b>${new Intl.NumberFormat(
      'de-DE'
    ).format(jsonObject[0].population)}</b></p></div>`;
    // html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell u-y-span-2"><div class="c-line-right"></div><p class="u-textParagraphStart">Languages: <b>${languages}</b></p></div>`;
    // html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell"><div class="c-line-right"></div><p class="u-textParagraphStart">Currencies: <b>${currencies}</b></p></div>`;

    html += `<span class="material-icons c-close js-close">close</span>`;
  } else {
    console.log('klein');
    html += `<div class="u-x-span-2"><p class="c-land-name"><b>${jsonObject[0].name.common}</b></p></div>`;
    if (jsonObject[0].capital == null) {
      jsonObject[0].capital = 'No capital';
    }
    html += `<div class="c-content-cell"><p class="u-textParagraphStart">Capital: <b>${jsonObject[0].capital}</b></p></div>`;
    html += `<div class="c-content-cell u-end"><p class="u-textParagraphEnd">Population: <b>${new Intl.NumberFormat(
      'de-DE'
    ).format(jsonObject[0].population)}</b></p></div>`;
    // html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell"><p class="u-textParagraphStart">Languages: <b>${languages}</b></p></div>`;
    // html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell u-end"><p class="u-textParagraphEnd">Currencies: <b>${currencies}</b></p></div>`;
    html += `<div class="c-content-cell u-justify-center u-x-span-2 js-chartText"><canvas class="myChart"></canvas></div></div>`;

    html += `<span class="material-icons c-close js-close">close</span>`;
  }

  htmlPopupContent.innerHTML = html;

  var p = document.querySelectorAll('.u-textParagraphStart');
  var l = document.querySelectorAll('.c-line-right');
  for (let i = 0; i < p.length; i++) {
    console.log(p[i].offsetHeight);
    for (let j = 0; j < l.length; j++) {
      if (p[i].offsetHeight > 19) {
        l[i].style.height = `${p[i].offsetHeight}px`;
      }
      if (p[i].offsetHeight > 39) {
        l[i].style.height = `${p[i].offsetHeight}px`;
      }

      if (p[i].offsetHeight > 59) {
        l[i].style.height = `${p[i].offsetHeight}px`;
      }
    }
  }

  // if (document.querySelector('.test').textContent.length > 33) {
  //   var test = document.querySelectorAll('.c-line-right');
  //   for (let i = 0; i < test.length; i++) {
  //     test[i].style.height = '2rem';
  //   }
  // }

  listenToClose();
  // google.charts.load('current', { packages: ['corechart', 'bar'] });
  // google.charts.setOnLoadCallback(drawBasic);
};

const showData = function (jsonObject) {
  try {
    let htmlLand = document.querySelector('.js-canvas');
    let htmlCell = document.querySelector('.js-cell');
    // console.log(jsonObject[2].languages);
    let test = jsonObject[2].languages;
    // console.log(test);
    let html = '';
    let htmlPng = '';
    let teller = 1;

    // Sort alfabetisch
    jsonObject.sort(function (a, b) {
      return a.ccn3 - b.ccn3;
    });

    for (let land of jsonObject) {
      if (land.subregion == null) {
        land.subregion = 'No subregion';
      }
      html += `<button class="c-btn-cell"><div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"><p class="c-cellText--sub">${land.subregion}</p></div></button>`;
      htmlPng = `url('${land.flags.png}')">`;
      globalCellCounter = globalCellCounter + 1;
      teller += 1;
      globalWorldPopulation = globalWorldPopulation + land.population;
    }
    console.log(globalWorldPopulation);
    htmlLand.innerHTML = html;
    listenToClick();
    showCounter();
    //Talen ophalen
    for (const [key, value] of Object.entries(jsonObject[25].languages)) {
      // console.log(value);
    }
  } catch (err) {
    console.error(err);
  }
};

const listenToSearch = function () {
  let search = document.querySelector('.js-search');
  search.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
      getFilteredLanden(search.value);
    }
  });
  let searchBtn = document.querySelector('.js-search-btn');
  searchBtn.addEventListener('click', function () {
    getFilteredLanden(search.value);
  });
};

const listenToFilter = function () {
  let filters = document.querySelectorAll('.js-filter');
  for (let filter of filters) {
    filter.addEventListener('click', function () {
      getFilteredLandenByContinent(filter.getAttribute('filter'));
    });
    filter.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        getFilteredLandenByContinent(filter.getAttribute('filter'));
      }
    });
  }
};

const listenToClose = function () {
  htmlClose = document.querySelector('.js-close');
  htmlClose.addEventListener('click', function () {
    document.querySelector('.js-popup-content').style.opacity = 0;
    document.querySelector('.js-popup-content').style.transform = 'scale(0)';
    window.setTimeout(function () {
      document.querySelector('.js-popup').style.display = 'none';
    }, 200); // timed to match animation-duration
  });
};

const listenToClick = function () {
  let cells = document.querySelectorAll('.js-cell');
  // console.log(cells);
  for (let button of cells) {
    button.addEventListener('click', function () {
      let land = button.getAttribute('name');
      getLand(land);
    });
    button.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        let land = button.getAttribute('name');
        getLand(land);
      }
    });
  }
};

const getPopulationSubRegion = function (subRegion) {
  let url = `https://restcountries.com/v3.1/subregion/${subRegion}`;
  handleData(url, calculatePopulationSubRegion);
};

const getPopulationRegion = function (region) {
  let url = `https://restcountries.com/v3.1/region/${region}`;
  handleData(url, calculatePopulationRegion);
};

const getFilteredLanden = function (search) {
  console.log(search);
  let url = `https://restcountries.com/v3.1/name/${search}`;
  handleData(url, showFilteredLanden, showError);
  let urlCurrency = `https://restcountries.com/v3.1/currency/${search}`;
  handleData(urlCurrency, showFilteredLanden, showError);
  let urlLanguage = `https://restcountries.com/v3.1/lang/${search}`;
  handleData(urlLanguage, showFilteredLanden, showError);
};

const getFilteredLandenByContinent = function (filter) {
  if (filter == 'all') {
    const url = `https://restcountries.com/v3.1/${filter}`;
    handleData(url, showFilteredLandenByContinent);
  } else {
    const url = `https://restcountries.com/v3.1/region/${filter}`;
    handleData(url, showFilteredLandenByContinent);
  }
  showFilterChange(filter);
};

const getLand = function (land) {
  const url = `https://restcountries.com/v3.1/name/${land}`;
  handleData(url, showLand);
};

const getData = function () {
  const url = 'https://restcountries.com/v3.1/all';
  handleData(url, showData);
};

// function drawBasic() {
//   console.log(globalCountryCounter);
//   // if (globalCountryCounter > 1000000000) {
//   //   var data = google.visualization.arrayToDataTable([
//   //     ['Global', 'Population'],
//   //     ['Global', globalWorldPopulation],
//   //     [`${globalRegion}`, globalRegionCounter],
//   //     [`${globalSubRegion}`, globalSubRegionCounter],
//   //     [`${globalCountryName}`, globalCountryCounter],
//   //   ]);
//   // } else {
//   //   var data = google.visualization.arrayToDataTable([
//   //     ['Global', 'Population'],
//   //     // ['Global', globalWorldPopulation],
//   //     [`${globalRegion}`, globalRegionCounter],
//   //     [`${globalSubRegion}`, globalSubRegionCounter],
//   //     [`${globalCountryName}`, globalCountryCounter],
//   //   ]);
//   // }
//   // // var columnRange = data.getColumnRange(0);
//   // var options = {
//   //   title: `Population of ${globalCountryName} vs global population`,
//   //   chartArea: { width: '55%' },
//   //   hAxis: {
//   //     title: 'Total Population',
//   //     // viewWindow: {
//   //     //   min: columnRange.min,
//   //     // },
//   //   },
//   //   vAxis: {
//   //     title: 'Country',
//   //   },
//   // };

//   // var chart = new google.visualization.BarChart(
//   //   document.getElementById('chart_div')
//   // );

//   var data = google.visualization.arrayToDataTable([
//     ['Task', 'Hours per Day'],
//     // ['Work', 11],
//     [`${globalRegion}`, globalRegionCounter],
//     [`${globalSubRegion}`, globalSubRegionCounter],
//     [`${globalCountryName}`, globalCountryCounter],
//   ]);

//   var options = {
//     title: 'My Daily Activities',
//   };

//   var chart = new google.visualization.PieChart(
//     document.getElementById('chart_div')
//   );

//   chart.draw(data, options);
// }

const drawChart = function () {
  const ctx = document.querySelector('.myChart');
  const ctxText = document.querySelector('.js-chartText');
  console.log(globalSubRegion);
  if (globalSubRegion != undefined) {
    if (globalCountryCounter > 300000000) {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            `${globalCountryName}`,
            `${globalSubRegion}`,
            `${globalRegion}`,
            `Global population`,
          ],
          datasets: [
            {
              label: 'Population',
              data: [
                globalCountryCounter,
                globalSubRegionCounter,
                globalRegionCounter,
                globalWorldPopulation,
              ],
              borderWidth: 1,
              backgroundColor: 'rgba(43,	173,	173, 0.5)',
            },
          ],
        },
      });
    } else if (globalCountryName.split(' ').length > 2) {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [`Country`, `${globalSubRegion}`, `${globalRegion}`],
          datasets: [
            {
              label: 'Population',
              data: [
                globalCountryCounter,
                globalSubRegionCounter,
                globalRegionCounter,
              ],
              borderWidth: 1,
              minBarLength: 3,
              backgroundColor: 'rgba(43,	173,	173, 0.5)',
            },
          ],
        },
      });
    } else {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            `${globalCountryName}`,
            `${globalSubRegion}`,
            `${globalRegion}`,
          ],
          datasets: [
            {
              label: 'Population',
              data: [
                globalCountryCounter,
                globalSubRegionCounter,
                globalRegionCounter,
              ],
              borderWidth: 1,
              minBarLength: 3,
              backgroundColor: 'rgba(43,	173,	173, 0.5)',
            },
          ],
        },
      });
    }
  } else {
    ctxText.innerHTML = 'No data available';
  }
};
const init = function () {
  console.log('DOM geladen');
  getData();
  listenToFilter();
  listenToSearch();
  showCounter();
};
document.addEventListener('DOMContentLoaded', init);
//#endregion
