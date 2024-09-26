import { useMutation, useQuery } from '@tanstack/react-query';
import { createContact, getContacts, deleteContactById, updateContactById, getContactById } from '../../services/api';
import { Contact, CreateContactInput, ApiResponse } from '../../types';

export const useCreateContact = () => {
  return useMutation<ApiResponse<void>, unknown, CreateContactInput>((contactData) => createContact(contactData));
};

export const useContacts = () => {
  return useQuery<ApiResponse<Contact[]>>({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
};

export const useDeleteContact = () => {
  return useMutation<ApiResponse<null>, unknown, number>((id) => deleteContactById(id));
};

export const useUpdateContact = () => {
  return useMutation<ApiResponse<Contact>, unknown, { id: number; data: Partial<Contact> }>(
    ({ id, data }) => updateContactById(id, data)
  );
};

export const useGetContactById = () => {
  return useQuery<ApiResponse<Contact>, number>(['contact', id], () => getContactById(id));
};
