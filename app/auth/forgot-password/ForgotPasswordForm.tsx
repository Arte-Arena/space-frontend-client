"use client";
import { useState, ChangeEvent } from "react";
import { logger } from "../../utils/logger";
import EmailForm from "./EmailForm";
import VerificationForm from "./VerificationForm";
import SuccessForm from "./SuccessForm";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "verification" | "success">(
    "email",
  );
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [verificationError, setVerificationError] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateVerificationCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

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
    } else if (password.length < 8) {
      setPasswordError("Senha deve ter pelo menos 8 caracteres");
      return false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Senha deve conter ao menos uma letra minúscula");
      return false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Senha deve conter ao menos uma letra maiúscula");
      return false;
    } else if (!/(?=.*\d)/.test(password)) {
      setPasswordError("Senha deve conter ao menos um número");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (confirm: string) => {
    if (!confirm) {
      setConfirmPasswordError("Confirme sua senha");
      return false;
    } else if (confirm !== newPassword) {
      setConfirmPasswordError("As senhas não coincidem");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    if (passwordError) {
      validatePassword(value);
    }

    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (confirmPasswordError) {
      validateConfirmPassword(value);
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const code = generateVerificationCode();
        setGeneratedCode(code);
        logger.log(`Código de verificação gerado para ${email}: ${code}`);

        setStep("verification");
      } catch (error) {
        logger.error("Erro ao solicitar código:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const filteredValue = value.replace(/[^A-Z0-9]/g, "");

    if (filteredValue.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = filteredValue;
      setVerificationCode(newVerificationCode);
      setVerificationError("");

      if (filteredValue && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = verificationCode.join("");

    if (enteredCode.length !== 5) {
      setVerificationError("Digite o código completo de 5 dígitos");
      return;
    }

    const isPasswordValid = validatePassword(newPassword);
    const isConfirmValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmValid) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (enteredCode === generatedCode) {
        setStep("success");
      } else {
        setVerificationError("Código inválido. Tente novamente.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleRequestNewCode = () => {
    setLoading(true);

    setTimeout(() => {
      const newCode = generateVerificationCode();
      setGeneratedCode(newCode);
      logger.log(`Novo código de verificação gerado para ${email}: ${newCode}`);
      setLoading(false);
    }, 1000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (step === "email") {
    return (
      <EmailForm
        email={email}
        emailError={emailError}
        loading={loading}
        handleEmailChange={handleEmailChange}
        handleRequestCode={handleRequestCode}
      />
    );
  }

  if (step === "verification") {
    return (
      <VerificationForm
        email={email}
        verificationCode={verificationCode}
        verificationError={verificationError}
        generatedCode={generatedCode}
        loading={loading}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleCodeChange={handleCodeChange}
        handleKeyDown={handleKeyDown}
        handleVerifyCode={handleVerifyCode}
        handleRequestNewCode={handleRequestNewCode}
        setNewPassword={handlePasswordChange}
        setConfirmPassword={handleConfirmPasswordChange}
        validatePassword={validatePassword}
        validateConfirmPassword={validateConfirmPassword}
        handleTogglePasswordVisibility={handleTogglePasswordVisibility}
        handleToggleConfirmPasswordVisibility={
          handleToggleConfirmPasswordVisibility
        }
      />
    );
  }

  if (step === "success") {
    return <SuccessForm />;
  }

  return null;
}
