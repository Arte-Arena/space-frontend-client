import axios from "axios";
import { Contact } from "../types/contact";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
    const response = await axios.get(`${API_URL}/v1/clients`, {
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

export interface ClientUpdateData {
  name?: string;
  email?: string;
  person_type?: string;
  identity_card?: string;
  cpf?: string;
  cell_phone?: string;
  zip_code?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  company_name?: string;
  cnpj?: string;
  state_registration?: string;
  billing_zip_code?: string;
  billing_address?: string;
  billing_number?: string;
  billing_complement?: string;
  billing_neighborhood?: string;
  billing_city?: string;
  billing_state?: string;
  different_billing_address?: boolean;
  status?: string;
}

export const updateClientData = async (
  data: ClientUpdateData,
  router: any,
): Promise<boolean> => {
  try {
    const response = await axios.patch(`${API_URL}/v1/clients`, data, {
      withCredentials: true,
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error updating client data:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }
    return false;
  }
};
