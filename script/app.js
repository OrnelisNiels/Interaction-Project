const showFilterChange = function (filter) {
  let htmlFilters = document.querySelectorAll('.js-filter');
  for (let htmlFilter of htmlFilters) {
    htmlFilter.classList.remove('u-is-selected');
    if (htmlFilter.getAttribute('filter') == filter) {
      htmlFilter.classList.add('u-is-selected');
    }
  }
};
const showFilteredLanden = function (jsonObject) {
  try {
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
      html += `<button class="c-btn-cell"><div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"><p class="c-cellText--sub">${land.subregion}</p></div></button>`;
      htmlPng = `url('${land.flags.png}')">`;
      teller += 1;
    }
    htmlLand.innerHTML = html;
    listenToClick();
    //Talen ophalen
    for (const [key, value] of Object.entries(jsonObject[25].languages)) {
      // console.log(value);
    }
  } catch (err) {
    console.error(err);
  }
};

const showLand = function (jsonObject) {
  htmlPopup = document.querySelector('.js-popup');
  htmlPopupContent = document.querySelector('.js-popup-content');
  htmlPopup.style.display = 'flex';
  let html = '';
  let languages = '';
  let currencies = '';
  for (const [key, value] of Object.entries(jsonObject[0].languages)) {
    languages += `${value} / `;
    // console.log(languages);
  }

  for (const [key, value] of Object.entries(jsonObject[0].currencies)) {
    // console.log(value);
    currencies += `${value.name} (${value.symbol}) `;
  }

  html += `<div class="u-x-span-2"><p class="c-land-name"><b>${jsonObject[0].name.common}</b></p></div>`;
  html += `<div class="c-content-cell"><p class="">Capital: <b>${jsonObject[0].capital}</b></p></div>`;
  html += `<div class="c-content-cell"></div>`;
  html += `<div class="c-content-cell"><p class="">Population: <b>${new Intl.NumberFormat(
    'de-DE'
  ).format(jsonObject[0].population)}</b></p></div>`;
  html += `<div class="c-content-cell"></div>`;
  html += `<div class="c-content-cell"><p class="">Languages: <b>${languages}</b></p></div>`;
  html += `<div class="c-content-cell"></div>`;
  html += `<div class="c-content-cell"><p class="">Currencies: <b>${currencies}</b></p></div>`;
  html += `<div class="c-content-cell"></div>`;

  html += `<span class="material-icons c-close js-close">close</span>`;

  htmlPopupContent.innerHTML = html;

  listenToClose();
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
      html += `<button class="c-btn-cell"><div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"><p class="c-cellText--sub">${land.subregion}</p></div></button>`;
      htmlPng = `url('${land.flags.png}')">`;
      teller += 1;
    }
    htmlLand.innerHTML = html;
    listenToClick();
    //Talen ophalen
    for (const [key, value] of Object.entries(jsonObject[25].languages)) {
      // console.log(value);
    }
  } catch (err) {
    console.error(err);
  }
};

const listenToFilter = function () {
  let filters = document.querySelectorAll('.js-filter');
  for (let filter of filters) {
    filter.addEventListener('click', function () {
      getFilteredLanden(filter.getAttribute('filter'));
    });
  }
};

const listenToClose = function () {
  htmlClose = document.querySelector('.js-close');
  htmlClose.addEventListener('click', function () {
    document.querySelector('.js-popup').style.display = 'none';
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
  }
};

const getFilteredLanden = function (filter) {
  if (filter == 'all') {
    const url = `https://restcountries.com/v3.1/${filter}`;
    handleData(url, showFilteredLanden);
  } else {
    const url = `https://restcountries.com/v3.1/region/${filter}`;
    handleData(url, showFilteredLanden);
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

const init = function () {
  console.log('DOM geladen');
  getData();
  listenToFilter();
};
document.addEventListener('DOMContentLoaded', init);
//#endregion
