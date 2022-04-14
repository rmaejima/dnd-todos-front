import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const requestGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  return axios.get<T>(url, { baseURL: API_BASE_URL });
};

export const requestPost = async <T, U = undefined>(
  url: string,
  payload: U,
): Promise<AxiosResponse<T>> => {
  return axios.post<T>(url, payload, { baseURL: API_BASE_URL });
};
