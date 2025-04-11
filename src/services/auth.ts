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
    console.error("Registration error:", error);

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
    console.error("Login error:", error);

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
    console.error("Logout error:", error);

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    router.push("/auth/auth1/login");
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Check auth error:", error);

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};
