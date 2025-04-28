"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { IconArrowLeft, IconShirt, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { getUniformById } from "@/services/uniforms";
import UniformSketchesForm from "../UniformSketchesForm";
import { UniformWithSketches } from "../types";

interface UniformDetailPageProps {
  params: {
    id: string;
  };
}

const sizeChartData = {
  masculino: {
    jersey: [
      { size: "PP", chest: "49 cm", length: "67 cm" },
      { size: "P", chest: "51 cm", length: "69 cm" },
      { size: "M", chest: "53 cm", length: "71 cm" },
      { size: "G", chest: "55 cm", length: "73 cm" },
      { size: "GG", chest: "57 cm", length: "75 cm" },
      { size: "XG", chest: "59 cm", length: "77 cm" },
      { size: "XXG", chest: "61 cm", length: "79 cm" },
    ],
    shorts: [
      { size: "PP", waist: "34 cm", length: "42 cm" },
      { size: "P", waist: "36 cm", length: "44 cm" },
      { size: "M", waist: "38 cm", length: "46 cm" },
      { size: "G", waist: "40 cm", length: "48 cm" },
      { size: "GG", waist: "42 cm", length: "50 cm" },
      { size: "XG", waist: "44 cm", length: "52 cm" },
      { size: "XXG", waist: "46 cm", length: "54 cm" },
    ],
  },
  feminino: {
    jersey: [
      { size: "P", chest: "47 cm", length: "64 cm" },
      { size: "M", chest: "49 cm", length: "66 cm" },
      { size: "G", chest: "51 cm", length: "68 cm" },
      { size: "GG", chest: "53 cm", length: "70 cm" },
      { size: "XG", chest: "55 cm", length: "72 cm" },
      { size: "XXG", chest: "57 cm", length: "74 cm" },
    ],
    shorts: [
      { size: "P", waist: "32 cm", length: "39 cm" },
      { size: "M", waist: "34 cm", length: "41 cm" },
      { size: "G", waist: "36 cm", length: "43 cm" },
      { size: "GG", waist: "38 cm", length: "45 cm" },
      { size: "XG", waist: "40 cm", length: "47 cm" },
      { size: "XXG", waist: "42 cm", length: "49 cm" },
    ],
  },
  infantil: {
    jersey: [
      { size: "2", chest: "35 cm", length: "45 cm" },
      { size: "4", chest: "37 cm", length: "47 cm" },
      { size: "6", chest: "39 cm", length: "49 cm" },
      { size: "8", chest: "41 cm", length: "51 cm" },
      { size: "10", chest: "43 cm", length: "53 cm" },
      { size: "12", chest: "45 cm", length: "55 cm" },
      { size: "14", chest: "47 cm", length: "57 cm" },
      { size: "16", chest: "49 cm", length: "59 cm" },
    ],
    shorts: [
      { size: "2", waist: "22 cm", length: "25 cm" },
      { size: "4", waist: "24 cm", length: "27 cm" },
      { size: "6", waist: "26 cm", length: "29 cm" },
      { size: "8", waist: "28 cm", length: "31 cm" },
      { size: "10", waist: "30 cm", length: "33 cm" },
      { size: "12", waist: "32 cm", length: "35 cm" },
      { size: "14", waist: "34 cm", length: "37 cm" },
      { size: "16", waist: "36 cm", length: "39 cm" },
    ],
  },
};

const SizeChartAccordion = () => (
  <Accordion sx={{ mb: 3 }}>
    <AccordionSummary
      expandIcon={<IconChevronDown />}
      aria-controls="size-chart-content"
      id="size-chart-header"
      sx={{
        cursor: "pointer",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        <Typography variant="h6">Tabela de tamanhos de uniformes</Typography>
        <Typography variant="caption" color="primary" mr={2}>
          Clique para ver as medidas
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="subtitle1" gutterBottom>
        Tamanhos Masculinos
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Camisas
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Largura (Tórax)</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.masculino.jersey.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Calções
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Cintura</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.masculino.shorts.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.waist}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        Tamanhos Femininos
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Camisas
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Largura (Tórax)</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.feminino.jersey.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Calções
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Cintura</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.feminino.shorts.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.waist}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        Tamanhos Infantis
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Camisas
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Largura (Tórax)</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.infantil.jersey.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.chest}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Calções
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tamanho</TableCell>
                  <TableCell>Cintura</TableCell>
                  <TableCell>Comprimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeChartData.infantil.shorts.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.waist}</TableCell>
                    <TableCell>{item.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

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
                  <>
                    <SizeChartAccordion />
                    <UniformSketchesForm
                      uniform={uniformData}
                      onSave={handleSave}
                    />
                  </>
                ) : (
                  <>
                    <SizeChartAccordion />
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={5}
                    >
                      Uniforme não encontrado ou sem dados disponíveis.
                    </Box>
                  </>
                )}
              </Box>
            </BlankCard>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}
