// apiService.js
import axios from 'axios';
import api from './api'; // Assuming you have the axios instance in 'api.js'

// Common POST Request Function
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data); // Dynamic endpoint
    // console.log('POST Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint, data = {}) => {
  try {
    const response = await api.delete(endpoint, {
      data: data // Some APIs allow data in the DELETE request
    });
    console.log('DELETE Response:', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};



// import axios from 'axios';

// export const postData = async (url, data) => {
//   try {
//     const response = await axios.post(`https://acllwn2055.execute-api.ap-south-1.amazonaws.com/test1/${url}`, data);
//     return response;
//   } catch (error) {
//     console.error("API call error: ", error);
//     throw error; // Rethrow to handle in the calling function
//   }
// };
