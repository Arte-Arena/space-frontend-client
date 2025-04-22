import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import BlankCard from "../../shared/BlankCard";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../forms/theme-elements/CustomSelect";

import { Stack } from "@mui/system";
import {
  nomeValidator,
  emailValidator,
  celularValidator,
  cpfValidator,
  rgValidator,
  nomeFantasiaValidator,
  razaoSocialValidator,
  cnpjValidator,
  inscricaoEstadualValidator,
  cepValidator,
  enderecoValidator,
  numeroValidator,
  complementoValidator,
  bairroValidator,
  cidadeValidator,
  validateField,
  formatCelular,
  formatCPF,
  formatCNPJ,
  formatRG,
  formatCEP,
} from "../../../../utils/validators";

import {
  getClientData,
  updateClientData,
  ClientUpdateData,
} from "../../../../services/account-settings";
import { useRouter } from "next/navigation";

const ufOptions = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
];

const situacaoOptions = [
  { value: "A", label: "Ativo" },
  { value: "I", label: "Inativo" },
  { value: "S", label: "Sem movimento" },
];

const AccountTab = () => {
  const router = useRouter();
  const [tipoPessoa, setTipoPessoa] = React.useState("F");
  const [enderecoCobrancaDiferente, setEnderecoCobrancaDiferente] =
    React.useState(false);
  const [uf, setUf] = React.useState("SP");
  const [ufCobranca, setUfCobranca] = React.useState("SP");
  const [situacao, setSituacao] = React.useState("A");

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");
  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    celular: "",
    cpf: "",
    rg: "",
    cnpj: "",
    inscricaoEstadual: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    cepCobranca: "",
    enderecoCobranca: "",
    numeroCobranca: "",
    complementoCobranca: "",
    bairroCobranca: "",
    cidadeCobranca: "",
    nomeFantasia: "",
    razaoSocial: "",
  });

  const handleTipoPessoaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTipoPessoa(event.target.value);
    setErrors({});
  };

  const handleUfChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUf(event.target.value);
  };

  const handleUfCobrancaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUfCobranca(event.target.value);
  };

  const handleSituacaoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSituacao(event.target.value);
  };

  const handleEnderecoCobrancaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnderecoCobrancaDiferente(event.target.checked);
  };

  const handleCelularChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCelular(e.target.value);
    setFormValues((prev) => ({ ...prev, celular: formatted }));
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormValues((prev) => ({ ...prev, cpf: formatted }));
  };

  const handleCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormValues((prev) => ({ ...prev, cnpj: formatted }));
  };

  const handleRgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRG(e.target.value);
    setFormValues((prev) => ({ ...prev, rg: formatted }));
  };

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const formatted = formatCEP(e.target.value);
    setFormValues((prev) => ({ ...prev, [field]: formatted }));
  };

  const handleBlur = async (field: string, value: string, validator: any) => {
    const errorMessage = await validateField(validator, value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const validateForm = async () => {
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;

    const nomeEl = document.getElementById("text-nome") as HTMLInputElement;
    const emailEl = document.getElementById("text-email") as HTMLInputElement;
    const celularEl = document.getElementById(
      "text-celular",
    ) as HTMLInputElement;

    if (nomeEl) {
      const nomeError = await validateField(
        tipoPessoa === "F" ? nomeValidator : nomeFantasiaValidator,
        nomeEl.value,
      );
      newErrors["nome"] = nomeError;
      if (nomeError) isValid = false;
    }

    if (emailEl) {
      const emailError = await validateField(emailValidator, emailEl.value);
      newErrors["email"] = emailError;
      if (emailError) isValid = false;
    }

    if (celularEl) {
      const celularError = await validateField(
        celularValidator,
        celularEl.value,
      );
      newErrors["celular"] = celularError;
      if (celularError) isValid = false;
    }

    if (tipoPessoa === "F") {
      const cpfEl = document.getElementById("text-cpf") as HTMLInputElement;
      if (cpfEl) {
        const cpfError = await validateField(cpfValidator, cpfEl.value);
        newErrors["cpf"] = cpfError;
        if (cpfError) isValid = false;
      }
    } else {
      const razaoSocialEl = document.getElementById(
        "text-razao-social",
      ) as HTMLInputElement;
      const cnpjEl = document.getElementById("text-cnpj") as HTMLInputElement;

      if (razaoSocialEl) {
        const razaoError = await validateField(
          razaoSocialValidator,
          razaoSocialEl.value,
        );
        newErrors["razaoSocial"] = razaoError;
        if (razaoError) isValid = false;
      }

      if (cnpjEl) {
        const cnpjError = await validateField(cnpjValidator, cnpjEl.value);
        newErrors["cnpj"] = cnpjError;
        if (cnpjError) isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    setIsSaving(true);
    const isValid = await validateForm();

    if (isValid) {
      try {
        // Create an object with the client data to be updated
        const clientData: ClientUpdateData = {
          person_type: tipoPessoa,
          status: situacao,
        };

        // Add personal data based on person type
        if (tipoPessoa === "F") {
          clientData.name = formValues.nome;
          clientData.identity_card = formValues.rg;
          clientData.cpf = formValues.cpf;
        } else {
          clientData.name = formValues.nomeFantasia;
          clientData.company_name = formValues.razaoSocial;
          clientData.cnpj = formValues.cnpj;
          clientData.state_registration = formValues.inscricaoEstadual;
        }

        // Add common fields
        clientData.email = formValues.email;
        clientData.cell_phone = formValues.celular;

        // Add address fields
        clientData.zip_code = formValues.cep;
        clientData.address = formValues.endereco;
        clientData.number = formValues.numero;
        clientData.complement = formValues.complemento;
        clientData.neighborhood = formValues.bairro;
        clientData.city = formValues.cidade;
        clientData.state = uf;

        // Add billing address if different
        clientData.different_billing_address = enderecoCobrancaDiferente;

        if (enderecoCobrancaDiferente) {
          clientData.billing_zip_code = formValues.cepCobranca;
          clientData.billing_address = formValues.enderecoCobranca;
          clientData.billing_number = formValues.numeroCobranca;
          clientData.billing_complement = formValues.complementoCobranca;
          clientData.billing_neighborhood = formValues.bairroCobranca;
          clientData.billing_city = formValues.cidadeCobranca;
          clientData.billing_state = ufCobranca;
        }

        // Send data to the backend
        const success = await updateClientData(clientData, router);

        if (success) {
          setAlertSeverity("success");
          setAlertMessage("Dados salvos com sucesso!");
        } else {
          setAlertSeverity("error");
          setAlertMessage(
            "Erro ao salvar os dados. Por favor, tente novamente.",
          );
        }
        setShowAlert(true);

        // Auto-hide alert after 6 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } catch (error) {
        console.error("Error saving client data:", error);
        setAlertSeverity("error");
        setAlertMessage(
          "Erro ao salvar os dados. Por favor, tente novamente mais tarde.",
        );
        setShowAlert(true);

        // Auto-hide alert after 6 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
    } else {
      setAlertSeverity("error");
      setAlertMessage(
        "Formulário contém erros. Por favor, corrija os campos destacados.",
      );
      setShowAlert(true);

      // Auto-hide alert after 6 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }
    setIsSaving(false);
  };

  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        const data = await getClientData(router);

        if (data && data.contact) {
          setTipoPessoa(data.contact.person_type || "F");
          setUf(data.contact.state || "SP");
          setUfCobranca(data.contact.billing_state || "SP");
          setSituacao(data.contact.status || "A");
          setEnderecoCobrancaDiferente(
            data.contact.different_billing_address || false,
          );

          setFormValues({
            nome: data.contact.name || "",
            email: data.contact.email || "",
            celular: data.contact.cell_phone || "",
            cpf: data.contact.cpf || "",
            rg: data.contact.identity_card || "",
            cnpj: data.contact.cnpj || "",
            inscricaoEstadual: data.contact.state_registration || "",
            cep: data.contact.zip_code || "",
            endereco: data.contact.address || "",
            numero: data.contact.number || "",
            complemento: data.contact.complement || "",
            bairro: data.contact.neighborhood || "",
            cidade: data.contact.city || "",
            cepCobranca: data.contact.billing_zip_code || "",
            enderecoCobranca: data.contact.billing_address || "",
            numeroCobranca: data.contact.billing_number || "",
            complementoCobranca: data.contact.billing_complement || "",
            bairroCobranca: data.contact.billing_neighborhood || "",
            cidadeCobranca: data.contact.billing_city || "",
            nomeFantasia: data.contact.name || "",
            razaoSocial: data.contact.company_name || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
        setAlertSeverity("error");
        setAlertMessage("Erro ao carregar dados do cliente.");
        setShowAlert(true);

        // Auto-hide alert after 6 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientData();
  }, [router]);

  return (
    <Grid container spacing={3}>
      {showAlert && (
        <Grid item xs={12}>
          <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Grid>
      )}

      {isLoading ? (
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "400px" }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} />
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Informações do Cliente
              </Typography>
              <Typography color="textSecondary" mb={3}>
                Preencha os dados do cliente conforme solicitado
              </Typography>

              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  Tipo de Pessoa
                </Typography>
                <RadioGroup
                  row
                  aria-label="tipoPessoa"
                  name="tipo-pessoa"
                  value={tipoPessoa}
                  onChange={handleTipoPessoaChange}
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Pessoa Física"
                  />
                  <FormControlLabel
                    value="J"
                    control={<Radio />}
                    label="Pessoa Jurídica"
                  />
                </RadioGroup>
              </FormControl>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Dados Pessoais
              </Typography>

              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                      sx={{ mt: 0 }}
                      htmlFor="text-nome"
                      required
                    >
                      {tipoPessoa === "F" ? "Nome Completo" : "Nome Fantasia"}
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-nome"
                      placeholder={
                        tipoPessoa === "F"
                          ? "Digite seu nome completo"
                          : "Nome fantasia da empresa"
                      }
                      variant="outlined"
                      fullWidth
                      value={formValues.nome}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          "nome",
                          e.target.value,
                          tipoPessoa === "F"
                            ? nomeValidator
                            : nomeFantasiaValidator,
                        )
                      }
                      error={Boolean(errors.nome)}
                      helperText={errors.nome || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                      sx={{ mt: 0 }}
                      htmlFor="text-email"
                      required
                    >
                      Email
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-email"
                      placeholder="email@exemplo.com"
                      variant="outlined"
                      fullWidth
                      type="email"
                      value={formValues.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("email", e.target.value, emailValidator)
                      }
                      error={Boolean(errors.email)}
                      helperText={errors.email || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                      sx={{ mt: 0 }}
                      htmlFor="text-celular"
                      required
                    >
                      Celular
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-celular"
                      placeholder="(00) 00000-0000"
                      variant="outlined"
                      fullWidth
                      value={formValues.celular}
                      onChange={handleCelularChange}
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("celular", e.target.value, celularValidator)
                      }
                      error={Boolean(errors.celular)}
                      helperText={errors.celular || ""}
                    />
                  </Grid>

                  {tipoPessoa === "F" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-cpf"
                          required
                        >
                          CPF
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-cpf"
                          placeholder="000.000.000-00"
                          variant="outlined"
                          fullWidth
                          value={formValues.cpf}
                          onChange={handleCpfChange}
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur("cpf", e.target.value, cpfValidator)
                          }
                          error={Boolean(errors.cpf)}
                          helperText={errors.cpf || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-rg">
                          RG
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-rg"
                          placeholder="00.000.000-0"
                          variant="outlined"
                          fullWidth
                          value={formValues.rg}
                          onChange={handleRgChange}
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur("rg", e.target.value, rgValidator)
                          }
                          error={Boolean(errors.rg)}
                          helperText={errors.rg || ""}
                        />
                      </Grid>
                    </>
                  )}

                  {tipoPessoa === "J" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-razao-social"
                          required
                        >
                          Razão Social
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-razao-social"
                          placeholder="Razão social da empresa"
                          variant="outlined"
                          fullWidth
                          value={formValues.razaoSocial}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              razaoSocial: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "razaoSocial",
                              e.target.value,
                              razaoSocialValidator,
                            )
                          }
                          error={Boolean(errors.razaoSocial)}
                          helperText={errors.razaoSocial || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-cnpj"
                          required
                        >
                          CNPJ
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-cnpj"
                          placeholder="00.000.000/0000-00"
                          variant="outlined"
                          fullWidth
                          value={formValues.cnpj}
                          onChange={handleCnpjChange}
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur("cnpj", e.target.value, cnpjValidator)
                          }
                          error={Boolean(errors.cnpj)}
                          helperText={errors.cnpj || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-inscricao-estadual"
                        >
                          Inscrição Estadual
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-inscricao-estadual"
                          placeholder="Inscrição estadual"
                          variant="outlined"
                          fullWidth
                          value={formValues.inscricaoEstadual}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              inscricaoEstadual: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "inscricaoEstadual",
                              e.target.value,
                              inscricaoEstadualValidator,
                            )
                          }
                          error={Boolean(errors.inscricaoEstadual)}
                          helperText={errors.inscricaoEstadual || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="select-situacao"
                          required
                        >
                          Situação
                        </CustomFormLabel>
                        <CustomSelect
                          fullWidth
                          id="select-situacao"
                          variant="outlined"
                          value={situacao}
                          onChange={handleSituacaoChange}
                        >
                          {situacaoOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </Grid>
                    </>
                  )}
                </Grid>

                <Typography variant="subtitle1" fontWeight={600} mt={4} mb={2}>
                  Endereço Principal
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-cep">
                      CEP
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-cep"
                      placeholder="00000-000"
                      variant="outlined"
                      fullWidth
                      value={formValues.cep}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleCepChange(e, "cep")
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("cep", e.target.value, cepValidator)
                      }
                      error={Boolean(errors.cep)}
                      helperText={errors.cep || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-endereco">
                      Endereço
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-endereco"
                      placeholder="Endereço"
                      variant="outlined"
                      fullWidth
                      value={formValues.endereco}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          endereco: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          "endereco",
                          e.target.value,
                          enderecoValidator,
                        )
                      }
                      error={Boolean(errors.endereco)}
                      helperText={errors.endereco || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-numero">
                      Número
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-numero"
                      placeholder="Número"
                      variant="outlined"
                      fullWidth
                      value={formValues.numero}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          numero: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("numero", e.target.value, numeroValidator)
                      }
                      error={Boolean(errors.numero)}
                      helperText={errors.numero || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-complemento">
                      Complemento
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-complemento"
                      placeholder="Apto, sala, etc"
                      variant="outlined"
                      fullWidth
                      value={formValues.complemento}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          complemento: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur(
                          "complemento",
                          e.target.value,
                          complementoValidator,
                        )
                      }
                      error={Boolean(errors.complemento)}
                      helperText={errors.complemento || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bairro">
                      Bairro
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-bairro"
                      placeholder="Bairro"
                      variant="outlined"
                      fullWidth
                      value={formValues.bairro}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          bairro: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("bairro", e.target.value, bairroValidator)
                      }
                      error={Boolean(errors.bairro)}
                      helperText={errors.bairro || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-cidade">
                      Cidade
                    </CustomFormLabel>
                    <CustomTextField
                      id="text-cidade"
                      placeholder="Cidade"
                      variant="outlined"
                      fullWidth
                      value={formValues.cidade}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormValues((prev) => ({
                          ...prev,
                          cidade: e.target.value,
                        }))
                      }
                      onBlur={(e: FocusEvent<HTMLInputElement>) =>
                        handleBlur("cidade", e.target.value, cidadeValidator)
                      }
                      error={Boolean(errors.cidade)}
                      helperText={errors.cidade || ""}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <CustomFormLabel
                      sx={{ mt: 0 }}
                      htmlFor="select-uf"
                      required
                    >
                      UF
                    </CustomFormLabel>
                    <CustomSelect
                      fullWidth
                      id="select-uf"
                      variant="outlined"
                      value={uf}
                      onChange={handleUfChange}
                    >
                      {ufOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enderecoCobrancaDiferente}
                        onChange={handleEnderecoCobrancaChange}
                        name="enderecoCobrancaDiferente"
                      />
                    }
                    label="Endereço de cobrança diferente do endereço principal"
                  />
                </Box>

                {enderecoCobrancaDiferente && (
                  <>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      mt={2}
                      mb={2}
                    >
                      Endereço de Cobrança
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-cep-cobranca"
                        >
                          CEP
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-cep-cobranca"
                          placeholder="00000-000"
                          variant="outlined"
                          fullWidth
                          value={formValues.cepCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleCepChange(e, "cepCobranca")
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "cepCobranca",
                              e.target.value,
                              cepValidator,
                            )
                          }
                          error={Boolean(errors.cepCobranca)}
                          helperText={errors.cepCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={8}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-endereco-cobranca"
                        >
                          Endereço
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-endereco-cobranca"
                          placeholder="Endereço"
                          variant="outlined"
                          fullWidth
                          value={formValues.enderecoCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              enderecoCobranca: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "enderecoCobranca",
                              e.target.value,
                              enderecoValidator,
                            )
                          }
                          error={Boolean(errors.enderecoCobranca)}
                          helperText={errors.enderecoCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-numero-cobranca"
                        >
                          Número
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-numero-cobranca"
                          placeholder="Número"
                          variant="outlined"
                          fullWidth
                          value={formValues.numeroCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              numeroCobranca: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "numeroCobranca",
                              e.target.value,
                              numeroValidator,
                            )
                          }
                          error={Boolean(errors.numeroCobranca)}
                          helperText={errors.numeroCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={8}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-complemento-cobranca"
                        >
                          Complemento
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-complemento-cobranca"
                          placeholder="Apto, sala, etc"
                          variant="outlined"
                          fullWidth
                          value={formValues.complementoCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              complementoCobranca: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "complementoCobranca",
                              e.target.value,
                              complementoValidator,
                            )
                          }
                          error={Boolean(errors.complementoCobranca)}
                          helperText={errors.complementoCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-bairro-cobranca"
                        >
                          Bairro
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-bairro-cobranca"
                          placeholder="Bairro"
                          variant="outlined"
                          fullWidth
                          value={formValues.bairroCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              bairroCobranca: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "bairroCobranca",
                              e.target.value,
                              bairroValidator,
                            )
                          }
                          error={Boolean(errors.bairroCobranca)}
                          helperText={errors.bairroCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="text-cidade-cobranca"
                        >
                          Cidade
                        </CustomFormLabel>
                        <CustomTextField
                          id="text-cidade-cobranca"
                          placeholder="Cidade"
                          variant="outlined"
                          fullWidth
                          value={formValues.cidadeCobranca}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormValues((prev) => ({
                              ...prev,
                              cidadeCobranca: e.target.value,
                            }))
                          }
                          onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            handleBlur(
                              "cidadeCobranca",
                              e.target.value,
                              cidadeValidator,
                            )
                          }
                          error={Boolean(errors.cidadeCobranca)}
                          helperText={errors.cidadeCobranca || ""}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <CustomFormLabel
                          sx={{ mt: 0 }}
                          htmlFor="select-uf-cobranca"
                        >
                          UF
                        </CustomFormLabel>
                        <CustomSelect
                          fullWidth
                          id="select-uf-cobranca"
                          variant="outlined"
                          value={ufCobranca}
                          onChange={handleUfCobrancaChange}
                        >
                          {ufOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </Grid>
                    </Grid>
                  </>
                )}

                <input
                  type="hidden"
                  id="orcamento_id"
                  name="orcamento_id"
                  value=""
                />
              </form>
            </CardContent>
          </BlankCard>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end" }}
            mt={3}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? <CircularProgress size={24} /> : "Salvar"}
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default AccountTab;
