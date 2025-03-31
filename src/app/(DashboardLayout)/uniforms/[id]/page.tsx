"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import UniformDetail from "../UniformDetail";
import { uniformService } from "../uniformService";
import { UniformSet } from "../UniformList";

interface UniformDetailPageProps {
  params: {
    id: string;
  };
}

export default function UniformDetailPage({ params }: UniformDetailPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [uniformData, setUniformData] = useState<UniformSet | null>(null);

  const BCrumb = [
    {
      to: "/",
      title: "Início",
    },
    {
      to: "/uniforms",
      title: "Uniformes",
    },
    {
      title: `Orçamento ${id}`,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await uniformService.getUniformById(id);
        setUniformData(data || null);
      } catch (error) {
        console.error("Erro ao carregar detalhes do uniforme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <PageContainer
      title={`Uniforme - Orçamento ${id}`}
      description="Formulário para preenchimento de dados do uniforme"
    >
      <Breadcrumb title={`Formulário de Uniformes`} items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Box p={3}>
              <UniformDetail
                loading={loading}
                uniformData={uniformData}
                id={id}
              />
            </Box>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
