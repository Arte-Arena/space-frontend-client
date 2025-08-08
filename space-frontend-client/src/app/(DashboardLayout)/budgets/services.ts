import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Delivery {
  option: string;
  deadline: number;
  price: number;
}

export interface EarlyMode {
  date: string;
  tax: number;
}

export interface Discount {
  type: string;
  value: number;
  percentage: number;
}

export interface Installments {
  date: string;
  value: number;
}

export interface Billing {
  type: string;
  installments: Installments[];
}

export interface Address {
  cep: string;
  details: string;
}

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

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

export interface BudgetSignature {
  _id: string;
  related_budget: string;
  related_customer?: string | null;
  created_at: string;
  updated_at: string;
}

export const getUserBudgets = async (
  router: any,
): Promise<Budget[]> => {
  try {
    const response = await axios.get(`${API_URL}/v1/budgets`, {
      withCredentials: true,
    });

    const api = response.data as ApiResponse<Budget[]>;
    if (api && Array.isArray(api.data)) {
      return api.data;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        router?.push?.("/auth/auth1/login");
        throw new Error("Sessão expirada. Redirecionando para login...");
      }
      const message = (error.response.data as any)?.message;
      if (message) throw new Error(message);
      if (status >= 500) throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
      if (status >= 400) throw new Error("Erro na requisição. Verifique os dados.");
    }

    if (error instanceof Error) throw error;
    throw new Error("Erro desconhecido. Tente novamente mais tarde.");
  }
};

export const getBudgetById = async (
  budgetId: string,
  router: any,
): Promise<Budget | null> => {
  try {
    if (!budgetId || budgetId.trim() === "") {
      throw new Error("ID do budget é obrigatório");
    }

    const response = await axios.get(`${API_URL}/v1/budgets/${budgetId}`, {
      withCredentials: true,
    });

    const api = response.data as ApiResponse<Budget>;
    if (api && api.data) {
      return api.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        router?.push?.("/auth/auth1/login");
        throw new Error("Sessão expirada. Redirecionando para login...");
      }
      if (status === 400) throw new Error("ID do budget inválido");
      if (status === 404) throw new Error("Budget não encontrado");

      const message = (error.response.data as any)?.message;
      if (message) throw new Error(message);
      if (status >= 500) throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
    }

    if (error instanceof Error) throw error;
    throw new Error("Erro desconhecido. Tente novamente mais tarde.");
  }
};

export const signBudgetSignature = async (
  signatureId: string,
  router: any,
): Promise<void> => {
  try {
    if (!signatureId || signatureId.trim() === "") {
      throw new Error("ID da assinatura do budget é obrigatório");
    }

    await axios.patch(
      `${API_URL}/v1/budgets/signatures/${signatureId}`,
      {},
      { withCredentials: true },
    );
    return;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        router?.push?.("/auth/auth1/login");
        throw new Error("Sessão expirada. Redirecionando para login...");
      }
      if (status === 400) throw new Error("ID da assinatura inválido");
      if (status === 403) throw new Error("Você não tem permissão para assinar este budget");
      if (status === 404) throw new Error("Assinatura ou budget não encontrado");

      const message = (error.response.data as any)?.message;
      if (message) throw new Error(message);
      if (status >= 500) throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
      if (status >= 400) throw new Error("Erro na requisição. Verifique os dados.");
    }

    if (error instanceof Error) throw error;
    throw new Error("Erro desconhecido. Tente novamente mais tarde.");
  }
};


export const getBudgetSignatureById = async (
  signatureId: string,
  router: any,
): Promise<BudgetSignature | null> => {
  try {
    if (!signatureId || signatureId.trim() === "") {
      throw new Error("ID da assinatura do budget é obrigatório");
    }

    const response = await axios.get(
      `${API_URL}/v1/budgets/signatures/${signatureId}`,
      { withCredentials: true },
    );

    const api = response.data as ApiResponse<BudgetSignature>;
    if (api && api.data) {
      return api.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 401) {
        router?.push?.("/auth/auth1/login");
        throw new Error("Sessão expirada. Redirecionando para login...");
      }
      if (status === 400) throw new Error("ID da assinatura inválido");
      if (status === 403) throw new Error("Você não tem permissão para visualizar este budget");
      if (status === 404) throw new Error("Assinatura ou budget não encontrado");

      const message = (error.response.data as any)?.message;
      if (message) throw new Error(message);
      if (status >= 500) throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
      if (status >= 400) throw new Error("Erro na requisição. Verifique os dados.");
    }

    if (error instanceof Error) throw error;
    throw new Error("Erro desconhecido. Tente novamente mais tarde.");
  }
};
