"use client";
import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

const topcards = [
  {
    icon: "/images/svgs/icon-user-male.svg",
    title: "Meu Perfil",
    digits: "Acessar",
    bgcolor: "primary",
    linkTo: "/account-settings",
  },
  {
    icon: "/images/svgs/icon-speech-bubble.svg",
    title: "Mensagens",
    digits: "2",
    bgcolor: "warning",
    linkTo: "/messages",
  },
  {
    icon: "/images/svgs/icon-briefcase.svg",
    title: "Suporte",
    digits: "Ajuda",
    bgcolor: "secondary",
    linkTo: "/suporte",
  },
  {
    icon: "/images/svgs/icon-briefcase.svg",
    title: "Total de Pedidos",
    digits: "5",
    bgcolor: "error",
    linkTo: "/uniforms",
  },
  {
    icon: "/images/svgs/icon-favorites.svg",
    title: "Em Produção",
    digits: "2",
    bgcolor: "success",
    linkTo: "/uniforms",
  },
  {
    icon: "/images/svgs/icon-connect.svg",
    title: "Concluídos",
    digits: "3",
    bgcolor: "info",
    linkTo: "/uniforms",
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box
            bgcolor={topcard.bgcolor + ".light"}
            textAlign="center"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              if (topcard.linkTo) {
                window.location.href = topcard.linkTo;
              }
            }}
          >
            <CardContent>
              <Image
                src={topcard.icon}
                alt={topcard.title}
                width="50"
                height="50"
              />
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
