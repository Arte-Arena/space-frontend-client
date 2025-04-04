"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import PageContainer from "@/app/components/container/PageContainer";

import WelcomeCard from "@/app/components/dashboards/ecommerce/WelcomeCard";
import RecentTransactions from "@/app/components/dashboards/ecommerce/RecentTransactions";
import TopCards from "@/app/components/dashboards/modern/TopCards";

import BlankCard from "@/app/components/shared/BlankCard";
import {
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import Link from "next/link";
import {
  IconShoppingCart,
  IconUser,
  IconCalendarEvent,
  IconAddressBook,
} from "@tabler/icons-react";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="Painel do Cliente">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* Welcome Card for Client */}
          <Grid item xs={12} lg={8}>
            <WelcomeCard />
          </Grid>

          {/* Informações Rápidas do Cliente */}
          <Grid item xs={12} lg={4}>
            <BlankCard>
              <Box p={3}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src="/images/profile/user-1.jpg"
                    alt="perfil"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <Typography variant="h5">Meu Perfil</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <IconUser size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Nome Completo"
                      secondary="Ricardo Silva"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <IconAddressBook size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="ricardo.silva@email.com"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <IconCalendarEvent size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cliente Desde"
                      secondary="Fevereiro 2023"
                    />
                  </ListItem>
                </List>
                <Box mt={2}>
                  <Button
                    component={Link}
                    href="/account-settings"
                    variant="outlined"
                    fullWidth
                  >
                    Editar Perfil
                  </Button>
                </Box>
              </Box>
            </BlankCard>
          </Grid>

          {/* Quick Stats Cards */}
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>

          {/* Recent Orders/Transactions */}
          <Grid item xs={12} lg={8}>
            <RecentTransactions />
          </Grid>

          {/* Access to Orders Section */}
          <Grid item xs={12} lg={4}>
            <BlankCard>
              <Box p={3} textAlign="center">
                <IconShoppingCart size={48} style={{ marginBottom: "16px" }} />
                <Typography variant="h5" gutterBottom>
                  Seus Pedidos
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Acesse seus pedidos de uniformes e acompanhe o status.
                </Typography>
                <Button
                  component={Link}
                  href="/uniforms"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Ver Pedidos de Uniformes
                </Button>
              </Box>
            </BlankCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
