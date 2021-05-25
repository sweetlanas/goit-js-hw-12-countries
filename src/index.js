import './styles.css';
import fetchCountries from './js/fetchCountries';
import getRefs from './js/refs';
import createCountry from './templates/country-item.hbs';
import createCountries from './templates/country-list.hbs';

import debounce from 'lodash.debounce';
import {error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

fetchCountries('swi').then(console.log);

const refs = getRefs();
console.log(refs.searchInput);

refs.searchInput.addEventListener('input', debounce((e) => {
  console.log(e.target.value);
  fetchCountries(e.target.value.trim()).then(checkQuantity);
}, 500)
)

function checkQuantity(countries) {
  if (countries.length > 10) {
    error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 2000
      });
  };
  if (countries.length <= 10 && countries.length >= 2) {
    refs.countryContainer.innerHTML = createCountries(countries);
    return;
  };
  if (countries.length === 1) {
    refs.countryContainer.innerHTML = createCountry(countries[0]);
    return;
  }
}