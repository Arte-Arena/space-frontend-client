"use client";
import { Order } from "@/types/order";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../../utils/currency";
import { IconShoppingCart, IconCalendarEvent } from "@tabler/icons-react";
import moment from "moment";

interface OrderCardProps {
  order: Order;
}

const translateStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pendente";
    case "processing":
      return "Em Processamento";
    case "shipped":
      return "Enviado";
    case "delivered":
      return "Entregue";
    case "cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  const handleUniformConfig = () => {
    router.push(`/uniforms/config/${order.id}`);
  };

  const formattedDate = () => {
    moment.locale("pt-br");
    return moment(order.created_at).format("DD/MM/YYYY");
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Pedido #{order.order_number}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconCalendarEvent size={16} />
              <Typography variant="body2" color="textSecondary">
                {formattedDate()}
              </Typography>
            </Stack>
          </Box>
          <Box mt={{ xs: 2, sm: 0 }}>
            <Chip
              label={translateStatus(order.status)}
              color={getStatusColor(order.status) as any}
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box my={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Itens:
          </Typography>
          {order.items.map((item, index) => (
            <Box key={item.id || index} mb={1}>
              <Typography variant="body2">
                {item.quantity}x {item.product_name}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="h6">
            Total: {formatCurrency(order.total_amount)}
          </Typography>

          {order.product_type === "Uniformes" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<IconShoppingCart size={18} />}
              onClick={handleUniformConfig}
            >
              Configurar Uniformes
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
