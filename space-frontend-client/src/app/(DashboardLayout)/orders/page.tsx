"use client";
import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Alert, 
  Button,
  Container,
  Fade
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { getUserOrders } from "./services";
import { useRouter } from "next/navigation";
import { Order } from "./services";
import ModernOrderList from "./ModernOrderList";
import { IconPackage, IconRefresh } from "@tabler/icons-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const fetchOrders = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getUserOrders({ page, limit: 100 }, router);
      const data = response?.orders || [];
      setOrders(data);
      setFilteredOrders(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
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

  const handleRetryClick = () => {
    fetchOrders(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };



  return (
    <PageContainer title="Meus Pedidos" description="Gerenciamento de pedidos">
      <Fade in timeout={800}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box mb={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <IconPackage size={36} color="primary" />
              <Typography variant="h3" ml={2} fontWeight="bold">
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
          </Box>

          {/* Orders List */}
          <ModernOrderList
            orders={getPaginatedOrders()}
            isLoading={isLoading}
            error={null}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      </Fade>
    </PageContainer>
  );
}
