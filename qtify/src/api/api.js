import axios from "axios";

export const BACKEND_ENDPOINT =
  "https://qtify-backend-gye4ebhsbpfea8g9.z01.azurefd.net";

export const fetchTopAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/top`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchNewAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/new`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
