import axios from "axios";
import { Order, OrderItem } from "../types/order";
import { getAllUniforms, Uniform } from "./uniforms";

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
    const response = await axios.get(`${API_URL}/orders`, {
      withCredentials: true,
    });

    let orders: Order[] = [];
    if (response.data && response.data.data) {
      orders = response.data.data;
    }

    try {
      const uniforms = await getAllUniforms(router);
      const uniformOrders = uniforms.map(mapUniformToOrder);

      orders = [...orders, ...uniformOrders];
    } catch (uniformError) {
      console.error("Error fetching uniforms:", uniformError);
    }

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      router.push("/auth/auth1/login");
    }

    try {
      const uniforms = await getAllUniforms(router);
      return uniforms.map(mapUniformToOrder);
    } catch (uniformError) {
      console.error("Error fetching uniforms as backup:", uniformError);
      return [];
    }
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
