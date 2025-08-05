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
  const { page = 1, limit = 10 } = params;
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await axios.get(
      `${API_URL}/v2/orders?${queryParams.toString()}`,
      {
        withCredentials: true,
      }
    );

    if (response.data && response.data.data) {
      const data = response.data.data as OrdersResponse;
      
      // Validação e limpeza dos dados
      const cleanOrders = (data.orders || []).map((order): Order => ({
        _id: order._id || "",
        old_id: order.old_id || 0,
        created_by: order.created_by || undefined,
        related_seller: order.related_seller || undefined,
        related_designer: order.related_designer || undefined,
        tracking_code: order.tracking_code || undefined,
        status: order.status || undefined,
        stage: order.stage || undefined,
        type: order.type || undefined,
        url_trello: order.url_trello || undefined,
        products_list_legacy: order.products_list_legacy || undefined,
        related_budget: order.related_budget || undefined,
        expected_date: order.expected_date || undefined,
        custom_properties: order.custom_properties || undefined,
        notes: order.notes || undefined,
        created_at: order.created_at || new Date().toISOString(),
        updated_at: order.updated_at || new Date().toISOString(),
        payment_date: order.payment_date || undefined,
      }));

      return {
        orders: cleanOrders,
        total: data.total || 0,
        page: data.page || page,
        limit: data.limit || limit,
        total_pages: data.total_pages || 0,
      };
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
    try {
      handleApiError(error, router);
    } catch (handledError) {
      // Se a função de tratamento de erro lançar uma exceção,
      // retornamos dados vazios para evitar quebrar a aplicação
      console.error("Erro ao buscar pedidos:", handledError);
      return {
        orders: [],
        total: 0,
        page,
        limit,
        total_pages: 0,
      };
    }
    
    // Este código nunca será alcançado, mas é necessário para o TypeScript
    return {
      orders: [],
      total: 0,
      page,
      limit,
      total_pages: 0,
    };
  }
};

// Função para buscar um pedido específico por ID
export const getOrderById = async (
  orderId: string,
  router: any
): Promise<Order | null> => {
  try {
    if (!orderId || orderId.trim() === "") {
      return null;
    }

    // Como não temos endpoint específico para um pedido, buscamos todos e filtramos
    const ordersResponse = await getUserOrders({ limit: 100 }, router);
    
    if (!ordersResponse.orders || ordersResponse.orders.length === 0) {
      return null;
    }

    const foundOrder = ordersResponse.orders.find(
      (order) => 
        order._id === orderId || 
        order.old_id?.toString() === orderId ||
        order._id === orderId.toString()
    );

    return foundOrder || null;
  } catch (error) {
    try {
      handleApiError(error, router);
    } catch (handledError) {
      console.error("Erro ao buscar pedido por ID:", handledError);
      return null;
    }
    
    return null;
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

// Função helper para verificar se um pedido foi cancelado
export const isOrderCancelled = (status?: OrderStatus): boolean => {
  const cancelledStatuses: OrderStatus[] = [
    "Devolução"
  ];
  return status ? cancelledStatuses.includes(status) : false;
};

// Função helper para obter cor do status de forma segura
export const getOrderStatusColor = (status?: OrderStatus): string => {
  if (!status) return "default";
  
  if (isOrderPending(status)) return "warning";
  if (isOrderInProgress(status)) return "info";
  if (isOrderDelivered(status)) return "success";
  if (isOrderCancelled(status)) return "error";
  
  return "default";
};

// Função helper para formatar data de forma segura
export const formatOrderDate = (dateStr?: string): string => {
  if (!dateStr) return "Não informada";
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Data inválida";
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return "Data inválida";
  }
};

// Função helper para obter número do pedido de forma segura
export const getOrderNumber = (order: Order): string => {
  return order.old_id?.toString() || order._id || "N/A";
};

// Função helper para verificar se tem observações
export const hasOrderNotes = (order: Order): boolean => {
  return Boolean(order.notes && order.notes.trim().length > 0);
};

// Função helper para obter status de pagamento
export const getPaymentStatus = (order: Order): string => {
  if (order.payment_date) return "Pago";
  return "Pendente";
};

// Função helper para verificar se pode configurar uniforme
export const canConfigureUniform = (order: Order): boolean => {
  if (!order.status) return false;
  return isOrderPending(order.status) || isOrderInProgress(order.status);
};

// Função helper para tratar erros de API de forma padronizada
export const handleApiError = (error: unknown, router: any): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    
    if (status === 401) {
      router.push("/auth/auth1/login");
      throw new Error("Sessão expirada. Redirecionando para login...");
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (status && status >= 500) {
      throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
    }

    if (status && status >= 400) {
      throw new Error("Erro na requisição. Verifique os dados enviados.");
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("Erro desconhecido. Tente novamente mais tarde.");
};

// Função helper para validar dados de pedido
export const validateOrderData = (orderData: any): boolean => {
  if (!orderData || typeof orderData !== 'object') {
    return false;
  }

  // Verifica se tem pelo menos _id ou old_id
  if (!orderData._id && !orderData.old_id) {
    return false;
  }

  return true;
};
