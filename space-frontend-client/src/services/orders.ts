import axios from "axios";
import { Order, OrderItem } from "../types/order";
import { getAllUniforms, Uniform, ApiResponse } from "./uniforms";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const mapUniformToOrder = (uniform: Uniform): Order => {
  const items: OrderItem[] = uniform.sketches.map((sketch, index) => ({
    id: `item-${index}`,
    product_name: `Pacote Uniformes - ${sketch.package_type}`,
    quantity: 1,
    unit_price: 0,
    total_price: 0,
    product_details: {
      pacote: sketch.package_type,
      quantidade_jogadores: sketch.player_count,
      uniformId: uniform.id,
      sketchId: sketch.id,
    },
  }));

  return {
    id: uniform.id,
    order_number: `UNIF-${uniform.id.substring(0, 6)}`,
    status: uniform.editable ? "pending" : "processing",
    total_amount: 0,
    payment_status: "paid",
    shipping_status: uniform.editable ? "pending" : "processing",
    product_type: "Uniformes",
    created_at: uniform.created_at,
    updated_at: uniform.updated_at,
    items,
  };
};

export const getOrders = async (router: any): Promise<Order[]> => {
  try {
    const uniforms = await getAllUniforms(router);
    const uniformOrders = uniforms.map(mapUniformToOrder);
    return uniformOrders;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
};

export const getOrderById = async (
  orderId: string,
  router: any,
): Promise<Order | null> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${API_URL}/v1/uniforms?id=${orderId}`,
      {
        withCredentials: true,
      },
    );

    if (response.data && response.data.data) {
      return mapUniformToOrder(response.data.data);
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }

    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage =
        error.response.data.message || "Erro ao buscar pedido";
      throw new Error(errorMessage);
    }

    throw error;
  }
};
