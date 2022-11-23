const showData = function (jsonObject) {
  try {
    let htmlLand = document.querySelector('.js-landen');
    console.log(jsonObject[2].languages);
    let test = jsonObject[2].languages;
    console.log(test);
    let html = '';
    for (let land of jsonObject) {
      html += `<li>${land.name.common}</li>`;
    }
    // let substring = jsonobjesubstring();
    for (const [key, value] of Object.entries(jsonObject[25].languages)) {
      console.log(value);
    }
    htmlLand.innerHTML = html;
  } catch (err) {
    console.error(err);
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
