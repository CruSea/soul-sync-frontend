import axios from 'axios';

const API_BASE_URL = process.env.NEXTBASE_URL; // Base URL for your API

const apiRequest = async (
  method: string,
  endpoint: string,
  data = {},
  params: string[] = []
) => {
  try {
    const url = `${API_BASE_URL}/${params.join('/')}${endpoint}`;
    const response = await axios({
      method,
      url,
      data,
    });

    return response.data; // Return the response data
  } catch (error: unknown) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;
