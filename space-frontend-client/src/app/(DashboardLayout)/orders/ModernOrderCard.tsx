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
  useTheme,
  alpha,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../utils/date";
import CustomOrderStepper from "./CustomOrderStepper";
import {
  IconCalendarEvent,
  IconPackage,
  IconClock,
  IconReceipt,
  IconCheck,
  IconClockHour4,
  IconShare,
} from "@tabler/icons-react";

interface ProductLegacy {
  id: number;
  uid: number;
  nome: string;
  prazo: number;
  preco: number;
  esboco: string;
  material: string;
  quantidade: number;
  medida_linear: number;
}

interface ModernOrderCardProps {
  order: Order;
}

const ModernOrderCard = ({ order }: ModernOrderCardProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUniformConfig = () => {
    if (order.related_budget) {
      router.push(`/orders/uniforms/${order.related_budget}`);
    }
  };

  const handleShareOrder = async () => {
    const shareUrl = `${window.location.origin}/order/${order._id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Aqui você pode adicionar um toast/snackbar para mostrar que foi copiado
      console.log('Link copiado para a área de transferência');
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const formatEstimatedDate = (dateStr?: string) => {
    if (!dateStr) return "Não definida";
    try {
      return formatDate(dateStr);
    } catch {
      return "Data inválida";
    }
  };

  const parseProductsLegacy = (): ProductLegacy[] => {
    if (!order.products_list_legacy) return [];
    try {
      return JSON.parse(order.products_list_legacy);
    } catch {
      return [];
    }
  };

  const products = parseProductsLegacy();
  const totalValue = products.reduce((sum, product) => sum + (product.preco * product.quantidade), 0);

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: theme.shadows[1],
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[3],
        }
      }}
    >
      <CardContent sx={{ p: isMobile ? 1.5 : 2.5 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}
             flexDirection={isMobile ? 'column' : 'row'} gap={isMobile ? 1 : 0}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
              <IconPackage size={18} color={theme.palette.primary.main} />
              <Typography variant="h6" fontWeight="600">
                Pedido #{getOrderNumber(order)}
              </Typography>
              <Tooltip title="Compartilhar pedido">
                <IconButton
                  size="small"
                  onClick={handleShareOrder}
                  sx={{
                    ml: 0.5,
                    p: 0.5,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  <IconShare size={16} />
                </IconButton>
              </Tooltip>
            </Stack>
            
            {order.related_budget && (
              <Chip
                size="small"
                label={`Orçamento #${order.related_budget}`}
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
          
          <Chip
            label={getOrderStatusDisplayName(order.status)}
            color={getOrderStatusColor(order.status) as any}
            size="small"
            sx={{ fontWeight: '600', alignSelf: isMobile ? 'flex-start' : 'auto' }}
          />
        </Box>

        {/* Stepper Personalizado */}
        <Box mb={2}>
          <CustomOrderStepper 
            currentStatus={order.status || ''} 
            currentStage={order.stage} 
          />
        </Box>

        {/* Produtos */}
        {products.length > 0 && (
          <Box mb={2}>
            <Typography variant="body2" fontWeight="600" color="textSecondary" mb={1}>
              Produtos ({products.length})
            </Typography>
            <Stack spacing={1}>
              {products.map((product, index) => (
                <Box 
                  key={product.id || index}
                  sx={{
                    p: 1.5,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    borderRadius: 1,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start"
                       flexDirection={isMobile ? 'column' : 'row'} gap={isMobile ? 1 : 0}>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight="500" mb={0.5}>
                        {product.nome}
                      </Typography>
                      <Stack direction={isMobile ? 'column' : 'row'} spacing={isMobile ? 0.5 : 2}>
                        <Typography variant="caption" color="textSecondary">
                          Qtd: {product.quantidade}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Unitário: R$ {product.preco.toFixed(2)}
                        </Typography>
                      </Stack>
                    </Box>
                    <Typography 
                      variant="body2" 
                      fontWeight="600" 
                      color="primary.main"
                      sx={{ alignSelf: isMobile ? 'flex-start' : 'auto', mt: isMobile ? 0.5 : 0 }}
                    >
                      R$ {(product.preco * product.quantidade).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
              
              {products.length > 1 && (
                <Box 
                  sx={{
                    p: 1,
                    backgroundColor: alpha(theme.palette.success.main, 0.08),
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" fontWeight="600">
                    Total
                  </Typography>
                  <Typography variant="body2" fontWeight="700" color="success.main">
                    R$ {totalValue.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        )}

        {/* Informações básicas */}
        <Stack spacing={1.5}>
          <Box display="flex" justifyContent="space-between" 
               flexDirection={isMobile ? 'column' : 'row'} 
               alignItems={isMobile ? 'flex-start' : 'center'}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconCalendarEvent size={14} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="textSecondary">
                Criado em
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight="500" sx={{ mt: isMobile ? 0.5 : 0 }}>
              {formatOrderDate(order.created_at)}
            </Typography>
          </Box>

          {order.expected_date && (
            <Box display="flex" justifyContent="space-between" 
                 flexDirection={isMobile ? 'column' : 'row'} 
                 alignItems={isMobile ? 'flex-start' : 'center'}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconClock size={14} color={theme.palette.info.main} />
                <Typography variant="body2" color="textSecondary">
                  Previsão
                </Typography>
              </Stack>
              <Typography variant="body2" fontWeight="500" sx={{ mt: isMobile ? 0.5 : 0 }}>
                {formatEstimatedDate(order.expected_date)}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" 
               flexDirection={isMobile ? 'column' : 'row'} 
               alignItems={isMobile ? 'flex-start' : 'center'}>
            <Typography 
              variant="body2" 
              fontWeight="500"
              color={getPaymentStatus(order) === "Pago" ? "success.main" : "warning.main"}
              sx={{ mt: isMobile ? 0.5 : 0, display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {getPaymentStatus(order) === "Pago" ? (
                <>
                  <IconCheck size={14} color={theme.palette.success.main} />
                  Pagamento feito
                </>
              ) : (
                <>
                  <IconClockHour4 size={14} color={theme.palette.warning.main} />
                  Pagamento pendente
                </>
              )}
            </Typography>
          </Box>

          {order.stage && (
            <Box display="flex" justifyContent="space-between" 
                 flexDirection={isMobile ? 'column' : 'row'} 
                 alignItems={isMobile ? 'flex-start' : 'center'}>
              <Typography variant="body2" color="textSecondary">
                Estágio
              </Typography>
              <Typography variant="body2" fontWeight="500" sx={{ mt: isMobile ? 0.5 : 0 }}>
                {getOrderStageDisplayName(order.stage)}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Botão de configurar uniforme */}
        {canConfigureUniform(order) && order.related_budget && (
          <>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              startIcon={<IconPackage size={16} />}
              onClick={handleUniformConfig}
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: '600'
              }}
            >
              Configurar uniforme
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernOrderCard;
