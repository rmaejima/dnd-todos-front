import axios, { AxiosResponse } from 'axios';

export const requestGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  return axios.get<T>(url, { baseURL: 'http://localhost:3000' });
};
