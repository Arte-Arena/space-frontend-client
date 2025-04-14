"use client";

import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { login } from "@/services/auth";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Digite um email válido"),
  password: yup.string().required("Senha é obrigatória"),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        window.location.href = "/";
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Erro ao fazer login",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Entrar com" />

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
            ou entre com
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
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
          </Box>
          <Box>
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
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Lembrar este dispositivo"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/auth1/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Esqueceu a senha?
            </Typography>
          </Stack>
        </Stack>

        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <Box>
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
              "Entrar"
            )}
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
