"use client";
import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";

interface EmailFormProps {
  email: string;
  emailError: string;
  loading: boolean;
  handleEmailChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleRequestCode: (e: React.FormEvent) => Promise<void>;
}

export default function EmailForm({
  email,
  emailError,
  loading,
  handleEmailChange,
  handleRequestCode,
}: EmailFormProps) {
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!emailError) {
      handleRequestCode(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 space-y-5"
      noValidate
    >
      <TextField
        fullWidth
        label="E-mail"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => {
          handleEmailChange(e);
          if (!touched) setTouched(true);
        }}
        onBlur={() => setTouched(true)}
        error={touched && !!emailError}
        helperText={touched && emailError ? emailError : ""}
        InputProps={{
          className: "rounded-md",
        }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        disabled={loading || (touched && !!emailError)}
        className="bg-blue-600 hover:bg-blue-700 py-3 normal-case font-medium"
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Solicitar código"
        )}
      </Button>
      <Box className="text-center mt-4">
        <Typography variant="body2">
          Lembrou sua senha?{" "}
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
