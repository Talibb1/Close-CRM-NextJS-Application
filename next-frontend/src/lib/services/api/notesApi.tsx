import axiosClient from '../axios/axiosClient';
import { CreateNotes, ApiResponse, Lead } from '../../types';


// Function to create notes
export const createNotes = async (notesData: CreateNotes): Promise<ApiResponse<void>> => {
  const response = await axiosClient.post('/createnotes', notesData); 
  return response.data;
};


export const getNotesByLeadId = async (id: number): Promise<ApiResponse<Lead>> => {
  const response = await axiosClient.get(`getleadnotes/${id}`);
  return response.data;
};
