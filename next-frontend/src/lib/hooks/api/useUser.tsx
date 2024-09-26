// src/hooks/useUser.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, loginUser, getUser, logoutUser, changePassword } from '../../services/api';
import { UserResponse, ApiResponse, LoginData } from '../../types';

export const useCreateUser = () => {
  return useMutation<ApiResponse<UserResponse>, unknown, CreateUserInput>((userData) => createUser(userData));
};

export const useLoginUser = () => {
  return useMutation<ApiResponse<UserResponse>, unknown, LoginData>((loginData) => loginUser(loginData));
};

export const useGetUser = () => {
  return useQuery<ApiResponse<UserResponse>>(['user'], getUser);
};

export const useLogoutUser = () => {
  return useMutation<ApiResponse<null>, unknown>(() => logoutUser());
};

export const useChangePassword = () => {
  return useMutation<ApiResponse<null>, unknown, { oldPassword: string; newPassword: string }>(changePassword);
};
