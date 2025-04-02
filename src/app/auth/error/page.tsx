import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <Image
        src={"/images/backgrounds/errorimg.svg"}
        alt="404"
        width={500}
        height={500}
        style={{ width: "100%", maxWidth: "500px", maxHeight: "500px" }}
      />
      <Typography align="center" variant="h1" mb={4}>
        Ops, erro 404!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        A página que você está procurando não foi encontrada.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        href="/"
        disableElevation
      >
        Voltar para a Página Inicial
      </Button>
    </Container>
  </Box>
);

export default Error;
