"use client";
import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { Box, Alert, Skeleton } from "@mui/material";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

const OrderList = ({ orders, isLoading, error }: OrderListProps) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const sortedOrders = [...orders].sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setFilteredOrders(sortedOrders);
  }, [orders]);

  if (isLoading) {
    return (
      <Box>
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            variant="rectangular"
            height={160}
            sx={{ mb: 2 }}
          />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        Você ainda não fez nenhum pedido.
      </Alert>
    );
  }

  return (
    <Box>
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
};

export default OrderList;
