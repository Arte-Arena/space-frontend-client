import * as yup from "yup";

export const nomeValidator = yup
  .string()
  .required("Nome é obrigatório")
  .max(100, "Nome não pode ter mais de 100 caracteres");

export const emailValidator = yup
  .string()
  .required("Email é obrigatório")
  .email("Formato de email inválido")
  .max(100, "Email não pode ter mais de 100 caracteres");

export const celularValidator = yup
  .string()
  .required("Celular é obrigatório")
  .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Formato inválido. Use (00) 00000-0000");

export const cpfValidator = yup
  .string()
  .required("CPF é obrigatório")
  .matches(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    "Formato inválido. Use 000.000.000-00",
  );

export const rgValidator = yup
  .string()
  .max(20, "RG não pode ter mais de 20 caracteres")
  .matches(
    /^(\d{2}\.\d{3}\.\d{3}-\d{1})?$/,
    "Formato inválido. Use 00.000.000-0",
  );

export const nomeFantasiaValidator = yup
  .string()
  .required("Nome fantasia é obrigatório")
  .max(100, "Nome fantasia não pode ter mais de 100 caracteres");

export const razaoSocialValidator = yup
  .string()
  .required("Razão social é obrigatória")
  .max(100, "Razão social não pode ter mais de 100 caracteres");

export const cnpjValidator = yup
  .string()
  .required("CNPJ é obrigatório")
  .matches(
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    "Formato inválido. Use 00.000.000/0000-00",
  );

export const inscricaoEstadualValidator = yup
  .string()
  .max(30, "Inscrição estadual não pode ter mais de 30 caracteres");

export const cepValidator = yup
  .string()
  .max(9, "CEP não pode ter mais de 9 caracteres")
  .matches(/^(\d{5}-\d{3})?$/, "Formato inválido. Use 00000-000");

export const enderecoValidator = yup
  .string()
  .max(100, "Endereço não pode ter mais de 100 caracteres");

export const numeroValidator = yup
  .string()
  .max(10, "Número não pode ter mais de 10 caracteres");

export const complementoValidator = yup
  .string()
  .max(50, "Complemento não pode ter mais de 50 caracteres");

export const bairroValidator = yup
  .string()
  .max(50, "Bairro não pode ter mais de 50 caracteres");

export const cidadeValidator = yup
  .string()
  .max(50, "Cidade não pode ter mais de 50 caracteres");

export const validateField = async (
  validator: yup.AnySchema,
  value: any,
): Promise<string | null> => {
  try {
    await validator.validate(value);
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return "Erro de validação";
  }
};
