import axios from 'axios';

const URL = `https://pixabay.com/api/`;
const API_KEY = '39808878-d17211b11e4a3c923ce198349';

export function fetchImages(searchText, page) {
  const params = {
    key: API_KEY,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return axios
    .get(`${URL}?page=${page}&q=${searchText}`, { params })
    .then(response => {
      return response.data;
    });
}
