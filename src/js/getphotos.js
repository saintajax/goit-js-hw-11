import axios from 'axios';
import { pageNumber, limit } from '../index.js';

const API_KEY = '30362684-6931a6e7ba0508128f5876ff1';
const baseUrl = 'https://pixabay.com/api/';

export async function getPhotos(request) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    page: pageNumber,
    per_page: limit,
  });

  return await axios.get(`${baseUrl}?${params}`);
}
