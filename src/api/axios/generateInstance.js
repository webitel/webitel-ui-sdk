import axios from 'axios';

// 'X-Webitel-Access' ~ 'X-Access-Token'
const generateInstance = () => axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'X-Webitel-Access': localStorage.getItem('access-token') || '',
  },
});

export default generateInstance;
