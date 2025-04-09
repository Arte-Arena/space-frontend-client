"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { IconArrowLeft } from "@tabler/icons-react";
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
      <Breadcrumb title={`Formulário de Uniformes`} items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
    </PageContainer>
  );
}
