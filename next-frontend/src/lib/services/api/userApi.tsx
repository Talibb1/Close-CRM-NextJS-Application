import axiosClient from '../axios/axiosClient';
import { LoginData, UserResponse, ApiResponse, CreateUserInput, ProfileResponse } from '../../types';

export const createUser = async (user: CreateUserInput): Promise<ApiResponse<UserResponse>> => {
  const response = await axiosClient.post('register', user);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<ApiResponse<UserResponse>> => {
  const response = await axiosClient.post('login', data);
  return response.data;
};

export const getUser = async (): Promise<ApiResponse<ProfileResponse>> => {
  const response = await axiosClient.get('profile');
  return response.data;
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  const response = await axiosClient.post('logout');
  return response.data;
};

export const changePassword = async (data: { oldPassword: string; newPassword: string }): Promise<ApiResponse<null>> => {
  const response = await axiosClient.post('changepassword', data);
  return response.data;
};
