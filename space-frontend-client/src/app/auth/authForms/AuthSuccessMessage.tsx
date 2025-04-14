import React from "react";
import { Box, Alert, Button, Typography, Paper, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";

interface AuthSuccessMessageProps {
  message?: string;
  redirectPath?: string;
  buttonText?: string;
}

const AuthSuccessMessage = ({
  message = "Cadastro realizado com sucesso!",
  redirectPath = "/auth/auth1/login",
  buttonText = "Ir para Login",
}: AuthSuccessMessageProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        maxWidth: 400,
        mx: "auto",
        mt: 2,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />

        <Typography variant="h4" color="primary" gutterBottom>
          Conta Criada!
        </Typography>

        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>

        <Box>
          <Typography variant="body2" color="textSecondary" paragraph>
            Você receberá um e-mail de confirmação em breve. Por favor,
            verifique sua caixa de entrada e spam.
          </Typography>
        </Box>

        <Alert severity="info" sx={{ width: "100%" }}>
          Para começar a usar sua conta, faça login com suas credenciais.
        </Alert>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          href={redirectPath}
          fullWidth
          sx={{ mt: 2 }}
        >
          {buttonText}
        </Button>

        <Typography variant="body2" color="textSecondary">
          Precisa de ajuda?{" "}
          <Link
            href="/contact"
            style={{
              color: "#1976d2",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Entre em contato
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default AuthSuccessMessage;
