"use client";
import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import { IconEye } from "@tabler/icons-react";

// Dados de exemplo de pedidos
const pedidos = [
  {
    id: "UNF-4253",
    data: "03/04/2023",
    itens: "Conjunto completo",
    valor: "R$ 480,00",
    status: "Concluído",
    statusColor: "success",
  },
  {
    id: "UNF-4289",
    data: "27/03/2023",
    itens: "Camisetas (12)",
    valor: "R$ 360,00",
    status: "Em Produção",
    statusColor: "primary",
  },
  {
    id: "UNF-4312",
    data: "15/03/2023",
    itens: "Uniformes de time",
    valor: "R$ 780,00",
    status: "Aguardando",
    statusColor: "warning",
  },
  {
    id: "UNF-4325",
    data: "10/03/2023",
    itens: "Shorts e camisetas",
    valor: "R$ 250,00",
    status: "Novo",
    statusColor: "secondary",
  },
  {
    id: "UNF-4198",
    data: "01/03/2023",
    itens: "Uniformes personalizados",
    valor: "R$ 520,00",
    status: "Modificado",
    statusColor: "info",
  },
];

const RecentTransactions = () => {
  return (
    <DashboardCard
      title="Pedidos Recentes"
      action={
        <Button
          component={Link}
          href="/uniforms"
          variant="text"
          color="primary"
        >
          Ver Todos
        </Button>
      }
    >
      <Box sx={{ overflow: "auto" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de pedidos">
            <TableHead>
              <TableRow>
                <TableCell>Pedido</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Itens</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow
                  key={pedido.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <strong>#{pedido.id}</strong>
                  </TableCell>
                  <TableCell>{pedido.data}</TableCell>
                  <TableCell>{pedido.itens}</TableCell>
                  <TableCell>{pedido.valor}</TableCell>
                  <TableCell>
                    <Chip
                      label={pedido.status}
                      color={pedido.statusColor as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      href={`/uniforms/${pedido.id}`}
                      size="small"
                      variant="outlined"
                      startIcon={<IconEye size={16} />}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default RecentTransactions;
