import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// components
import BlankCard from '../../shared/BlankCard';
import { Stack } from '@mui/system';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons-react';

const SecurityTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Autenticação de Dois Fatores
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Proteja sua conta com uma camada adicional de segurança. Quando ativado, você precisará
                  fornecer um código de verificação ao acessar sua conta.
                </Typography>
                <Button variant="contained" color="primary">
                  Ativar
                </Button>
              </Stack>

              <Divider />

              {/* list 1 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Aplicativo de Autenticação</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Google Authenticator ou similar
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* list 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Email Alternativo</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    E-mail para enviar o link de verificação
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* list 3 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Recuperação por SMS</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Seu número de telefone para recuperação
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Configurar
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BlankCard>
            <CardContent>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
              >
                <IconDeviceLaptop size="26" />
              </Avatar>

              <Typography variant="h5" mt={2}>
                Dispositivos
              </Typography>
              <Typography color="textSecondary" mt={1} mb={2}>
                Gerencie os dispositivos conectados à sua conta para maior segurança.
              </Typography>
              <Button variant="contained" color="primary">
                Sair de todos os dispositivos
              </Button>

              {/* list 1 */}
              <Stack direction="row" spacing={2} py={2} mt={3} alignItems="center">
                <IconDeviceMobile size="26" />

                <Box>
                  <Typography variant="h6">iPhone 14</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    São Paulo BR, 23 Out às 01:15
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Divider />
              {/* list 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <IconDeviceLaptop size="26" />

                <Box>
                  <Typography variant="h6">Macbook Air</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Rio de Janeiro BR, 24 Out às 03:15
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Stack>
                <Button variant="text" color="primary">
                  Precisa de Ajuda?
                </Button>
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

export default SecurityTab;
