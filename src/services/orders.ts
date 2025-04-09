import axios from "axios";
import { Order } from "../types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getOrders = async (router: any): Promise<Order[]> => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      withCredentials: true,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }
    return [];
  }
};

export const getOrderById = async (
  orderId: string,
  router: any,
): Promise<Order | null> => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`, {
      withCredentials: true,
    });

    if (response.data && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }
    return null;
  }
};
