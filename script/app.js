const showLand = function (land) {
  console.log(land);
};

const showData = function (jsonObject) {
  try {
    let htmlLand = document.querySelector('.js-canvas');
    let htmlCell = document.querySelector('.js-cell');
    console.log(jsonObject[2].languages);
    let test = jsonObject[2].languages;
    console.log(test);
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
      console.log(value);
    }
  } catch (err) {
    console.error(err);
  }
};
const listenToClick = function () {
  console.log('listenToClick');

  let cells = document.querySelectorAll('.js-cell');
  console.log(cells);
  for (let button of cells) {
    button.addEventListener('click', function () {
      let land = button.getAttribute('name');
      showLand(land);
    });
  }
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
