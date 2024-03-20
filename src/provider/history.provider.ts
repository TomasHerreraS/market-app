import axios from 'axios';
import { FilterTable, DateFilter } from '../utils/type';

export const getHistoryTable = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getHistoryTable');
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

export const getHistoryTableByFilter = async (filters: FilterTable, firstIndex: number, lastIndex: number, date: DateFilter) => {
  try {
    const response = await axios.get('http://localhost:3001/getHistoryTableByFilter', {
      params: {
        filters: filters,
        limit: firstIndex,
        offset: lastIndex,
        date: date
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};