"use client";

import * as React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import {
  Grid,
  Tabs,
  Tab,
  Box,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import AccountTab from "@/app/components/pages/account-setting/AccountTab";
import { IconBell, IconLock, IconUserCircle } from "@tabler/icons-react";
import BlankCard from "@/app/components/shared/BlankCard";
import NotificationTab from "@/app/components/pages/account-setting/NotificationTab";
import SecurityTab from "@/app/components/pages/account-setting/SecurityTab";

const BCrumb = [
  {
    to: "/",
    title: "Início",
  },
  {
    title: "Configurações de Conta",
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AccountSetting = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer
      title="Configurações de Conta"
      description="Página de configurações de conta"
    >
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconUserCircle size={32} />
              <Typography variant="h4" ml={1}>
                Configurações de Conta
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Personalize suas configurações de conta, notificações e segurança
              conforme sua preferência.
            </Typography>

            <BlankCard>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  aria-label="abas de configurações de conta"
                >
                  <Tab
                    iconPosition="start"
                    icon={<IconUserCircle size="22" />}
                    label="Conta"
                    {...a11yProps(0)}
                  />

                  <Tab
                    iconPosition="start"
                    icon={<IconBell size="22" />}
                    label="Notificações"
                    {...a11yProps(1)}
                  />
                  <Tab
                    iconPosition="start"
                    icon={<IconLock size="22" />}
                    label="Segurança"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <Divider />
              <CardContent>
                <TabPanel value={value} index={0}>
                  <AccountTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <NotificationTab />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <SecurityTab />
                </TabPanel>
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default AccountSetting;
