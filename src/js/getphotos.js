import axios from 'axios';
import { pageNumber, limit } from '../index.js';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30362684-6931a6e7ba0508128f5876ff1';

export async function getPhotos(request) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    page: pageNumber,
    per_page: limit,
  });

  return await axios.get(`?${params}`);
}
