import axios from "axios";
import { Contact } from "../types/contact";

const API_URL = "http://localhost:8000/v1";

export interface ClientData {
  id: string;
  contact: Contact;
  created_at: string;
  updated_at: string;
}

export const getClientData = async (
  router: any,
): Promise<ClientData | null> => {
  try {
    const response = await axios.get(`${API_URL}/clients`, {
      withCredentials: true,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    router.push("/auth/auth1/login");
    return null;
  }
};
