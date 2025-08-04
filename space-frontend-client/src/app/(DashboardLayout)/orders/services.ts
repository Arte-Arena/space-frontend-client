import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Status do pedido baseado no backend
export type OrderStatus = 
  | "Pendente"
  | "Em andamento" 
  | "Arte OK"
  | "Em espera"
  | "Cor teste"
  | "Processando"
  | "Impresso"
  | "Em impressão"
  | "Separação"
  | "Costurado"
  | "Prensa"
  | "Calandra"
  | "Em separação"
  | "Retirada"
  | "Em entrega"
  | "Entregue"
  | "Devolução"
  | "Não cortado"
  | "Cortado"
  | "Não conferido"
  | "Conferido";

// Estágio do pedido
export type OrderStage = 
  | "Design"
  | "Impressão"
  | "Sublimação"
  | "Costura"
  | "Expedição"
  | "Corte"
  | "Conferência";

// Tipo do pedido
export type OrderType = 
  | "Prazo normal"
  | "Antecipação"
  | "Faturado"
  | "Metade/Metade"
  | "Amostra"
  | "Reposição";

// Interface para delivery do orçamento
export interface Delivery {
  option: string;
  deadline: number;
  price: number;
}

// Interface para modo antecipado
export interface EarlyMode {
  date: string;
  tax: number;
}

// Interface para desconto
export interface Discount {
  type: string;
  value: number;
  percentage: number;
}

// Interface para parcelas
export interface Installments {
  date: string;
  value: number;
}

// Interface para cobrança
export interface Billing {
  type: string;
  installments: Installments[];
}

// Interface para endereço
export interface Address {
  cep: string;
  details: string;
}

// Interface para orçamento
export interface Budget {
  id: string;
  old_id: number;
  created_by: string;
  seller: string;
  related_lead: string;
  related_client: string;
  old_products_list: string;
  address: Address;
  delivery: Delivery;
  early_mode: EarlyMode;
  discount: Discount;
  old_gifts: string;
  production_deadline: number;
  payment_method: string;
  billing: Billing;
  trello_uri: string;
  notes: string;
  delivery_forecast: string;
  created_at: string;
  updated_at: string;
  approved: boolean;
}



// Interface principal para pedidos
export interface Order {
  _id: string;
  old_id: number;
  created_by?: string;
  related_seller?: string;
  related_designer?: string;
  tracking_code?: string;
  status?: OrderStatus;
  stage?: OrderStage;
  type?: OrderType;
  url_trello?: string;
  products_list_legacy?: string;
  related_budget?: string;
  expected_date?: string;
  custom_properties?: any;
  notes?: string;
  created_at: string;
  updated_at: string;
  payment_date?: string;
}

// Interface para resposta da API
export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

// Interface para resposta paginada de pedidos
export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Parâmetros para buscar pedidos
export interface GetOrdersParams {
  page?: number;
  limit?: number;
}

// Função para buscar pedidos do usuário
export const getUserOrders = async (
  params: GetOrdersParams = {},
  router: any
): Promise<OrdersResponse> => {
  try {
    const { page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await axios.get(
      `${API_URL}/v1/orders?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );

    if (response.data && response.data.data) {
      return response.data.data as OrdersResponse;
    }

    // Retorna estrutura padrão se não houver dados
    return {
      orders: [],
      total: 0,
      page,
      limit,
      total_pages: 0,
    };
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

// Função para buscar um pedido específico por ID
export const getOrderById = async (
  orderId: string,
  router: any
): Promise<Order | null> => {
  try {
    // Como não temos endpoint específico para um pedido, buscamos todos e filtramos
    const ordersResponse = await getUserOrders({ limit: 100 }, router);
    const foundOrder = ordersResponse.orders.find(
      (order) => order._id === orderId || order.old_id.toString() === orderId
    );

    return foundOrder || null;
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

// Função helper para mapear status do backend para status legível
export const getOrderStatusDisplayName = (status?: OrderStatus): string => {
  if (!status) return "Status não informado";
  return status;
};

// Função helper para mapear estágio do backend para estágio legível
export const getOrderStageDisplayName = (stage?: OrderStage): string => {
  if (!stage) return "Estágio não informado";
  return stage;
};

// Função helper para mapear tipo do backend para tipo legível
export const getOrderTypeDisplayName = (type?: OrderType): string => {
  if (!type) return "Tipo não informado";
  return type;
};

// Função helper para verificar se pedido está em andamento
export const isOrderInProgress = (status?: OrderStatus): boolean => {
  const inProgressStatuses: OrderStatus[] = [
    "Em andamento",
    "Processando",
    "Em impressão",
    "Em separação",
    "Em entrega"
  ];
  return status ? inProgressStatuses.includes(status) : false;
};

// Função helper para verificar se pedido foi entregue
export const isOrderDelivered = (status?: OrderStatus): boolean => {
  return status === "Entregue";
};

// Função helper para verificar se pedido está pendente
export const isOrderPending = (status?: OrderStatus): boolean => {
  const pendingStatuses: OrderStatus[] = [
    "Pendente",
    "Em espera"
  ];
  return status ? pendingStatuses.includes(status) : false;
};
