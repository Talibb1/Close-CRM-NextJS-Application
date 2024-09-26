import axiosClient from '../axios/axiosClient';
import { ApiResponse } from '../../types';

export const uploadCsv = async (formData: FormData): Promise<ApiResponse<void>> => {
  const response = await axiosClient.post('/upload-csv', formData);
  return response.data;
};
