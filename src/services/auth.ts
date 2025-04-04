import axios from "axios";

const API_URL = "http://localhost:8000/v1";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<any> => {
  const response = await axios.post(`${API_URL}/clients`, data);
  return response.data;
};

export const login = async (data: LoginData): Promise<any> => {
  const response = await axios.post(`${API_URL}/auth/signin`, data, {
    withCredentials: true,
  });
  return response.data;
};
