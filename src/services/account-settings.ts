import axios from "axios";

const API_URL = "http://localhost:8000/v1";

export const getClientData = async (router: any): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/clients`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    router.push("/auth/auth1/login");
    return Promise.resolve(false);
  }
};
