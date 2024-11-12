//Import Area Start
import axios from 'axios';
//Import Area End

const configJSON = require('./config.js');

const api = axios.create({
  baseURL: configJSON.__BE_URL__, 
  headers: {
    'Content-Type': configJSON.__Content_Type__,
  },
});

export async function apiCall({ method, url, headers, params, data }) {
  try {
    const response = await api({
      method,
      url,
      headers,
      params,
      data,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData = error.response.data;

        // Check if error response contains HTML content
        if (typeof errorData === 'string' && errorData.includes('<!DOCTYPE html>')) {
          console.error('API ERROR {} : HTML Error Response received. Endpoint may be incorrect or unavailable.');
          throw new Error('An unexpected server error occurred.');
        } else {
          // Return JSON error response if available
          console.error('Error Response:', error.response);
          return errorData;
        }
      } else if (error.request) {
        // Handle cases where the request was made but no response received
        console.error('No Response: Endpoint may be missing or server is unreachable');
        throw new Error('Endpoint is missing or server is unreachable');
      }
    } else {
      console.error('API Unexpected error:', error);
    }
    throw error;
  }
}
