"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import { useRouter } from "next/navigation";
import {
  Budget,
  getBudgetById,
  getBudgetSignatureById,
  signBudgetSignature,
} from "../../services";
import { formatDate, formatDateTime } from "@/utils/date";

type AnyRecord = Record<string, unknown>;

interface PageProps {
  params: { id: string };
}

const InfoRow = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <Stack direction="row" spacing={1} alignItems="baseline" mb={0.5}>
    <Typography variant="subtitle2" color="text.secondary" minWidth={200}>
      {label}
    </Typography>
    <Typography variant="body1">{value ?? "-"}</Typography>
  </Stack>
);

export default function BudgetSignaturePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [signature, setSignature] = useState<AnyRecord | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const alreadySigned: boolean = useMemo(() => {
    const sig = signature as AnyRecord | null;
    if (!sig) return false;
    return Boolean((sig as AnyRecord)["related_customer"]);
  }, [signature]);

  const resolveBudgetIdFromSignature = (sig: AnyRecord | null): string | null => {
    if (!sig) return null;
    const embeddedBudget = (sig as AnyRecord)["budget"] as AnyRecord | undefined;
    if (embeddedBudget && typeof embeddedBudget === "object") {
      const bid = (embeddedBudget as AnyRecord)["id"];
      if (typeof bid === "string" && bid.trim() !== "") return bid;
      if (typeof bid === "number") return String(bid);
    }
    const candidates = ["budget_id", "related_budget", "related_budget_id", "budgetId"];
    for (const key of candidates) {
      const val = (sig as AnyRecord)[key];
      if (typeof val === "string" && val.trim() !== "") return val;
      if (typeof val === "number") return String(val);
    }
    return null;
  };

  const extractEmbeddedBudget = (sig: AnyRecord | null): Budget | null => {
    if (!sig) return null;
    const embeddedBudget = (sig as AnyRecord)["budget"] as AnyRecord | undefined;
    if (embeddedBudget && typeof embeddedBudget === "object") {
      return embeddedBudget as unknown as Budget;
    }
    return null;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const sig = await getBudgetSignatureById(id, router);
      setSignature(sig as AnyRecord | null);

      const embedded = extractEmbeddedBudget(sig as AnyRecord | null);
      if (embedded) {
        setBudget(embedded);
      } else {
        const budgetId = resolveBudgetIdFromSignature(sig as AnyRecord | null);
        if (budgetId) {
          const b = await getBudgetById(budgetId, router);
          setBudget(b);
        } else {
          setBudget(null);
        }
      }
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar assinatura do orçamento.");
      setBudget(null);
      setSignature(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleConfirm = async () => {
    setSaving(true);
    setError(null);
    try {
      await signBudgetSignature(id, router);
      await fetchData();
    } catch (e: any) {
      setError(e?.message || "Falha ao confirmar o orçamento.");
    } finally {
      setSaving(false);
    }
  };

  const Title = (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h4">Confirmação de orçamento</Typography>
      {alreadySigned ? (
        <Chip color="success" label="Orçamento já confirmado" />
      ) : (
        <Chip color="warning" label="Aguardando confirmação" />
      )}
    </Box>
  );

  return (
    <PageContainer title="Confirmação de Orçamento" description="Confirmar orçamento a partir da assinatura">
      <Paper elevation={0} sx={{ p: 3 }}>
        <Stack spacing={2}>
          {Title}
          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Typography variant="h6" gutterBottom>
                  Detalhes do Orçamento
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {budget ? (
                  <>
                    <InfoRow label="ID do Orçamento" value={budget.id} />
                    <InfoRow label="Criado por" value={budget.created_by} />
                    <InfoRow label="Vendedor" value={budget.seller} />
                    <InfoRow label="Cliente relacionado" value={budget.related_client} />
                    <InfoRow label="Método de pagamento" value={budget.payment_method} />
                    <InfoRow
                      label="Previsão de Entrega"
                      value={
                        budget.delivery_forecast
                          ? formatDate(String(budget.delivery_forecast))
                          : "-"
                      }
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Entrega
                    </Typography>
                    <InfoRow label="Opção" value={(budget.delivery?.option as string) || "-"} />
                    <InfoRow label="Prazo (dias)" value={budget.delivery?.deadline} />
                    <InfoRow label="Preço" value={
                      typeof budget.delivery?.price === "number"
                        ? `R$ ${budget.delivery.price.toFixed(2)}`
                        : "-"
                    } />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Endereço
                    </Typography>
                    <InfoRow label="CEP" value={budget.address?.cep} />
                    <InfoRow label="Detalhes" value={budget.address?.details} />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Faturamento
                    </Typography>
                    <InfoRow label="Tipo" value={budget.billing?.type} />
                    {Array.isArray(budget.billing?.installments) && budget.billing!.installments.length > 0 ? (
                      <Box>
                        {budget.billing!.installments.map((ins, idx) => (
                          <InfoRow
                            key={`${ins.date}-${idx}`}
                            label={`Parcela ${idx + 1} - ${ins?.date ? formatDate(String(ins.date)) : "-"}`}
                            value={`R$ ${ins.value.toFixed(2)}`}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Sem parcelas cadastradas.
                      </Typography>
                    )}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Desconto
                    </Typography>
                    <InfoRow label="Tipo" value={budget.discount?.type} />
                    <InfoRow label="Valor" value={
                      typeof budget.discount?.value === "number"
                        ? `R$ ${budget.discount.value.toFixed(2)}`
                        : "-"
                    } />
                    <InfoRow label="Percentual" value={
                      typeof budget.discount?.percentage === "number"
                        ? `${budget.discount.percentage}%`
                        : "-"
                    } />
                    <Divider sx={{ my: 2 }} />
                  </>
                ) : (
                  <Alert severity="warning">Não foi possível carregar os dados do orçamento.</Alert>
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography variant="h6" gutterBottom>
                  Confirmação
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {!alreadySigned ? (
                  <>
                    <Typography variant="body1" paragraph>
                      Ao clicar no botão abaixo, você confirma que leu e aceita as condições
                      apresentadas neste orçamento, autorizando a continuidade do processo.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Em caso de dúvidas, entre em contato com nosso time antes de confirmar.
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                        disabled={saving}
                      >
                        {saving ? "Confirmando..." : "Confirmar Orçamento"}
                      </Button>
                      <Button variant="outlined" color="inherit" onClick={() => router.back()}>
                        Voltar
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Alert severity="success">
                    Este orçamento já foi confirmado.
                  </Alert>
                )}

                {signature && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      Dados da Assinatura
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <InfoRow
                      label="ID da assinatura"
                      value={(signature as AnyRecord)["_id"] as string | number | undefined}
                    />
                    <InfoRow
                      label="Criado em"
                      value={
                        (signature as AnyRecord)["created_at"]
                          ? formatDateTime(String((signature as AnyRecord)["created_at"]))
                          : "-"
                      }
                    />
                    <InfoRow
                      label="Atualizado em"
                      value={
                        (signature as AnyRecord)["updated_at"]
                          ? formatDateTime(String((signature as AnyRecord)["updated_at"]))
                          : "-"
                      }
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Stack>
      </Paper>
    </PageContainer>
  );
}


