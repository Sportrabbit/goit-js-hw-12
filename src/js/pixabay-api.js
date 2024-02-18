import axios from 'axios';

export async function getPhotos(userRequest, currentPage) {
    const API_KEY = '42321228-2dc7965d40466a0a646776a28';
    const BASE_URL = 'https://pixabay.com';
    const END_POINTS = '/api/';
    const url = BASE_URL + END_POINTS;

    const params = {
        key: API_KEY,
        q: userRequest,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 15,
        page: currentPage,
    };

    const response = await axios.get(url, {params});
    
    return response.data;
}