"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Box, 
  Typography, 
  Alert, 
  Button,
  Container,
  Fade,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Skeleton,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { getPublicOrderById, PublicOrder } from "../../(DashboardLayout)/orders/services";
import { 
  getOrderStatusDisplayName,
  getOrderStageDisplayName,
  getOrderTypeDisplayName,
  getOrderStatusColor,
  formatOrderDate,
  getOrderNumber,
  getPaymentStatus,
  hasTracking,
  getTrackingCode,
  getTrackingService,
  getTrackingUrl,
  isTrackingAvailable
} from "../../(DashboardLayout)/orders/services";
import { 
  IconPackage, 
  IconRefresh, 
  IconCalendar, 
  IconTruck, 
  IconUser, 
  IconClipboard,
  IconCreditCard,
  IconHash,
  IconCopy,
  IconCheck,
  IconExternalLink
} from "@tabler/icons-react";
import PublicOrderStepper from "./PublicOrderStepper";

export default function PublicOrderPage() {
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [trackingFeedback, setTrackingFeedback] = useState<string | null>(null);
  const params = useParams();
  const orderId = params.id as string;

  const fetchOrder = async () => {
    if (!orderId) {
      setError("ID do pedido não fornecido na URL");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const orderData = await getPublicOrderById(orderId);
      setOrder(orderData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao carregar o pedido. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleRetryClick = () => {
    fetchOrder();
  };

  const handleCopyOrderId = async () => {
    if (!order) return;
    
    try {
      await navigator.clipboard.writeText(getOrderNumber(order));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleCopyTrackingCode = async () => {
    if (!order) return;
    
    const trackingCode = getTrackingCode(order);
    if (trackingCode === "Não disponível") {
      setTrackingFeedback('Código de rastreamento ainda não disponível. Tente novamente em alguns momentos.');
      setTimeout(() => setTrackingFeedback(null), 5000);
      return;
    }

    try {
      await navigator.clipboard.writeText(trackingCode);
      setTrackingFeedback('Código de rastreamento copiado!');
      setTimeout(() => setTrackingFeedback(null), 3000);
    } catch (err) {
      console.error('Erro ao copiar código de rastreamento:', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = trackingCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setTrackingFeedback('Código de rastreamento copiado!');
      setTimeout(() => setTrackingFeedback(null), 3000);
    }
  };

  const handleOpenTracking = () => {
    if (!order) return;
    
    const trackingUrl = getTrackingUrl(order);
    if (!trackingUrl) {
      setTrackingFeedback('Rastreamento ainda não disponível. Tente novamente em alguns momentos.');
      setTimeout(() => setTrackingFeedback(null), 5000);
      return;
    }

    window.open(trackingUrl, '_blank', 'noopener,noreferrer');
  };

  const renderLoadingSkeleton = () => (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={24} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderOrderInfo = () => {
    if (!order) return null;

    return (
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header do Pedido */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              <IconPackage size={32} color="primary" />
              <Box ml={2}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Pedido #{getOrderNumber(order)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Criado em {formatOrderDate(order.created_at)}
                </Typography>
              </Box>
            </Box>
            <Tooltip title={copied ? "Copiado!" : "Copiar número do pedido"}>
              <IconButton onClick={handleCopyOrderId} color="primary">
                {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Informações Principais */}
          <Grid container spacing={3}>
            {/* Status Detalhado com Stepper */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <PublicOrderStepper 
                    currentStatus={order.status || "Pendente"}
                    currentStage={order.stage}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Status Resumido */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Status Atual
                  </Typography>
                  <Chip
                    label={getOrderStatusDisplayName(order.status)}
                    color={getOrderStatusColor(order.status) as any}
                    variant="filled"
                    size="medium"
                    sx={{ fontSize: '0.875rem', fontWeight: 'bold', px: 2, py: 1 }}
                  />
                  {order.stage && (
                    <Box mt={2}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Estágio atual:
                      </Typography>
                      <Typography variant="body1" fontWeight="500">
                        {getOrderStageDisplayName(order.stage)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Rastreamento */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Rastreamento
                  </Typography>
                  {hasTracking(order) ? (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Serviço:
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {getTrackingService(order)}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Código de rastreamento:
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            {getTrackingCode(order)}
                          </Typography>
                          <Tooltip title="Copiar código">
                            <IconButton
                              size="small"
                              onClick={handleCopyTrackingCode}
                              sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                  color: 'info.main',
                                  backgroundColor: 'info.light',
                                }
                              }}
                            >
                              <IconCopy size={16} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      {isTrackingAvailable(order) && (
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          fullWidth
                          startIcon={<IconExternalLink size={16} />}
                          onClick={handleOpenTracking}
                          sx={{ 
                            borderRadius: 1.5,
                            textTransform: 'none',
                            fontWeight: '600'
                          }}
                        >
                          Rastrear pedido
                        </Button>
                      )}
                    </Stack>
                  ) : (
                    <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                      Código de rastreamento ainda não disponível. O rastreamento estará disponível assim que o pedido for enviado.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Detalhes do Pedido */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={3}>
                    Detalhes do Pedido
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {/* Tipo do Pedido */}
                    {order.type && (
                      <Grid item xs={12} sm={6} md={4}>
                        <Box>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Tipo do Pedido
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {getOrderTypeDisplayName(order.type)}
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {/* Data Esperada */}
                    {order.expected_date && (
                      <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" alignItems="center">
                          <IconCalendar size={20} color="primary" />
                          <Box ml={1}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                              Data Esperada
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                              {formatOrderDate(order.expected_date)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {/* Status de Pagamento */}
                    <Grid item xs={12} sm={6} md={4}>
                      <Box display="flex" alignItems="center">
                        <IconCreditCard size={20} color="primary" />
                        <Box ml={1}>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Pagamento
                          </Typography>
                          <Chip
                            label={getPaymentStatus(order)}
                            color={order.payment_date ? "success" : "warning"}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </Box>
                    </Grid>

                    {/* Data de Pagamento */}
                    {order.payment_date && (
                      <Grid item xs={12} sm={6} md={4}>
                        <Box>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Data do Pagamento
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {formatOrderDate(order.payment_date)}
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {/* Última Atualização */}
                    <Grid item xs={12} sm={6} md={4}>
                      <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Última Atualização
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {formatOrderDate(order.updated_at)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Produtos (se disponível) */}
            {order.products_list_legacy && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Produtos
                    </Typography>
                    {(() => {
                      try {
                        const products = JSON.parse(order.products_list_legacy);
                        return (
                          <Stack spacing={2}>
                            {products.map((product: any, index: number) => (
                              <Box 
                                key={index} 
                                sx={{ 
                                  p: 2, 
                                  bgcolor: (theme) => theme.palette.grey[100], 
                                  borderRadius: 1 
                                }}
                              >
                                <Grid container spacing={2} alignItems="center">
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="body1" fontWeight="500">
                                      {product.nome}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                      Quantidade
                                    </Typography>
                                    <Typography variant="body1" fontWeight="500">
                                      {product.quantidade}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                      Preço
                                    </Typography>
                                    <Typography variant="body1" fontWeight="500" color="primary">
                                      R$ {product.preco?.toFixed(2)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            ))}
                          </Stack>
                        );
                      } catch (error) {
                        return (
                          <Typography variant="body2" color="textSecondary">
                            {order.products_list_legacy}
                          </Typography>
                        );
                      }
                    })()}
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Propriedades Customizadas */}
            {order.custom_properties && Object.keys(order.custom_properties).length > 0 && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Informações Adicionais
                    </Typography>
                    <pre style={{ fontSize: '0.875rem', overflow: 'auto' }}>
                      {JSON.stringify(order.custom_properties, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageContainer title="Consulta de Pedido" description="Consulte o status do seu pedido">
      <Fade in timeout={800}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header */}
          <Box mb={4}>
            <Typography variant="h3" fontWeight="bold" mb={2}>
              Consulta de Pedido
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Acompanhe o status do seu pedido em tempo real.
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

            {trackingFeedback && (
              <Alert 
                severity={trackingFeedback.includes('não disponível') ? 'warning' : 'success'}
                sx={{ mb: 3, fontSize: '0.875rem' }}
              >
                {trackingFeedback}
              </Alert>
            )}
          </Box>

          {/* Conteúdo */}
          {isLoading ? renderLoadingSkeleton() : renderOrderInfo()}

          {/* Footer */}
          {order && (
            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Para mais informações, entre em contato conosco através dos nossos canais de atendimento.
              </Typography>
            </Box>
          )}
        </Container>
      </Fade>
    </PageContainer>
  );
}
