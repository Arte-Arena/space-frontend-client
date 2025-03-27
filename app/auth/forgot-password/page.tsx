import Image from "next/image";
import { Container, Paper, Typography, Box } from "@mui/material";
import { ForgotPasswordForm } from "../index";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-zinc-100">
      <Container
        maxWidth="sm"
        className="min-h-screen flex items-center justify-center py-12"
      >
        <Paper elevation={3} className="w-full p-8 rounded-lg">
          <Box className="flex flex-col items-center mb-6">
            <Image
              src="/arte_arena_light.png"
              alt="Logo Arte Arena"
              width={180}
              height={60}
              className="mb-4"
              priority
            />
            <Typography
              variant="h5"
              component="h1"
              className="text-center font-medium"
            >
              Recuperar Senha
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-center mt-1"
            >
              Digite seu e-mail para receber um código de verificação
            </Typography>
          </Box>
          <ForgotPasswordForm />
        </Paper>
      </Container>
    </div>
  );
}
