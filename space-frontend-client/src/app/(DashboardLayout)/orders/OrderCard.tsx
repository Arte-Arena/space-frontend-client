"use client";
import { 
  Order, 
  getOrderStatusDisplayName, 
  getOrderStageDisplayName, 
  getOrderTypeDisplayName, 
  getOrderStatusColor,
  formatOrderDate,
  getOrderNumber,
  getPaymentStatus,
  canConfigureUniform,
  hasOrderNotes
} from "./services";
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
  IconNote,
} from "@tabler/icons-react";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  const handleUniformConfig = () => {
    if (!order.related_budget) return;
    router.push(`/orders/uniforms/${order.related_budget}`);
  };

  const hasUniformPackage = () => {
    // Como não temos items na nova estrutura, vamos verificar por outras propriedades
    // ou assumir que todos os pedidos podem configurar uniformes
    return true;
  };

  const formatEstimatedDate = (dateStr?: string) => {
    if (!dateStr) return "Não definida";
    try {
      return formatDate(dateStr);
    } catch {
      return "Data inválida";
    }
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
              Pedido #{getOrderNumber(order)}
              {order.related_budget && (
                <Tooltip title="ID do Orçamento">
                  <Chip
                    size="small"
                    label={`Orçamento #${order.related_budget}`}
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
              )}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
              <IconCalendarEvent size={16} />
              <Typography variant="body2" color="textSecondary">
                {formatOrderDate(order.created_at)}
              </Typography>
            </Stack>
          </Box>
          <Box mt={{ xs: 2, sm: 0 }}>
            <Chip
              label={getOrderStatusDisplayName(order.status)}
              color={getOrderStatusColor(order.status) as any}
              size="small"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box my={2}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Informações do pedido:
          </Typography>
          <Box sx={{ maxHeight: "150px", overflowY: "auto", pr: 1 }}>
            <Stack spacing={1}>
              {order.type && (
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Tipo:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {getOrderTypeDisplayName(order.type)}
                  </Typography>
                </Box>
              )}
              {order.stage && (
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Estágio:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {getOrderStageDisplayName(order.stage)}
                  </Typography>
                </Box>
              )}
              {order.tracking_code && (
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2">Código de rastreamento:</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {order.tracking_code}
                  </Typography>
                </Box>
              )}
            </Stack>
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
                  ID do Pedido:
                </Typography>
              </Stack>
              <Typography variant="body1">{order.old_id || "N/A"}</Typography>
            </Box>

            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconClock size={16} />
                <Typography variant="body2" color="textSecondary">
                  Data prevista:
                </Typography>
              </Stack>
              <Typography variant="body1">
                {formatEstimatedDate(order.expected_date)}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconReceipt size={16} />
              <Typography variant="body2" color="textSecondary">
                Status do pagamento:
              </Typography>
            </Stack>
            <Typography variant="h6">
              {getPaymentStatus(order)}
            </Typography>
          </Box>
        </Stack>

        {/* Removido: seção de observações conforme solicitado */}

        {hasUniformPackage() && canConfigureUniform(order) && order.related_budget && (
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
              Configurar uniforme
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
