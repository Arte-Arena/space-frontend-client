import * as yup from "yup";

export const formatCelular = (value: string): string => {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
  } else {
    return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
  }
};

export const formatCPF = (value: string): string => {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.substring(0, 3)}.${numbers.substring(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.substring(0, 3)}.${numbers.substring(3, 6)}.${numbers.substring(6)}`;
  } else {
    return `${numbers.substring(0, 3)}.${numbers.substring(3, 6)}.${numbers.substring(6, 9)}-${numbers.substring(9, 11)}`;
  }
};

export const formatCNPJ = (value: string): string => {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.substring(0, 2)}.${numbers.substring(2)}`;
  } else if (numbers.length <= 8) {
    return `${numbers.substring(0, 2)}.${numbers.substring(2, 5)}.${numbers.substring(5)}`;
  } else if (numbers.length <= 12) {
    return `${numbers.substring(0, 2)}.${numbers.substring(2, 5)}.${numbers.substring(5, 8)}/${numbers.substring(8)}`;
  } else {
    return `${numbers.substring(0, 2)}.${numbers.substring(2, 5)}.${numbers.substring(5, 8)}/${numbers.substring(8, 12)}-${numbers.substring(12, 14)}`;
  }
};

export const formatRG = (value: string): string => {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.substring(0, 2)}.${numbers.substring(2)}`;
  } else if (numbers.length <= 8) {
    return `${numbers.substring(0, 2)}.${numbers.substring(2, 5)}.${numbers.substring(5)}`;
  } else {
    return `${numbers.substring(0, 2)}.${numbers.substring(2, 5)}.${numbers.substring(5, 8)}-${numbers.substring(8, 9)}`;
  }
};

export const formatCEP = (value: string): string => {
  if (!value) return value;

  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 5) {
    return numbers;
  } else {
    return `${numbers.substring(0, 5)}-${numbers.substring(5, 8)}`;
  }
};

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
