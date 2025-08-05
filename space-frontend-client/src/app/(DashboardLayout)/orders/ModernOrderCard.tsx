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
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../utils/date";
import {
  IconCalendarEvent,
  IconPackage,
  IconClock,
  IconReceipt,
  IconCheck,
  IconClockHour4,
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

  // Função para mapear status do pedido em etapas do stepper
  const getOrderSteps = () => {
    const allSteps = [
      { label: 'Pedido', status: ['Pendente'] },
      { label: 'Aprovação', status: ['Em andamento', 'Arte OK'] },
      { label: 'Produção', status: ['Processando', 'Em impressão', 'Impresso', 'Cortado', 'Costurado'] },
      { label: 'Finalização', status: ['Separação', 'Em separação', 'Prensa', 'Calandra', 'Conferido'] },
      { label: 'Entrega', status: ['Em entrega', 'Retirada', 'Entregue'] }
    ];

    return allSteps;
  };

  const getCurrentStep = () => {
    if (!order.status) return 0;
    
    const steps = getOrderSteps();
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].status.includes(order.status)) {
        return i;
      }
    }
    return 0;
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

        {/* Stepper Minimalista */}
        <Box mb={2}>
          <Typography variant="body2" fontWeight="600" color="textSecondary" mb={1}>
            Progresso do Pedido
          </Typography>
          <Stepper 
            activeStep={getCurrentStep()} 
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
              '& .MuiStepLabel-label': {
                fontSize: isMobile ? '0.75rem' : '0.7rem',
                fontWeight: 500,
              },
              '& .MuiStepIcon-root': {
                fontSize: isMobile ? '1rem' : '0.9rem',
              },
              '& .MuiStep-root': {
                padding: isMobile ? '4px 0' : '0 4px',
              }
            }}
          >
            {getOrderSteps().map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label.Mui-active': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: theme.palette.success.main,
                      fontWeight: 500,
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
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
