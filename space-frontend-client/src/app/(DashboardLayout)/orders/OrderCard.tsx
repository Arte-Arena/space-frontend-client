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
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../../utils/currency";
import { formatDate } from "../../../utils/date";
import {
  IconCalendarEvent,
  IconPackage,
  IconClock,
  IconReceipt,
} from "@tabler/icons-react";

interface OrderCardProps {
  order: Order;
}

const translateStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pendente";
    case "processing":
      return "Em produção";
    case "completed":
      return "Finalizado";
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
    case "completed":
      return "success";
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
    if (order.orcamento_id) {
      router.push(`/orders/uniforms/${order.orcamento_id}`);
    }
  };

  const hasUniformPackage = () => {
    return order.items.some((item) =>
      item.product_name.includes("Pacote de Uniforme"),
    );
  };

  const canConfigureUniform = () => {
    if (
      order.status.toLowerCase() !== "pending" &&
      order.status.toLowerCase() !== "processing"
    ) {
      return false;
    }

    return hasUniformPackage();
  };

  const formatEstimatedDate = (dateStr: string | undefined) => {
    if (!dateStr) return "Não definida";
    return formatDate(dateStr);
  };

  const getTotalItems = () => {
    return order.items.reduce((acc, item) => acc + item.quantity, 0);
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
            <Typography variant="subtitle1" fontWeight="bold">
              Pedido #{order.order_number}
              {order.orcamento_id && (
                <Tooltip title="ID do Orçamento">
                  <Chip
                    size="small"
                    label={`Orçamento #${order.orcamento_id}`}
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
              <IconCalendarEvent size={16} />
              <Typography variant="body2" color="textSecondary">
                {formatDate(order.created_at)}
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
          <Box sx={{ maxHeight: "150px", overflowY: "auto", pr: 1 }}>
            {order.items.map((item, index) => (
              <Box
                key={item.id || index}
                mb={1}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="body2">
                  {item.quantity}x {item.product_name}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(item.total_price)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={2}
          justifyContent="space-between"
        >
          <Box display="flex" gap={2}>
            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconPackage size={16} />
                <Typography variant="body2" color="textSecondary">
                  Total de itens:
                </Typography>
              </Stack>
              <Typography variant="body1">{getTotalItems()}</Typography>
            </Box>

            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconClock size={16} />
                <Typography variant="body2" color="textSecondary">
                  Data prevista:
                </Typography>
              </Stack>
              <Typography variant="body1">
                {formatEstimatedDate(order.data_prevista)}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconReceipt size={16} />
              <Typography variant="body2" color="textSecondary">
                Valor total:
              </Typography>
            </Stack>
            <Typography variant="h6">
              {formatCurrency(order.total_amount)}
            </Typography>
          </Box>
        </Stack>

        {hasUniformPackage() && order.orcamento_id && (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={2}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<IconPackage size={18} />}
              onClick={handleUniformConfig}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              Configurar Uniforme
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
