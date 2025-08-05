"use client";
import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import CustomOrderStepper from "./CustomOrderStepper";

const StepperDemo = () => {
  const [demoStatus, setDemoStatus] = useState("Pendente");
  const [demoStage, setDemoStage] = useState<string | undefined>(undefined);

  const testCases = [
    { status: "Pendente", stage: undefined, label: "Pedido Pendente" },
    { status: "Em andamento", stage: undefined, label: "Em Aprovação" },
    { status: "Arte OK", stage: undefined, label: "Arte Aprovada" },
    { status: "Processando", stage: "Design", label: "Produção: Design" },
    { status: "Processando", stage: "Impressão", label: "Produção: Impressão" },
    { status: "Processando", stage: "Sublimação", label: "Produção: Sublimação" },
    { status: "Processando", stage: "Costura", label: "Produção: Costura" },
    { status: "Processando", stage: "Expedição", label: "Produção: Expedição" },
    { status: "Processando", stage: "Corte", label: "Produção: Corte" },
    { status: "Processando", stage: "Conferência", label: "Produção: Conferência" },
    { status: "Em entrega", stage: undefined, label: "Em Entrega" },
    { status: "Entregue", stage: undefined, label: "Entregue" },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Demo do Novo Stepper de Pedidos
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Teste diferentes estágios:
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {testCases.map((testCase, index) => (
              <Button
                key={index}
                variant={demoStatus === testCase.status && demoStage === testCase.stage ? "contained" : "outlined"}
                size="small"
                onClick={() => {
                  setDemoStatus(testCase.status);
                  setDemoStage(testCase.stage);
                }}
              >
                {testCase.label}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Preview do Stepper:
          </Typography>
          
          <Typography variant="body2" color="textSecondary" mb={2}>
            Status atual: <strong>{demoStatus}</strong>
            {demoStage && (
              <>
                {" | "}
                Estágio: <strong>{demoStage}</strong>
              </>
            )}
          </Typography>
          
          <CustomOrderStepper 
            currentStatus={demoStatus} 
            currentStage={demoStage}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StepperDemo;
