import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// images
import { Stack } from '@mui/system';

// locations
const locations = [
  {
    value: 'br',
    label: 'Brasil',
  },
  {
    value: 'us',
    label: 'Estados Unidos',
  },
  {
    value: 'uk',
    label: 'Reino Unido',
  },
  {
    value: 'in',
    label: 'Índia',
  },
];

// currency
const currencies = [
  {
    value: 'br',
    label: 'Real (R$)',
  },
  {
    value: 'us',
    label: 'Dólar ($)',
  },
  {
    value: 'uk',
    label: 'Libra (£)',
  },
  {
    value: 'eu',
    label: 'Euro (€)',
  },
];

const AccountTab = () => {
  const [location, setLocation] = React.useState('br');

  const handleChange1 = (event: any) => {
    setLocation(event.target.value);
  };

  //   currency
  const [currency, setCurrency] = React.useState('br');

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      {/*  Alterar Senha */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Alterar Senha
            </Typography>
            <Typography color="textSecondary" mb={3}>Para alterar sua senha, confirme aqui</Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Senha Atual
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">Nova Senha</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirmar Senha</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Detalhes Pessoais */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Detalhes Pessoais
            </Typography>
            <Typography color="textSecondary" mb={3}>Para alterar seus dados pessoais, edite e salve aqui</Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Seu Nome
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value="Mathew Anderson"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Nome da Empresa
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value="Maxima Studio"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Localização
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChange1}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 4 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-currency"
                  >
                    Moeda
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-currency"
                    variant="outlined"
                    value={currency}
                    onChange={handleChange2}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Email
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value="info@modernize.com"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Telefone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+55 11 98765-4321"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Endereço
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="Rua das Flores, 123, São Paulo, Brasil"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Salvar
          </Button>
          <Button size="large" variant="text" color="error">
            Cancelar
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
