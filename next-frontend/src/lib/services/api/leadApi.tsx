import axiosClient from "../axios/axiosClient";
import { Lead, CreateLeadInput, ApiResponse } from "../../types";

export const createLead = async (lead: CreateLeadInput): Promise<void> => {
  await axiosClient.post("createleads", lead);
};

export const getLeads = async (): Promise<ApiResponse<Lead[]>> => {
  const response = await axiosClient.get("getleads");
  return response.data;
};

export const deleteLeadById = async (
  id: number
): Promise<ApiResponse<null>> => {
  const response = await axiosClient.delete(`deleteleads/${id}`);
  return response.data;
};

export const updateLeadById = async (
  id: number,
  leadData: Partial<Lead>
): Promise<ApiResponse<Lead>> => {
  const response = await axiosClient.put(`updateleads/${id}`, leadData);
  return response.data;
};

export const getLeadById = async (id: number): Promise<ApiResponse<Lead>> => {
  const response = await axiosClient.get(`getleads/${id}`);
  return response.data;
};
