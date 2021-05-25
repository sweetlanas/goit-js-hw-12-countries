import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
      error({
        text: 'Please enter a valid request',
        delay: 2000,
      });
  })
};

export default fetchCountries ;