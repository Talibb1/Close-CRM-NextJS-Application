import axiosClient from '../axios/axiosClient';
import { Contact, CreateContactInput, ApiResponse } from '../../types';

export const createContact = async (contact: CreateContactInput): Promise<void> => {
  await axiosClient.post('createcontacts', contact);
};

export const getContacts = async (): Promise<ApiResponse<Contact[]>> => {
  const response = await axiosClient.get('getcontacts');
  return response.data;
};

export const deleteContactById = async (id: number): Promise<ApiResponse<null>> => {
  const response = await axiosClient.delete(`deletecontacts/${id}`);
  return response.data;
};

export const updateContactById = async (id: number, contactData: Partial<Contact>): Promise<ApiResponse<Contact>> => {
  const response = await axiosClient.put(`updatecontacts/${id}`, contactData);
  return response.data;
};

export const getContactById = async (id: number): Promise<ApiResponse<Contact>> => {
  const response = await axiosClient.get(`getcontacts/${id}`);
  return response.data;
};
