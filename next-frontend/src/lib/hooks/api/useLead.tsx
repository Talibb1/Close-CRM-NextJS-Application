// src/hooks/useLead.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLead, getLeads, deleteLeadById, updateLeadById, getLeadById } from '../../services/api';
import { Lead, CreateLeadInput, ApiResponse } from '../../types';

export const useCreateLead = () => {
  return useMutation<ApiResponse<Lead>, unknown, CreateLeadInput>((leadData) => createLead(leadData));
};

export const useLeads = () => {
  return useQuery<ApiResponse<Lead[]>>({
    queryKey: ['leads'],
    queryFn: getLeads,
  });
};

export const useDeleteLead = () => {
  return useMutation<ApiResponse<null>, unknown, number>((id) => deleteLeadById(id));
};
export const useUpdateLead = () => {
  return useMutation<ApiResponse<Lead>, unknown, { id: number; data: Partial<Lead> }>(
    ({ id, data }) => updateLeadById(id, data)
  );
};

export const useGetLeadById = (id: number) => {
  return useQuery<ApiResponse<Lead>>({
    queryKey: ['lead', id],
    queryFn: () => getLeadById(id),
  });
};
