// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://acllwn2055.execute-api.ap-south-1.amazonaws.com/test1/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // You can add more headers here if needed
  },
});

// Add a request interceptor (optional, for setting auth tokens)
api.interceptors.request.use(
  config => {
    // If you need to set an auth token for each request:
    const token = 'your-auth-token'; // Replace with your auth token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional, for handling responses)
api.interceptors.response.use(
  response => response,
  error => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default api;
