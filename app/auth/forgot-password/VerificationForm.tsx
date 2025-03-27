"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface VerificationFormProps {
  email: string;
  verificationCode: string[];
  verificationError: string;
  generatedCode: string;
  loading: boolean;
  newPassword: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleCodeChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handleVerifyCode: (e: React.FormEvent) => void;
  handleRequestNewCode: () => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  validatePassword: (password: string) => boolean;
  validateConfirmPassword: (confirm: string) => boolean;
  handleTogglePasswordVisibility: () => void;
  handleToggleConfirmPasswordVisibility: () => void;
}

export default function VerificationForm({
  email,
  verificationCode,
  verificationError,
  generatedCode,
  loading,
  newPassword,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  showPassword,
  showConfirmPassword,
  handleCodeChange,
  handleKeyDown,
  handleVerifyCode,
  handleRequestNewCode,
  setNewPassword,
  setConfirmPassword,
  validatePassword,
  validateConfirmPassword,
  handleTogglePasswordVisibility,
  handleToggleConfirmPasswordVisibility,
}: VerificationFormProps) {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const renderPasswordRequirements = () => {
    if (!passwordTouched || !newPassword) return null;

    const requirements = [
      { met: newPassword.length >= 8, text: "Pelo menos 8 caracteres" },
      {
        met: /[a-z]/.test(newPassword),
        text: "Pelo menos uma letra minúscula",
      },
      {
        met: /[A-Z]/.test(newPassword),
        text: "Pelo menos uma letra maiúscula",
      },
      { met: /[0-9]/.test(newPassword), text: "Pelo menos um número" },
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
    <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 space-y-5">
      <Alert severity="success" className="mb-4">
        Um código de verificação foi enviado para {email}
      </Alert>

      <Typography variant="body1" className="text-center mb-2">
        Digite o código de 5 dígitos
      </Typography>

      <Box className="flex justify-center gap-2 mb-4">
        {verificationCode.map((digit, index) => (
          <TextField
            key={index}
            id={`code-${index}`}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            variant="outlined"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                textTransform: "uppercase",
              },
            }}
            sx={{ width: "3rem", height: "3.5rem" }}
            autoFocus={index === 0}
          />
        ))}
      </Box>

      {verificationError && (
        <Typography color="error" variant="body2" className="text-center">
          {verificationError}
        </Typography>
      )}

      <Typography variant="body2" className="text-center text-gray-500">
        Código gerado (para simulação): {generatedCode}
      </Typography>

      <TextField
        fullWidth
        label="Nova senha"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          if (!passwordTouched) setPasswordTouched(true);
        }}
        onBlur={() => {
          setPasswordTouched(true);
          validatePassword(newPassword);
        }}
        error={passwordTouched && !!passwordError}
        helperText={passwordTouched && passwordError ? passwordError : ""}
        slotProps={{
          input: {
            className: "rounded-md",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {renderPasswordRequirements()}

      <TextField
        fullWidth
        label="Confirmar nova senha"
        variant="outlined"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (!confirmPasswordTouched) setConfirmPasswordTouched(true);
        }}
        onBlur={() => {
          setConfirmPasswordTouched(true);
          validateConfirmPassword(confirmPassword);
        }}
        error={confirmPasswordTouched && !!confirmPasswordError}
        helperText={
          confirmPasswordTouched && confirmPasswordError
            ? confirmPasswordError
            : ""
        }
        slotProps={{
          input: {
            className: "rounded-md",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        disabled={
          loading ||
          (passwordTouched && !!passwordError) ||
          (confirmPasswordTouched && !!confirmPasswordError)
        }
        className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium mt-4"
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Redefinir senha"
        )}
      </Button>

      <Box className="text-center">
        <Typography variant="body2">
          Não recebeu o código?{" "}
          <Link
            component="button"
            type="button"
            underline="hover"
            className="text-blue-600 font-medium"
            onClick={handleRequestNewCode}
            disabled={loading}
          >
            Reenviar
          </Link>
        </Typography>
      </Box>

      <Box className="text-center mt-4">
        <Typography variant="body2">
          <Link
            href="/auth"
            underline="hover"
            className="text-blue-600 font-medium"
          >
            Voltar para login
          </Link>
        </Typography>
      </Box>
    </form>
  );
}
