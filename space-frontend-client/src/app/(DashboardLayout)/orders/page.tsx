"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Alert, Button } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { getUserOrders } from "./services";
import { useRouter } from "next/navigation";
import { Order } from "./services";
import OrderList from "./OrderList";
// import OrderFilter, { FilterOptions } from "./OrderFilter";
import { IconPackage, IconRefresh } from "@tabler/icons-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getUserOrders({ page: 1, limit: 100 }, router);
      const data = response?.orders || [];
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Ocorreu um erro ao carregar seus pedidos. Tente novamente mais tarde.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [router]);

  /* Filtro desativado temporariamente
  const handleFilter = (filters: FilterOptions) => {
    let filtered = [...orders];
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === filters.status.toLowerCase());
    }
    
    if (filters.productType) {
      filtered = filtered.filter(order => order.product_type.toLowerCase() === filters.productType.toLowerCase());
    }
    
    if (filters.stage) {
      filtered = filtered.filter(order => 
        order.estagio_descricao && 
        order.estagio_descricao.toLowerCase() === filters.stage.toLowerCase()
      );
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        (order.order_number && order.order_number.toLowerCase().includes(searchLower)) ||
        (order.orcamento_id && order.orcamento_id.toString().includes(searchLower))
      );
    }
    
    if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= filters.dateRange!.start! && orderDate <= filters.dateRange!.end!;
      });
    }
    
    setFilteredOrders(filtered);
  };
  */

  const handleRetryClick = () => {
    fetchOrders();
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
              Acompanhe o status de todos os seus pedidos e veja detalhes como
              valores, status e datas de entrega.
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleRetryClick}
                    startIcon={<IconRefresh size={16} />}
                  >
                    Tentar novamente
                  </Button>
                }
              >
                {error}
              </Alert>
            )}

            {/* Filtro desativado temporariamente
            <Box sx={{ mb: 3 }}>
              <OrderFilter onFilter={handleFilter} />
            </Box>
            */}

            <OrderList
              orders={filteredOrders}
              isLoading={isLoading}
              error={null}
            />
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
