import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
  try {
    const response = await axios.post(`${API_URL}/v1/auth/signup`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

export const login = async (data: LoginData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/v1/auth/signin`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

export const logout = async (router: any): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/v1/auth/signout`,
      {},
      {
        withCredentials: true,
      },
    );
    router.push("/auth/auth1/login");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    router.push("/auth/auth1/login");
  }
};

export const checkAuth = async (router: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/v1/auth/authorize`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const checkAuthAndRedirect = async (router: any) => {
  try {
    await checkAuth(router);
    router.push("/");
    return true;
  } catch (error) {
    return false;
  }
};
