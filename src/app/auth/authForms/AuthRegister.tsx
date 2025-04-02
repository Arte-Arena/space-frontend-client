"use client";
import React from "react";
import { Box, Typography, Button, Divider, Stack, Alert } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

const passwordRequirements = [
  { id: "length", label: "Mínimo de 8 caracteres", regex: /.{8,}/ },
  { id: "number", label: "Pelo menos um número", regex: /\d/ },
  { id: "uppercase", label: "Pelo menos uma letra maiúscula", regex: /[A-Z]/ },
  {
    id: "special",
    label: "Pelo menos um caractere especial",
    regex: /[!@#$%^&*(),.?":{}|<>]/,
  },
];

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Digite um email válido")
    .max(50, "Email deve ter no máximo 50 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres")
    .matches(/\d/, "Senha deve conter pelo menos um número")
    .matches(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Senha deve conter pelo menos um caractere especial",
    )
    .matches(
      /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/,
      "Senha não pode conter acentos ou caracteres especiais além dos permitidos",
    ),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = React.useState<{
    [key: string]: boolean;
  }>({});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        throw new Error("Erro ao criar conta");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao criar conta");
      } finally {
        setIsLoading(false);
      }
    },
  });

  React.useEffect(() => {
    const password = formik.values.password;
    const newRequirements = passwordRequirements.reduce(
      (acc, requirement) => {
        acc[requirement.id] = requirement.regex.test(password);
        return acc;
      },
      {} as { [key: string]: boolean },
    );
    setPasswordRequirementsMet(newRequirements);
  }, [formik.values.password]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Cadastre-se com" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            ou cadastre-se com
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
          <CustomTextField
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <CustomFormLabel htmlFor="email">E-mail</CustomFormLabel>
          <CustomTextField
            id="email"
            name="email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <CustomFormLabel htmlFor="confirmPassword">
            Confirmar Senha
          </CustomFormLabel>
          <CustomTextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {formik.values.password && (
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Requisitos da senha:
              </Typography>
              {passwordRequirements.map((req) => (
                <Typography
                  key={req.id}
                  variant="caption"
                  color={
                    passwordRequirementsMet[req.id]
                      ? "success.main"
                      : "text.secondary"
                  }
                  display="block"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {passwordRequirementsMet[req.id] ? "✓" : "○"} {req.label}
                </Typography>
              ))}
            </Box>
          )}
        </Stack>

        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
