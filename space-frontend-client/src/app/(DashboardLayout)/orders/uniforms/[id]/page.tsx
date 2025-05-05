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
  Alert,
} from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { IconArrowLeft, IconShirt, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import {
  getUniformById,
  getUniformMeasurements,
  UniformMeasurement,
} from "@/services/uniforms";
import UniformSketchesForm from "../UniformSketchesForm";
import { UniformWithSketches } from "../types";

interface UniformDetailPageProps {
  params: {
    id: string;
  };
}

interface SizeChartItem {
  size: string;
  chest?: string;
  length: string;
  waist?: string;
}

interface SizeChartData {
  masculino: {
    jersey: SizeChartItem[];
    shorts: SizeChartItem[];
  };
  feminino: {
    jersey: SizeChartItem[];
    shorts: SizeChartItem[];
  };
  infantil: {
    jersey: SizeChartItem[];
    shorts: SizeChartItem[];
  };
}

const formatMeasurementData = (
  measurements: UniformMeasurement[],
): SizeChartData => {
  const sizeMap: Record<number, string> = {
    1: "PP",
    2: "P",
    3: "M",
    4: "G",
    5: "GG",
    6: "XG",
    7: "XXG",
    8: "2",
    9: "4",
    10: "6",
    11: "8",
    12: "10",
    13: "12",
    14: "14",
    15: "16",
  };

  const jerseyMeasurements = measurements.map((m) => ({
    size: sizeMap[m.id] || m.id.toString(),
    chest: `${m.largura_camisa} cm`,
    length: `${m.altura_camisa} cm`,
  }));

  const shortsMeasurements = measurements.map((m) => ({
    size: sizeMap[m.id] || m.id.toString(),
    waist: `${m.largura_calcao} cm`,
    length: `${m.altura_calcao} cm`,
  }));

  const result = {
    masculino: {
      jersey: jerseyMeasurements.slice(0, 7),
      shorts: shortsMeasurements.slice(0, 7),
    },
    feminino: {
      jersey: jerseyMeasurements.slice(1, 7),
      shorts: shortsMeasurements.slice(1, 7),
    },
    infantil: {
      jersey: jerseyMeasurements.slice(7, 15),
      shorts: shortsMeasurements.slice(7, 15),
    },
  };

  return result;
};

const SizeChartAccordion = ({
  sizeChartData,
  error,
  loading,
}: {
  sizeChartData: SizeChartData | null;
  error: string | null;
  loading: boolean;
}) => (
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
      {loading ? (
        <Box display="flex" justifyContent="center" width="100%" py={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : sizeChartData ? (
        <>
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
                    {sizeChartData.masculino.jersey.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.chest}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                    {sizeChartData.masculino.shorts.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.waist}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                    {sizeChartData.feminino.jersey.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.chest}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                    {sizeChartData.feminino.shorts.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.waist}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                    {sizeChartData.infantil.jersey.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.chest}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
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
                    {sizeChartData.infantil.shorts.map(
                      (item: SizeChartItem) => (
                        <TableRow key={item.size}>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.waist}</TableCell>
                          <TableCell>{item.length}</TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      ) : (
        <Alert severity="warning">Nenhuma medida encontrada.</Alert>
      )}
    </AccordionDetails>
  </Accordion>
);

export default function UniformDetailPage({ params }: UniformDetailPageProps) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [uniformData, setUniformData] = useState<UniformWithSketches | null>(
    null,
  );
  const [sizeChartData, setSizeChartData] = useState<SizeChartData | null>(
    null,
  );
  const [loadingMeasurements, setLoadingMeasurements] = useState(true);
  const [measurementError, setMeasurementError] = useState<string | null>(null);

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

    const fetchMeasurements = async () => {
      try {
        setLoadingMeasurements(true);
        setMeasurementError(null);
        const measurements = await getUniformMeasurements();
        if (measurements && measurements.length > 0) {
          const formattedData = formatMeasurementData(measurements);
          setSizeChartData(formattedData);
        } else {
          setSizeChartData(null);
          setMeasurementError("Nenhuma medida encontrada na API.");
        }
      } catch (error) {
        setSizeChartData(null);
        setMeasurementError(
          "Erro ao carregar medidas dos uniformes. Por favor, tente novamente mais tarde.",
        );
      } finally {
        setLoadingMeasurements(false);
      }
    };

    fetchData();
    fetchMeasurements();
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
                    <SizeChartAccordion
                      sizeChartData={sizeChartData}
                      error={measurementError}
                      loading={loadingMeasurements}
                    />
                    <UniformSketchesForm
                      uniform={uniformData}
                      onSave={handleSave}
                    />
                  </>
                ) : (
                  <>
                    <SizeChartAccordion
                      sizeChartData={sizeChartData}
                      error={measurementError}
                      loading={loadingMeasurements}
                    />
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
