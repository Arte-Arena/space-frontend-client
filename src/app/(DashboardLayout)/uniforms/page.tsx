"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import UniformList, { UniformSet } from "./UniformList";
import UniformHeader from "./UniformHeader";
import { uniformService } from "./uniformService";

const BCrumb = [
  {
    to: "/",
    title: "Início",
  },
  {
    title: "Uniformes",
  },
];

export default function Uniforms() {
  const [loading, setLoading] = useState(true);
  const [uniformSets, setUniformSets] = useState<UniformSet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await uniformService.getUniformSets();
        setUniformSets(data);
      } catch (error) {
        console.error("Erro ao carregar uniformes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer
      title="Uniformes"
      description="Conjuntos de uniformes disponíveis para edição"
    >
      <Breadcrumb title="Uniformes" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box p={3}>
              <UniformHeader
                title="Conjuntos de Uniformes Disponíveis"
                description="Selecione um conjunto de uniformes para editar seus dados. Conjuntos já preenchidos serão marcados com um indicador verde."
              />

              <UniformList uniformSets={uniformSets} loading={loading} />
            </Box>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
