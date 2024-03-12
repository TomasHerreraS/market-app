import axios from 'axios';

export const getHistoryTable = async (firstIndex: number, lastIndex: number) => {
  try {
    const response = await axios.get('http://localhost:3001/getHistoryTable', {
      params: {
        limit: firstIndex,
        offset: lastIndex
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
  
export const getHistoryLength = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getHistoryLength');
    return response.data;
  } catch (error) {
    throw error;
  }
};