"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import AuthSuccessMessage from "./AuthSuccessMessage";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { register } from "@/services/auth";

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
  birthDate: yup
    .date()
    .max(new Date(), "Data de nascimento não pode ser no futuro")
    .required("Data de nascimento é obrigatória"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Digite um email válido")
    .max(50, "Email deve ter no máximo 50 caracteres")
    .test(
      "no-uppercase",
      "Email não pode conter letras maiúsculas",
      (value) => value === undefined || value === value.toLowerCase(),
    ),
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
  isResponsible: yup
    .boolean()
    .oneOf([true], "Confirme que você é o responsável pelo cadastro"),
});

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const formik = useFormik({
    initialValues: {
      name: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
      isResponsible: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(false);
      setIsLoading(true);
      try {
        await register({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
          birthDate: values.birthDate,
        });
        setSuccess(true);
      } catch (err: any) {
        setError(err.message);
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
      {success ? (
        <AuthSuccessMessage />
      ) : (
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
              <CustomFormLabel htmlFor="birthDate">
                Data de nascimento
              </CustomFormLabel>
              <CustomTextField
                id="birthDate"
                name="birthDate"
                type="date"
                variant="outlined"
                fullWidth
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                helperText={formik.touched.birthDate && formik.errors.birthDate}
                InputLabelProps={{ shrink: true }}
              />
              <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <CustomFormLabel htmlFor="confirmPassword">
                Confirmar Senha
              </CustomFormLabel>
              <CustomTextField
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
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
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
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

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="isResponsible"
                    name="isResponsible"
                    color="primary"
                    checked={formik.values.isResponsible}
                    onChange={(event) =>
                      formik.setFieldValue(
                        "isResponsible",
                        event.target.checked,
                      )
                    }
                    onBlur={formik.handleBlur}
                  />
                }
                label="Confirmo que sou o responsável legal pelo cadastro"
              />
              {formik.touched.isResponsible && formik.errors.isResponsible && (
                <FormHelperText error>
                  {formik.errors.isResponsible}
                </FormHelperText>
              )}
              <Typography variant="caption" color="textSecondary">
                Marque apenas se você for o responsável; cadastros de menores devem ser feitos pelo responsável legal.
              </Typography>
            </Box>

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
      )}
    </>
  );
};

export default AuthRegister;
