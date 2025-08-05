"use client";
import {
  Box,
  Typography,
  useTheme,
  alpha,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  IconCheck,
  IconClock,
  IconCircle,
  IconPalette,
  IconPrinter,
  IconFlame,
  IconScissors,
  IconNeedle,
  IconEye,
  IconTruck,
  IconPackage,
} from "@tabler/icons-react";

interface SubStep {
  label: string;
  status: string[];
}

interface Step {
  label: string;
  status: string[];
  subSteps?: SubStep[];
}

interface CustomOrderStepperProps {
  currentStatus: string;
  currentStage?: string; // Para os sub-passos de produção
}

const CustomOrderStepper = ({ currentStatus, currentStage }: CustomOrderStepperProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getOrderSteps = (): Step[] => [
    { 
      label: 'Pedido', 
      status: ['Pendente'] 
    },
    { 
      label: 'Aprovação', 
      status: ['Em andamento', 'Arte OK'] 
    },
    { 
      label: 'Produção', 
      status: ['Processando'],
      subSteps: [
        { label: 'Design', status: ['Design'] },
        { label: 'Impressão', status: ['Impressão'] },
        { label: 'Sublimação', status: ['Sublimação'] },
        { label: 'Corte', status: ['Corte'] },
        { label: 'Costura', status: ['Costura'] },
        { label: 'Conferência', status: ['Conferência'] },
      ]
    },
    { 
      label: 'Expedição', 
      status: ['Expedição', 'Em separação'] 
    },
    { 
      label: 'Entrega', 
      status: ['Em entrega', 'Retirada', 'Entregue'] 
    }
  ];

  const getCurrentMainStep = (): number => {
    if (!currentStatus) return 0;
    
    const steps = getOrderSteps();
    
    // Primeiro, procura pelo currentStatus nos steps principais
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].status.includes(currentStatus)) {
        return i;
      }
    }
    
    // Se tem currentStage definido, usa o stage para determinar o step
    if (currentStage) {
      // Se currentStage é "Expedição", retorna o índice 3
      if (currentStage === 'Expedição') {
        return 3; // Expedição é o índice 3
      }
      // Se currentStage é um dos sub-steps de produção, retorna o índice 2
      const productionSubSteps = ['Design', 'Impressão', 'Sublimação', 'Corte', 'Costura', 'Conferência'];
      if (productionSubSteps.includes(currentStage)) {
        return 2; // Produção é o índice 2
      }
    }
    
    return 0;
  };

  const getCurrentSubStep = (subSteps: SubStep[]): number => {
    if (!currentStage) return -1;
    
    for (let i = 0; i < subSteps.length; i++) {
      if (subSteps[i].status.includes(currentStage)) {
        return i;
      }
    }
    return -1;
  };

  const getStepStatus = (stepIndex: number, subStepIndex?: number): 'completed' | 'active' | 'pending' => {
    const currentMainStep = getCurrentMainStep();
    
    if (stepIndex < currentMainStep) {
      return 'completed';
    } else if (stepIndex === currentMainStep) {
      if (subStepIndex !== undefined) {
        const steps = getOrderSteps();
        const currentStep = steps[stepIndex];
        if (currentStep.subSteps) {
          const currentSubStep = getCurrentSubStep(currentStep.subSteps);
          if (subStepIndex < currentSubStep) {
            return 'completed';
          } else if (subStepIndex === currentSubStep) {
            return 'active';
          } else {
            return 'pending';
          }
        }
      }
      return 'active';
    } else {
      return 'pending';
    }
  };

  const getStepIcon = (status: 'completed' | 'active' | 'pending', size: number = 20) => {
    switch (status) {
      case 'completed':
        return <IconCheck size={size} color={theme.palette.success.main} />;
      case 'active':
        return <IconClock size={size} color={theme.palette.primary.main} />;
      case 'pending':
        return <IconCircle size={size} color={theme.palette.grey[400]} />;
    }
  };

  const getStatusIcon = (label: string, size: number = 20, color?: string) => {
    const iconColor = color || theme.palette.text.primary;
    
    switch (label) {
      case 'Pedido':
        return <IconPackage size={size} color={iconColor} />;
      case 'Aprovação':
        return <IconEye size={size} color={iconColor} />;
      case 'Produção':
        return <IconNeedle size={size} color={iconColor} />;
      case 'Design':
        return <IconPalette size={size} color={iconColor} />;
      case 'Impressão':
        return <IconPrinter size={size} color={iconColor} />;
      case 'Sublimação':
        return <IconFlame size={size} color={iconColor} />;
      case 'Corte':
        return <IconScissors size={size} color={iconColor} />;
      case 'Costura':
        return <IconNeedle size={size} color={iconColor} />;
      case 'Conferência':
        return <IconEye size={size} color={iconColor} />;
      case 'Expedição':
        return <IconPackage size={size} color={iconColor} />;
      case 'Entrega':
        return <IconTruck size={size} color={iconColor} />;
      default:
        return <IconCircle size={size} color={iconColor} />;
    }
  };

  const getStepColor = (status: 'completed' | 'active' | 'pending') => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'active':
        return theme.palette.primary.main;
      case 'pending':
        return theme.palette.grey[400];
    }
  };

  const steps = getOrderSteps();
  const currentMainStep = getCurrentMainStep();

  return (
    <Box>
      <Typography variant="body2" fontWeight="600" color="textSecondary" mb={2}>
        Progresso do Pedido
      </Typography>
      
      <Stack spacing={isMobile ? 2 : 1.5}>
        {steps.map((step, stepIndex) => {
          const stepStatus = getStepStatus(stepIndex);
          const isProductionStep = step.subSteps && stepIndex === 2; // Produção é o índice 2
          const showSubSteps = isProductionStep && (stepStatus === 'active' || stepStatus === 'completed');
          
          return (
            <Box key={step.label}>
              {/* Main Step */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(getStepColor(stepStatus), 0.1),
                    border: `2px solid ${getStepColor(stepStatus)}`,
                  }}
                >
                  {stepStatus === 'completed' ? (
                    <IconCheck size={16} color={getStepColor(stepStatus)} />
                  ) : (
                    getStatusIcon(step.label, 16, getStepColor(stepStatus))
                  )}
                </Box>
                
                <Typography
                  variant="body2"
                  fontWeight={stepStatus === 'active' ? 600 : 500}
                  color={stepStatus === 'pending' ? 'textSecondary' : getStepColor(stepStatus)}
                >
                  {step.label}
                </Typography>
                
                {stepStatus === 'active' && (
                  <Typography
                    variant="caption"
                    color="primary.main"
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  >
                    Em andamento
                  </Typography>
                )}
              </Box>

              {/* Sub Steps para Produção */}
              {showSubSteps && step.subSteps && (
                <Box ml={isMobile ? 2 : 4} mt={1.5}>
                  <Stack spacing={1}>
                    {step.subSteps.map((subStep, subStepIndex) => {
                      const subStepStatus = getStepStatus(stepIndex, subStepIndex);
                      
                      return (
                        <Box key={subStep.label} display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: alpha(getStepColor(subStepStatus), 0.1),
                              border: `1.5px solid ${getStepColor(subStepStatus)}`,
                            }}
                          >
                            {subStepStatus === 'completed' ? (
                              <IconCheck size={12} color={getStepColor(subStepStatus)} />
                            ) : (
                              getStatusIcon(subStep.label, 12, getStepColor(subStepStatus))
                            )}
                          </Box>
                          
                          <Typography
                            variant="caption"
                            fontWeight={subStepStatus === 'active' ? 600 : 400}
                            color={subStepStatus === 'pending' ? 'textSecondary' : getStepColor(subStepStatus)}
                          >
                            {subStep.label}
                          </Typography>
                          
                          {subStepStatus === 'active' && (
                            <Typography
                              variant="caption"
                              color="primary.main"
                              sx={{
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                px: 0.75,
                                py: 0.25,
                                borderRadius: 0.5,
                                fontSize: '0.6rem',
                                fontWeight: 600,
                              }}
                            >
                              Atual
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {/* Linha conectora */}
              {stepIndex < steps.length - 1 && (
                <Box
                  sx={{
                    ml: 2,
                    mt: 1,
                    mb: 1,
                    width: 2,
                    height: isMobile ? 16 : 12,
                    backgroundColor: stepStatus === 'completed' 
                      ? theme.palette.success.main 
                      : theme.palette.grey[300],
                  }}
                />
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default CustomOrderStepper;
