"use client";
import { useEffect, useState } from "react";
import { Order } from "./services";
import { 
  Box, 
  Alert, 
  Skeleton, 
  Grid, 
  Stack, 
  Pagination,
  Typography,
  Fade
} from "@mui/material";
import ModernOrderCard from "./ModernOrderCard";

interface ModernOrderListProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ModernOrderList = ({ 
  orders, 
  isLoading, 
  error, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ModernOrderListProps) => {
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
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Skeleton
                variant="rectangular"
                height={320}
                sx={{ borderRadius: 3, bgcolor: "rgba(0, 0, 0, 0.08)" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
        {error}
      </Alert>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" color="textSecondary" mb={2}>
          Nenhum pedido encontrado
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Você ainda não fez nenhum pedido.
        </Typography>
      </Box>
    );
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box>
      <Grid container spacing={3} mb={4}>
        {filteredOrders.map((order, index) => (
          <Grid item xs={12} key={order._id || order.old_id || `order-${index}`}>
            <Fade in timeout={600 + (index * 100)}>
              <div>
                <ModernOrderCard order={order} />
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack spacing={2}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton 
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1rem',
                  minWidth: 40,
                  height: 40,
                },
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
                '& .Mui-selected': {
                  backgroundColor: 'primary.main !important',
                  color: 'white',
                },
              }}
            />
            <Typography variant="body2" color="textSecondary" textAlign="center">
              Página {currentPage} de {totalPages}
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ModernOrderList;
