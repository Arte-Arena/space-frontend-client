"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global app error:", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          background: "#f7f9fc",
          color: "#1f2937",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "560px",
            padding: "32px",
            borderRadius: "16px",
            background: "#ffffff",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h1 style={{ marginTop: 0 }}>Ocorreu um erro inesperado</h1>
          <p style={{ lineHeight: 1.5 }}>
            A aplicação encontrou uma falha e interrompeu esta tela. O erro foi
            registrado no console do navegador.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                borderRadius: "10px",
                padding: "12px 16px",
                background: "#1976d2",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                padding: "12px 16px",
                textDecoration: "none",
                background: "#e5e7eb",
                color: "#111827",
              }}
            >
              Ir para o início
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
