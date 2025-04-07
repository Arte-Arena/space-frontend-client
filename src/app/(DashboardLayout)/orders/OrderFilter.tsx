"use client";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { IconSearch, IconFilterOff } from "@tabler/icons-react";

interface OrderFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  status: string;
  productType: string;
  searchTerm: string;
}

const OrderFilter = ({ onFilter }: OrderFilterProps) => {
  const [status, setStatus] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleProductTypeChange = (event: SelectChangeEvent) => {
    setProductType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleApplyFilter = () => {
    onFilter({
      status,
      productType,
      searchTerm,
    });
  };

  const handleClearFilter = () => {
    setStatus("");
    setProductType("");
    setSearchTerm("");
    onFilter({
      status: "",
      productType: "",
      searchTerm: "",
    });
  };

  return (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select value={status} label="Status" onChange={handleStatusChange}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pending">Pendente</MenuItem>
              <MenuItem value="processing">Em Processamento</MenuItem>
              <MenuItem value="shipped">Enviado</MenuItem>
              <MenuItem value="delivered">Entregue</MenuItem>
              <MenuItem value="cancelled">Cancelado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Produto</InputLabel>
            <Select
              value={productType}
              label="Tipo de Produto"
              onChange={handleProductTypeChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Uniformes">Uniformes</MenuItem>
              <MenuItem value="Outros">Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Número do pedido"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              startIcon={<IconSearch size={20} />}
            >
              Filtrar
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearFilter}
              startIcon={<IconFilterOff size={20} />}
            >
              Limpar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderFilter;
