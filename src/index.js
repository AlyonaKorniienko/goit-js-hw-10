import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
// fetchCountries('ukraine');

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search(e) {
  e.preventDefault();
  const inputData = input.value.trim();
  if (inputData === '') {
    clear();
    return;
  }
  fetchCountries(inputData).then(renderСountryList).catch(console.log);
}

function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderСountryList(responseAPI) {
  //   console.log(responseAPI);
  clear();
  if (responseAPI.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (responseAPI.length === 1) {
    countryInfo.innerHTML = renderCountryInfo(responseAPI[0]);
  } else {
    const renderListCountry = responseAPI
      .map(country => renderCountriesList(country))
      .join('');
    countryList.insertAdjacentHTML('beforeend', renderListCountry);
  }
}

function renderCountriesList({ flags, name }) {
  return `<li class="country-listInfo">
            <img class="country-flag" src="${flags.svg}" width="100" />
            <p>${name.official}</p>
            </li>`;
}
function renderCountryInfo({ name, flags, capital, population, languages }) {
  return `<li class="country-firstInfo">
            <div class="country-infoList">
    <img class="country-flagInfo" src="${flags.svg}" width="100"/>
    <span class="country-listName">${name.official}</span>
    <p><b> Capital:</b> ${capital}</p>
    <p><b> Population:</b> ${population}</p>
    <p><b> Languages:</b> ${Object.values(languages)}</p>
    </div>
    </li>`;
}
