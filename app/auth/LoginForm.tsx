'use client';

import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox, Box, Divider, Typography, Link } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-5">
      <TextField
        fullWidth
        label="E-mail"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        InputProps={{
          className: 'rounded-md'
        }}
      />

      <TextField
        fullWidth
        label="Senha"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          className: 'rounded-md',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Box className="flex justify-between items-center">
        <FormControlLabel
          control={
            <Checkbox 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
              size="small"
            />
          }
          label={<Typography variant="body2">Lembrar-me</Typography>}
        />
        <Link href="#" underline="hover" variant="body2" className="text-blue-600">
          Esqueceu a senha?
        </Link>
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        disableElevation
        className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium"
      >
        Entrar
      </Button>

      <Box className="flex items-center my-4">
        <Divider className="flex-1" />
        <Typography variant="body2" className="px-4 text-gray-500">
          OU
        </Typography>
        <Divider className="flex-1" />
      </Box>

      <Box className="text-center mt-4">
        <Typography variant="body2">
          Não tem uma conta?{' '}
          <Link href="/auth/signup" underline="hover" className="text-blue-600 font-medium">
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </form>
  );
}