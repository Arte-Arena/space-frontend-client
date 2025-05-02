export interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_status: string;
  shipping_status: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  data_prevista?: string;
  estagio_descricao?: string;
  orcamento_id?: number;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_details?: any;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type ShippingStatus = "pending" | "processing" | "shipped" | "delivered";

export type ProductType = "Uniformes" | "Outros";
