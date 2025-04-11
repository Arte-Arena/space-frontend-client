"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Alert } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { getOrders } from "@/services/orders";
import { useRouter } from "next/navigation";
import { Order } from "@/types/order";
import OrderList from "./OrderList";
import OrderFilter, { FilterOptions } from "./OrderFilter";
import { IconPackage } from "@tabler/icons-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getOrders(router);
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(
          "Ocorreu um erro ao carregar seus pedidos. Tente novamente mais tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleFilter = (filters: FilterOptions) => {
    let result = [...orders];

    if (filters.status) {
      result = result.filter(
        (order) => order.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    if (filters.productType) {
      result = result.filter(
        (order) => order.product_type === filters.productType,
      );
    }

    if (filters.searchTerm) {
      result = result.filter((order) =>
        order.order_number
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()),
      );
    }

    setFilteredOrders(result);
  };

  return (
    <PageContainer title="Meus Pedidos" description="Gerenciamento de pedidos">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconPackage size={32} />
              <Typography variant="h4" ml={1}>
                Meus Pedidos
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Acompanhe o status de todos os seus pedidos e configure seus
              uniformes quando necessário.
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              Atualmente, o sistema exibe pedidos relacionados aos uniformes.
              Estamos trabalhando para implementar a visualização de todos os
              tipos de pedidos em breve.
            </Alert>

            <OrderFilter onFilter={handleFilter} />

            <OrderList
              orders={filteredOrders}
              isLoading={isLoading}
              error={error}
            />
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
