// src/hooks/useNotes.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { createNotes, getNotesByLeadId } from '../../services/api';
import { CreateNotes, ApiResponse, Lead } from '../../types';

export const useCreateNotes = () => {
  return useMutation<ApiResponse<void>, unknown, CreateNotes>({
    mutationFn: (notesData) => createNotes(notesData), 
  });
};

export const useGetNotesByLeadId = (id: number) => {
  return useQuery<ApiResponse<Lead>>({
    queryKey: ['leadNotes', id],
    queryFn: () => getNotesByLeadId(id),
    refetchOnWindowFocus: false,   
    refetchOnReconnect: false,    
    refetchOnMount: false,        
    staleTime: 5 * 60 * 1000,
  });
};
