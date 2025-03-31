import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { UniformSet } from "./UniformList";

interface UniformDetailComponentProps {
  loading: boolean;
  uniformData: UniformSet | null | undefined;
  id: string | number;
}

const UniformDetail: React.FC<UniformDetailComponentProps> = ({
  loading,
  uniformData,
  id,
}) => {
  return (
    <Box>
      <Box mb={3}>
        <Button
          component={Link}
          href="/uniforms"
          startIcon={<IconArrowLeft />}
          variant="text"
        >
          Voltar para lista
        </Button>
      </Box>

      <Typography variant="h5" mb={3}>
        Detalhes do Uniforme - Orçamento {uniformData?.budgetNumber || id}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" paragraph>
            Esta é a página de detalhe para o conjunto de uniformes com ID: {id}
            . O formulário para preenchimento de dados dos uniformes será
            implementado aqui, conforme as necessidades específicas do projeto.
          </Typography>

          <Typography variant="body2" color="textSecondary">
            A implementação detalhada desta tela com os campos específicos será
            feita posteriormente.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UniformDetail;
