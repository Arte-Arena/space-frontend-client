import React from "react";
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
  CircularProgress,
} from "@mui/material";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";
import Link from "next/link";

export interface UniformSet {
  id: number;
  budgetNumber: string;
  isFilled: boolean;
}

interface UniformListProps {
  uniformSets: UniformSet[];
  loading: boolean;
}

const UniformList: React.FC<UniformListProps> = ({ uniformSets, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              Número do Orçamento
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniformSets.map((uniform) => (
            <TableRow
              key={uniform.id}
              hover
              component={Link}
              href={`/uniforms/${uniform.id}`}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <TableCell>#{uniform.budgetNumber}</TableCell>
              <TableCell>
                {uniform.isFilled ? (
                  <Chip
                    icon={<IconCircleCheck size="16" />}
                    color="success"
                    size="small"
                    label="Preenchido"
                  />
                ) : (
                  <Chip
                    icon={<IconCircleX size="16" />}
                    color="default"
                    size="small"
                    label="Não preenchido"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UniformList;
