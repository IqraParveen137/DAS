import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_BASEURL });

API.interceptors.request.use(
  (config) => {
    try {
      const localData = localStorage.getItem('appData');
      const appData = JSON.parse(localData);

      if (appData?.token) {
        config.headers.Authorization = `Bearer ${appData.token}`;
      }
    } catch (error) {
      console.log(error);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
