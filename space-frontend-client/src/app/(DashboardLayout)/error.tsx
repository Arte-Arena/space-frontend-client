"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard segment error:", error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper elevation={1} sx={{ p: 4, maxWidth: 560, width: "100%" }}>
        <Stack spacing={2}>
          <Typography variant="h4">Erro ao carregar esta área</Typography>
          <Typography color="textSecondary">
            Uma exceção interrompeu a renderização desta página. O erro foi
            enviado ao console do navegador para facilitar o diagnóstico.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={reset}>
              Tentar novamente
            </Button>
            <Button variant="outlined" href="/">
              Voltar ao início
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
