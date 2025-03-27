"use client";
import React from "react";
import { Button, Box, Typography, Alert, Stack } from "@mui/material";

export default function SuccessForm() {
  return (
    <Box className="flex flex-col gap-4 space-y-5 text-center">
      <Alert severity="success" className="mb-4">
        Senha redefinida com sucesso!
      </Alert>

      <Typography variant="body1">
        Você já pode fazer login com sua nova senha.
      </Typography>

      <Stack spacing={2} className="mt-4">
        <Button
          variant="contained"
          fullWidth
          disableElevation
          className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium"
          href="/auth"
        >
          Ir para login
        </Button>
      </Stack>
    </Box>
  );
}
