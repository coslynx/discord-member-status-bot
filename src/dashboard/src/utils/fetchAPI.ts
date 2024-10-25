import axios from 'axios';
import { useConfigStore } from '@/store/modules/config';

export const fetchAPI = async (endpoint: string, method: string = 'GET', data?: any) => {
  const configStore = useConfigStore();
  try {
    const response = await axios({
      method,
      url: `${configStore.apiUrl}${endpoint}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from API: ${error}`);
    throw error;
  }
};