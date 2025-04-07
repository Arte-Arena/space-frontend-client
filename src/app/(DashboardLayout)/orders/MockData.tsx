"use client";
import { Order } from "@/types/order";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { IconTestPipe } from "@tabler/icons-react";

interface MockDataProps {
  onAddMockOrder: (order: Order) => void;
}

export const mockOrder1: Order = {
  id: "12345",
  order_number: "UNIF-2023-0001",
  status: "processing",
  total_amount: 2490.0,
  payment_status: "paid",
  shipping_status: "processing",
  product_type: "Uniformes",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  items: [
    {
      id: "item-1",
      product_name: "Pacote Uniformes - Ouro",
      quantity: 1,
      unit_price: 2490.0,
      total_price: 2490.0,
      product_details: {
        pacote: "Ouro",
        quantidade_camisas: 10,
        quantidade_calcas: 5,
        personalização: "Time de Futebol Estrelas FC",
      },
    },
  ],
};

export const mockOrder2: Order = {
  id: "67890",
  order_number: "UNIF-2023-0002",
  status: "pending",
  total_amount: 890.0,
  payment_status: "pending",
  shipping_status: "pending",
  product_type: "Uniformes",
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  items: [
    {
      id: "item-2",
      product_name: "Pacote Uniformes - Start",
      quantity: 1,
      unit_price: 890.0,
      total_price: 890.0,
      product_details: {
        pacote: "Start",
        quantidade_camisas: 5,
        quantidade_calcas: 0,
        personalização: "Escola de Dança Ritmo",
      },
    },
  ],
};

export const mockOrder3: Order = {
  id: "24680",
  order_number: "PERS-2023-0003",
  status: "delivered",
  total_amount: 697.5,
  payment_status: "paid",
  shipping_status: "delivered",
  product_type: "Outros",
  created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  items: [
    {
      id: "item-3",
      product_name: "Bandeira Personalizada Grande",
      quantity: 2,
      unit_price: 119.9,
      total_price: 239.8,
      product_details: {
        tamanho: "150x90cm",
        material: "Poliéster",
        acabamento: "Bainha reforçada",
        personalização: "Logo Empresa ABC",
      },
    },
    {
      id: "item-4",
      product_name: "Copos Térmicos Personalizados",
      quantity: 15,
      unit_price: 22.9,
      total_price: 343.5,
      product_details: {
        material: "Aço Inox",
        capacidade: "450ml",
        cor: "Preto",
        personalização: "Logo Empresa ABC",
      },
    },
    {
      id: "item-5",
      product_name: "Sandálias Personalizadas",
      quantity: 3,
      unit_price: 38.0,
      total_price: 114.0,
      product_details: {
        tamanho: "Variados",
        cor: "Azul",
        personalização: "Nome na tira",
      },
    },
  ],
};

export const mockOrder4: Order = {
  id: "13579",
  order_number: "UNIF-2023-0004",
  status: "shipped",
  total_amount: 4990.0,
  payment_status: "paid",
  shipping_status: "shipped",
  product_type: "Uniformes",
  created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  items: [
    {
      id: "item-6",
      product_name: "Pacote Uniformes - Premium",
      quantity: 1,
      unit_price: 4990.0,
      total_price: 4990.0,
      product_details: {
        pacote: "Premium",
        quantidade_camisas: 20,
        quantidade_calcas: 10,
        quantidade_jaquetas: 5,
        personalização: "Empresa Tech Solutions",
      },
    },
  ],
};

const MockData = ({ onAddMockOrder }: MockDataProps) => {
  const [isAdded1, setIsAdded1] = useState(false);
  const [isAdded2, setIsAdded2] = useState(false);
  const [isAdded3, setIsAdded3] = useState(false);
  const [isAdded4, setIsAdded4] = useState(false);

  const handleAddMockOrder1 = () => {
    onAddMockOrder(mockOrder1);
    setIsAdded1(true);
  };

  const handleAddMockOrder2 = () => {
    onAddMockOrder(mockOrder2);
    setIsAdded2(true);
  };

  const handleAddMockOrder3 = () => {
    onAddMockOrder(mockOrder3);
    setIsAdded3(true);
  };

  const handleAddMockOrder4 = () => {
    onAddMockOrder(mockOrder4);
    setIsAdded4(true);
  };

  return (
    <Box sx={{ mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<IconTestPipe size={16} />}
        onClick={handleAddMockOrder1}
        disabled={isAdded1}
      >
        {isAdded1 ? "Adicionado" : "Adicionar Uniforme Ouro (Em Processamento)"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<IconTestPipe size={16} />}
        onClick={handleAddMockOrder2}
        disabled={isAdded2}
      >
        {isAdded2 ? "Adicionado" : "Adicionar Uniforme Start (Pendente)"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<IconTestPipe size={16} />}
        onClick={handleAddMockOrder3}
        disabled={isAdded3}
      >
        {isAdded3
          ? "Adicionado"
          : "Adicionar Produtos Personalizados (Entregue)"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<IconTestPipe size={16} />}
        onClick={handleAddMockOrder4}
        disabled={isAdded4}
      >
        {isAdded4 ? "Adicionado" : "Adicionar Uniforme Premium (Enviado)"}
      </Button>
    </Box>
  );
};

export default MockData;
