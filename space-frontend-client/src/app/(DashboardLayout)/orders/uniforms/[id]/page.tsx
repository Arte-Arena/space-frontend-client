"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { IconArrowLeft, IconShirt } from "@tabler/icons-react";
import Link from "next/link";
import { getUniformById, updateUniformPlayers } from "@/services/uniforms";
import UniformSketchesForm from "../UniformSketchesForm";
import { UniformWithSketches } from "../types";

interface UniformDetailPageProps {
  params: {
    id: string;
  };
}

export default function UniformDetailPage({ params }: UniformDetailPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [uniformData, setUniformData] = useState<UniformWithSketches | null>(
    null,
  );

  const BCrumb = [
    {
      to: "/",
      title: "Início",
    },
    {
      to: "/orders",
      title: "Pedidos",
    },
    {
      title: `Configuração de Uniforme - #${id}`,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUniformById(id);
        setUniformData(data || null);
      } catch (error) {
        console.error("Erro ao carregar detalhes do uniforme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = (savedUniform: UniformWithSketches) => {
    setUniformData(savedUniform);
  };

  return (
    <PageContainer
      title={`Uniforme - ID ${id}`}
      description="Formulário para preenchimento de dados do uniforme"
    >
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={3}>
              <IconShirt size={32} />
              <Typography variant="h4" ml={1}>
                Configuração de Uniforme
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" mb={3}>
              Preencha os detalhes para personalizar seu uniforme de acordo com
              suas preferências.
            </Typography>

            <Box mb={3}>
              <Button
                component={Link}
                href="/orders"
                startIcon={<IconArrowLeft />}
                variant="text"
              >
                Voltar para pedidos
              </Button>
            </Box>

            <BlankCard>
              <Box p={3}>
                {loading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={5}
                  >
                    <CircularProgress />
                  </Box>
                ) : uniformData ? (
                  <UniformSketchesForm
                    uniform={uniformData}
                    onSave={handleSave}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={5}
                  >
                    Uniforme não encontrado ou sem dados disponíveis.
                  </Box>
                )}
              </Box>
            </BlankCard>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
