"use client";
import { useEffect, useState } from "react";
import { Order } from "./services";
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
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
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
            sx={{ mb: 2, borderRadius: 2, bgcolor: "rgba(0, 0, 0, 0.15)" }}
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
        <OrderCard key={order._id || order.old_id || `order-${Date.now()}`} order={order} />
      ))}
    </Box>
  );
};

export default OrderList;
