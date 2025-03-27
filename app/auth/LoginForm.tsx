"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { logger } from "../utils/logger";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("E-mail é obrigatório");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Senha é obrigatória");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        logger.log({ email, password, rememberMe });
      } catch (error) {
        logger.error("Erro ao fazer login:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-5">
      <TextField
        fullWidth
        label="E-mail"
        variant="outlined"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => validateEmail(email)}
        error={!!emailError}
        helperText={emailError}
        InputProps={{
          className: "rounded-md",
        }}
      />

      <TextField
        fullWidth
        label="Senha"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        onBlur={() => validatePassword(password)}
        error={!!passwordError}
        helperText={passwordError}
        InputProps={{
          className: "rounded-md",
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
          ),
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
        <Link
          href="/auth/forgot-password"
          underline="hover"
          variant="body2"
          className="text-blue-600"
        >
          Esqueceu a senha?
        </Link>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
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
          Não tem uma conta?{" "}
          <Link
            href="/auth/signup"
            underline="hover"
            className="text-blue-600 font-medium"
          >
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </form>
  );
}
