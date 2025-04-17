"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientData, ClientData } from "@/services/account-settings";

import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { Typography, Paper, Button, Stack, Divider } from "@mui/material";
import { IconTools, IconClockHour4 } from "@tabler/icons-react";
import Link from "next/link";

export default function Dashboard() {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientData(router);
        setClientData(data);
      } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
      }
    };

    fetchClientData();
  }, [router]);

  return (
    <PageContainer title="Dashboard" description="Painel do Cliente">
      <Box
        sx={{
          height: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <BlankCard>
              <Box p={5} textAlign="center">
                <Stack spacing={3} alignItems="center">
                  <IconClockHour4 size={80} color="#1976d2" />

                  <Typography variant="h2" fontWeight="bold" color="primary">
                    Em breve!
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    Olá, {clientData?.contact?.name || "Cliente"}!
                  </Typography>

                  <Typography variant="body1" color="textSecondary" paragraph>
                    Esta página está temporariamente desativada enquanto
                    trabalhamos em novos recursos para melhorar sua experiência.
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <IconTools size={20} />
                    <Typography variant="subtitle1" fontWeight="medium">
                      Novos recursos em desenvolvimento
                    </Typography>
                  </Box>

                  <Divider sx={{ width: "100%", my: 2 }} />

                  <Typography variant="body2">
                    Enquanto isso, você pode acessar outras seções disponíveis:
                  </Typography>

                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      component={Link}
                      href="/orders"
                      variant="contained"
                      color="primary"
                    >
                      Meus pedidos
                    </Button>
                    <Button
                      component={Link}
                      href="/account-settings"
                      variant="outlined"
                    >
                      Configurações de conta
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </BlankCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
