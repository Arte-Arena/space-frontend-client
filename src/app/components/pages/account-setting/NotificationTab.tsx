import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSwitch from '../../forms/theme-elements/CustomSwitch';
import { Stack } from '@mui/system';
import {
  IconArticle,
  IconCheckbox,
  IconClock,
  IconDownload,
  IconMail,
  IconPlayerPause,
  IconTruckDelivery,
} from '@tabler/icons-react';

const NotificationTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Preferências de Notificação
              </Typography>
              <Typography color="textSecondary">
                Selecione as notificações que você gostaria de receber por e-mail. Por favor, note que você
                não pode optar por não receber mensagens de serviço, como pagamentos, segurança ou notificações legais.
              </Typography>

              <CustomFormLabel htmlFor="text-email">Endereço de Email*</CustomFormLabel>
              <CustomTextField id="text-email" variant="outlined" fullWidth />
              <Typography color="textSecondary">Necessário para notificações.</Typography>

              {/* list 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconArticle size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Nossa newsletter
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Sempre informaremos sobre mudanças importantes
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* list 2 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconCheckbox size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Confirmação de Pedido
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado quando um cliente fizer um pedido
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* list 3 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Alteração de Status do Pedido
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado quando o cliente fizer alterações no pedido
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* list 4 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconTruckDelivery size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Pedido Entregue
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Você será notificado assim que o pedido for entregue
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* list 5 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconMail size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Notificação por Email
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Ative as notificações por e-mail para receber atualizações
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 2 */}
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Data e Hora
              </Typography>
              <Typography color="textSecondary">
                Configurações de fuso horário e exibição do calendário.
              </Typography>

              {/* list 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    Fuso horário
                  </Typography>
                  <Typography variant="h6" mb={1}>
                    (UTC - 03:00) São Paulo, Brasília
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Tooltip title="Baixar">
                    <IconButton>
                      <IconDownload size="22" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 3 */}
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Ignorar Rastreamento
              </Typography>

              {/* list 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconPlayerPause size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Ignorar Rastreamento do Navegador
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Cookie do Navegador
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Salvar
        </Button>
        <Button size="large" variant="text" color="error">
          Cancelar
        </Button>
      </Stack>
    </>
  );
};

export default NotificationTab;
