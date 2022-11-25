const showLand = function (jsonObject) {
  // console.log(jsonObject);
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

  for (let land of jsonObject) {
    html += `<div class="u-x-span-2"><p class="c-land-name"><b>${land.name.common}</b></p></div>`;
    html += `<div class="c-content-cell"><p class="">Capital: <b>${land.capital}</b></p></div>`;
    html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell"><p class="">Population: <b>${new Intl.NumberFormat(
      'de-DE'
    ).format(land.population)}</b></p></div>`;
    html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell"><p class="">Languages: <b>${languages}</b></p></div>`;
    html += `<div class="c-content-cell"></div>`;
    html += `<div class="c-content-cell"><p class="">Currencies: <b>${currencies}</b></p></div>`;
    html += `<div class="c-content-cell"></div>`;
  }

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
      html += `<div class="cell cell--${teller} js-cell" name="${land.name.common}"><p class="c-cellText">${land.name.common}<p><img class="flag" src="${land.flags.png}" alt="Flag of ${land.name.common}"></div>`;
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

const listenToClose = function () {
  htmlClose = document.querySelector('.js-close');
  htmlClose.addEventListener('click', function () {
    document.querySelector('.js-popup').style.display = 'none';
  });
};

const listenToClick = function () {
  console.log('listenToClick');

  let cells = document.querySelectorAll('.js-cell');
  // console.log(cells);
  for (let button of cells) {
    button.addEventListener('click', function () {
      let land = button.getAttribute('name');
      getLand(land);
    });
  }
};

const getLand = function (land) {
  const url = `https://restcountries.com/v3.1/name/${land}`;
  handleData(url, showLand);
};

const getData = function () {
  const url = 'https://restcountries.com/v3.1/region/europe';
  handleData(url, showData);
};

const init = function () {
  console.log('DOM geladen');
  getData();
};
document.addEventListener('DOMContentLoaded', init);
//#endregion
