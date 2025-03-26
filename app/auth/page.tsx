import Image from 'next/image';
import { LoginForm, SocialLogin } from './index';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';

export default function LoginPage() {
  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center justify-center py-12">
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
          <Typography variant="h5" component="h1" className="text-center font-medium">
            Entrar
          </Typography>
          <Typography variant="body2" color="text.secondary" className="text-center mt-1">
            Bem-vindo de volta! Por favor, digite seus dados.
          </Typography>
        </Box>
        
        <SocialLogin />
        
        <Box className="flex items-center my-6">
          <Divider className="flex-1" />
          <Typography variant="body2" className="px-4 text-gray-500">
            ou entre com e-mail
          </Typography>
          <Divider className="flex-1" />
        </Box>
        
        <LoginForm />
      </Paper>
    </Container>
  );
}