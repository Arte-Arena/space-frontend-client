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
  Typography,
  Link,
  CircularProgress,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { logger } from "../../utils/logger";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const validateName = (name: string) => {
    if (!name.trim()) {
      return "Nome é obrigatório";
    } else if (name.trim().length < 3) {
      return "Nome deve ter pelo menos 3 caracteres";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "E-mail é obrigatório";
    } else if (!emailRegex.test(email)) {
      return "E-mail inválido";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Senha é obrigatória";
    } else if (password.length < 8) {
      return "Senha deve ter pelo menos 8 caracteres";
    } else if (!/(?=.*[a-z])/.test(password)) {
      return "Senha deve conter ao menos uma letra minúscula";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      return "Senha deve conter ao menos uma letra maiúscula";
    } else if (!/(?=.*\d)/.test(password)) {
      return "Senha deve conter ao menos um número";
    }
    return "";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string,
  ) => {
    if (!confirmPassword) {
      return "Confirme sua senha";
    } else if (confirmPassword !== password) {
      return "As senhas não coincidem";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "password") {
      setPasswordTouched(true);
    } else if (name === "confirmPassword") {
      setConfirmPasswordTouched(true);
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    let errorMessage = "";

    switch (field) {
      case "name":
        errorMessage = validateName(formData.name);
        break;
      case "email":
        errorMessage = validateEmail(formData.email);
        break;
      case "password":
        errorMessage = validatePassword(formData.password);
        break;
      case "confirmPassword":
        errorMessage = validateConfirmPassword(
          formData.confirmPassword,
          formData.password,
        );
        break;
    }

    setErrors({
      ...errors,
      [field]: errorMessage,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password,
    );

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) => error !== "") ||
      !agreeToTerms
    ) {
      if (!agreeToTerms) {
        logger.error("É necessário concordar com os termos e condições");
      }
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      logger.log("Cadastro enviado:", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        agreeToTerms,
      });
    } catch (error) {
      logger.error("Erro ao cadastrar:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordRequirements = () => {
    if (!passwordTouched || !formData.password) return null;

    const requirements = [
      { met: formData.password.length >= 8, text: "Pelo menos 8 caracteres" },
      {
        met: /[a-z]/.test(formData.password),
        text: "Pelo menos uma letra minúscula",
      },
      {
        met: /[A-Z]/.test(formData.password),
        text: "Pelo menos uma letra maiúscula",
      },
      { met: /[0-9]/.test(formData.password), text: "Pelo menos um número" },
    ];

    return (
      <Box className="mt-1 text-xs space-y-1">
        <Typography variant="caption" className="font-medium">
          Requisitos de senha:
        </Typography>
        {requirements.map((req, index) => (
          <Typography
            key={index}
            variant="caption"
            display="block"
            className={req.met ? "text-green-600" : "text-red-600"}
          >
            {req.met ? "✓ " : "✗ "}
            {req.text}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-4">
      <TextField
        fullWidth
        label="Nome completo"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          className: "rounded-md",
        }}
      />

      <TextField
        fullWidth
        label="E-mail"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          className: "rounded-md",
        }}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Senha"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={!!errors.password}
          helperText={errors.password}
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
        <TextField
          fullWidth
          label="Confirmar senha"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={() => handleBlur("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            className: "rounded-md",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {renderPasswordRequirements()}

      <FormControlLabel
        control={
          <Checkbox
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            color="primary"
            size="small"
          />
        }
        label={
          <Typography variant="body2">
            Concordo com os{" "}
            <Link href="#" underline="hover" className="text-blue-600">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="#" underline="hover" className="text-blue-600">
              Política de Privacidade
            </Link>
          </Typography>
        }
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        disabled={loading || !agreeToTerms}
        className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium mt-4"
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Criar conta"
        )}
      </Button>

      <Box className="text-center mt-4">
        <Typography variant="body2">
          Já tem uma conta?{" "}
          <Link
            href="/auth"
            underline="hover"
            className="text-blue-600 font-medium"
          >
            Faça login
          </Link>
        </Typography>
      </Box>
    </form>
  );
}
