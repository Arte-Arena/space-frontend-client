import axios from "axios";
import { Order, OrderItem } from "../types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const mapBackendOrderToFrontend = (orderResult: any): Order => {
  const produtos = Array.isArray(orderResult.produtos) ? orderResult.produtos : [];
  
  const items: OrderItem[] = produtos.map((produto: any, index: number) => ({
    id: `item-${index}`,
    product_name: produto.nome,
    quantity: produto.quantidade,
    unit_price: produto.preco,
    total_price: produto.preco * produto.quantidade,
    product_details: {
      ...produto
    },
  }));

  let status: string;
  let productType = "Produtos";
  
  switch (orderResult.estagio_descricao) {
    case "Design":
      status = "processing";
      productType = "Design";
      break;
    case "Impressão":
      status = "processing";
      productType = "Impressão";
      break;
    case "Sublimação":
      status = "processing";
      productType = "Sublimação";
      break;
    case "Costura":
      status = "processing";
      productType = "Costura";
      break;
    case "Corte e Conferência":
      status = "processing";
      productType = "Corte e Conferência";
      break;
    case "Revisão":
      status = "completed";
      break;
    case "Expedição":
      status = "shipped";
      break;
    default:
      status = "pending";
  }

  return {
    id: orderResult.numero_pedido,
    order_number: orderResult.numero_pedido,
    status: status,
    total_amount: orderResult.valor_orcamento || 0,
    payment_status: "paid",
    shipping_status: status === "shipped" ? "shipped" : "processing",
    product_type: productType,
    created_at: orderResult.data_criacao || new Date().toISOString(),
    updated_at: orderResult.data_criacao || new Date().toISOString(),
    data_prevista: orderResult.data_prevista,
    estagio_descricao: orderResult.estagio_descricao,
    orcamento_id: orderResult.orcamento_id,
    items,
  };
};

export const getOrders = async (router: any): Promise<Order[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/orders`,
      {
        withCredentials: true,
      }
    );

    if (response.data && response.data.data && response.data.data.resultados) {
      return response.data.data.resultados.map(mapBackendOrderToFrontend);
    }
    
    return [];
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
    const orders = await getOrders(router);
    const foundOrder = orders.find(order => order.id === orderId);
    
    if (foundOrder) {
      return foundOrder;
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
